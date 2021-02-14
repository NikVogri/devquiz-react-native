import React from "react";
import { View } from "react-native";
import QuizAnswer, { Answer } from "./QuizAnswer";

interface QuizAnswersProps {
  answers: Answer[];
  nextStep: () => void;
}

const QuizAnswers = ({ answers, nextStep }: QuizAnswersProps) => {
  return (
    <View>
      {answers.map((answer) => (
        <QuizAnswer key={answer.id} {...answer} nextStep={nextStep} />
      ))}
    </View>
  );
};

export default QuizAnswers;
