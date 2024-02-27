// service/addexpense.js
import { storeData, getData } from './storageService';

const EXPENSES_KEY = 'expenses';

export const addExpense = async (newExpense) => {
  const currentExpenses = await getData(EXPENSES_KEY) || [];
  const updatedExpenses = [...currentExpenses.filter(item => item.key !== newExpense.key), newExpense]; // Exclude the existing category with the same key
  await storeData(EXPENSES_KEY, updatedExpenses);
};

export const getExpenses = async () => {
  return await getData(EXPENSES_KEY);
};

export const deleteCategory = async (categoryKey) => {
  const currentExpenses = await getData(EXPENSES_KEY) || [];
  // Filter out the category and any expenses associated with that category
  const updatedExpenses = currentExpenses.filter(item => item.key !== categoryKey);
  await storeData(EXPENSES_KEY, updatedExpenses);
};