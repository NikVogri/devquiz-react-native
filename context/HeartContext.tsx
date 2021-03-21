import React, { createContext, useEffect, useState } from "react";
import { MAX_HEARTS } from "../constants/Constants";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";

export enum HeartUpdate {
	add = "add",
	remove = "remove",
}

interface HeartsContextInterface {
	hearts: number;
	updateHeartsCount: (
		type: HeartUpdate,
		changedAmount: number
	) => Promise<void>;
	refillHearts: () => Promise<void>;
}

const HeartContext = createContext<HeartsContextInterface>({
	hearts: 5,
	updateHeartsCount: async () => {},
	refillHearts: async () => {},
});

export const HeartsProvider = ({ children }: any) => {
	const [hearts, setHearts] = useState(MAX_HEARTS);
	const { storeData, getData } = useAsyncLocalStorage();

	useEffect(() => {
		getHeartAmountFromLC();
	}, []);

	/**
	 * @description Fetches hearts count from local storage when application first loads
	 */
	const getHeartAmountFromLC = async () => {
		try {
			const heartsCount = await getData("hearts");
			console.log("heartsCount", heartsCount);
			if (heartsCount === null) {
				setHearts(MAX_HEARTS);
				await storeData("hearts", MAX_HEARTS);
			} else {
				setHearts(heartsCount);
			}
		} catch (err) {
			console.log(err);
		}
	};

	/**
	 *
	 * @param type
	 * @param changedAmount
	 * @description sets a new hearts count value (add or remove)
	 */

	const updateHeartsCount = async (
		type: HeartUpdate,
		changedAmount: number
	) => {
		let newHeartCount = 0;
		if (type === HeartUpdate.add) {
			newHeartCount =
				hearts + changedAmount >= MAX_HEARTS
					? MAX_HEARTS
					: hearts + changedAmount;
		} else if (type === HeartUpdate.remove) {
			newHeartCount =
				hearts - changedAmount < 0
					? 0
					: (newHeartCount = hearts - changedAmount);
		}

		try {
			await storeData("hearts", newHeartCount);
			setHearts(newHeartCount);
		} catch (err) {
			console.log(err);
		}
	};

	/**
	 *
	 * @description refills hearts
	 */

	const refillHearts = async () => {
		if (hearts !== MAX_HEARTS) {
			await updateHeartsCount(HeartUpdate.add, MAX_HEARTS);
		}
	};

	return (
		<HeartContext.Provider
			value={{ hearts, updateHeartsCount, refillHearts }}
		>
			{children}
		</HeartContext.Provider>
	);
};

export default HeartContext;
