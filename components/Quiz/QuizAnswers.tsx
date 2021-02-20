import React from "react";
import { View } from "react-native";
import QuizAnswer, { Answer } from "./QuizAnswer";

interface QuizAnswersProps {
  answers: Answer[];
  nextStep: (answerId: number) => void;
}

const QuizAnswers = ({ answers, nextStep }: QuizAnswersProps) => {
  return (
    <View>
      {answers.map((answer) => (
        <QuizAnswer
          key={answer.id}
          {...answer}
          nextStep={() => nextStep(answer.id)}
        />
      ))}
    </View>
  );
};

export default QuizAnswers;
