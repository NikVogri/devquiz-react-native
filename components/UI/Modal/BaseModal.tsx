import React from "react";
import { Modal } from "react-native";
interface BaseModalProps {
  children: any;
  style?: any;
}

const BaseModal = ({ children, style }: BaseModalProps) => {
  return <Modal style={style}>{children}</Modal>;
};

export default BaseModal;
