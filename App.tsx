import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AwardsProvider } from "./context/AwardsContext";
import { CoinsProvider } from "./context/CoinContext";
import { HeartsProvider } from "./context/HeartContext";
import { ModalProvider } from "./context/ModalContext";
import Navigation from "./navigation";

export default function App() {
  return (
    <HeartsProvider>
      <CoinsProvider>
        <AwardsProvider>
          <ModalProvider>
            <SafeAreaProvider>
              <Navigation />
              <StatusBar style="light" />
            </SafeAreaProvider>
          </ModalProvider>
        </AwardsProvider>
      </CoinsProvider>
    </HeartsProvider>
  );
}
