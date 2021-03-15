import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

export enum QuizOverlay {
	completed = "completed",
	locked = "locked",
}

interface QuizCardOverlayInterface {
	type: QuizOverlay;
}

const QuizCardOverlay = ({ type }: QuizCardOverlayInterface) => {
	let icon;
	switch (type) {
		case QuizOverlay.completed:
			icon = (
				<FontAwesome5
					name="check"
					size={46}
					color="#4ac47f"
					style={style.icon}
				/>
			);
			break;
		case QuizOverlay.locked:
			icon = (
				<FontAwesome5
					name="lock"
					size={46}
					color="#BDBDBD"
					style={style.icon}
				/>
			);
			break;
		default:
			icon = null;
			break;
	}

	return <View style={style.overlay}>{icon}</View>;
};

const style = StyleSheet.create({
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		height: 125,
		width: "100%",
		backgroundColor: "rgba(30, 30, 30, 0.55)",
		zIndex: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		zIndex: 20,
		...Colors.shadow,
	},
});

export default QuizCardOverlay;
