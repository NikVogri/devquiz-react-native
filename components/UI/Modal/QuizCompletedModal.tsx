import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Colors from "../../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import ButtonBase from "../ButtonBase";
import QuizContext from "../../../context/QuizContext";
import { calcQuizCompletedAward } from "../../../lib/calcQuizCompletedAward";
import CoinContext, { Coins } from "../../../context/CoinContext";

interface QuizCompletedModalProps {
	showModal: boolean;
	closeModal: () => void;
}

const QuizCompletedModal = ({
	closeModal,
	showModal,
}: QuizCompletedModalProps) => {
	const { quiz } = useContext(QuizContext);
	const { updateCoins } = useContext(CoinContext);

	const handleClaimCoins = () => {
		const quizCompletedAward = calcQuizCompletedAward(
			quiz.tier,
			quiz.questionsAndAnswers.length
		);
		updateCoins(Coins.add, quizCompletedAward);
		closeModal();
	};

	return (
		<Modal
			isVisible={showModal}
			onBackButtonPress={closeModal}
			onBackdropPress={closeModal}
		>
			<View style={style.modalInner}>
				<Text style={style.uptitle}>
					Congrats! You've finished {quiz.title}
				</Text>
				<FontAwesome5
					name="check"
					size={62}
					color="green"
					style={style.coins}
				/>

				<Text style={style.title}>
					You've been awarded{" "}
					{calcQuizCompletedAward(
						quiz.tier,
						quiz.questionsAndAnswers.length
					)}{" "}
					<FontAwesome5
						name="coins"
						size={18}
						color="gold"
						style={style.coins}
					/>
				</Text>

				<ButtonBase onPress={handleClaimCoins} style={style.btn}>
					<Text style={style.btnText}>Claim Coins</Text>
				</ButtonBase>
			</View>
		</Modal>
	);
};

const style = StyleSheet.create({
	modalInner: {
		backgroundColor: Colors.backgroundDark,
		width: "100%",
		marginLeft: "auto",
		marginRight: "auto",
		padding: 20,
		borderRadius: 10,
	},
	coins: {
		marginHorizontal: "auto",
		textAlign: "center",
	},
	uptitle: {
		fontSize: 26,
		color: Colors.white,
		paddingVertical: 30,
		lineHeight: 30,
		textAlign: "center",
	},
	title: {
		fontSize: 18,
		color: Colors.white,
		paddingTop: 10,
		paddingBottom: 30,
		lineHeight: 30,
		textAlign: "center",
	},
	btn: {
		backgroundColor: Colors.primaryButton,
		borderRadius: 10,
		paddingVertical: 15,
		width: "100%",
		...Colors.shadow,
		marginBottom: 15,
	},
	btnText: {
		color: Colors.white,
		textAlign: "center",
		fontSize: 24,
		fontWeight: "400",
	},
	btnIcon: {
		marginRight: 5,
	},
});

export default QuizCompletedModal;
