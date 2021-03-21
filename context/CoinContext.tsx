import React, { createContext, useEffect, useState } from "react";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";
import { INITIAL_COIN_AMOUNT } from "../constants/Constants";

export enum Coins {
	refill_hearts = 50,
	purchase_quiz = 30,
	add = "add",
	subtract = "subtract",
}

interface CoinsContextInterface {
	coins: number;
	updateCoins: (type: Coins, changeAmount?: number) => Promise<void>;
	userHasEnoughCoins: (requestedAmount: number) => boolean;
}

const CoinContext = createContext<CoinsContextInterface>({
	coins: 200,
	updateCoins: async (type: Coins, changeAmount: number = 0) => {},
	userHasEnoughCoins: () => false,
});

export const CoinsProvider = ({ children }: any) => {
	const [coins, setCoins] = useState(0);
	const { storeData, getData } = useAsyncLocalStorage();

	useEffect(() => {
		getCoinsFromLC();
	}, []);

	/**
	 * @description Fetches coins count from local storage when application first loads
	 */
	const getCoinsFromLC = async () => {
		try {
			const coinsCount = await getData("coins");
			console.log("coinsCount", coinsCount);
			if (coinsCount === null) {
				await storeData("coins", INITIAL_COIN_AMOUNT);
				setCoins(INITIAL_COIN_AMOUNT);
			} else {
				setCoins(coinsCount);
			}
		} catch (err) {
			console.log(err);
		}
	};

	/**
	 *
	 * @param type
	 * @param changedAmount
	 * @description sets a new coins amount (add or remove)
	 */

	const updateCoins = async (type: Coins, changeAmount: number = 0) => {
		let newCoinsAmount = 0;
		if (type in Coins) {
			switch (type) {
				case Coins.refill_hearts:
					newCoinsAmount = coins - Coins.refill_hearts;
					break;
				case Coins.purchase_quiz:
					newCoinsAmount = coins - Coins.purchase_quiz;
					break;
				case Coins.add:
					newCoinsAmount = coins + changeAmount;
					break;
				case Coins.subtract:
					newCoinsAmount = coins - changeAmount;
					break;
				default:
					return;
			}

			if (newCoinsAmount < 0) return;

			try {
				await storeData("coins", newCoinsAmount);
				setCoins(newCoinsAmount);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const userHasEnoughCoins = (requestedAmount: number) => {
		return coins - requestedAmount >= 0;
	};

	return (
		<CoinContext.Provider
			value={{ coins, updateCoins, userHasEnoughCoins }}
		>
			{children}
		</CoinContext.Provider>
	);
};

export default CoinContext;
