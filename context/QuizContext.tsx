import React, { createContext, useState } from "react";
import quizList from "../quiz/list";

export enum QuestionType {
  text = "text",
  code = "code",
}

export interface Question {
  id: number;
  question: string;
  questionType: QuestionType;
}

export interface Answer {
  id: number;
  answer: string;
  isCorrect: boolean;
}

export interface QuestionsAndAnswers extends Question {
  answers: Answer[];
}

// TODO: make it compatible with JSON schema
export interface Quiz {
  id: number;
  title: string;
  image: any;
  completedQuestions: number;
  totalQuestions: number;
  questionsAndAnswers: QuestionsAndAnswers[];
}

interface QuizContextInterface {
  handleAnswer: (answerId: number) => void;
  findQuiz: (quizId: number) => void;
  quiz: Quiz;
  step: number;
  quizIsFinished: boolean;
  correctAnswers: number;
  wrongAnswers: number;
  currentQandA: QuestionsAndAnswers;
}
const QuizContext = createContext<QuizContextInterface>({
  quiz: {
    completedQuestions: 0,
    id: 0,
    image: "",
    questionsAndAnswers: [],
    title: "",
    totalQuestions: 0,
  },
  step: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  currentQandA: {
    answers: [],
    id: 0,
    question: "",
    questionType: QuestionType.text,
  },
  quizIsFinished: false,
  handleAnswer: () => {},
  findQuiz: () => {},
});

export const QuizProvider = ({ children }: any) => {
  const [step, setStep] = useState(1);
  const [quiz, setQuiz] = useState<any | null>(null);

  const [currentQandA, setCurrentQandA] = useState<QuestionsAndAnswers>({
    answers: [],
    id: 0,
    question: "",
    questionType: QuestionType.text,
  });
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const [quizIsFinished, setQuizIsFinished] = useState(false);

  const findQuiz = (quizId: number) => {
    const foundQuiz = quizList.find((quiz) => quiz.id === quizId);
    setQuizIsFinished(false);

    if (foundQuiz && foundQuiz.questionsAndAnswers) {
      setQuiz(foundQuiz);
      setCurrentQandA(foundQuiz.questionsAndAnswers[0] as any);
      setStep(0);
      setCorrectAnswers(0);
      setWrongAnswers(0);
    } else {
      setQuiz(null);
      setCurrentQandA({
        answers: [],
        id: 0,
        question: "",
        questionType: QuestionType.text,
      });
    }
  };

  const handleAnswer = (answerId: number) => {
    const answer = currentQandA.answers.find(
      (answer: Answer) => answer.id === answerId
    );

    if (answer?.isCorrect) {
      setCorrectAnswers((prevCorrectCount: number) => prevCorrectCount + 1);
    } else {
      setWrongAnswers((prevWrongCount: number) => prevWrongCount + 1);
    }

    const nextStep = step + 1;

    if (nextStep === quiz.totalQuestions) {
      setStep(nextStep);
      return setQuizIsFinished(true);
    }

    setCurrentQandA(quiz.questionsAndAnswers[nextStep]);
    setStep(nextStep);
  };

  return (
    <QuizContext.Provider
      value={{
        handleAnswer,
        wrongAnswers,
        currentQandA,
        findQuiz,
        quiz,
        correctAnswers,
        quizIsFinished,
        step,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
