import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BottomTabNav } from './BottomTabNav';
import { ViewerScreen } from '../screens/ViewerScreen';
import CategoryViewerScreen from '../screens/CategoryViewerScreen';
import { AboutScreen } from '../screens/AboutScreen';
import WallpaperPreviewScreen from '../screens/WallpaperPreviewScreen';
import SplashScreen from '../screens/SplashScreen';
import { SearchScreen } from '../screens/SearchScreen';

export type RootStackParamList = {
  BottomTabNav: undefined;
  ViewerScreen: {
    imgData: any;
  };
  CategoryViewerScreen: {
    categoryName: string;
  };
  AboutScreen: undefined;
  WallpaperPreviewScreen: {
    imgData: any;
    mode: 'home' | 'lock' | 'both';
  };
  SplashScreen: undefined;
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
      <Stack.Screen name="ViewerScreen" component={ViewerScreen} />
      <Stack.Screen
        name="CategoryViewerScreen"
        component={CategoryViewerScreen}
      />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen
        name="WallpaperPreviewScreen"
        component={WallpaperPreviewScreen}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default RootNav;
