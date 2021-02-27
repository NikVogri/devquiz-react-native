import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Main from "../components/Layout/Main";
import PrimaryButton from "../components/UI/PrimaryButton";
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
        <PrimaryButton title="Flush Local Data" onPress={handleDataFlush} />
        <PrimaryButton
          title="Contact Support"
          onPress={() => console.log("Contact support")}
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
