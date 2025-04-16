import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // ← esto alinea arriba
        paddingTop: 40,               // ← espacio desde arriba
        paddingHorizontal: 20,
      },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'rgb(6, 97, 59)',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 100,
  },
  button: {
    backgroundColor: 'rgb(160, 159, 159)',
    paddingVertical: 18,       // ↑ más alto
    paddingHorizontal: 40,     // ↑ más ancho
    borderRadius: 10,
    alignItems: 'center',
  },
  
  buttonText: {
    color: 'rgb(3, 44, 3)',
    fontSize: 20,              // ↑ texto más grande
    fontWeight: 'bold',
  },
  
});
