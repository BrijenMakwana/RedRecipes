/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import RecipeScreen from "../screens/RecipeScreen";
import InstructionScreen from "../screens/InstructionScreen";
import VideoScreen from "../screens/VideoScreen";
import GuessNutritionScreen from "../screens/GuessNutritionScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    const colorScheme = useColorScheme();

  return (
    <Stack.Navigator screenOptions={{
        headerTintColor: Colors[colorScheme].tint,
        headerStyle:{
            backgroundColor: Colors[colorScheme].background,
        },
        headerShadowVisible: false
    }}
    >
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
            name="Recipe"
            component={RecipeScreen}
            options={{
                title: "Recipe Detail",
                headerBackTitle: "Back"
            }}
        />
        <Stack.Screen
            name="Instruction"
            component={InstructionScreen}
            options={{
                title: "Instructions",
                headerBackTitle: "Back"
            }}
        />

    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
          headerShown: false,
          tabBarStyle:{
              backgroundColor: Colors[colorScheme].background
          }
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
            tabBarShowLabel: false,
            tabBarIcon: ({color}) => <MaterialIcons name="food-bank" size={35} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <EvilIcons name="search" size={35} color={color} />,
        }}
      />
        <BottomTab.Screen
            name="Video"
            component={VideoScreen}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => <FontAwesome name="video-camera" size={24} color={color} />,
            }}
        />
        <BottomTab.Screen
            name="GuessNutrition"
            component={GuessNutritionScreen}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="nutrition" size={30} color={color} />,
            }}
        />
    </BottomTab.Navigator>
  );
}
