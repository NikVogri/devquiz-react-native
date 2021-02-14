import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Main from "../components/Layout/Main";
import QuizCard from "../components/QuizCard";
import quizList from "../quiz/list";

export default function QuizList({ navigation }: { navigation: any }) {
  return (
    <Main>
      <ScrollView contentContainerStyle={style.quizes}>
        {quizList.map((quiz: any) => (
          <QuizCard
            id={quiz.id}
            navigation={navigation}
            image={quiz.image}
            title={quiz.title}
            completedQuestions={quiz.completedQuestions}
            totalQuestions={quiz.totalQuestions}
            key={quiz.id}
          />
        ))}
      </ScrollView>
    </Main>
  );
}

const style = StyleSheet.create({
  quizes: {
    paddingTop: 5,
    paddingBottom: 180,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#5A5A5A",
  },
});
