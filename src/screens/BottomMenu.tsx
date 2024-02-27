// BottomMenu.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CategoriesScreen from '../modules/Category/CategoriesScreen';
import TransactionsScreen from '../modules/Transactions/IncomeScreen';
import OverviewScreen from '../modules/Overview/OverviewScreen';
import AccountsScreen from '../modules/Accounts/AccountsScreen';

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
