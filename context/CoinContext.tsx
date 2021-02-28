import React, { createContext, useEffect, useState } from "react";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";

const INITIAL_COIN_AMOUNT = 300;

export enum Coins {
  refill_hearts = 50,
}

interface CoinsContextInterface {
  coins: number;
  updateCoins: (operation: Coins) => void;
  userHasEnoughCoins: (requestedAmount: number) => boolean;
}

const CoinContext = createContext<CoinsContextInterface>({
  coins: 200,
  updateCoins: () => {},
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

  const updateCoins = async (operation: Coins) => {
    let newCoinsAmount = 0;

    switch (operation) {
      case Coins.refill_hearts:
        newCoinsAmount = coins - Coins.refill_hearts;
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
  };

  const userHasEnoughCoins = (requestedAmount: number) => {
    return coins - requestedAmount >= 0;
  };

  return (
    <CoinContext.Provider value={{ coins, updateCoins, userHasEnoughCoins }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContext;
