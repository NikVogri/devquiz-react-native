import * as React from "react";
import { Route, StyleSheet, Text, View, Image } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import quizList from "../quiz/list";
import StartQuizButton from "../components/StartQuizButton";

export default function QuizIntro({
  navigation,
  route,
}: {
  navigation: any;
  route: Route;
}) {
  const quiz = quizList.find((quiz) => quiz.id === route.params.id);

  if (!quiz) {
    return (
      <View style={style.quiz}>
        <Text>Quiz Not Found</Text>
      </View>
    );
  }

  return (
    <View style={style.quiz}>
      <View
        style={style.back}
        onTouchStart={() => navigation.navigate("QuizList")}
      >
        <Ionicons name="chevron-back" size={32} color="white" />
      </View>
      <Image source={quiz.image} style={style.image} />

      {/* Start quiz button */}
      <StartQuizButton
        startQuiz={navigation.navigate("Quiz", { id: quiz.id })}
      />
    </View>
  );
}

const style = StyleSheet.create({
  quiz: {
    backgroundColor: Colors.backgroundPrimary,
  },
  back: {
    height: "15%",
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10,
    // width: "20%",
    backgroundColor: Colors.backgroundDark,
    zIndex: 99,
  },
  image: {
    width: "100%",
    height: "50%",
  },
});
