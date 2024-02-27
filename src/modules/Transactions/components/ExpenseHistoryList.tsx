// ./src/modules/Transaction/components/ExpenseHistoryList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
interface Props {
  expenseHistory: ExpenseHistoryItem[];
}

const ExpenseHistoryList: React.FC<Props> = ({ expenseHistory }) => {
  const renderItem = ({ item }: { item: ExpenseHistoryItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.amountText}>{item.amount} T</Text>
      <Text style={styles.dateText}>{item.date.toDateString()}</Text>
    </View>
  );

  return (
    <FlatList
      data={expenseHistory}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  amountText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ExpenseHistoryList;
