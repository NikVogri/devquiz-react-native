import React, { useContext } from "react";
import { View } from "react-native";
import QuizContext from "../../context/QuizContext";
import QuizAnswers from "./QuizAnswers";
import QuizQuestion from "./QuizQuestion";

const QuizStep = () => {
  const { currentQandA, handleAnswer } = useContext(QuizContext);

  return (
    <View>
      <View>
        <QuizQuestion
          question={currentQandA.question}
          questionType={currentQandA.questionType}
        />
        <QuizAnswers answers={currentQandA.answers} nextStep={handleAnswer} />
      </View>
    </View>
  );
};

export default QuizStep;
