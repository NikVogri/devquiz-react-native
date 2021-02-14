import * as React from "react";
import { Route, StyleSheet, Text, View, Image } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import quizList from "../quiz/list";
import StartQuizButton from "../components/StartQuizButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
      <View style={style.back}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("QuizList")}
        >
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableWithoutFeedback>
      </View>

      <Image source={quiz.image} style={style.image} />

      {/* Start quiz button */}
      <StartQuizButton
        startQuiz={() => navigation.navigate("Quiz", { id: quiz.id })}
      />
    </View>
  );
}

const style = StyleSheet.create({
  quiz: {
    backgroundColor: Colors.backgroundPrimary,
    height: "100%",
  },
  back: {
    paddingLeft: 5,
    height: "10%",
    paddingBottom: 7,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: Colors.backgroundDark,
  },
  image: {
    width: "100%",
    height: 250,
  },
});
