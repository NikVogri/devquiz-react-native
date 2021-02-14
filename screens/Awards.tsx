import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import AwardCard from "../components/AwardCard";
import Main from "../components/Layout/Main";

export default function Awards() {
  return (
    <Main>
      <ScrollView contentContainerStyle={style.awards}>
        <AwardCard />
        <AwardCard />
        <AwardCard />
        <AwardCard />
        <AwardCard />
        <AwardCard />
        <AwardCard />
        <AwardCard />
        <AwardCard />
        <AwardCard />
      </ScrollView>
    </Main>
  );
}

const style = StyleSheet.create({
  awards: {
    paddingTop: 20,
    padding: 10,
    paddingBottom: 180,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.backgroundDark,
  },
});
