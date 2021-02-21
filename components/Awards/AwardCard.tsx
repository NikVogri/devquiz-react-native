import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

interface AwardCard {
  id?: number;
  quizId?: number;
  text: string;
  image: any;
  date: Date;
}

const AwardCard = ({ text, image }: AwardCard) => {
  return (
    <View style={style.card}>
      <Image source={image} style={style.image} />
      <Text style={style.text}>{text}</Text>
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
