import { View, Text, StyleSheet, Share, Linking } from 'react-native';
import React from 'react';
import { ProfileRow } from '../../components/ProfileRow';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rateApp } from '../../utils/RateApp';

type ProfileScreenProps = BottomTabScreenProps<bottomTabParamList, 'Profile'>;

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.section}>
        <ProfileRow
          icon="heart"
          title="Favourites"
          onPress={() => navigation.navigate('Favourites')}
        />
      </View>

      <View style={styles.section}>
        <ProfileRow icon="star" title="Rate App" onPress={rateApp} />
        <ProfileRow
          icon="share-android"
          title="Share App"
          onPress={() =>
            Share.share({ message: 'Check out PixelCraft Gallery — beautiful wallpapers for your device! 🎨' })
          }
        />
        <ProfileRow
          icon="mail"
          title="Send Feedback"
          onPress={() => Linking.openURL('mailto:hamzakhalid@gmail.com')}
        />
      </View>

      <View style={styles.section}>
        <ProfileRow
          icon="info"
          title="About"
          onPress={() => navigation.getParent()?.navigate('AboutScreen')}
        />
        <ProfileRow
          icon="shield"
          title="Privacy Policy"
          onPress={() =>
            Linking.openURL('https://pixelcraft.gallery/privacy-policy')
          }
        />
      </View>
      <Text style={styles.versionText}>PixelCraft Gallery | v1.0</Text>
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
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#2b2b2b',
    borderRadius: 12,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  rowText: {
    color: 'white',
    fontSize: 16,
  },
  versionText: {
    position: 'absolute',
    bottom: 10,
    color: '#A8B5DB',
    left: 0,
    right: 0,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default ProfileScreen;
