import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface ButtonBaseProps {
  onPress: () => void;
  children: any;
  style?: any;
}

const ButtonBase = ({ onPress, children, style }: ButtonBaseProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} containerStyle={style}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default ButtonBase;
