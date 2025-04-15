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
    marginTop: 40,
    marginBottom: 16,
    gap: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
  },
});


