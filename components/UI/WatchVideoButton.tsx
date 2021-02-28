import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import BaseButton from "./ButtonBase";

interface WatchVideoButtonProps {
  onPress: () => void;
  children?: unknown;
}

const WatchVideoButton = ({ onPress }: WatchVideoButtonProps) => {
  return (
    <BaseButton onPress={onPress}>
      <View style={style.watchVideoButton}>
        <Text style={style.watchVideoButtonText}>Watch a short ad</Text>
        <Entypo name="video" size={24} color="white" />
      </View>
    </BaseButton>
  );
};

const style = StyleSheet.create({
  watchVideoButton: {
    backgroundColor: "#2F80ED",
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    ...Colors.shadow,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  watchVideoButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    marginRight: 10,
  },
});

export default WatchVideoButton;
