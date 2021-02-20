import React, { createContext, useState } from "react";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";
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
  quizIsFinished: false,
  handleAnswer: () => {},
  findQuiz: () => {},
});

export const QuizProvider = ({ children }: any) => {
  const { storeData, getData } = useAsyncLocalStorage();

  const [step, setStep] = useState(1);
  const [quiz, setQuiz] = useState<any | null>(null);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const [quizIsFinished, setQuizIsFinished] = useState(false);

  const findQuiz = async (quizId: number) => {
    const foundQuiz = quizList.find((quiz) => quiz.id === quizId);

    if (foundQuiz) {
      setQuiz(foundQuiz);
      if (foundQuiz.questionsAndAnswers) {
        const localQuizData = await getData(`quiz-${foundQuiz.id}`);
        if (localQuizData) {
          setStep(localQuizData.lastCompletedStep);
          setCorrectAnswers(localQuizData.correctAnswers);
          setWrongAnswers(localQuizData.wrongAnswers);
          setQuizIsFinished(
            localQuizData.lastCompletedStep === foundQuiz.totalQuestions
          );
        } else {
          setStep(0);
          setCorrectAnswers(0);
          setWrongAnswers(0);
          setQuizIsFinished(false);
        }
      }
    } else {
      setQuizIsFinished(false);
      setStep(0);
    }
  };

  const handleAnswer = async (answerId: number) => {
    const answer = quiz.questionsAndAnswers[step].answers.find(
      (answer: Answer) => answer.id === answerId
    );

    if (answer?.isCorrect) {
      setCorrectAnswers((prevCorrectCount: number) => prevCorrectCount + 1);
      await storeData(`quiz-${quiz.id}`, {
        quizId: quiz.id,
        lastCompletedStep: step + 1,
        correctAnswers: correctAnswers + 1,
        wrongAnswers: wrongAnswers,
      });
    } else {
      setWrongAnswers((prevWrongCount: number) => prevWrongCount + 1);
      await storeData(`quiz-${quiz.id}`, {
        quizId: quiz.id,
        lastCompletedStep: step + 1,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers + 1,
      });
    }

    const nextStep = step + 1;

    if (nextStep === quiz.totalQuestions) {
      return setQuizIsFinished(true);
    }

    setStep(nextStep);
  };

  return (
    <QuizContext.Provider
      value={{
        handleAnswer,
        wrongAnswers,
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
