import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

const PrimaryButton = ({ title, onPress }: PrimaryButtonProps) => {
  return (
    <BaseButton style={style.button} onPress={onPress}>
      <Text style={style.text}>{title}</Text>
    </BaseButton>
  );
};

const style = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundPrimary,
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 15,
  },
  text: {
    color: Colors.white,
    fontWeight: "500",
    fontSize: 35,
    textAlign: "center",
    width: "100%",
  },
});

export default PrimaryButton;
