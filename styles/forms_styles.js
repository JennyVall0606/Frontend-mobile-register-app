import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
   
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  switchButtonActive: {
    backgroundColor: '#add8e6',
  },
  switchButtonInactive: {
    backgroundColor: '#eee',
  },

  iconChecked: {
    color: 'black',  // Color del ícono cuando está marcado
    fontSize: 20,    // Tamaño del ícono
  },
  iconUnchecked: {
    color: 'black',  // Color del ícono cuando no está marcado
    fontSize: 20,    // Tamaño del ícono
  },

  iconCalendar: {
    color: 'black',  // Color del ícono
    fontSize: 20,    // Tamaño del ícono
  },



  
  switchText: {
    marginLeft: 5,
  },
  formSection: {
    marginBottom: 30,
    padding: 10,
    
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgb(41, 39, 38)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  dropdownHint: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'rgb(185, 182, 182)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 50,
   
  },
  buttonText: {
    color: 'rgb(3, 44, 3)',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  dateInput: {
    flex: 1,
  },
  calendarIcon: {
    marginLeft: 1,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgb(41, 39, 38)',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  dateButtonText: {
    fontSize: 14,
    color: 'rgb(9, 10, 10)',
  },
  dropdown: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: 'rgb(6, 97, 59)',
   
    
  },
});

