import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import BaseButton from "./ButtonBase";

interface ButtonProps {
  onPress: () => void;
  children?: unknown;
}

const RetryQuizButton = ({ onPress }: ButtonProps) => {
  return (
    <BaseButton onPress={onPress} style={style.button}>
      <View style={style.buttonInner}>
        <Text style={style.text}>Try Again</Text>
        <FontAwesome
          name="heart"
          size={32}
          color="#EE3939"
          style={style.icon}
        />
      </View>
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
  buttonInner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    paddingLeft: 5,
  },
  text: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "400",
  },
});

export default RetryQuizButton;
