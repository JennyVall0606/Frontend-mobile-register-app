import { StyleSheet } from "react-native";

export const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  iconFecha: {
    fontSize: 24,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 16,
  },
  
  card: {
    backgroundColor: "rgba(197, 224, 235, 0.23)",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,        // línea alrededor de la celda
    borderColor: "#333",   // color de la línea
    marginBottom: 24,
    elevation: 3,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tableCellVV: {

    flex: 6,               // si quieres que tenga un ancho relativo
    padding: 1,
    textAlign: "left",
    fontSize: 10,
    color: "#333",
    paddingLeft: 0,
    borderWidth: 1,        // línea alrededor de la celda
    borderColor: "#ddd",   // color de la línea
  },
  
  tableCellV: {
    flex: 5,
    padding: 1,
    textAlign: "left",
    fontSize: 11,
    color: "#333",
    paddingLeft: 0,
    borderWidth: 1,        // línea alrededor de la celda
    borderColor: "#ddd",   // color de la línea
  },
  

  editButtonText: {
    fontSize: 12,
    textAlign: "center",
    paddingLeft: 0,
    borderColor: "#333", // color de la línea
    borderRadius: 4, // opcional, esquinas suavizadas
    overflow: "hidden", // para que respete el borderRadius
  },

  tableCell: {
    flex: 1,
    fontSize: 11,
    borderWidth: 1,        // línea alrededor de la celda
    borderColor: "#ddd",   // color de la línea
    color: "black",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 24,
    textAlign: "center", // centra el texto
  },
  table: {
    backgroundColor: "rgba(197, 224, 235, 0.23)",
    borderRadius: 8,
    borderWidth: 1,        // línea alrededor de la celda
    borderColor: "#333",   // color de la línea
    padding: 8,
    marginBottom: 24,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
   
    paddingBottom: 8,
    marginBottom: 8,
  },
  editCell: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    borderWidth: 1,        // línea alrededor de la celda
    borderColor: "#ddd",   // color de la línea
    fontSize: 14,
  },
  editButtonTextHe: {
    fontSize: 12,
    alignItems: "flex-start",
    paddingLeft: 20,
  },

  editButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginTop: 12,
  },
  newControlButton: {
    backgroundColor: "rgb(180, 180, 180)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,         // espacio arriba
    marginBottom: 16,      // (opcional) separa abajo
    borderWidth: 1,        // grosor del borde
    borderColor: "black",// mismo tono que el fondo o el que prefieras
    elevation: 2,
  },
  
  newControlButtonText: {
    color: "black",                 // texto blanco
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  dropdownContainer: {
    marginBottom: 12,
    zIndex: 1000,
  },

   pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 6,
    overflow: "hidden",
  },
  picker: {
    height: 40,
    width: "100%",
  },
  dropdownBelow: {
    marginTop: 40,
  },


};
