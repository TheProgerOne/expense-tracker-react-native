// ./src/modules/Category/CategoriesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'; // Импортируем необходимые компоненты
import PieChartComponent from './components/PieChartComponent';
import CategoryItemComponent from './components/CategoryItem';
import AddExpenseModal from './components/AddExpenseModal';
import AddCategoryModal from './components/AddCategoryModal';
import { CategoryItem } from './types/CategoryItem';
import { styles } from './styles';
import { addExpense, removeExpense, getExpenses } from './services/addexpenseserice'; // Обновлен импорт
import{ Dispatch, SetStateAction } from 'react';


const CategoriesScreen: React.FC = () => {
  const [data, setData] = useState<CategoryItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [newExpense, setNewExpense] = useState('');

  useEffect(() => {
    const loadExpenses = async () => {
      const expensesData = await getExpenses();
      if (expensesData) {
        setData(expensesData);
      }
    };

    loadExpenses();
  }, []);

  const handleCategoryPress = (category: CategoryItem) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleAddExpense = async () => {
    const expenseValue = parseFloat(newExpense);
    if (!isNaN(expenseValue) && selectedCategory) {
      const newExpenseData = { ...selectedCategory, amount: selectedCategory.amount + expenseValue };
      await addExpense(newExpenseData);
      setData(prevData => {
        const filteredData = prevData.filter(item => item.key !== selectedCategory.key);
        return [...filteredData, newExpenseData];
      });
      setNewExpense('');
      setModalVisible(false);
    }
  };

  const handleAddNewCategory = async (category: { name: string; color: string; iconName: string }) => {
    const newCategory: CategoryItem = {
      key: Date.now(),
      amount: 0,
      svg: { fill: category.color },
      category: category.name,
      iconName: category.iconName,
    };
    await addExpense(newCategory);
    setData(prevData => [...prevData, newCategory]);
    setIsAddCategoryModalVisible(false);
  };

  const handleCategoryLongPress = async (category: CategoryItem) => {
    await removeExpense(category.key);
    setData(prevData => prevData.filter(item => item.key !== category.key));
  };

  const handleCategoryDelete = async (category: CategoryItem) => {
    await removeExpense(category.key);
    setData(prevData => prevData.filter(item => item.key !== category.key));
  };

  const totalExpenses = data.reduce((acc, item) => acc + item.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Expenses</Text>
      <View style={additionalStyles.chartContainer}>
        <PieChartComponent data={data} />
        <View style={additionalStyles.centeredView}>
          <Text style={additionalStyles.totalExpensesText}>{`${totalExpenses} T`}</Text>
        </View>
      </View>
      <ScrollView style={styles.categoriesContainer}>
        {data.map((item) => (
          <LongPressGestureHandler
            key={item.key.toString()}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                handleCategoryLongPress(item);
              }
            }}
          >
            <CategoryItemComponent
              item={item}
              onPress={() => handleCategoryPress(item)}
            />
          </LongPressGestureHandler>
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
  onDeleteCategory={handleCategoryDelete}
/>
      <AddCategoryModal
        isVisible={isAddCategoryModalVisible}
        onClose={() => setIsAddCategoryModalVisible(false)}
        onSave={handleAddNewCategory}
      />
    </View>
  );
};

const additionalStyles = StyleSheet.create({
  chartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalExpensesText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default CategoriesScreen;