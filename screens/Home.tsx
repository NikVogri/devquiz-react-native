import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QuizList from "./QuizList";
import QuizIntro from "./QuizIntro";
import homeLinking from "./HomeLinking";
import Quiz from "./Quiz";

const Stack = createStackNavigator();

export default function Home() {
  return (
    <NavigationContainer independent={true} linking={homeLinking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="QuizList" component={QuizList} />
        <Stack.Screen name="QuizIntro" component={QuizIntro} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
