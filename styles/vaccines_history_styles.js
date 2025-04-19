import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingHorizontal: 20, // Agrega espacio en los lados izquierdo y derecho
  paddingTop: 10, // Puedes ajustar este valor si necesitas más espacio en la parte superior
  
  },

  backButton: {
    position: 'absolute',
    top: -15, // Ajusta este valor para subirlo más o menos
    left: 8, // Opcional: para moverlo horizontalmente
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 30, // Tamaño del ícono
    color: "rgb(53, 51, 51)", // Color del ícono
  },

  title: {
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 20, // reemplaza paddingTop del container
    marginBottom: 20,
    color: 'rgb(6, 97, 59)',
    textAlign: 'center',
    width: '100%' // asegura que esté centrado
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(192, 197, 194)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20, // Para darle un pequeño espacio debajo
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
  },

  searchIcon: {
    fontSize: 20,
    color: "rgb(53, 51, 51)",
    marginRight: 5,
  },

  // Estilo de la tabla
  table: {
    width: '100%', // Asegura que ocupe todo el ancho disponible
    marginHorizontal: 0, // Elimina cualquier margen horizontal
    borderWidth: 1,
    borderColor: "rgb(53, 51, 51)",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20, // Espacio inferior entre la tabla y otros elementos
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgb(70, 136, 84)",
    borderBottomWidth: 1,
    borderColor: "rgb(53, 51, 51)",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgb(53, 51, 51)",
    backgroundColor: "rgb(192, 197, 194)",
  },

  cellHeader: {
    flex: 40, // Asegura que cada celda ocupe el mismo espacio
    padding: 6,
    fontWeight: "bold",
    fontSize: 12,
    color: "rgb(41, 41, 39)",
    textAlign: "center", // Asegura que el texto esté centrado
  },
  cellHeaderId: {
    flex: 15, // más pequeño
    padding: 6,
    fontWeight: "bold",
    fontSize: 12,
    color: "rgb(41, 41, 39)",
    textAlign: "center",
  },

  cell: {
    flex: 35, // Esto hará que las celdas se estiren igual
    padding: 6,
    fontSize: 10,
    textAlign: "center",
    color: "rgb(46, 39, 45)",
  },
  cellId: {
    flex: 15,
    padding: 6,
    fontSize: 10,
    textAlign: "center",
    color: "rgb(46, 39, 45)",
  },

  cellHeaderDosis: {
    flex: 50, // más ancho que ID, pero no tan ancho como nombre
    padding: 6,
    fontWeight: "bold",
    fontSize: 12,
    color: "rgb(41, 41, 39)",
    textAlign: "center",
  },
  
  cellDosis: {
    flex: 50,
    padding: 6,
    fontSize: 11,
    textAlign: "center",
    color: "rgb(46, 39, 45)",
  },
  
  cellHeaderNombre: {
    flex: 50, // Más ancho que las otras columnas
    padding: 6,
    fontWeight: "bold",
    fontSize: 12,
    color: "rgb(41, 41, 39)",
    textAlign: "center",
  },
  
  cellNombre: {
    flex: 50,
    padding: 6,
    fontSize: 11,
    textAlign: "center",
    color: "rgb(46, 39, 45)",
  },
  

  // Ajuste en el actionsContainer
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%', // Asegura que ocupe todo el ancho disponible
    alignItems: "center",
    paddingHorizontal: 0, // Elimina cualquier padding horizontal innecesario
    marginBottom: 20, // Espacio inferior opcional
  },

  addIcon: {
    fontSize: 40,
    color: "rgb(19, 150, 29)",
    marginBottom: 60,
    marginTop: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paginationButton: {
    fontSize: 16,
    color: 'blue',
  },
  pageInfo: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
  
});
