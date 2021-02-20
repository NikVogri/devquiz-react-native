import React, { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import QuizCompleted from "../components/Quiz/QuizCompleted";
import QuizCompletionBar from "../components/Quiz/QuizCompletionBar";
import QuizStep from "../components/Quiz/QuizStep";
import Colors from "../constants/Colors";
import QuizContext from "../context/QuizContext";

export default function Quiz({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { quiz, findQuiz, step, quizIsFinished, correctAnswers } = useContext(
    QuizContext
  );

  useEffect(() => {
    const quizId = route.params.id;
    if (quizId) {
      findQuiz(quizId);
    }
  }, [route.params.id]);

  if (!quiz) {
    return (
      <View style={style.quiz}>
        <Text>Quiz Not Found</Text>
      </View>
    );
  }

  return (
    <View style={style.quiz}>
      <View style={style.close}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("QuizList")}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <View>
        <QuizCompletionBar
          completedQuestions={step}
          totalQuestions={quiz.totalQuestions}
        />
      </View>
      {!quizIsFinished && <QuizStep />}
      {quizIsFinished && (
        <QuizCompleted
          totalQuestions={quiz.totalQuestions}
          correctAnswers={correctAnswers}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  quiz: {
    backgroundColor: Colors.backgroundDark,
    paddingHorizontal: 10,
    height: "100%",
  },
  close: {
    paddingLeft: 5,
    height: "10%",
    paddingBottom: 7,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: Colors.backgroundDark,
  },
});
