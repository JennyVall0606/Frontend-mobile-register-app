import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1, // Esto asegura que ocupe toda la pantalla
    justifyContent: 'center', // Centra el contenido si es necesario
    alignItems: 'center', // Alinea el contenido (opcional)
  },
  
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 15, // Reduje el gap entre los elementos para que no sea tan amplio
  },

  icon: {
    width: 40, // Reducido el tamaño de los iconos
    height: 40,
  },

  

  searchInput: {
    flex: 1,
    backgroundColor: 'rgb(207, 207, 212)',
    padding: 8,
    borderRadius: 20,
    fontSize: 16, // Ajusté el tamaño de fuente
    marginLeft: 10,
  },

  searchButton: {
    marginLeft: 10,
  },

  searchIcon: {
    width: 20, // Reducido el tamaño del ícono
    height: 20,
  },

  content: {
    flex: 1,
  },

  dropdownMenuLeft: {
    position: 'absolute',
    top: 105, // Puedes ajustar este valor si quieres mover el menú más abajo
    left: 30,
    backgroundColor: 'rgb(192, 197, 194)',
    padding: 2,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
  },

  dropdownMenuRight: {
    position: 'absolute',
    top: 105, // Puedes ajustar este valor si quieres mover el menú más abajo
    right: 30,
    backgroundColor: 'rgb(192, 197, 194)',
    padding: 2,
    borderRadius: 8, // Reduje el borde para que sea consistente con el menú izquierdo
    elevation: 5,
    zIndex: 999,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    color: 'rgb(40, 43, 41)',
    marginBottom: 4, // Espacio entre ítems
  },

  fechaTexto: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },

  searchResults: {
    position: 'absolute',
    top: 140, // Mueve el flotante más abajo
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8, // Reducido para ocupar menos espacio
    zIndex: 20,
    maxHeight: 150, // Tamaño reducido
    elevation: 5, // Sombra en Android
  },

  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
    zIndex: 10,
  },
  searchContainerCustom: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: 'rgb(207, 207, 212)',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: 'rgb(53, 50, 50)', // Borde negro
    borderWidth: 1, // Grosor del borde
  },

  searchInputPlaceholder: {
    color: 'rgb(53, 50, 50)',
  },
  
  searchResultsContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    zIndex: 20,
    maxHeight: 180,
    elevation: 5,
  },
  
  searchResultsContainer: {
    position: 'absolute',
    top: 110,
    left: 80,
    right: 80,
    backgroundColor: 'rgb(207, 207, 212)',
    borderRadius: 10,
    padding: 10,
    zIndex: 20,
    maxHeight: 180,
    elevation: 5,
  },
  
  noResultsText: {
    fontSize: 16,
    color: 'rgb(53, 50, 50)',
  },
});
