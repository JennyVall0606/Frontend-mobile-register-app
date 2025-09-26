import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //===========================================================================

  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    zIndex: 10,
  },
  topBarGreen: {
    height: 150,
    backgroundColor: "#7dac53",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    top: -40,
    zIndex: 1,
  },

  icon: {
    width: 30,
    height: 30,
    marginTop: 90,
  },

  iconUser: {
    width: 50,
    height: 50,
    marginTop: 90,
  },

  searchContainerCustom: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "rgb(207, 207, 212)",
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "rgb(53, 50, 50)",
    borderWidth: 1,
  },

  searchInputPlaceholder: {
    color: "rgb(53, 50, 50)",
  },

  searchInput: {
    flex: 1,
    backgroundColor: "rgb(34, 34, 143)",
    padding: 8,
    borderRadius: 20,
    fontSize: 16,
    marginLeft: 10,
  },

  searchIcon: {
    width: 20,
    height: 20,
  },

  dropdownMenuLeft: {
    position: "absolute",
    top: 100,
    left: 1,
    backgroundColor: "#7dac53",
    padding: 2,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  dropdownMenuLeftuser: {
    position: "absolute",
    top: 100,
    left: 280,
    backgroundColor: "#7dac53",
    padding: 2,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
    width: 140,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "rgb(40, 43, 41)",
    marginBottom: 4,
  },

  dropdownMenuRight: {
    position: "absolute",
    top: 105,
    right: -1,
    backgroundColor: "#7dac53",
    padding: 2,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
  },

  content: {
    flex: 1,
  },

   greenBar: {
     height: 70, 
    backgroundColor: "#7dac53",
    width: "100%",
        
  },

  bottomImageContainer: {
    position: "absolute", 
    bottom: 18, 
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between", 
    paddingHorizontal: 140,
     
  },
  
 imageContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    marginHorizontal: 15, 
  },

  imageStyleG: {
    width: 20, 
    height: 20,     
        right: 6,
  },

   imageText: {
     marginTop: 5, 
    color: "white", 
    fontSize: 12, 
    fontWeight: "normal", 
     left: -6,
  },
  //===========================================================================

  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
  },

  containerloading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  image: {
    width: 130,
    height: 130,
    marginTop: 80,
    alignSelf: "center",
    marginBottom: 10,
  },

  title1: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 10,
    color: "#7dac53",
    textAlign: "center",
  },

  clearFiltersButton: {
    backgroundColor: "#7dac53",
    padding: 5,
    borderRadius: 5,
    marginVertical: 15,
    alignSelf: "flex-end",
    marginRight: 20,
  },

  clearFiltersText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  activeFiltersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 5,
    zIndex: 1,
  },

  activeFilterTag: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 5,
    borderWidth: 1,
    borderColor: "rgba(94, 143, 49, 0.86)",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderTopRightRadius: 0,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3,
    shadowRadius: 2,
    elevation: 10,
    margin: 5,
  },

  activeFilterText: {
    color: "#7dac53",
    fontSize: 14,
    fontWeight: "500",
  },

  removeFilterText: {
    color: "#8b1501ff",
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "1900",
  },

  headerColumnContainer: {
    position: "relative",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,
    minHeight: 40,
    backgroundColor: "transparent",
  },

  tableHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    flex: 1,
    textAlign: "center",
  },

  filterIconContainer: {
    padding: 4,
    borderRadius: 2,
    marginLeft: 4,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 24,
    minHeight: 24,
  },

  // Ícono de filtro (🔽)
  filterIcon: {
    fontSize: 17,
    color: "#0f58accb",
    textAlign: "center",
  },

  // Ícono de filtro cuando hay un filtro activo
  filterIconActive: {
    color: "#e04444ff", // Verde para indicar filtro activo
    fontWeight: "bold",
  },

 filterDropdown: {
  position: "absolute",
  top: "100%",
  right: -10, // ← Manteniendo el cambio original
  backgroundColor: "#ffffff",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#e0e0e0",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 10, // Se usa solo un valor para la elevación
  zIndex: 19999,
  minWidth: 120,
  marginBottom: 90, // Agregamos espacio en la parte inferior
},

  // Cada opción del menú (incluyendo "Todos")
 filterOption: {
  paddingVertical: 4,  // Reducir el padding vertical
  paddingHorizontal: 9,
  borderBottomWidth: 1,
  borderBottomColor: "#7dac53",
  backgroundColor: "transparent",
  minHeight: 30,  // Reducir la altura mínima
  justifyContent: "center",
},

  // Opción cuando está seleccionada/activa
  filterOptionActive: {
    backgroundColor: "#e8f5e8", // Verde muy claro
    borderLeftWidth: 3,
    borderLeftColor: "#4CAF50", // Verde más intenso en el borde izquierdo
  },

  // Texto de cada opción
  filterOptionText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "400",
    textAlign: "left",
  },

  // Estilos adicionales que podrías necesitar para mejorar la apariencia

  // Para la última opción (sin borde inferior)
  filterOptionLast: {
    borderBottomWidth: 0,
  },

  // Para cuando se presiona una opción
  filterOptionPressed: {
    backgroundColor: "#f5f5f5",
    opacity: 0.8,
  },

  // Si quieres cambiar el texto de la opción activa
  filterOptionTextActive: {
    color: "#2e7d32", // Verde oscuro
    fontWeight: "600",
  },

  tableContainer: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20, // Redondeo de la esquina inferior izquierda
    borderBottomRightRadius: 20, // Redondeo de la esquina inferior derecha
    elevation: 6, // Aumentar la elevación para hacer la sombra más notoria
    shadowColor: "#000", // Color negro para la sombra
    shadowOffset: { width: 0, height: 5 }, // Aumentar el desplazamiento vertical de la sombra
    shadowOpacity: 0.9, // Bajar la opacidad de la sombra para hacerla más suave
    shadowRadius: 8, // Aumentar el radio de la sombra para que sea más difusazIndex:
    zIndex: 1,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 8,
    borderTopLeftRadius: 20,
    borderBottomWidth: 4,
    borderColor: "#7dac53",
  },

  headerColumnContainer: {
    flex: 1,
    alignItems: "center",
  },
  tableHeaderText: {
    fontSize: 16,
    color: "#648845ff",
    fontWeight: "450",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#7dac53",
    padding: 10,
  },

  tableText: {
    flex: 1,
    fontSize: 14,
    color: "#212919ff",
    textAlign: "center",
  },

  noDataContainer: {
    padding: 20,
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#212919ff",
    textAlign: "center",
  },

  resultInfo: {
    textAlign: "center",
    fontSize: 20,
    color: "#7dac53",
    marginVertical: 15,
  },
});