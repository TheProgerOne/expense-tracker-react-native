// ./src/modules/Category/CategoriesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'; 
import PieChartComponent from './components/PieChartComponent';
import CategoryItemComponent from './components/CategoryItem';
import AddExpenseModal from './components/AddExpenseModal';
import AddCategoryModal from './components/AddCategoryModal';
import { CategoryItem } from './types/CategoryItem';
import { styles } from './styles';
import { addExpense, getExpenses, deleteCategory } from './services/addexpenseserice';
import DeleteCategoryModal from './components/DeleteCategoryModal';
import { useFinancials } from '../../FinancialContext';


const CategoriesScreen: React.FC = () => {
  const [data, setData] = useState<CategoryItem[]>([]);
  const [expenseHistory, setExpenseHistory] = useState<ExpenseHistoryItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { setTotalExpenses } = useFinancials();
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [newExpense, setNewExpense] = useState('');

  useEffect(() => {
    const loadExpenses = async () => {
      const expensesData = await getExpenses();
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      if (expensesData) {
        const filteredExpenses = expensesData.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
          
        });
        setData(filteredExpenses);
        
      }
    };

    loadExpenses();
  }, []);

  const handleCategoryPress = (category: CategoryItem) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleCategoryLongPress = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsDeleteCategoryModalVisible(true);
  };

  const handleDeleteCategory = async () => {
    if (selectedCategory) {
      await deleteCategory(selectedCategory.key);
      setData(data.filter(item => item.key !== selectedCategory.key));
      setIsDeleteCategoryModalVisible(false);
    }
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

  
  const handleAddExpenseSuccess = (newExpenseItem: ExpenseHistoryItem) => {
    setExpenseHistory(prevHistory => [...prevHistory, newExpenseItem]);
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

  const totalExpenses = data.reduce((acc, item) => acc + item.amount, 0);
  setTotalExpenses(totalExpenses);

  const now = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[now.getMonth()];
  const currentYear = now.getFullYear();

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Expenses for {currentMonthName} {currentYear}</Text>
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
            <View>
              <CategoryItemComponent
                item={item}
                onPress={() => handleCategoryPress(item)}
              />
            </View>
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
        onAddExpenseSuccess={handleAddExpenseSuccess}
        setNewExpense={setNewExpense}
      />
      <AddCategoryModal
        isVisible={isAddCategoryModalVisible}
        onClose={() => setIsAddCategoryModalVisible(false)}
        onSave={handleAddNewCategory}
      />
      <DeleteCategoryModal
        isVisible={isDeleteCategoryModalVisible}
        onClose={() => setIsDeleteCategoryModalVisible(false)}
        onDeleteCategory={handleDeleteCategory}
        categoryName={selectedCategory ? selectedCategory.category : ''}
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