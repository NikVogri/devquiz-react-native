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

  const pushLocalAward = async (id: number, type: AwardType) => {
    let award;
    if (type === AwardType.quiz) {
      award = awardsList.find((award) => award.quizId === id);
    } else {
      award = awardsList.find((award) => award.id === id);
    }
    await pushData(`awards`, award);
  };

  return (
    <AwardsContext.Provider value={{ awards, getLocalAwards, pushLocalAward }}>
      {children}
    </AwardsContext.Provider>
  );
};

export default AwardsContext;
