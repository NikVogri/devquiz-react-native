import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import * as React from "react";

import ProfileScreen from "../screens/Profile";
import AwardsScreen from "../screens/Awards";
import { BottomTabParamList } from "../types";
import { StyleSheet } from "react-native";
import Quiz from "../screens/Quiz";
import QuizIntro from "../screens/QuizIntro";
import QuizList from "../screens/QuizList";

import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="quizList"
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
        name="quizList"
        component={QuizNavigator}
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
    backgroundColor: Colors.NavbarPrimary,
    borderTopColor: Colors.borderPrimary,
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

const QuizStackNav = createStackNavigator();

function QuizNavigator() {
  return (
    <QuizStackNav.Navigator screenOptions={{ headerShown: false }}>
      <QuizStackNav.Screen name="QuizList" component={QuizList} />
      <QuizStackNav.Screen name="QuizIntro" component={QuizIntro} />
      <QuizStackNav.Screen name="Quiz" component={Quiz} />
    </QuizStackNav.Navigator>
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
