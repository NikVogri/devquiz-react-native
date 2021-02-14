import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import QuizAnswers from "../components/QuizAnswers";
import QuizCompletionBar from "../components/QuizCompletionBar";
import QuizQuestion from "../components/QuizQuestion";
import Colors from "../constants/Colors";
import quizList from "../quiz/list";

export default function Quiz({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [step, setStep] = useState(1);
  const quiz = quizList.find((quiz) => quiz.id === route.params.id);
  const { questionsAndAnswers } = quiz!;

  if (!quiz || !questionsAndAnswers) {
    return (
      <View style={style.quiz}>
        <Text>Quiz Not Found</Text>
      </View>
    );
  }

  const handleNextStep = () => {
    setStep((oldStepCount) => oldStepCount + 1);
  };

  if (step > quiz.totalQuestions) {
    return (
      <View>
        <Text>Completed</Text>
      </View>
    );
  }

  return (
    <View style={style.quiz}>
      <View style={style.close}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
          <AntDesign name="close" size={24} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <View>
        <QuizCompletionBar
          completedQuestions={step}
          totalQuestions={quiz.totalQuestions}
        />
      </View>
      <View>
        <QuizQuestion
          question={questionsAndAnswers[step - 1].question}
          type={questionsAndAnswers[step - 1].type as "text" | "code"}
        />
        <QuizAnswers
          answers={questionsAndAnswers[step - 1].answers}
          nextStep={handleNextStep}
        />
      </View>
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
