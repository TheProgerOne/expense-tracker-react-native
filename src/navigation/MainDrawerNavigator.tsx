// ./src/navigation/MainDrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from './MyTabs';

const Drawer = createDrawerNavigator();

export const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MyTabs} options={{ drawerLabel: 'Home' }} />
    </Drawer.Navigator>
  );
};
