// ./src/navigation/MyTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Используем Ionicons для иконок
import CategoriesScreen from '../modules/Category/CategoriesScreen';
import TransactionsScreen from '../modules/Transactions/TransactionsScreen';
import OverviewScreen from '../modules/Overview/OverviewScreen';
import AccountsScreen from '../modules/Accounts/AccountsScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps-outline" size={size} color={color} /> // Иконка для "Categories"
          ),
        }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-vertical-outline" size={size} color={color} /> // Иконка для "Transactions"
          ),
        }}
      />
      <Tab.Screen 
        name="Overview" 
        component={OverviewScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart-outline" size={size} color={color} /> // Иконка для "Overview"
          ),
        }}
      />
      <Tab.Screen 
        name="Accounts" 
        component={AccountsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} /> // Иконка для "Accounts"
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
