
import React from "react";
import { ImageBackground, View } from "react-native";
import globalStyles from "../styles/global_styles"; 

export default function SimpleLayout({ children }) {
  return (
    <ImageBackground
      source={require("../assets/acuarela.jpg")} 
    >
      <View style={globalStyles.container}>{children}</View>
    </ImageBackground>
  );
}
