import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../../constants/Colors";

const Header = () => {
  return (
    <View style={style.header}>
      <View style={style.left}>
        <Image
          style={style.image}
          source={require("../../assets/images/placeholder_award.png")}
        />
        <Text style={style.username}>Unknown Player</Text>
        <Text style={style.level}>Level 1</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundDark,
    borderBottomColor: Colors.borderPrimary,
    borderBottomWidth: 1,
    height: 175,
    width: "100%",
    zIndex: 99,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    ...Colors.shadow,
  },
  left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  right: {
    padding: 30,
  },
  image: {
    marginBottom: 10,
  },
  username: {
    color: Colors.white,
    fontSize: 23,
  },
  level: {
    color: Colors.white,
    fontSize: 16,
  },
  achievement: {
    color: Colors.white,
    marginBottom: 5,
  },
});

export default Header;
