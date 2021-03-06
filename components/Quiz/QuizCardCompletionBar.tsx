import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

interface QuizCardCompletionBarProps {
  completedQuestions: number;
  totalQuestions: number;
  isCompleted: boolean;
}

const QuizCardCompletionBar = ({
  completedQuestions,
  totalQuestions,
}: QuizCardCompletionBarProps) => {
  let barColor;
  const completionPercentage = Math.floor(
    (completedQuestions / totalQuestions) * 100
  );

  if (completionPercentage === 0) {
    barColor = Colors.completionBarBackground;
  } else if (completionPercentage >= 50 && completionPercentage < 100) {
    barColor = Colors.mediumCompletionBackground;
  } else if (completionPercentage < 50 && completionPercentage > 0) {
    barColor = Colors.lowCompletionBackground;
  } else if (completionPercentage === 100) {
    barColor = Colors.completedBackground;
  }

  return (
    <View style={style.bar}>
      <View
        style={{
          ...style.completeBar,
          backgroundColor: barColor,
          width: `${completionPercentage}%`,
        }}
      >
          <Text style={style.text}>{completionPercentage}%</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  bar: {
    backgroundColor: Colors.completionBarBackground,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    top: 0,
    zIndex: 99,
    overflow: "hidden",
  },
  completeBar: {
    borderTopLeftRadius: 10,
    minWidth: 40,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
    padding: 2,
  },
});

export default QuizCardCompletionBar;
