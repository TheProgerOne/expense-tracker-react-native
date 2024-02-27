import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockAccountsData = [
  {
    id: '1',
    name: 'Kaspi',
    balance: 150000,
    cardNumber: '5687 5748 5265 5678',
    type: 'Debit Card',
    icon: 'wallet-outline',
    color: '#bd1004',
    recentTransactions: 12,
    rewardsPoints: 500,
  },
  {
    id: '2',
    name: 'Freedom Finance',
    balance: 5000000,
    cardNumber: '5687 5748 5265 5678',
    type: 'Deposit',
    icon: 'cash-outline',
    color: '#2196F3', 
    recentTransactions: 8,
    rewardsPoints: 1500,
  },
  {
    id: '3',
    name: 'Tinkoff',
    balance: 1800000,
    cardNumber: '5687 5748 5265 5678',
    type: 'Debit Card',
    icon: 'wallet-outline',
    color: '#dbca0d', 
    recentTransactions: 20,
    rewardsPoints: 2000,
  },
];

const AccountsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderAccountItem = ({ item }) => (
    <TouchableOpacity style={[styles.accountItem, { borderColor: item.color }]}>
      <Ionicons name={item.icon} size={24} color={item.color} />
      <View style={styles.accountDetailsContainer}>
        <Text style={styles.accountName}>{item.name}</Text>
        <Text style={styles.accountDetails}>Balance: {item.balance.toFixed(2)} т</Text>
        <Text style={styles.accountDetails}>{item.cardNumber}</Text>
        <Text style={{ color: item.color }}>{item.type}</Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.featureText}>Recent Transactions: {item.recentTransactions}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Accounts</Text>
      <FlatList
        data={mockAccountsData}
        renderItem={renderAccountItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  accountItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    alignItems: 'center',
  },
  accountDetailsContainer: {
    marginLeft: 15,
  },
  accountName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  accountDetails: {
    fontSize: 16,
  },
  featuresContainer: {
    marginTop: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
});

export default AccountsScreen;
