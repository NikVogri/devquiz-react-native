import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AwardsProvider } from "./context/AwardsContext";
import Navigation from "./navigation";

export default function App() {
  return (
    <AwardsProvider>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </AwardsProvider>
  );
}
