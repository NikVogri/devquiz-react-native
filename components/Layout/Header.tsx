import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { MAX_HEARTS } from "../../constants/Constants";
import CoinContext from "../../context/CoinContext";
import HeartContext from "../../context/HeartContext";
import ModalContext, { Modal } from "../../context/ModalContext";

const Header = () => {
  const { hearts } = useContext(HeartContext);
  const { openModal } = useContext(ModalContext);
  const { coins } = useContext(CoinContext);

  const handleOpenModal = () => {
    openModal(Modal.store);
  };

  return (
    <View style={style.header}>
      <View style={style.iconContainer}>
        {Array(hearts)
          .fill(1)
          .map((_, index) => (
            <FontAwesome
              name="heart"
              size={32}
              color="#EE3939"
              style={style.heart}
              key={index}
            />
          ))}

        {Array(MAX_HEARTS - hearts)
          .fill(1)
          .map((_, index) => (
            <FontAwesome
              name="heart"
              size={32}
              color="#828282"
              style={style.heart}
              key={index}
            />
          ))}
      </View>

      <TouchableWithoutFeedback
        containerStyle={style.iconContainer}
        onPress={handleOpenModal}
      >
        <View style={style.iconContainer}>
          <Text style={style.coinsText}>{coins}</Text>
          <FontAwesome5
            name="coins"
            size={18}
            color="gold"
            style={style.coins}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const style = StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundDark,
    borderBottomColor: Colors.borderPrimary,
    borderBottomWidth: 1,
    height: 85,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 99,
    paddingTop: 45,
    paddingLeft: 10,
    paddingRight: 10,
    ...Colors.shadow,
  },
  coinsText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "500",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  heart: {
    marginRight: 5,
  },
  coins: {
    marginLeft: 5,
    marginRight: 5,
  },
});

export default Header;
