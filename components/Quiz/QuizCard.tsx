import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import QuizCardCompletionBar from "./QuizCardCompletionBar";
import { FontAwesome5 } from "@expo/vector-icons";
import QuizCardOverlay, { QuizOverlay } from "./QuizCardOverlay";
interface QuizCardProps {
	id: any;
	title: string;
	image: any;
	completedQuestions: number;
	totalQuestions: number;
	navigation: any;
	isCompleted: boolean;
}

const QuizCard = ({
	id,
	title,
	image,
	completedQuestions,
	totalQuestions,
	isCompleted,
	navigation,
}: QuizCardProps) => {
	return (
		<View style={style.card}>
			<TouchableWithoutFeedback
				onPress={() => navigation.navigate("QuizIntro", { id })}
			>
				{isCompleted && (
					<QuizCardOverlay type={QuizOverlay.completed} />
				)}

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
		width: 150,

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
