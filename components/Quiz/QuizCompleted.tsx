import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import AwardsContext, { AwardType } from "../../context/AwardsContext";
import HeartContext, { HeartUpdate } from "../../context/HeartContext";
import ModalContext from "../../context/ModalContext";
import QuizContext from "../../context/QuizContext";
import calculatePercentage from "../../lib/calculatePercentage";
import CompleteQuizButton from "../UI/CompleteQuizButton";
import RetryQuizButton from "../UI/RetryQuizButton";

import { Modal } from "../../context/ModalContext";

const QuizComplete = ({ navigation }: { navigation: any }) => {
  const { correctAnswers, quiz, restartQuiz } = useContext(QuizContext);
  const { updateHeartsCount, hearts } = useContext(HeartContext);
  const { pushLocalAward } = useContext(AwardsContext);
  const { openModal } = useContext(ModalContext);

  const correctAnswersPercentage = calculatePercentage(
    quiz.totalQuestions,
    correctAnswers
  );

  let resultMessage = "okay";
  if (correctAnswersPercentage === 25) {
    resultMessage = "I'm sure you can do better!";
  } else if (correctAnswersPercentage >= 25 && correctAnswersPercentage < 50) {
    resultMessage = "Better luck next time!";
  } else if (correctAnswersPercentage >= 50 && correctAnswersPercentage < 75) {
    resultMessage = "You're quite good at this!";
  } else if (correctAnswersPercentage >= 75) {
    resultMessage = "You're a natural!";
  }

  useEffect(() => {
    if (correctAnswersPercentage !== 100 && hearts === 0) {
      openModal(Modal.outOfHearts);
    }
  }, [correctAnswersPercentage, hearts]);

  const handleTryAgain = async () => {
    await restartQuiz();
    updateHeartsCount(HeartUpdate.remove, 1);
  };

  const handleMarkAsCompleted = async () => {
    await pushLocalAward(quiz.id, AwardType.quiz);
    navigation.navigate("QuizList");
  };

  return (
    <View style={style.result}>
      <Text style={style.title}>Results:</Text>
      <Text style={style.percentage}>{correctAnswersPercentage} %</Text>
      <Text style={style.message}>{resultMessage}</Text>
      {correctAnswersPercentage === 100 && (
        <CompleteQuizButton onPress={handleMarkAsCompleted} />
      )}
      {correctAnswersPercentage !== 100 && hearts > 0 && (
        <>
          <RetryQuizButton onPress={handleTryAgain} />
          <Text style={style.smallText}>Earn 100% to complete the quiz</Text>
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  result: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    color: Colors.white,
    textAlign: "center",
  },
  percentage: {
    fontSize: 64,
    marginBottom: 50,
    color: Colors.white,
    fontWeight: "700",
  },
  message: {
    fontSize: 32,
    marginBottom: 50,
    color: Colors.white,
  },
  smallText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 12,
  },
});

export default QuizComplete;
