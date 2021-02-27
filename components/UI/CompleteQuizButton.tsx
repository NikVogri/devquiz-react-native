import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BaseButton from "./ButtonBase";
import Colors from "../../constants/Colors";

interface StartQuizButtonProps {
  onPress: () => void;
}

const CompleteQuizButton = ({ onPress }: StartQuizButtonProps) => {
  return (
    <BaseButton onPress={onPress} style={style.button}>
      <Text style={style.text}>Mark As Completed</Text>
    </BaseButton>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryButton,
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    ...Colors.shadow,
    marginBottom: 15,
  },
  text: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "400",
  },
});

export default CompleteQuizButton;
