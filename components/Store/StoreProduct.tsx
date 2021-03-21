import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../../constants/Colors";
import PrimaryButton from "../UI/PrimaryButton";
import { Currency, Product, ProductType } from "../../store/store";
import { convertFromCents } from "../../lib/convertFromCents";
import { FontAwesome5 } from "@expo/vector-icons";
import CoinContext, { Coins } from "../../context/CoinContext";
import HeartContext from "../../context/HeartContext";
import { MAX_HEARTS } from "../../constants/Constants";

interface StoreProduct extends Product {}

const StoreProduct = ({
	title,
	price,
	image,
	description,
	currency,
	type,
}: StoreProduct) => {
	const { updateCoins, userHasEnoughCoins } = useContext(CoinContext);
	const { refillHearts, hearts } = useContext(HeartContext);

	const handleCoinsPurchase = async (type: ProductType, price: number) => {
		switch (type) {
			case ProductType.refill_hearts:
				updateCoins(Coins.subtract, price);
				await refillHearts();
				break;

			default:
				return;
		}
	};

	const handleUsdPurchase = async (type: ProductType, price: number) => {
		switch (type) {
			case ProductType.purchase_gold_coins:
				console.log("Purchase window opening");
				await updateCoins(Coins.add, price);
				break;

			default:
				return;
		}
	};

	return (
		<View style={style.storeProduct}>
			<Image source={image} style={style.image} />
			<View style={style.storeProductInner}>
				<Text style={style.title}>{title}</Text>
				<Text style={style.text}>{description}</Text>
				{currency === Currency.coins &&
					userHasEnoughCoins(price) &&
					hearts < MAX_HEARTS && (
						<PrimaryButton
							onPress={() => handleCoinsPurchase(type, price)}
							color="#27AE60"
						>
							<Text style={style.btnText}>
								{price}{" "}
								<FontAwesome5
									name="coins"
									size={22}
									color="gold"
								/>{" "}
							</Text>
						</PrimaryButton>
					)}
				{currency === Currency.coins &&
					(!userHasEnoughCoins(price) || hearts === MAX_HEARTS) && (
						<PrimaryButton
							onPress={() => console.log("Invalid")}
							color={Colors.backgroundDark}
						>
							{!userHasEnoughCoins(price) ? (
								<Text style={style.btnText}>
									Not Enough Coins
								</Text>
							) : (
								<Text style={style.btnText}>
									Already Full Hearts
								</Text>
							)}
						</PrimaryButton>
					)}
				{currency === Currency.usd && (
					<PrimaryButton
						onPress={() => handleUsdPurchase(type, price)}
						color="#27AE60"
					>
						<Text style={style.btnText}>
							{"$" + convertFromCents(price)}
						</Text>
					</PrimaryButton>
				)}
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	storeProduct: {
		backgroundColor: Colors.backgroundPrimary,
		borderRadius: 15,
		overflow: "hidden",
		marginBottom: 15,
	},
	storeProductInner: {
		justifyContent: "space-between",
		paddingTop: 25,
		paddingHorizontal: 20,
	},
	btnText: {
		color: Colors.white,
		fontWeight: "500",
		textAlign: "center",
		width: "100%",
		fontSize: 22,
	},
	title: {
		fontSize: 24,
		color: Colors.white,
		fontWeight: "700",
		marginBottom: 15,
	},
	price: {
		fontSize: 20,
		color: Colors.white,
		fontWeight: "500",
		marginBottom: 25,
	},
	text: {
		fontSize: 18,
		color: Colors.white,
		marginBottom: 25,
	},
	image: {
		height: 100,
		width: "100%",
	},
});

export default StoreProduct;
