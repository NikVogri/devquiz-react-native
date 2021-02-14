import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import QuizCardCompletionBar from "./QuizCardCompletionBar";

interface QuizCardProps {
  id: any;
  title: string;
  image: any;
  completedQuestions: number;
  totalQuestions: number;
  navigation: any;
}

const QuizCard = ({
  id,
  title,
  image,
  completedQuestions,
  totalQuestions,
  navigation,
}: QuizCardProps) => {
  return (
    <View
      style={style.card}
      onTouchStart={() => navigation.navigate("QuizIntro", { id })}
    >
      {completedQuestions > 0 && (
        <QuizCardCompletionBar
          completedQuestions={completedQuestions}
          totalQuestions={totalQuestions}
        />
      )}
      <Image style={style.image} source={image} />
      <View style={style.titleContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    backgroundColor: "#333333",
    borderRadius: 10,
    width: "43%",
    // maxHeight: 180,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    position: "relative",
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleContainer: {
    paddingHorizontal: 5,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    width: "100%",
    color: "#fff",
    textAlign: "center",
  },
});

export default QuizCard;
