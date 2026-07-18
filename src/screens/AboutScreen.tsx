import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Image,
} from 'react-native';
import Icon from '@react-native-vector-icons/octicons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNav';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type AboutScreenProps = StackScreenProps<RootStackParamList, 'AboutScreen'>;

export const AboutScreen = ({ navigation }: AboutScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={'white'} />
        </Pressable>
      </View>
      {/* Hero */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.hero}>
        <Image
          source={require('../../assets/WallSpaceLogo.png')}
          style={{ width: 100, height: 100, borderRadius: 16 }}
        />
        <Text style={styles.appName}>WallSpace</Text>
        <Text style={styles.tagline}>Beautiful wallpapers for your device</Text>

        <Text style={styles.version}>v1.0.0</Text>
      </Animated.View>

      {/* Info Card */}
      <Animated.View
        entering={FadeInUp.delay(100).duration(400)}
        style={styles.infoCard}
      >
        <Text style={styles.label}>Developed by</Text>
        <Text style={styles.developer}>Parag Mer</Text>

        <Text style={styles.credit}>Wallpapers provided by Pexels</Text>
      </Animated.View>

      {/* Links */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(400)}
        style={styles.links}
      >
        <Pressable
          style={styles.row}
          onPress={() => Linking.openURL('https://www.pexels.com')}
        >
          <Text style={styles.rowText}>Pexels</Text>
          <Icon name="chevron-right" size={18} color="#A8B5DB" />
        </Pressable>

        <Pressable
          style={styles.row}
          onPress={() => Linking.openURL('mailto:paragmer2001@gmail.com')}
        >
          <Text style={styles.rowText}>Contact Developer</Text>
          <Icon name="chevron-right" size={18} color="#A8B5DB" />
        </Pressable>
      </Animated.View>

      {/* Footer */}
      <Text style={[styles.footer, { bottom: insets.bottom + 10 }]}>
        Made with ❤️ using React Native
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    paddingHorizontal: 20,
  },

  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },

  appName: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    marginTop: 12,
  },

  tagline: {
    fontSize: 15,
    color: '#A8B5DB',
    marginTop: 4,
    textAlign: 'center',
  },

  version: {
    marginTop: 12,
    color: '#A8B5DB',
    fontSize: 13,
  },

  infoCard: {
    backgroundColor: '#2b2b2b',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },

  label: {
    color: '#A8B5DB',
    fontSize: 13,
  },

  developer: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },

  credit: {
    marginTop: 10,
    color: '#A8B5DB',
    fontSize: 14,
  },

  links: {
    backgroundColor: '#2b2b2b',
    borderRadius: 16,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },

  rowText: {
    color: 'white',
    fontSize: 16,
  },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#A8B5DB',
    fontSize: 13,
  },
  header: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
    paddingRight: 24,
  },
});
