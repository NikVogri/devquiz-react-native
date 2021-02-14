import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Main from "../components/Layout/Main";

import Button from "../components/Button";

export default function Profile() {
  return (
    <Main>
      <View style={style.container}>
        <Button title="Sign out" onClick={() => console.log("logged out")} />
        <Button
          title="Delete Account"
          onClick={() => console.log("account deleted")}
        />
        <Button
          title="Contact Support"
          onClick={() => console.log("Contact support")}
        />
      </View>
    </Main>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 25,
    height: Dimensions.get("window").height - 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5A5A5A",
  },
});
