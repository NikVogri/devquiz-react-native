import React, { createContext, useState } from "react";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";
import awardsList from "../awards/list";

export enum AwardType {
  quiz = "quiz",
  other = "other",
}

export interface Award {
  id: number;
  quizId?: number;
  image: any;
  text: string;
  date: Date;
}

interface AwardsContextInterface {
  awards: Award[];
  getLocalAwards: () => Promise<void>;
  pushLocalAward: (id: any, type: AwardType) => Promise<void>;
}

const AwardsContext = createContext<AwardsContextInterface>({
  awards: [],
  getLocalAwards: async () => {},
  pushLocalAward: async (id: any, type: AwardType) => {},
});

export const AwardsProvider = ({ children }: any) => {
  const { getData, pushData } = useAsyncLocalStorage();
  const [awards, setAwards] = useState([]);

  /**
   * @description fetches awards from local storage
   */
  const getLocalAwards = async () => {
    try {
      const awards = await getData(`awards`);

      if (awards) {
        return setAwards(awards);
      }

      setAwards([]);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   *
   * @param id
   * @param type
   * @description pushes new award to local storage
   */
  const pushLocalAward = async (id: number, type: AwardType) => {
    const awards: Award[] | null = await getData("awards");
    const isAwardAlreadyStored = awards?.find((award) => award.id === id);

    if (isAwardAlreadyStored) return;

    let award;
    if (type === AwardType.quiz) {
      award = awardsList.find((award) => award.quizId === id);
    } else {
      award = awardsList.find((award) => award.id === id);
    }
    await pushData("awards", award);
  };

  return (
    <AwardsContext.Provider value={{ awards, getLocalAwards, pushLocalAward }}>
      {children}
    </AwardsContext.Provider>
  );
};

export default AwardsContext;
