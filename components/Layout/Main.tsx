import React, { useContext } from "react";
import { View } from "react-native";
import ModalContext, { Modal } from "../../context/ModalContext";
import NotEnoughCoinsModal from "../UI/Modal/NotEnoughCoins";
import OutOfHeartsModal from "../UI/Modal/OutOfHeartsModal";
import QuizCompletedModal from "../UI/Modal/QuizCompletedModal";
import StoreModal from "../UI/Modal/StoreModal";
import Header from "./Header";

const Main = ({ children, ...props }: { children: any }) => {
	const { closeModal, modal, showModal } = useContext(ModalContext);

	return (
		<View {...props}>
			<Header />
			{children}
			{modal === Modal.outOfHearts && (
				<OutOfHeartsModal
					closeModal={closeModal}
					showModal={showModal}
				/>
			)}
			{modal === Modal.store && (
				<StoreModal closeModal={closeModal} showModal={showModal} />
			)}
			{modal === Modal.notEnoughCoins && (
				<NotEnoughCoinsModal
					closeModal={closeModal}
					showModal={showModal}
				/>
			)}
			{modal === Modal.quizCompleted && (
				<QuizCompletedModal
					closeModal={closeModal}
					showModal={showModal}
				/>
			)}
		</View>
	);
};

export default Main;
