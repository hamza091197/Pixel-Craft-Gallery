import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { PermissionsAndroid, Platform } from 'react-native';


const requestPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 29) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

interface DownloadProps {
  url: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  onError?: (error?: any) => void;
}

export const downloadWallpaper = async ({
  url,
  onComplete,
  onError,
  onProgress,
}: DownloadProps) => {
  try {
    // 1. Android Specific Setup
    if (Platform.OS === 'android') {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        console.log('Permission denied');
        return;
      }
    }

    // 2. Define Paths
    const fileName = `wall_${Date.now()}.jpg`;
    const directory =
      Platform.OS === 'android'
        ? `${RNFS.CachesDirectoryPath}/WallSpace`
        : `${RNFS.TemporaryDirectoryPath}/WallSpace`;

    // creating folder if doesn't exists
    const exists = await RNFS.exists(directory);
    if (!exists) {
      await RNFS.mkdir(directory);
    }
    const filePath = `${directory}/${fileName}`;

    // 3. Execute Download
    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      progress: res => {
        const progress = res.bytesWritten / res.contentLength;
        onProgress?.(progress);
      },
      progressDivider: 1,
    }).promise;

    // 4. Save to Gallery
    if (result.statusCode === 200) {
      await CameraRoll.saveAsset(filePath, {
        type: 'photo',
        album: 'WallSpace',
      });
      onComplete?.();
    } else {
      throw new Error(`Download failed with status: ${result.statusCode}`);
    }
  } catch (error) {
    console.error('Download error: ', error);
    onError?.(error);
  }
};