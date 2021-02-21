import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Main from "../components/Layout/Main";
import Button from "../components/UI/Button";
import Colors from "../constants/Colors";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";
import { showPromptNotification } from "../lib/showNotification";

export default function Profile() {
  const { flushData } = useAsyncLocalStorage();

  const handleDataFlush = async () => {
    const props = {
      title: "Flush Local Data?",
      text: "This will delete all your current progress, continue?",
      cancelable: false,
      onConfirm: async () => {
        await flushData();
      },
    };

    showPromptNotification(props);
  };

  return (
    <Main>
      <View style={style.container}>
        <Button title="Flush Local Data" onClick={handleDataFlush} />
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
    backgroundColor: Colors.backgroundDark,
  },
});
