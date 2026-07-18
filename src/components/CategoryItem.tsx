import { Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { SmartImage } from './SmartImage';

const CategoryItem = ({
  imgUrl,
  label,
  onPress,
}: {
  label: string;
  imgUrl: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && { opacity: 0.8 }}
    >
      <SmartImage
        source={{ uri: imgUrl }}
        resizeMode="cover"
        style={styles.image}
      />
      <Text style={styles.title}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    marginBottom: 16,
    opacity: 0.6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  title: {
    position: 'absolute',
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    left: 0,
    right: 0,
    top: 50,
  },
});

export default CategoryItem;
