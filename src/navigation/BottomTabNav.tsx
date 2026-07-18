import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/BottomTabScreens/HomeScreen';
import FavouritesScreen from '../screens/BottomTabScreens/FavouritesScreen';
import CategoriesScreen from '../screens/BottomTabScreens/CategoriesScreen';
import ProfileScreen from '../screens/BottomTabScreens/ProfileScreen';
import { TabIcon } from '../components/TabIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

export type bottomTabParamList = {
  Home: undefined;
  Categories: undefined;
  Favourites: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<bottomTabParamList>();

export const BottomTabNav = () => {
  const insets = useSafeAreaInsets();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          borderColor: '#121212',
          height: insets.bottom + 60,
          paddingTop: 10
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={'home'} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={'apps'} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={'heart'} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={'person'} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
