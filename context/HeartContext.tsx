import React, { createContext, useEffect, useState } from "react";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";

export const MAX_HEARTS = 5;

export enum HeartUpdate {
  add = "add",
  remove = "remove",
}

interface HeartsContextInterface {
  hearts: number;
  updateHeartsCount: (type: HeartUpdate, changedAmount: number) => void;
}

const HeartContext = createContext<HeartsContextInterface>({
  hearts: 5,
  updateHeartsCount: () => {},
});

export const HeartsProvider = ({ children }: any) => {
  const [hearts, setHearts] = useState(5);
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
      console.log("here", heartsCount);
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
        hearts + changedAmount > MAX_HEARTS
          ? MAX_HEARTS
          : hearts + changedAmount;
    } else {
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

  return (
    <HeartContext.Provider value={{ hearts, updateHeartsCount }}>
      {children}
    </HeartContext.Provider>
  );
};

export default HeartContext;
