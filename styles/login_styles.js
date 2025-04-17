// styles/login_styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  video: {
    width: 200,
    height: 190,
    borderRadius: 70,
    marginTop: -20, // Esto lo convierte en un círculo
    marginBottom: 10,
    backgroundColor: "#000",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(6, 97, 59)",
    marginBottom: 40,
    marginTop: 30,
  },

  input: {
    height: 50,
    borderColor: "rgb(18, 22, 20)",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "rgb(222, 231, 225)",
    width: "150%", // Ocupa el 80% del ancho
    marginTop: 20,
  },

  button: {
    backgroundColor: "rgb(160, 159, 159)",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 100,
    alignSelf: "center", // opcional, lo centra horizontalmente
    width: "70%", // opcional, lo hace más ancho
  },

  buttonText: {
    color: "rgb(3, 44, 3)",
    fontSize: 20, // Aumenta el tamaño de la letra aquí
    textAlign: "center",
    fontWeight: "60", // Opcional, para que se vea más fuerte
    fontFamily: "bold",
  },
});

export default styles;
