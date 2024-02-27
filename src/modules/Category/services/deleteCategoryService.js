// deleteCategoryService.js
import { storeData, getData } from './storageService';

const EXPENSES_KEY = 'expenses';

export const deleteCategoryAndExpenses = async (categoryKey) => {
  try {
    const currentExpenses = await getData(EXPENSES_KEY) || [];
    const updatedExpenses = currentExpenses.filter(item => item.key !== categoryKey && item.categoryKey !== categoryKey);
    await storeData(EXPENSES_KEY, updatedExpenses);
  } catch (error) {
    console.error("Error deleting category and expenses", error);
    throw new Error("Failed to delete category and expenses");
  }
};
