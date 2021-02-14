import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import calculatePercentage from "../../lib/calculatePercentage";

interface QuizCompleteProps {
  correctAnswers: number;
  totalQuestions: number;
}

const QuizComplete = ({
  correctAnswers,
  totalQuestions,
}: QuizCompleteProps) => {
  const correctAnswersPercentage = calculatePercentage(
    totalQuestions,
    correctAnswers
  );

  let resultMessage = "okay";
  if (correctAnswersPercentage === 25) {
    resultMessage = "I'm sure you can do better!";
  } else if (correctAnswersPercentage >= 25 && correctAnswersPercentage < 50) {
    resultMessage = "Better luck next time!";
  } else if (correctAnswersPercentage >= 50 && correctAnswersPercentage < 75) {
    resultMessage = "You're quite good at this!";
  } else if (correctAnswersPercentage >= 75) {
    resultMessage = "You're a natural!";
  }

  return (
    <View style={style.result}>
      <Text style={style.title}>Results:</Text>
      <Text style={style.percentage}>{correctAnswersPercentage} %</Text>
      <Text style={style.message}>{resultMessage}</Text>
      {correctAnswersPercentage === 100 && <Text>Mark Completed</Text>}
      {correctAnswersPercentage < 100 && <Text>Try Again</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  result: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    color: Colors.white,
    textAlign: "center",
  },
  percentage: {
    fontSize: 64,
    marginBottom: 25,
    color: Colors.white,
    fontWeight: "700",
  },
  message: {
    fontSize: 32,
    marginBottom: 55,
    color: Colors.white,
  },
});

export default QuizComplete;
