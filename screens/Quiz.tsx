import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import QuizCompleted from "../components/Quiz/QuizCompleted";
import QuizCompletionBar from "../components/Quiz/QuizCompletionBar";
import QuizStep from "../components/Quiz/QuizStep";
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
  const { questionsAndAnswers, totalQuestions } = quiz!;

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
          completedQuestions={step > totalQuestions ? step - 1 : step}
          totalQuestions={totalQuestions}
        />
      </View>
      {step <= quiz.totalQuestions && (
        <QuizStep
          answers={questionsAndAnswers[step - 1].answers}
          nextStep={handleNextStep}
          question={questionsAndAnswers[step - 1].question}
          questionType={
            questionsAndAnswers[step - 1].questionType as "text" | "code"
          }
        />
      )}
      {step > quiz.totalQuestions && (
        <QuizCompleted totalQuestions={totalQuestions} correctAnswers={4} />
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
