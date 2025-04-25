
import React from "react";
import { ImageBackground, View } from "react-native";
import globalStyles from "../styles/global_styles"; 

export default function SimpleLayout({ children }) {
  return (
    <ImageBackground
      source={require("../assets/acuarela.jpg")} // Verifica que la ruta sea correcta
      style={globalStyles.background} // Aplica el estilo global
    >
      <View style={globalStyles.container}>{children}</View>
    </ImageBackground>
  );
}
