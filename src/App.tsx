// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { MainDrawerNavigator } from './navigation/MainDrawerNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <MainDrawerNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
