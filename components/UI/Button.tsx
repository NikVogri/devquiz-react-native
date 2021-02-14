import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <View onTouchStart={onClick} style={style.button}>
      <Text style={style.text}>{title}</Text>
    </View>
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

export default Button;
