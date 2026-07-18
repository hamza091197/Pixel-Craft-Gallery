import { Text, Animated, Pressable, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import Haptic from 'react-native-haptic-feedback';
import Icon from '@react-native-vector-icons/octicons';

const FavBtn = ({
  isFav,
  onPress,
}: {
  isFav: boolean;
  onPress: () => void;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptic.trigger('impactLight');

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.bottomBtnStyle,
        pressed && { opacity: 0.8 },
      ]}
      onPress={handlePress}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Icon
          name={isFav ? 'heart-fill' : 'heart'}
          size={24}
          color={isFav ? 'red' : 'white'}
        />
      </Animated.View>
      <Text style={styles.bottomBtnText}>Favourite</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bottomBtnStyle: { alignItems: 'center', gap: 5 },
  bottomBtnText: {
    color: 'white',
    fontSize: 14,
  },
});

export default FavBtn;
