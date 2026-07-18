import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/octicons';

export const EmptyFavourites = () => {
  return (
    <View style={styles.container}>
      <Icon name="heart" size={64} color="#A8B5DB" />

      <Text style={styles.title}>No favourites yet</Text>

      <Text style={styles.subtitle}>
        Tap the heart icon on any wallpaper to add it here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 120,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#A8B5DB',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    opacity: 0.85,
  },
});
