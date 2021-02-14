import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import QuizList from "./QuizList";

const Stack = createStackNavigator();

export default function Home({ navigation }: { navigation: any }) {
  return <QuizList navigation={navigation} />;
}
