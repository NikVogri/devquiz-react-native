import React, { useContext } from "react";

import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import QuizContext from "../../context/QuizContext";
import calculatePercentage from "../../lib/calculatePercentage";

const QuizCompletionBar = () => {
  const { wrongAnswers, correctAnswers, quiz, quizIsFinished } = useContext(
    QuizContext
  );
  let barColor;

  const totalAnswers = wrongAnswers + correctAnswers;
  const completionPercentage = calculatePercentage(
    quiz.totalQuestions,
    totalAnswers
  );

  if (completionPercentage === 0) {
    barColor = Colors.completionBarBackground;
  } else if (completionPercentage >= 50 && completionPercentage < 100) {
    barColor = Colors.mediumCompletionBackground;
  } else if (completionPercentage < 50 && completionPercentage > 0) {
    barColor = Colors.lowCompletionBackground;
  } else if (quizIsFinished) {
    barColor = Colors.completedBackground;
  }

  return (
    <View style={style.emptyBar}>
      <View
        style={{
          ...style.completeBar,
          width: `${completionPercentage}%`,
          backgroundColor: barColor,
        }}
      ></View>
    </View>
  );
};

const style = StyleSheet.create({
  emptyBar: {
    backgroundColor: Colors.completionBarBackground,
    width: "100%",
    height: 20,
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 15,
    position: "relative",
  },
  completeBar: {
    position: "absolute",
    zIndex: 99,
    height: "100%",
  },
});

export default QuizCompletionBar;
