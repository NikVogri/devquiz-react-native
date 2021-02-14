import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const AwardCard = () => {
  return (
    <View style={style.card}>
      <Image
        source={require("../assets/images/quizes/html.png")}
        style={style.image}
      />
      <Text style={style.text}>
        Completed HTML For Begginers quiz Completed HTML For Beggin Completed
        HTML For Begginers
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundPrimary,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  image: {
    borderRadius: 500,
    height: 65,
    width: 65,
    marginRight: 15,
  },
  text: {
    color: Colors.white,
    fontWeight: "500",
    maxWidth: "70%",
    textAlign: "left",
  },
});

export default AwardCard;
