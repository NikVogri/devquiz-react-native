import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import AwardCard from "../components/Awards/AwardCard";
import Main from "../components/Layout/Main";
import { useIsFocused } from "@react-navigation/native";
import AwardsContext from "../context/AwardsContext";

export default function Awards() {
  const { awards, getLocalAwards } = useContext(AwardsContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getLocalAwards();
    }
  }, [isFocused]);

  return (
    <Main>
      <ScrollView contentContainerStyle={style.awards}>
        {awards.map((award) => (
          <AwardCard
            key={award.id}
            date={award.date}
            image={award.image}
            text={award.text}
          />
        ))}
      </ScrollView>
    </Main>
  );
}

const style = StyleSheet.create({
  awards: {
    paddingTop: 20,
    minHeight: Colors.fullHeight,
    padding: 10,
    paddingBottom: 180,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.backgroundDark,
  },
});
