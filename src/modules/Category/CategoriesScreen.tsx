// ./src/modules/Category/CategoriesScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import PieChartComponent from './components/PieChartComponent';
import CategoryItemComponent from './components/CategoryItem';
import AddExpenseModal from './components/AddExpenseModal';
import AddCategoryModal from './components/AddCategoryModal';
import { CategoryItem } from './types/CategoryItem'; // Ensure this type is correctly defined
import { styles } from './styles';

const CategoriesScreen: React.FC = () => {
  const [data, setData] = useState<CategoryItem[]>([
    { key: 1, amount: 9051, svg: { fill: '#600080' }, category: 'Groceries', iconName: 'cart' },
    { key: 2, amount: 6051, svg: { fill: '#990099' }, category: 'Entertainment', iconName: 'theater' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [newExpense, setNewExpense] = useState('');

  const handleCategoryPress = (category: CategoryItem) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleAddExpense = () => {
    const expenseValue = parseFloat(newExpense);
    if (!isNaN(expenseValue) && selectedCategory) {
      const newData = data.map((item) =>
        item.key === selectedCategory.key ? { ...item, amount: item.amount + expenseValue } : item,
      );
      setData(newData);
      setNewExpense('');
      setModalVisible(false);
    }
  };

  const handleAddNewCategory = (category: { name: string; color: string; iconName: string }) => {
    const newCategory: CategoryItem = {
      key: Date.now(), // Using current timestamp for unique key
      amount: 0,
      svg: { fill: category.color }, // Using 'color' for the 'svg.fill' property
      category: category.name,
      iconName: category.iconName,
    };
    setData([...data, newCategory]);
    setIsAddCategoryModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Expenses</Text>
      <PieChartComponent data={data} />
      <ScrollView style={styles.categoriesContainer}>
        {data.map((item) => (
          <CategoryItemComponent
            key={item.key.toString()}
            item={item}
            onPress={() => handleCategoryPress(item)}
          />
        ))}
        <TouchableOpacity
          style={styles.addNewCategoryButton}
          onPress={() => setIsAddCategoryModalVisible(true)}
        >
          <Text style={styles.addNewCategoryText}>+ Add New Category</Text>
        </TouchableOpacity>
      </ScrollView>
      <AddExpenseModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExpense={handleAddExpense}
        newExpense={newExpense}
        setNewExpense={setNewExpense}
      />
      <AddCategoryModal
        isVisible={isAddCategoryModalVisible}
        onClose={() => setIsAddCategoryModalVisible(false)}
        onSave={handleAddNewCategory}
      />
    </View>
  );
};

export default CategoriesScreen;
