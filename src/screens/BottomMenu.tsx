// BottomMenu.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CategoriesScreen from './CategoriesScreen';
import TransactionsScreen from './TransactionsScreen';
import OverviewScreen from './OverviewScreen';
import AccountsScreen from './AccountsScreen';

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Accounts" component={AccountsScreen} />
    </Tab.Navigator>
  );
}

export default BottomMenu;
