// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { MainDrawerNavigator } from './navigation/MainDrawerNavigator';
import { FinancialProvider } from './FinancialContext';

const App = () => {
  return (
  <FinancialProvider> 
    <NavigationContainer>
      <MainDrawerNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
    </FinancialProvider>

  );
};

export default App;
