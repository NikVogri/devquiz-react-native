import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

interface StartQuizButtonProps {
  startQuiz: () => void;
}

const StartQuizButton = ({ startQuiz }: StartQuizButtonProps) => {
  return (
    <View onTouchStart={startQuiz}>
      <Text>Start Quiz</Text>
    </View>
  );
};

const style = StyleSheet.create({
  button: {},
  text: {},
});

export default StartQuizButton;
