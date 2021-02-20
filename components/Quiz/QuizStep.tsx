import React, { useContext } from "react";
import { View } from "react-native";
import QuizContext from "../../context/QuizContext";
import QuizAnswers from "./QuizAnswers";
import QuizQuestion from "./QuizQuestion";

const QuizStep = () => {
  const { handleAnswer, step, quiz } = useContext(QuizContext);
  return (
    <View>
      <View>
        <QuizQuestion
          question={quiz.questionsAndAnswers[step].question}
          questionType={quiz.questionsAndAnswers[step].questionType}
        />
        <QuizAnswers
          answers={quiz.questionsAndAnswers[step].answers}
          nextStep={handleAnswer}
        />
      </View>
    </View>
  );
};

export default QuizStep;
