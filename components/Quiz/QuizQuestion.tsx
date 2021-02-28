import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { QuestionType } from "../../context/QuizContext";
// @ts-ignore
import SyntaxHighlighter from "react-native-syntax-highlighter";
// @ts-ignore
import { atomOneDark } from "react-syntax-highlighter/styles/hljs";

interface QuizQuestionProps {
  question: string;
  questionMetadata: { type: QuestionType; language?: string };
}

const QuizQuestion = ({ question, questionMetadata }: QuizQuestionProps) => {
  return (
    <View style={style.question}>
      {questionMetadata.type === QuestionType.text && (
        <Text style={style.text}>{question}</Text>
      )}
      {questionMetadata.type === QuestionType.code && (
        <SyntaxHighlighter
          customStyle={{
            margin: 0,
            padding: 10,
            paddingLeft: 0,
            backgroundColor: Colors.backgroundPrimary,
          }}
          language={questionMetadata.language}
          style={atomOneDark}
          highlighter={"hljs"}
        >
          {question}
        </SyntaxHighlighter>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  question: {
    padding: 15,
    width: "100%",
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 10,
    minHeight: "30%",
  },
  text: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default QuizQuestion;
