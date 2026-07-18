import { Linking, Platform } from 'react-native';

/**
 * Opens the Play Store rating page for this app.
 * iOS is not handled — in-app review (StoreKit) would be needed for iOS support.
 */
export const rateApp = () => {
  const packageName = 'com.parag.wallspace';

  if (Platform.OS === 'android') {
    // Try native Play Store app first; fall back to browser if not installed
    Linking.openURL(`market://details?id=${packageName}`).catch(() => {
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=${packageName}`,
      );
    });
  }
};
