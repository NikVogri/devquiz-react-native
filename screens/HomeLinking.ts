import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "QuizList",
            },
          },
          QuizIntro: {
            screens: {
              QuizIntroScreen: "QuizIntro",
            },
          },
          Quiz: {
            screens: {
              QuizScreen: "Quiz",
            },
          },
        },
        NotFound: "*",
      },
    },
  },
};
