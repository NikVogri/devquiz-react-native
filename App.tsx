import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AwardsProvider } from "./context/AwardsContext";
import { HeartsProvider } from "./context/HeartContext";
import Navigation from "./navigation";

export default function App() {
  return (
    <HeartsProvider>
      <AwardsProvider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </AwardsProvider>
    </HeartsProvider>
  );
}
