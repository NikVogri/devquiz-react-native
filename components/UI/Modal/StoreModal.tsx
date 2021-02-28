import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Colors from "../../../constants/Colors";
import StoreProduct from "../../Store/StoreProduct";

interface StoreModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const StoreModal = ({ closeModal, showModal }: StoreModalProps) => {
  return (
    <Modal
      isVisible={showModal}
      onBackButtonPress={closeModal}
      onDismiss={closeModal}
      onBackdropPress={closeModal}
      style={{ position: "relative" }}
    >
      <TouchableWithoutFeedback
        containerStyle={style.close}
        onPress={closeModal}
      >
        <FontAwesome name="close" size={23} color="white" />
      </TouchableWithoutFeedback>

      <View style={style.modalInner}>
        <Text style={style.uptitle}>
          <FontAwesome name="shopping-cart" size={32} color="white" /> Store
        </Text>
        <ScrollView>
          <StoreProduct title="200 gold coins" price={1.99} />
          <StoreProduct title="200 gold coins" price={1.99} />
          <StoreProduct title="200 gold coins" price={1.99} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalInner: {
    backgroundColor: Colors.backgroundDark,
    width: "100%",
    maxHeight: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    borderRadius: 10,
  },
  uptitle: {
    fontSize: 32,
    color: Colors.white,
    paddingVertical: 30,
    lineHeight: 30,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    color: Colors.white,
    paddingVertical: 30,
    lineHeight: 30,
    textAlign: "center",
  },
  close: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 99,
  },
});

export default StoreModal;
