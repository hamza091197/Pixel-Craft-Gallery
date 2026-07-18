import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCategoryWallpapers } from '../api';
import { RootStackParamList } from '../navigation/RootNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/octicons';
import { SmartImage } from '../components/SmartImage';

type CategoryViewerScreenProps = StackScreenProps<
  RootStackParamList,
  'CategoryViewerScreen'
>;

const IMAGE_WIDTH = Dimensions.get('window').width / 2 - 30;

const CategoryViewerScreen = ({
  navigation,
  route,
}: CategoryViewerScreenProps) => {
  const { categoryName } = route.params;
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['categoryWallpapers', categoryName],
    queryFn: ({ pageParam = 1 }) =>
      fetchCategoryWallpapers(categoryName, pageParam),
    staleTime: 1000 * 60 * 30,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next_page) return undefined;
      const url = new URL(lastPage.next_page);
      return parseInt(url.searchParams.get('page') ?? '1', 10);
    },
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={'white'} />
        </Pressable>
        <Text style={styles.headerTitle}>{categoryName}</Text>
      </View>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color="white" />
        </View>
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
                navigation.navigate('ViewerScreen', { imgData: item })
              }
            >
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
          <Text style={styles.arrow}>↑</Text>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    // textAlign: 'center',
    flex: 1,
    paddingRight: 24,
  },
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: 9 / 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  footerContainer: {
    paddingVertical: 40, // Give it space so it's not cramped at the bottom
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666', // Muted gray
    fontWeight: '500',
    letterSpacing: 0.5,
    fontFamily: 'System', // Or your custom app font
  },
  backToTop: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 60,
    right: 20,
    backgroundColor: '#000', // Or your app's primary color
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
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CategoryViewerScreen;
