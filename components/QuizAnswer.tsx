import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

export interface Answer {
  id: any;
  answer: string;
  isCorrect: boolean;
}

interface QuizAnswerProps extends Answer {
  nextStep: () => void;
}

const QuizAnswer = ({ answer, isCorrect, id, nextStep }: QuizAnswerProps) => {
  return (
    <TouchableNativeFeedback onPress={nextStep}>
      <View style={style.answer}>
        <Text style={style.text}>{answer}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const style = StyleSheet.create({
  answer: {
    padding: 25,
    width: "100%",
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default QuizAnswer;
