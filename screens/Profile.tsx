import * as React from "react";
import { Dimensions, Linking, StyleSheet, Text, View } from "react-native";
import Main from "../components/Layout/Main";
import PrimaryButton from "../components/UI/PrimaryButton";
import Colors from "../constants/Colors";
import { useAsyncLocalStorage } from "../hooks/useAsyncLocalStorage";
import { showPromptNotification } from "../lib/showNotification";

export default function Profile() {
  const { flushData } = useAsyncLocalStorage();

  const handleDataFlush = async () => {
    const notification = {
      title: "Flush Local Data?",
      text:
        "This is intended for development purpose and will delete all your current progress, continue?",
      cancelable: false,
      onConfirm: async () => {
        await flushData();
      },
    };

    showPromptNotification(notification);
  };

  return (
    <Main>
      <View style={style.container}>
        <PrimaryButton title="Flush Local Data" onPress={handleDataFlush} />
        <PrimaryButton
          title="Contact Support"
          onPress={() =>
            Linking.openURL(
              "mailto:vogrinec.nik@gmail.com?subject=Contact Support"
            )
          }
        />
        <PrimaryButton
          title="Request Quiz"
          onPress={() =>
            Linking.openURL(
              "mailto:vogrinec.nik@gmail.com?subject=Quiz Request"
            )
          }
        />
      </View>

      <View>
        <Text style={style.textCredits}>
          Created by Nik Vogrinec in Slovenia
        </Text>
        <Text style={style.text}>Version: 0.0.1</Text>
      </View>
    </Main>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 25,
    height: Dimensions.get("window").height - 220,
    backgroundColor: Colors.backgroundDark,
  },
  textCredits: {
    color: Colors.white,
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 15,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
