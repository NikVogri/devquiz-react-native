import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

interface RestartQuizButtonProps {
  onPress: () => void;
  [object: string]: any;
}

const RestartQuizButton = ({ onPress, ...props }: RestartQuizButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View {...props} style={style.button}>
        <Text style={style.text}>Restart Quiz</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: "#2F80ED",
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

export default RestartQuizButton;
