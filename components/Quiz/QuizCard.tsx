import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import QuizCardCompletionBar from "./QuizCardCompletionBar";
import QuizCardOverlay, { QuizOverlay } from "./QuizCardOverlay";
interface QuizCardProps {
	id: any;
	title: string;
	image: any;
	completedQuestions: number;
	totalQuestions: number;
	navigation: any;
	isCompleted: boolean;
	isLocked: boolean;
}

const QuizCard = ({
	id,
	title,
	image,
	completedQuestions,
	totalQuestions,
	isCompleted,
	navigation,
	isLocked,
}: QuizCardProps) => {
	console.log(Dimensions.get("window").width);
	return (
		<View style={style.card}>
			<TouchableWithoutFeedback onPress={() => navigation.navigate("QuizIntro", { id })}>
				{isCompleted && <QuizCardOverlay type={QuizOverlay.completed} />}

				{isLocked && <QuizCardOverlay type={QuizOverlay.locked} />}

				{!isCompleted && completedQuestions > 0 && (
					<QuizCardCompletionBar
						completedQuestions={completedQuestions}
						totalQuestions={totalQuestions}
						isCompleted={isCompleted}
					/>
				)}

				<Image style={style.image} source={image} />
				<View style={style.titleContainer}>
					<Text style={style.title}>{title}</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const style = StyleSheet.create({
	card: {
		backgroundColor: Colors.backgroundPrimary,
		borderRadius: 10,
		width: Dimensions.get("window").width <= 375 ? 150 : "45%",

		// maxHeight: 180,
		margin: 10,
		position: "relative",
		...Colors.shadow,
	},
	image: {
		width: "100%",
		height: 125,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	titleContainer: {
		paddingHorizontal: 5,
		paddingTop: 20,
		paddingBottom: 20,
	},
	title: {
		width: "100%",
		color: Colors.white,
		textAlign: "center",
	},
});

export default QuizCard;
