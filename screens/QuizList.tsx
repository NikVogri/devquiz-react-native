import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import Main from "../components/Layout/Main";
import QuizCard from "../components/Quiz/QuizCard";
import Colors from "../constants/Colors";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";
import quizList from "../quiz/list";
import { useIsFocused } from "@react-navigation/native";

export default function QuizList({ navigation }: { navigation: any }) {
  const isFocused = useIsFocused();
  const { getAllDataKeys, getData } = useAsyncLocalStorage();
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getAllSavedQuizes();
    }
  }, [isFocused]);

  /**
   * @description Searches local storage and sets number of completed questions for card percentage completion bar
   */
  const getAllSavedQuizes = async () => {
    try {
      let dataKeys = (await getAllDataKeys()) as string[];
      dataKeys = dataKeys.filter((key) => key.match(/quiz-[1-99]/g));
      setLoading(true);

      for (const quiz of quizList) {
        quiz.completedQuestions = 0;
      }

      for (const dataKey of dataKeys) {
        const localQuizData = await getData(dataKey);
        const quizId = Number(dataKey.split("-")[1]) - 1;
        quizList[quizId].completedQuestions = localQuizData.lastCompletedStep;
      }

      setQuizes(quizList as any);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <Main>
      <ScrollView contentContainerStyle={style.quizes}>
        <Text>Loading...</Text>
      </ScrollView>
    </Main>;
  }

  return (
    <Main>
      <ScrollView contentContainerStyle={style.quizes}>
        {quizes.map((quiz: any) => (
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
    minHeight: "70%",
    flexWrap: "wrap",
    backgroundColor: Colors.backgroundDark,
  },
});
