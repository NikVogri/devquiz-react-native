import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import BaseButton from "./ButtonBase";
import Colors from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

interface PurchaseQuizButtonProps {
	onPress: () => void;
	price: number;
	loading?: boolean;
}

const PurchaseQuizButton = ({
	onPress,
	price,
	loading,
}: PurchaseQuizButtonProps) => {
	return (
		<BaseButton onPress={onPress} style={style.button}>
			<Text style={style.text}>
				Purchase Quiz ( {price}{" "}
				<FontAwesome5 name="coins" size={16} color="white" /> )
			</Text>
		</BaseButton>
	);
};

const style = StyleSheet.create({
	button: {
		backgroundColor: "#2F80ED",
		borderRadius: 10,
		paddingVertical: 15,
		width: "100%",
		...Colors.shadow,
		marginBottom: 15,
	},
	text: {
		color: Colors.white,
		textAlign: "center",
		fontSize: 24,
		fontWeight: "400",
		display: "flex",
		alignItems: "center",
	},
});

export default PurchaseQuizButton;
