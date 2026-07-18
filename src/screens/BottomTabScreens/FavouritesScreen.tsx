import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../store';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNav';
import { EmptyFavourites } from '../../components/EmptyFavourites';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SmartImage } from '../../components/SmartImage';
import Octicons from '@react-native-vector-icons/octicons';
import { clearAllFav } from '../../store/slices/FavWallpaper';

const IMAGE_WIDTH = Dimensions.get('window').width / 2 - 30;

type FavouritesScreenProps = BottomTabScreenProps<
  bottomTabParamList,
  'Favourites'
>;

const FavouritesScreen = ({ navigation }: FavouritesScreenProps) => {
  const { wallpaperList } = useSelector(
    (state: IStore) => state.FavWallpaperReducer,
  );
  const dispatch = useDispatch();

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Favourites',
      'Are you sure you want to remove all items from your favourites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove All',
          style: 'destructive',
          onPress: () => dispatch(clearAllFav())
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourites</Text>
        {wallpaperList.length > 0 && <Octicons name='trash' size={20} color="white" onPress={handleClearAll} />}
      </View>
      <FlatList
        data={wallpaperList}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation
                .getParent()
                ?.navigate('ViewerScreen', { imgData: item })
            }
          >
            <SmartImage
              source={{ uri: item.src.portrait }}
              style={styles.image}
            />
          </Pressable>
        )}
        ListEmptyComponent={<EmptyFavourites />}
      />
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
  image: {
    width: IMAGE_WIDTH,
    aspectRatio: 9 / 16,
    borderRadius: 14,
    marginBottom: 20,
  },
});

export default FavouritesScreen;
