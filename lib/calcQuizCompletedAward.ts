import { AWARD_MULTIPLICATOR, MAX_AWARD } from "../constants/Constants";

export const calcQuizCompletedAward = (quizTier: number): number => {
	const calculatedAward = Math.round((AWARD_MULTIPLICATOR * quizTier) / 1.5);
	return calculatedAward > MAX_AWARD ? 60 : calculatedAward;
};
