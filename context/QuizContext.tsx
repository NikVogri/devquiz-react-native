import React, { createContext, useState } from "react";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";
import { useNavigation } from "@react-navigation/native";
import quizList from "../quiz/list";

export enum QuestionType {
  text = "text",
  code = "code",
}

export interface Question {
  id: number;
  question: string;
  questionMetadata: { type: QuestionType; language?: string };
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
  completed: boolean;
}

interface QuizContextInterface {
  handleAnswer: (answerId: number) => void;
  findQuiz: (quizId: number) => void;
  restartQuiz: () => Promise<void>;
  completeQuiz: () => Promise<void>;
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
  restartQuiz: async () => {},
  completeQuiz: async () => {},
});

export const QuizProvider = ({ children }: any) => {
  const { storeData, getData, removeData } = useAsyncLocalStorage();

  const [step, setStep] = useState(1);
  const [quiz, setQuiz] = useState<any | null>(null);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const [quizIsFinished, setQuizIsFinished] = useState(false);

  const navigation = useNavigation();

  /**
   * @description Finds a quiz by id and checks if quiz was already started previously. Sets state accordingly
   * @param quizId
   */
  const findQuiz = async (quizId: number) => {
    const foundQuiz = quizList.find((quiz) => quiz.id === quizId);

    if (foundQuiz) {
      setQuiz(foundQuiz);
      if (foundQuiz.questionsAndAnswers) {
        const localQuizData = await getData(`quiz-${foundQuiz.id}`);

        if (localQuizData) {
          const isFinished =
            localQuizData.lastCompletedStep === foundQuiz.totalQuestions;

          setStep(localQuizData.lastCompletedStep);
          setCorrectAnswers(localQuizData.correctAnswers);
          setWrongAnswers(localQuizData.wrongAnswers);
          setQuizIsFinished(isFinished);
        } else {
          setStep(0);
          setCorrectAnswers(0);
          setWrongAnswers(0);
          setQuizIsFinished(false);
        }
      }
    } else {
      // incomplete quiz - shouldn't ever happen, but if it does we're prepared
      setQuizIsFinished(false);
      setStep(0);
    }
  };

  /**
   * @description given an answerId check if the answer is correct and update both context and local storage.
   * @param answerId
   */
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

  /**
   * @description Restarts quiz by setting all values to default and removing record from local storage
   */
  const restartQuiz = async () => {
    try {
      setStep(0);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setQuizIsFinished(false);
      await removeData(`quiz-${quiz.id}`);
      navigation.navigate("Quiz", { id: quiz.id });
    } catch (err) {
      console.log(err);
    }
  };


  const completeQuiz = async () => {
    await storeData(`quiz-${quiz.id}`, {
      quizId: quiz.id,
      lastCompletedStep: step + 1,
      correctAnswers,
      wrongAnswers,
      completed: true
    });

    setQuiz((oldQuiz: Quiz) => ({
      ...oldQuiz,
      compelted: true
    }));
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
        restartQuiz,
        completeQuiz,
        step,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
