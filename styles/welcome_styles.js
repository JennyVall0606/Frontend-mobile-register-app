// styles/welcome_styles.js
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
    marginTop: -20, 
    marginBottom: 10,
    backgroundColor: "rgb(5, 5, 5)",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(6, 97, 59)",
    marginTop: 20,
  },
 
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 100,
    width: "100%", 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10, 
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(78, 73, 73)",
    marginTop: 50,
    textAlign: "center", 
    fontFamily: "serif", 
    paddingHorizontal: 15,
  },

  button: {
    backgroundColor: "rgb(160, 159, 159)",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 100,
    alignSelf: "center", 
    width: "50%", 
  },

  buttonText: {
    color: "rgb(3, 44, 3)",
    fontSize: 20, 
    textAlign: "center",
    fontWeight: "60", 
    fontFamily: "serif",
  },
});

export default styles;
