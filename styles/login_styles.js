// styles/login_styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    paddingTop: 40,
  },

logo: {
  width: 210, // Ajusta el tamaño según sea necesario
  height: 210, // Ajusta el tamaño según sea necesario
  alignSelf: 'center', // Esto centra el logo horizontalmente
  marginTop: 100, // Espacio entre el título y la imagen
  marginBottom: 50, // Espacio entre el logo y el campo de entrada (input)
},

  inputContainer: {
   width: "140%", // Asegura que el ancho esté dentro de los límites (puedes reducir el valor si es más grande de lo necesario)
  height: 60, // Reduce la altura del contenedor para hacerlo más pequeño
  borderRadius: 10, // Bordes más pequeños (ajustar según el diseño deseado)
  marginBottom: 35, // Reduce el espacio entre campos de texto
  backgroundColor: "rgb(255, 255, 255)", // Color de fondo
  padding: 5, // Reduce el padding para que el contenedor no esté tan "relleno"
  borderTopLeftRadius: 20, // Redondea la esquina superior izquierda
  borderTopRightRadius: 0, // No redondea la esquina superior derecha

  // Sombra para iOS
  shadowColor: "rgb(0, 0, 0)", // Color de la sombra
  shadowOffset: { width: 0, height: 5 }, // Sombra desplazada hacia abajo
  shadowOpacity: 0.9, // Menos opacidad para que la sombra sea más sutil
  shadowRadius: 5, // Radio más pequeño para la sombra

  // Sombra para Android
  elevation: 5, // Reduce la prominencia de la sombra en Android
  },






  
  label: {
    fontSize: 15,
    fontWeight: "normal",
    color: "rgb(18, 22, 20)", // Color para el texto del título
    alignSelf: "flex-start", // Alinea el título a la izquierda
    marginBottom: -10, // Espacio entre el título y el input
    marginLeft: 30, // Alinea el label a la izquierda (debe coincidir con el marginLeft del input)
    marginTop: 5,
  },

  input: {
    height: 50,
    borderRadius: 30,
    paddingLeft: 25, // Ajusta este valor para controlar el espacio dentro del input
    fontSize: 13,
    marginLeft: 10, // Asegura que el input se alinee con el label
    width: "100%", // Ajusta el ancho del input
  },

  button: {
    backgroundColor: "rgb(140, 177, 91)",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 40,
    alignSelf: "center",
    width: "100%",
     borderTopLeftRadius: 20, // Redondea la esquina superior izquierda
    borderTopRightRadius: 0, // No redondea la esquina superior derecha
  },

  buttonText: {
    color: "rgb(240, 240, 240)",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "60",
    fontFamily: "bold",
  },
});

export default styles;
