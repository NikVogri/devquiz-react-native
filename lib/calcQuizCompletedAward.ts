import { AWARD_MULTIPLICATOR } from "../constants/Constants";

export const calcQuizCompletedAward = (quizTier: number, questionsCount: number): number => {
	return Math.ceil(Math.round((AWARD_MULTIPLICATOR * quizTier + (questionsCount * 1.5)) / 1.5) / 10) * 10;
};
