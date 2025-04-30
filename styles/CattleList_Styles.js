import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardContent: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

