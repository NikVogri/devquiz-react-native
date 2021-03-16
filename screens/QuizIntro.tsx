import React, { useContext, useEffect, useState } from "react";
import { Route, StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import StartQuizButton from "../components/UI/StartQuizButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import QuizContext from "../context/QuizContext";
import HeartContext from "../context/HeartContext";
import WatchVideoButton from "../components/UI/WatchVideoButton";
import RestartQuizButton from "../components/UI/RestartQuizButton";
import PurchaseQuizButton from "../components/UI/PurchaseQuizButton";
import CoinContext, { Coins } from "../context/CoinContext";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";
import { showPromptNotification } from "../lib/showNotification";
import ModalContext, { Modal } from "../context/ModalContext";

export default function QuizIntro({
	navigation,
	route,
}: {
	navigation: any;
	route: Route;
}) {
	const { quiz, findQuiz, step, restartQuiz } = useContext(QuizContext);
	const { hearts } = useContext(HeartContext);
	const { userHasEnoughCoins, updateCoins, coins } = useContext(CoinContext);
	const { openModal } = useContext(ModalContext);

	const [loading, setLoading] = useState(false);

	const { pushData, getData } = useAsyncLocalStorage();

	useEffect(() => {
		const quizId = route.params.id;
		if (quizId) {
			findQuiz(quizId);
		}
	}, [route.params.id]);

	const handlePurchaseQuiz = async () => {
		try {
			setLoading(true);
			if (!userHasEnoughCoins(quiz.lockedPrice as number)) {
				openModal(Modal.notEnoughCoins); // display not enough coins modal
				setLoading(false);
				return;
			}
			const purchasedQuizes: number[] = await getData(`purchased-quizes`);
			if (
				!purchasedQuizes?.some((quizId: number) => quizId === quiz.id)
			) {
				showPromptNotification({
					title: `Purchase: ${quiz.title} Quiz`,
					text: `You're going to pay ${quiz.lockedPrice} coins to unlock this quiz you still have ${coins} coins. Continue?`,
					cancelable: true,
					onConfirm: async () => {
						await pushData(`purchased-quizes`, quiz.id);
						updateCoins(Coins.purchase_quiz);
						await findQuiz(route.params.id);
						setLoading(false);
					},
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	if (!quiz) {
		return (
			<View style={style.quiz}>
				<Text>Quiz Not Found</Text>
			</View>
		);
	}

	let button;
	switch (true) {
		case quiz.locked:
			button = (
				<PurchaseQuizButton
					onPress={handlePurchaseQuiz}
					price={quiz.lockedPrice as number}
					loading={loading}
				/>
			);
			break;

		case hearts > 0 && !quiz.completed && !quiz.locked:
			button = (
				<StartQuizButton
					isStarted={step > 0}
					startQuiz={() =>
						navigation.navigate("Quiz", { id: quiz!.id })
					}
				/>
			);
			break;

		case hearts > 0 && quiz.completed:
			button = <RestartQuizButton onPress={restartQuiz} />;
			break;
		case hearts === 0:
			/* todo
          - EXTRACT INTO SEPERATE COMPONENT
          - ADD LOGIC TO WATCH VIDEO
        */
			button = (
				<WatchVideoButton
					onPress={() => console.log("show video window")}
				/>
			);
			break;

		default:
			break;
	}

	return (
		<View style={style.quiz}>
			<View style={style.back}>
				<TouchableWithoutFeedback
					onPress={() => navigation.navigate("QuizList")}
				>
					<Ionicons name="chevron-back" size={32} color="white" />
				</TouchableWithoutFeedback>
			</View>
			<Image source={quiz.image} style={style.image} />
			<View style={style.info}>
				<Text style={style.title}>{quiz.title}</Text>
				<Text style={style.description}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
					commodi eligendi modi quis quia odit assumenda cupiditate
					itaque.
				</Text>
				{button}
			</View>
		</View>
	);
}

const style = StyleSheet.create({
	quiz: {
		backgroundColor: Colors.backgroundDark,
		height: "100%",
	},
	back: {
		paddingLeft: 5,
		height: "10%",
		paddingBottom: 7,
		display: "flex",
		justifyContent: "flex-end",
		backgroundColor: Colors.backgroundDark,
	},
	image: {
		width: "100%",
		height: "40%",
	},
	info: {
		padding: 20,
		height: Dimensions.get("window").height - 305,
	},
	title: {
		textAlign: "left",
		color: Colors.white,
		fontWeight: "700",
		fontSize: 32,
		marginBottom: 10,
	},
	description: {
		fontSize: 18,
		color: Colors.white,
		lineHeight: 25,
		marginBottom: 20,
	},
	additional: {
		fontSize: 20,
		fontWeight: "500",
		color: Colors.white,
		lineHeight: 25,
	},
});
