import React, { useContext, useEffect } from "react";
import { Route, StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { Entypo, Foundation, Ionicons } from "@expo/vector-icons";
import StartQuizButton from "../components/UI/StartQuizButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import QuizContext from "../context/QuizContext";
import HeartContext from "../context/HeartContext";

export default function QuizIntro({
  navigation,
  route,
}: {
  navigation: any;
  route: Route;
}) {
  const { quiz, findQuiz, step } = useContext(QuizContext);
  const { hearts } = useContext(HeartContext);

  useEffect(() => {
    const quizId = route.params.id;
    if (quizId) {
      findQuiz(quizId);
    }
  }, [route.params.id]);

  if (!quiz) {
    return (
      <View style={style.quiz}>
        <Text>Quiz Not Found</Text>
      </View>
    );
  }

  return (
    <View style={style.quiz}>
      <View style={style.back}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("QuizList")}
        >
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <Image source={quiz.image} style={style.image} />
      <View style={style.info}>
        <Text style={style.title}>{quiz.title}</Text>
        <Text style={style.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi
          eligendi modi quis quia odit assumenda cupiditate itaque.
        </Text>
        {hearts > 0 && (
          <StartQuizButton
            isStarted={step > 0}
            startQuiz={() => navigation.navigate("Quiz", { id: quiz!.id })}
          />
        )}

        {/* todo
          - EXTRACT INTO SEPERATE COMPONENT
          - ADD LOGIC TO WATCH VIDEO
        */}
        {hearts === 0 && (
          <View>
            <TouchableWithoutFeedback
              onPress={() => console.log("show video window")}
              style={style.watchVideoButton}
            >
              <Text style={style.watchVideoButtonText}>
                Watch a short ad to refill you hearts{" "}
              </Text>
              <Entypo name="video" size={24} color="white" />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  quiz: {
    backgroundColor: Colors.backgroundDark,
    height: "100%",
  },
  back: {
    paddingLeft: 5,
    height: "10%",
    paddingBottom: 7,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: Colors.backgroundDark,
  },
  image: {
    width: "100%",
    height: 200,
  },
  info: {
    padding: 20,
    height: Dimensions.get("window").height - 305,
  },
  title: {
    textAlign: "left",
    color: Colors.white,
    fontWeight: "700",
    fontSize: 32,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: Colors.white,
    lineHeight: 25,
    marginBottom: 20,
  },
  additional: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.white,
    lineHeight: 25,
  },
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
    marginRight: 5,
  },
});
