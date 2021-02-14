import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

interface StartQuizButtonProps {
  startQuiz: () => void;
  [object: string]: any;
}

const StartQuizButton = ({ startQuiz, ...props }: StartQuizButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={startQuiz}>
      <View onTouchStart={startQuiz} {...props} style={style.button}>
        <Text style={style.text}>Start Quiz</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
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

export default StartQuizButton;
