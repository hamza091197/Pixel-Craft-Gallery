import { StackScreenProps } from '@react-navigation/stack';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/octicons';
import { useRef, useState } from 'react';
import InfoModal from '../components/InfoModal';
import { RootStackParamList } from '../navigation/RootNav';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, RemoveFromFav } from '../store/slices/FavWallpaper';
import { IStore } from '../store';
import FavBtn from '../components/FavBtn';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { SmartImage } from '../components/SmartImage';
import SelectorModal from '../components/SelectorModal';
import { downloadWallpaper } from '../utils/WallpaperDownload';
import Toast from 'react-native-toast-message';

type ViewerScreenProps = StackScreenProps<RootStackParamList, 'ViewerScreen'>;

const FOOTER_HEIGHT = 150;

export const ViewerScreen = ({ navigation, route }: ViewerScreenProps) => {
  const insets = useSafeAreaInsets();
  const { imgData } = route.params;
  const dispatch = useDispatch();
  const isFav = useSelector((state: IStore) =>
    state.FavWallpaperReducer.wallpaperList.some(
      photo => photo.id === imgData.id,
    ),
  );
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [selectorModalVisible, setSelectorModalVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const toggleBars = () => {
    Animated.timing(headerAnim, {
      toValue: isVisible ? -headerHeight : 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();

    Animated.timing(footerAnim, {
      toValue: isVisible ? FOOTER_HEIGHT : 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();

    setIsVisible(!isVisible);
  };

  const handleDownload = () => {
    setDownloading(true);
    setProgress(0);
    downloadWallpaper({
      url: imgData.src.original,
      onProgress: p => {
        setProgress(p);
      },
      onComplete: () => {
        setDownloading(false);
        setProgress(1);
        Toast.show({
          type: 'success',
          text1: 'Download Complete',
          text2: 'Wallpaper saved to gallary!',
        });
      },
      onError: () => {
        setDownloading(false);
        Toast.show({
          type: 'error',
          text1: 'Download Failed!',
          text2: 'Something went wrong!',
        });
      },
    });
  };

  //For iOS only
  const setWallpaperAlert = () => {
    Alert.alert(
      'Almost there!',
      'To set this wallpaper in iOS:\n1. Download the image\n2. Open it in Photos app\n3. Tap Share → Use as Wallpaper',
      [
        {
          text: 'Download & Continue',
          onPress: handleDownload,
          isPreferred: true,
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  return (
    <>
      <SafeAreaView
        style={[styles.container, { backgroundColor: imgData.avg_color }]}
      >
        {/* header */}
        <Animated.View
          onLayout={e => {
            setHeaderHeight(e.nativeEvent.layout.height);
          }}
          style={[
            styles.headerContainer,
            {
              backgroundColor: imgData.avg_color,
              transform: [{ translateY: headerAnim }],
              paddingTop: insets.top,
            },
          ]}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={'white'} />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {imgData.alt}
            </Text>
            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Photo by {imgData.photographer} on Pexels
            </Text>
          </View>
          <Icon
            name="info"
            size={24}
            color={'white'}
            onPress={() => setInfoModalVisible(true)}
          />
        </Animated.View>

        <Pressable onPress={toggleBars}>
          <Image
            source={{ uri: imgData.src.tiny }}
            style={StyleSheet.absoluteFillObject}
            blurRadius={10}
          />
          <SmartImage
            source={{ uri: imgData.src.large2x }}
            resizeMode="contain"
            gestureEnabled
          />
        </Pressable>
        {downloading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        )}

        {/* footer */}
        <Animated.View
          style={[
            styles.footerContainer,
            {
              backgroundColor: imgData.avg_color,
              paddingBottom: insets.bottom + 10,
              transform: [{ translateY: footerAnim }],
            },
          ]}
        >
          <Pressable style={styles.bottomBtnStyle} onPress={handleDownload}>
            <Icon name="download" size={24} color={'white'} />
            <Text style={styles.bottomBtnText}>Save</Text>
          </Pressable>
          <FavBtn
            isFav={isFav}
            onPress={() =>
              isFav
                ? dispatch(RemoveFromFav(imgData.id))
                : dispatch(addToFav(imgData))
            }
          />
          <Pressable
            style={styles.bottomBtnStyle}
            onPress={() =>
              Platform.OS === 'ios'
                ? setWallpaperAlert()
                : setSelectorModalVisible(true)
            }
          >
            <Icon name="image" size={24} color={'white'} />
            <Text style={styles.bottomBtnText}>Set</Text>
          </Pressable>
        </Animated.View>
        <InfoModal
          visible={infoModalVisible}
          setVisible={setInfoModalVisible}
          details={imgData}
        />
        <SelectorModal
          setVisible={setSelectorModalVisible}
          visible={selectorModalVisible}
          onPress={mode => {
            setSelectorModalVisible(false);
            navigation.navigate('WallpaperPreviewScreen', { imgData, mode });
          }}
        />
      </SafeAreaView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  boxWithShadow: {
    marginTop: 35,
    marginLeft: 20,
  },
  bottomBtnStyle: { alignItems: 'center', gap: 5 },
  bottomBtnText: {
    color: 'white',
    fontSize: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: { fontSize: 20, color: 'white', fontWeight: '500' },
  subtitle: { fontSize: 16, color: 'white', fontWeight: '400' },
  footerContainer: {
    width: '100%',
    paddingTop: 20,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
