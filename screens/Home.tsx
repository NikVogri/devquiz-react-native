import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QuizList from "./QuizList";
import QuizIntro from "./QuizIntro";
import Quiz from "./Quiz";

const Stack = createStackNavigator();

export default function Home({ navigation }: { navigation: any }) {
  return <QuizList navigation={navigation} />;
}
