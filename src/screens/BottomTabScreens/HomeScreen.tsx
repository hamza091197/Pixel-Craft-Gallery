import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTrendingWallpapers } from '../../api';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNetwork } from '../../hooks/useNetwork';
import { Octicons } from '@react-native-vector-icons/octicons';
import { SmartImage } from '../../components/SmartImage';

const IMAGE_WIDTH = Dimensions.get('window').width / 2 - 30;

type HomeScreenProps = BottomTabScreenProps<bottomTabParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const isConnected = useNetwork();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['trendingWallpapers'],
    queryFn: ({ pageParam = 1 }) => fetchTrendingWallpapers(pageParam),

    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next_page) return undefined;
      const url = new URL(lastPage.next_page);
      return parseInt(url.searchParams.get('page') ?? '1', 10);
    },
    enabled: !!isConnected,
  });

  const listRef = useRef<FlatList>(null);
  const [showBtn, setShowBtn] = useState(false);

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowBtn(offsetY > 500);
  };

  const wallpapers = data
    ? Array.from(
      new Map(
        data.pages
          .flatMap(page => page.photos)
          .map(photo => [photo.id, photo]),
      ).values(),
    )
    : [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PixelCraft Gallery</Text>
        <Octicons name="search" size={20} color="white" onPress={() => navigation.getParent()?.navigate('SearchScreen')} />
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Trending Now 🔥</Text>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color="white" /></View>
      ) : error ? (
        <Text>Unable to fetch wallpapers : {error.message}</Text>
      ) : (
        <FlatList
          ref={listRef}
          data={wallpapers}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            if (isFetchingNextPage) {
              return (
                <View style={styles.footerContainer}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              );
            }

            if (!hasNextPage && wallpapers.length > 0) {
              return (
                <View style={styles.footerContainer}>
                  <Text style={styles.footerText}>That's all we have!</Text>
                </View>
              );
            }

            return null;
          }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate('ViewerScreen', { imgData: item })
              }
            >
              {/* <Image source={{ uri: item.src.portrait }} style={styles.image} /> */}
              <SmartImage
                source={{ uri: item.src.portrait }}
                style={styles.image}
              />
            </Pressable>
          )}
        />
      )}
      {showBtn && (
        <TouchableOpacity
          style={styles.backToTop}
          onPress={scrollToTop}
          activeOpacity={0.8}
        >
          <Octicons name="arrow-up" size={24} color={'white'} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#bbbbbb',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: 9 / 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  backToTop: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  arrow: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    letterSpacing: 0.5,
    fontFamily: 'System',
  },
});

export default HomeScreen;
