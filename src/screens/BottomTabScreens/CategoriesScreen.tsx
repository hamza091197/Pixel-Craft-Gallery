import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import CategoryItem from '../../components/CategoryItem';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categoriesList } from '../../utils/WallpaperCategories';

type CategoriesScreenProps = BottomTabScreenProps<
  bottomTabParamList,
  'Categories'
>;

const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <FlatList
          data={categoriesList}
          renderItem={({ item }) => (
            <CategoryItem
              label={item.label}
              imgUrl={item.imgUrl}
              onPress={() =>
                navigation.getParent()?.navigate('CategoryViewerScreen', {
                  categoryName: item.label,
                })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
        />
      </View>
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
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    // textAlign: 'center',
  },
});

export default CategoriesScreen;
