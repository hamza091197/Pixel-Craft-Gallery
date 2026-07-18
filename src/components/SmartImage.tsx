import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageProps,
  StyleSheet,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

type SmartImageProps = ImageProps & {
  gestureEnabled?: boolean;
};

/**
 * Dual-mode image component used across the whole app.
 * - gestureEnabled=false (default): grid/list use — respects the `style` prop
 * - gestureEnabled=true: full-screen viewer — fixed width×height, enables pinch/pan/double-tap zoom
 */
export const SmartImage = ({
  gestureEnabled = false,
  style,
  source,
  ...rest
}: SmartImageProps) => {
  const [loading, setLoading] = useState(false);
  const hasLoaded = useRef(false);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const uri = (source as { uri?: string })?.uri;

  const pinch = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = Math.min(Math.max(savedScale.value * e.scale, 1), 4);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const pan = Gesture.Pan()
    .onUpdate(e => {
      if (scale.value > 1) {
        const maxX = (width * scale.value - width) / 2;
        const maxY = (height * scale.value - height) / 2;

        translateX.value = Math.min(
          Math.max(savedTranslateX.value + e.translationX, -maxX),
          maxX,
        );
        translateY.value = Math.min(
          Math.max(savedTranslateY.value + e.translationY, -maxY),
          maxY,
        );
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(e => {
      if (scale.value > 1) {
        //reset
        scale.value = withTiming(1);
        savedScale.value = 1;

        translateX.value = withTiming(0);
        translateY.value = withTiming(0);

        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        //zoom in
        scale.value = withTiming(2.5);
        savedScale.value = 2.5;
      }
    });

  const gesture = Gesture.Simultaneous(pinch, pan, doubleTap);

  const animatedStyle = useAnimatedStyle(() => {
    if (!gestureEnabled) return {};

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  useEffect(() => {
    if (!uri || hasLoaded.current) return; // 👈 guard

    let isMounted = true;

    setLoading(true);

    Image.prefetch(uri)
      .catch(() => { })
      .finally(() => {
        if (isMounted) {
          hasLoaded.current = true; // 👈 mark loaded
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [uri]);

  const ImageContent = (
    <AnimatedImage
      source={source}
      style={
        // gestureEnabled: always full-screen (style prop intentionally ignored)
        !gestureEnabled && style ? style : [{ width, height }, animatedStyle]
      }
      {...rest}
    />
  );

  return (
    <View>
      {gestureEnabled ? (
        <GestureDetector gesture={gesture}>{ImageContent}</GestureDetector>
      ) : (
        ImageContent
      )}

      {loading && (
        <ActivityIndicator size={gestureEnabled ? "large" : 'small'} color="white" style={styles.loader} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
