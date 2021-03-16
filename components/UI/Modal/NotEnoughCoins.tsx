import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Colors from "../../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import ButtonBase from "../ButtonBase";
import ModalContext from "../../../context/ModalContext";
import { Modal as ModalEnum } from "../../../context/ModalContext";

interface NotEnoughCoinsModalProps {
	showModal: boolean;
	closeModal: () => void;
}

const NotEnoughCoinsModal = ({
	closeModal,
	showModal,
}: NotEnoughCoinsModalProps) => {
	const { openModal } = useContext(ModalContext);

	const handleVisitStore = () => {
		closeModal();
		openModal(ModalEnum.store);
	};

	return (
		<Modal
			isVisible={showModal}
			onBackButtonPress={closeModal}
			onDismiss={closeModal}
			onBackdropPress={closeModal}
		>
			<View style={style.modalInner}>
				<Text style={style.uptitle}>Oh, no!</Text>
				<FontAwesome5
					name="coins"
					size={42}
					color="gold"
					style={style.coins}
				/>

				<Text style={style.title}>
					You don't have enough coins to continue!
				</Text>

				<ButtonBase onPress={handleVisitStore} style={style.btn}>
					<Text style={style.btnText}>Visit Store</Text>
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
		paddingTop: 20,
		marginHorizontal: "auto",
		textAlign: "center",
	},
	uptitle: {
		fontSize: 42,
		color: Colors.white,
		paddingVertical: 30,
		lineHeight: 30,
		textAlign: "center",
	},
	title: {
		fontSize: 24,
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

export default NotEnoughCoinsModal;
