// ./src/modules/Category/styles.tsx
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoriesContainer: {
    width: '100%',
  },
  addNewCategoryButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addNewCategoryText: {
    fontSize: 16,
    color: '#000',
  },
});
