// styles/CattleList_Styles.js

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  backButton: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  icon: {
    fontSize: 24,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
    color: "#2c3e50",
  },
  scrollContainer: {
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 10,
  },
  cardContent: {
    width: '48%',
    backgroundColor: 'rgb(238, 238, 238)',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black', // Verde
  },
  cardImage: {
    width: '100%',
  height: 110,
  borderRadius: 10,        // Bordes redondeados
  marginBottom: 0,
  borderWidth: 1,          // Grosor del borde
  borderColor: 'black',
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  totalCount: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
    color: "#444",
  },
});



