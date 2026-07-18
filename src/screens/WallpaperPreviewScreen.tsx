import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNav';
import { applyWallpaper } from '@codeooze/react-native-wallpaper-manager';
import Icon from '@react-native-vector-icons/octicons';
import Toast from 'react-native-toast-message';

type WallpaperPreviewScreenProps = StackScreenProps<
  RootStackParamList,
  'WallpaperPreviewScreen'
>;
const { width, height } = Dimensions.get('screen');

const OverlayGrid = ({
  length,
  alignment,
  gap,
  iconSize,
  gridStyle,
}: {
  length: number;
  alignment: 'top' | 'bottom';
  iconSize: number;
  gap: number;
  gridStyle?: {};
}) => {
  const icons = Array.from({ length: length });

  return (
    <View
      style={[
        styles.grid,
        alignment === 'top' ? { top: 0 } : { bottom: 10, left: 0, right: 0 },
        gridStyle,
      ]}
    >
      {icons.map((_, index) => (
        <View
          key={index}
          style={[
            styles.glassBox,
            { width: iconSize, height: iconSize, margin: gap },
          ]}
        />
      ))}
    </View>
  );
};

const WallpaperPreviewScreen = ({
  navigation,
  route,
}: WallpaperPreviewScreenProps) => {
  const { imgData, mode } = route.params;
  const [loading, setLoading] = useState(false);

  const handleSetWallpaper = (src: string, mode: 'home' | 'lock' | 'both') => {
    setLoading(true);
    applyWallpaper(src, mode)
      .then(response => {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Wallpaper Set 🎉',
          text2: response,
          onHide: () =>
            setTimeout(() => {
              navigation.goBack();
            }, 500),
        });
      })
      .catch(error => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: error.message,
          onHide: () => navigation.goBack(),
        });
      });
  };

  return (
    <ImageBackground
      source={{ uri: imgData.src.tiny }}
      style={{ flex: 1 }}
      blurRadius={10}
    >
      <SafeAreaView style={styles.container}>
        <Toast position="top" />
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={'white'} />
          </Pressable>
        </View>
        <View>
          {mode === 'both' ? (
            <View style={styles.innerContainer}>
              <ImageBackground
                source={{ uri: imgData.src.portrait }}
                style={{
                  flex: 2,
                  height: height - 500,
                  borderRadius: 10,
                }}
              >
                <OverlayGrid
                  length={20}
                  alignment="top"
                  iconSize={width * 0.06}
                  gap={width * 0.015}
                  gridStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
                />
                <OverlayGrid
                  length={4}
                  alignment="bottom"
                  iconSize={width * 0.06}
                  gap={width * 0.015}
                  gridStyle={{ paddingHorizontal: 10 }}
                />
              </ImageBackground>

              <ImageBackground
                source={{ uri: imgData.src.portrait }}
                style={{
                  flex: 2,
                  height: height - 500,
                  borderRadius: 10,
                }}
              >
                <View
                  style={[
                    styles.timeContainer,
                    { paddingHorizontal: 10, top: 40 },
                  ]}
                >
                  <Text style={[styles.time, { fontSize: 25 }]}>12:45</Text>
                  <Text style={[styles.date, { fontSize: 8 }]}>
                    Wednesday,13 December
                  </Text>
                </View>
              </ImageBackground>
            </View>
          ) : (
            <>
              <Image
                source={{ uri: imgData.src.portrait }}
                style={{
                  width: width - 100,
                  height: height - 300,
                  alignSelf: 'center',
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
              {mode === 'home' && (
                <>
                  <OverlayGrid
                    length={20}
                    alignment="top"
                    iconSize={width * 0.11}
                    gap={width * 0.025}
                  />
                  <OverlayGrid
                    length={4}
                    alignment="bottom"
                    iconSize={width * 0.11}
                    gap={width * 0.025}
                  />
                </>
              )}
              {mode === 'lock' && (
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>12:45</Text>
                  <Text style={styles.date}>Wednesday,13 December</Text>
                </View>
              )}
            </>
          )}
        </View>

        <Pressable
          style={styles.confirmBtn}
          onPress={() => handleSetWallpaper(imgData.src.original, mode)}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
              Set to{' '}
              {mode === 'both'
                ? 'Home and Lock'
                : mode === 'home'
                ? 'Home'
                : 'Lock'}{' '}
              screen
            </Text>
          )}
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 30,
    paddingHorizontal: 30,
    position: 'absolute',
  },
  glassBox: {
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  timeContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  time: {
    fontSize: 50,
    fontWeight: '500',
    color: '#fff',
  },
  date: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  innerContainer: { flexDirection: 'row', gap: 20, marginTop: 50 },
  confirmBtn: {
    backgroundColor: 'black',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: 250,
    height: 62,
  },
});

export default WallpaperPreviewScreen;
