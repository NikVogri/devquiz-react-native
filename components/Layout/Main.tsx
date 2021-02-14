import React from "react";
import { View } from "react-native";
import Header from "./Header";

const Main = ({ children, ...props }: { children: any }) => {
  return (
    <View {...props}>
      <Header />
      {children}
    </View>
  );
};

export default Main;
