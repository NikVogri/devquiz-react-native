import React from "react";
import { View } from "react-native";
import { Answer } from "./QuizAnswer";
import QuizAnswers from "./QuizAnswers";
import QuizQuestion from "./QuizQuestion";

interface QuizStepProps {
  nextStep: () => void;
  question: string;
  questionType: "text" | "code";
  answers: Answer[];
}

const QuizStep = ({
  nextStep,
  question,
  questionType,
  answers,
}: QuizStepProps) => {
  return (
    <View>
      <View>
        <QuizQuestion question={question} questionType={questionType} />
        <QuizAnswers answers={answers} nextStep={nextStep} />
      </View>
    </View>
  );
};

export default QuizStep;
