// src/screens/CategoriesScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import CategoryItemComponent from '../components/CategoryItem';
import AddExpenseModal from '../components/AddExpenseModal';
import { CategoryItem } from '../types';

const CategoriesScreen: React.FC = () => {
  const [data, setData] = useState<CategoryItem[]>([
    {
      key: 1,
      amount: 9051,
      svg: { fill: '#600080' },
      category: 'Groceries',
    },
    {
      key: 2,
      amount: 6051,
      svg: { fill: '#990099' },
      category: 'Entertainment',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [newExpense, setNewExpense] = useState('');

  const totalExpenses = data.reduce((total, item) => total + item.amount, 0);

  const pieData = data.map(item => ({
    key: item.key,
    value: (item.amount / totalExpenses) * 100,
    svg: item.svg,
    category: item.category,
    amount: item.amount,
  }));

  const chartSize = 200;

  const handleCategoryPress = (category: CategoryItem) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleAddExpense = () => {
    const expenseValue = parseFloat(newExpense);
    if (!isNaN(expenseValue) && selectedCategory) {
      const newData = data.map(item => {
        if (item.key === selectedCategory.key) {
          return { ...item, amount: item.amount + expenseValue };
        }
        return item;
      });
      setData(newData);
      setNewExpense('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Expenses</Text>
      <View style={styles.chartContainer}>
        <PieChart style={{ width: chartSize, height: chartSize }} data={pieData} />
      </View>
      <ScrollView style={styles.categoriesContainer}>
        {pieData.map((item) => (
          <CategoryItemComponent
            key={item.key}
            item={item}
            onPress={() => handleCategoryPress(item)}
          />
        ))}
      </ScrollView>
      <AddExpenseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newExpense={newExpense}
        setNewExpense={setNewExpense}
        handleAddExpense={handleAddExpense}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  categoriesContainer: {
    width: '100%',
  },
});

export default CategoriesScreen;
