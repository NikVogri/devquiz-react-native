import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

interface QuizQuestionProps {
  question: string;
  type: "code" | "text";
}

const QuizQuestion = ({ question, type }: QuizQuestionProps) => {
  return (
    <View style={style.question}>
      <Text style={style.text}>{question}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  question: {
    padding: 25,
    width: "100%",
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 10,
    minHeight: "30%",
  },
  text: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default QuizQuestion;
