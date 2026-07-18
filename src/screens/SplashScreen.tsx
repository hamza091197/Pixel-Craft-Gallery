import { Text, StyleSheet, Animated, Alert } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNav';
import NetInfo from '@react-native-community/netinfo';

type SplashScreenProps = StackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const CheckConnection = async () => {
    const state = await NetInfo.fetch();

    const isOnline = state.isConnected && state.isInternetReachable;

    if (isOnline) {
      setTimeout(() => {
        navigation.replace('BottomTabNav');
      }, 800);
    } else {
      Alert.alert('No Internet', 'Please check your connection and try again', [
        { text: 'Try again', onPress: CheckConnection, isPreferred: true },
      ]);
    }
  };

  useEffect(() => {
    Animated.sequence([
      //Logo Animation
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      //Text Animation
      Animated.parallel([
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      CheckConnection();
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require('../../assets/WallSpaceLogo.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
      />
      <Animated.View
        style={{
          transform: [{ translateY: textTranslate }],
          opacity: textOpacity,
          alignItems: 'center',
        }}
      >
        <Text style={styles.title}>WallSpace</Text>
        <Text style={styles.subtitle}>Bring Your Screen to Life</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 48,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    marginTop: 10,
  },

  subtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 4,
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
