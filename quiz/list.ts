export default [
  {
    id: 1,
    title: "CSS For Begginers",
    image: require("../assets/images/quizes/css.png"),
    completedQuestions: 0,
    totalQuestions: 4,
    questionsAndAnswers: [
      {
        id: 1,
        question: "Which of the following is not a CSS framework?",
        questionType: "text",
        answers: [
          {
            id: 1,
            answer: "Bulma",
            isCorrect: false,
          },
          {
            id: 2,
            answer: "Bootstrap",
            isCorrect: false,
          },
          {
            id: 3,
            answer: "Vue",
            isCorrect: true,
          },
        ],
      },
      {
        id: 2,
        question:
          "Property 'color' is used to change the background color of a given element.",
        questionType: "text",
        answers: [
          {
            id: 1,
            answer: "true",
            isCorrect: false,
          },
          {
            id: 2,
            answer: "false, property color changes the color of text",
            isCorrect: true,
          },
        ],
      },
      {
        id: 3,
        question:
          "What is the difference between class selectors and id selectors?",
        questionType: "text",
        answers: [
          {
            id: 1,
            answer:
              "Class selector can be re-used on multiple elements while id selector should be only used on a single element",
            isCorrect: true,
          },
          {
            id: 2,
            answer:
              "There is no difference between class selector and id selector",
            isCorrect: false,
          },
          {
            id: 3,
            answer:
              "Class selector is used in CSS while id selector is used in Javascript",
            isCorrect: false,
          },
        ],
      },
      {
        id: 4,
        question:
          "What is the difference between 'visibility: hidden' and 'display: none'?",
        questionType: "text",
        answers: [
          {
            id: 1,
            answer:
              "There is no difference between visibility: hidden and display: none.",
            isCorrect: false,
          },
          {
            id: 2,
            answer:
              "visibility: hidden hides the element, but it occupies the space, while display: none does not.",
            isCorrect: true,
          },
          {
            id: 3,
            answer:
              "display: none removes the element from the DOM, while visibility: hidden does not.",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "HTML For Begginers",
    image: require("../assets/images/quizes/html.png"),
    completedQuestions: 9,
    totalQuestions: 10,
  },
  {
    id: 3,
    title: "React For Begginers",
    image: require("../assets/images/quizes/react.png"),
    completedQuestions: 10,
    totalQuestions: 10,
  },
  {
    id: 4,
    title: "Vue For Begginers",
    image: require("../assets/images/quizes/vue.png"),
    completedQuestions: 2,
    totalQuestions: 10,
  },
  {
    id: 5,
    title: "HTTP For Begginers",
    image: require("../assets/images/quizes/https.png"),
    completedQuestions: 3,
    totalQuestions: 10,
  },
  {
    id: 6,
    title: "Javascript For Begginers",
    image: require("../assets/images/quizes/javascript.png"),
    completedQuestions: 5,
    totalQuestions: 10,
  },
];
