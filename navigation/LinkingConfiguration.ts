import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Awards: {
            screens: {
              AwardsScreen: "awards",
            },
          },
          QuizList: {
            screens: {
              QuizListScreen: "QuizList",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "profile",
            },
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
};
