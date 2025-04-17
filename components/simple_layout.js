// components/SimpleLayout.js
// components/SimpleLayout.js
import React from "react";
import { ImageBackground, View } from "react-native";
import globalStyles from "../styles/global_styles"; // Verifica la ruta correcta

export default function SimpleLayout({ children }) {
  return (
    <ImageBackground
      source={require("../assets/acuarela.jpg")} // Verifica que la ruta sea correcta
      style={globalStyles.background} // Aplica el estilo global
    >
      <View style={{ flex: 1 }}>{children}</View>
    </ImageBackground>
  );
}
