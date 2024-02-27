import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Убедитесь, что установили expo/vector-icons

const TransactionScreen: React.FC = () => {
  const [expenseHistory, setExpenseHistory] = useState<ExpenseHistoryItem[]>([]);

  useEffect(() => {
    const mockData: ExpenseHistoryItem[] = [
      { id: '1', category: 'Groceries', amount: 2000, date: new Date('2024-02-24') },
      { id: '2', category: 'Entertainment', amount: 1500, date: new Date('2024-02-24') },
      { id: '3', category: 'Utilities', amount: 800, date: new Date('2024-02-24') },
      { id: '4', category: 'Groceries', amount: 3500, date: new Date('2024-02-24') },
      { id: '5', category: 'Groceries', amount: 4000, date: new Date('2024-02-24') },
    ];
    setExpenseHistory(mockData);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Groceries': return 'shopping-cart';
      case 'Utilities': return 'lightbulb';
      case 'Entertainment': return 'local-movies';
      default: return 'category';
    }
  };

  const renderItem = ({ item }: { item: ExpenseHistoryItem }) => (
    <View style={styles.card}>
      <MaterialIcons name={getCategoryIcon(item.category)} size={24} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text style={styles.amountText}>{`${item.amount} T`}</Text>
        <Text style={styles.dateText}>{item.date.toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList data={expenseHistory} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 16,
    color: '#2e7d32',
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default TransactionScreen;
