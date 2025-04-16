// global_styles.js
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
    gap: 50,
  },
  icon: {
    width: 50,
    height: 50,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgb(192, 197, 194)',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: -30,
    borderColor: 'rgb(53, 50, 50)',      // Borde negro
    borderWidth: 1,         // Grosor del borde
  },
  content: {
    flex: 1,
  },
  dropdownMenuLeft: {
    position: 'absolute',
    top: 105,
    left: 30,
    backgroundColor: 'rgb(192, 197, 194)',
    padding: 2,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  
  dropdownMenuRight: {
    position: 'absolute',
    top: 105,
    right: 30,
    backgroundColor: 'rgb(192, 197, 194)',
    padding: 2,
    borderRadius: 4,
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
  


});


