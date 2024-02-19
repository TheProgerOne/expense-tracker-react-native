import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в приложение для учета финансов!</Text>
      <Button
        title="Просмотреть категории"
        onPress={() => navigation.navigate('CategoriesScreen')} // Убедитесь, что у вас есть CategoriesScreen в вашем навигаторе
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Добавьте дополнительные стили если нужно
});

export default HomeScreen;
