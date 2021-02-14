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
      <View style={style.right}>
        <Text style={style.achievement}>46 quizes finished</Text>
        <Text style={style.achievement}>46 quizes finished</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  header: {
    backgroundColor: "#333333",
    height: 175,
    width: "100%",
    shadowColor: Colors.black,
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    zIndex: 99,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
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
