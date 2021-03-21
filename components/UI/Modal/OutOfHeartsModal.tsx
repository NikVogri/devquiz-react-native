import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Colors from "../../../constants/Colors";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import PrimaryButton from "../PrimaryButton";
import CoinContext from "../../../context/CoinContext";
import ModalContext, {
	Modal as ModalEnum,
} from "../../../context/ModalContext";
interface OutOfHeartsModalProps {
	showModal: boolean;
	closeModal: () => void;
}

const OutOfHeartsModal = ({ closeModal, showModal }: OutOfHeartsModalProps) => {
	const { openModal } = useContext(ModalContext);

	return (
		<Modal
			isVisible={showModal}
			onBackButtonPress={closeModal}
			onBackdropPress={closeModal}
		>
			<View style={style.modalInner}>
				<Text style={style.uptitle}>Oh, no!</Text>
				<View style={style.heartsContainer}>
					<FontAwesome name="heart" size={42} color="gray" />
					<FontAwesome name="heart" size={42} color="gray" />
					<FontAwesome name="heart" size={42} color="gray" />
					<FontAwesome name="heart" size={42} color="gray" />
					<FontAwesome name="heart" size={42} color="gray" />
				</View>

				<Text style={style.title}>You've ran out of hearts.</Text>

				<PrimaryButton
					onPress={() => console.log("watching video")}
					color={"#2D9CDB"}
				>
					<View style={style.btn}>
						<FontAwesome5
							name="video"
							size={14}
							color="white"
							style={style.btnIcon}
						/>
						<Text style={style.btnText}>Watch an ad</Text>
					</View>
				</PrimaryButton>

				<PrimaryButton
					onPress={() => openModal(ModalEnum.store)}
					color="#27AE60"
				>
					<View style={style.btn}>
						<FontAwesome5
							name="shopping-cart"
							size={14}
							color="white"
							style={style.btnIcon}
						/>
						<Text style={style.btnText}>Go to Store</Text>
					</View>
				</PrimaryButton>
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
	heartsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
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
		paddingVertical: 30,
		lineHeight: 30,
		textAlign: "center",
	},
	btn: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
	},
	btnText: {
		color: Colors.white,
		fontWeight: "500",
		textAlign: "center",
		fontSize: 18,
	},
	btnIcon: {
		marginRight: 5,
	},
});

export default OutOfHeartsModal;
