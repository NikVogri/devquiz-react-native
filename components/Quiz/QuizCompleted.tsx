import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import QuizContext from "../../context/QuizContext";
import calculatePercentage from "../../lib/calculatePercentage";

const QuizComplete = ({ navigation }: { navigation: any }) => {
  const { correctAnswers, quiz, restartQuiz } = useContext(QuizContext);

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

  const handleTryAgain = async () => {
    await restartQuiz();
    navigation.navigate("QuizIntro", { id: quiz.id });
  };

  return (
    <View style={style.result}>
      <Text style={style.title}>Results:</Text>
      <Text style={style.percentage}>{correctAnswersPercentage} %</Text>
      <Text style={style.message}>{resultMessage}</Text>
      {correctAnswersPercentage < 100 && (
        <TouchableWithoutFeedback
          containerStyle={style.button}
          onPress={handleTryAgain}
        >
          <Text style={style.text}>Try Again</Text>
        </TouchableWithoutFeedback>
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
    marginBottom: 100,
    color: Colors.white,
  },
  button: {
    backgroundColor: Colors.primaryButton,
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    ...Colors.shadow,
  },
  text: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "400",
  },
});

export default QuizComplete;
