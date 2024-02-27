import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import PieChartComponent from './components/PieChartComponent';
import CategoryItemComponent from './components/CategoryItem';
import AddIncomeModal from './components/AddIncomeModal';
import AddCategoryModal from './components/AddCategoryModal';
import { CategoryItem } from './types/CategoryItem';
import { styles } from './styles';
import { addIncome, getIncomes, deleteIncome } from './services/incomeService';
import DeleteCategoryModal from './components/DeleteCategoryModal';
import { useFinancials } from '../../FinancialContext';

const IncomesScreen: React.FC = () => {
  const [data, setData] = useState<CategoryItem[]>([]);
  const [incomeHistory, setIncomeHistory] = useState<IncomeHistoryItem[]>([]);
  const { setTotalIncomes } = useFinancials();
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [newIncome, setNewIncome] = useState('');

  useEffect(() => {
    setTotalIncomes(totalIncomes);

    const loadIncomes = async () => {
      const incomesData = await getIncomes();
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      if (incomesData) {
        const filteredIncomes = incomesData.filter(income => {
          const incomeDate = new Date(income.date);
          return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear;
        });

        setData(filteredIncomes);
      }
    };

    loadIncomes();
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
      await deleteIncome(selectedCategory.key);
      setData(data.filter(item => item.key !== selectedCategory.key));
      setIsDeleteCategoryModalVisible(false);
    }
  };

  const handleAddIncome = async () => {
    const incomeValue = parseFloat(newIncome);
    if (!isNaN(incomeValue) && selectedCategory) {
      const newIncomeData = { ...selectedCategory, amount: selectedCategory.amount + incomeValue };
      await addIncome(newIncomeData);
      setData(prevData => {
        const filteredData = prevData.filter(item => item.key !== selectedCategory.key);
        return [...filteredData, newIncomeData];
      });
      setNewIncome('');
      setModalVisible(false);
    }
  };

  const handleAddIncomeSuccess = (newIncomeItem: IncomeHistoryItem) => {
    setIncomeHistory(prevHistory => [...prevHistory, newIncomeItem]);
  };

  const handleAddNewCategory = async (category: { name: string; color: string; iconName: string }) => {
    const newCategory: CategoryItem = {
      key: Date.now(),
      amount: 0,
      svg: { fill: category.color },
      category: category.name,
      iconName: category.iconName,
    };
    await addIncome(newCategory);
    setData(prevData => [...prevData, newCategory]);
    setIsAddCategoryModalVisible(false);
  };

  const totalIncomes = data.reduce((acc, item) => acc + item.amount, 0);
  setTotalIncomes(totalIncomes);
  const now = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[now.getMonth()];
  const currentYear = now.getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incomes for {currentMonthName} {currentYear}</Text>
      <View style={additionalStyles.chartContainer}>
        <PieChartComponent data={data} />
        <View style={additionalStyles.centeredView}>
          <Text style={additionalStyles.totalIncomesText}>{`${totalIncomes} T`}</Text>
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
      <AddIncomeModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddIncome={handleAddIncome}
        newIncome={newIncome}
        onAddIncomeSuccess={handleAddIncomeSuccess}
        setNewIncome={setNewIncome}
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
    marginBottom: 10,
  },
  centeredView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalIncomesText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default IncomesScreen;
