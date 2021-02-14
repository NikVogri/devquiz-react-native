import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import * as React from "react";

import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import AwardsScreen from "../screens/Awards";
import { BottomTabParamList } from "../types";
import { StyleSheet } from "react-native";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        style: style.navigation,
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="awards"
        component={AwardsNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="award" size={24} color="white" />
            ) : (
              <FontAwesome5 name="award" size={24} color="gray" />
            ),
        }}
      />

      <BottomTab.Screen
        name="home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="home" size={24} color="white" />
            ) : (
              <FontAwesome name="home" size={24} color="gray" />
            ),
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user" size={24} color="white" />
            ) : (
              <FontAwesome name="user" size={24} color="gray" />
            ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const style = StyleSheet.create({
  navigation: {
    backgroundColor: "#4F4F4F",
    borderTopColor: "#4F4F4F",
  },
});

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const Awards = createStackNavigator();

function AwardsNavigator() {
  return (
    <Awards.Navigator screenOptions={{ headerShown: false }}>
      <Awards.Screen name="Awards" component={AwardsScreen} />
    </Awards.Navigator>
  );
}

const Home = createStackNavigator();

function HomeNavigator() {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
      <Home.Screen name="Home" component={HomeScreen} />
    </Home.Navigator>
  );
}

const Profile = createStackNavigator();

function ProfileNavigator() {
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="Profile" component={ProfileScreen} />
    </Profile.Navigator>
  );
}
