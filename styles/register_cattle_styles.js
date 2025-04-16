import { StyleSheet } from 'react-native';

export const getDropdownWrapper = (open) => ({
  zIndex: 999,
  marginBottom: open ? 250 : 20,
});

export default StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  
  backButton: {
    padding: 20,
    flex: 1,
    marginHorizontal: 1,
    marginBottom: 10,
  },
  backArrow: {
    fontSize: 30,
    color: '#333',
    
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
    color: 'rgb(6, 97, 59)',
    marginHorizontal: 50,
  },
  imagePicker: {
    backgroundColor: 'rgb(244, 245, 244)', 
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    borderColor: '#032C03', // rgb(3, 44, 3)
    borderWidth: 1,
  },
  imagePickerText: {
    color: '#333',
    fontSize: 16,
    
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
    marginHorizontal: 10,
    
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 30,
    borderColor: '#032C03', // rgb(3, 44, 3)
    borderWidth: 1,
  },
  
  input: {
    borderColor: '#032C03', // rgb(3, 44, 3)
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: 'rgb(244, 245, 244)',
    fontSize: 16,
    width: '90%', // Ajusta el ancho a un 90% de la pantalla
    alignSelf: 'center', // Centra el dropdown
    maxHeight: 200, // Ajusta la altura máxima del modal
    marginBottom: 20, // Añade un margen inferior para separar los elementos
  },


  // Estilo para el ícono del calendario
  calendarIcon: {
    position: 'absolute',
    right: 40,
    top: 10,
    zIndex: 1,
  },

  // Estilo para la entrada de fecha
  dateInput: {
    paddingRight: 90,
    paddingLeft: 10,
  },

  // Estilo del ícono
  icon: {
    color: 'rgb(12, 12, 12)',
    fontSize: 24,
  },
  
 
  








  dropdown: {
    borderColor: '#032C03', // rgb(3, 44, 3)
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: 'rgb(244, 245, 244)',
    fontSize: 16,
    width: '90%', // Ajusta el ancho a un 90% de la pantalla
    alignSelf: 'center', // Centra el dropdown
    maxHeight: 200, // Ajusta la altura máxima del modal
    marginBottom: 20, // Añade un margen inferior para separar los elementos
  },
  
  registerButton: {
    backgroundColor: 'rgb(185, 182, 182)', // 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 40,
    marginBottom: 100
  },
  registerButtonText: {
    color: 'rgb(3, 44, 3)', // 
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,  // Esto coloca el botón en la parte inferior
    right: 10,   // Lo alinea a la derecha
    backgroundColor: '#ff6647',  // Color de fondo del botón de eliminar
    padding: 4,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButtonIcon: {
    color: '#fff',
    fontSize: 20, // Tamaño del ícono
  },

  
});

