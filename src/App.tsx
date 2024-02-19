// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OverviewScreen from './screens/OverviewScreen';
import BottomMenu from './screens/BottomMenu';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={OverviewScreen} options={{ drawerLabel: 'Home' }} />
        <Drawer.Screen name="BottomMenu" component={BottomMenu} options={{ drawerLabel: 'Bottom Menu' }} />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
