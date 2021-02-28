import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../../constants/Colors";
import PrimaryButton from "../UI/PrimaryButton";

interface StoreProduct {
  title: string;
  price: number;
}

const StoreProduct = ({ title, price }: StoreProduct) => {
  return (
    <View style={style.storeProduct}>
      <Image
        source={require("../../assets/images/products/coins.png")}
        style={style.image}
      />
      <View style={style.storeProductInner}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.text}>
          Purchase 200 gold coins which you can use to purchase hearts and
          unlock more quizes
        </Text>
        <PrimaryButton
          onPress={() => console.log("purchasing")}
          color="#27AE60"
        >
          <Text style={style.btnText}>{price}€</Text>
        </PrimaryButton>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  storeProduct: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },
  storeProductInner: {
    justifyContent: "space-between",
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  btnText: {
    color: Colors.white,
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
    fontSize: 22,
  },
  title: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: "700",
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "500",
    marginBottom: 25,
  },
  text: {
    fontSize: 18,
    color: Colors.white,
    marginBottom: 25,
  },
  image: {
    height: 100,
    width: "100%",
  },
});

export default StoreProduct;
