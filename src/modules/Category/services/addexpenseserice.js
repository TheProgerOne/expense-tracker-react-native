// service/addexpense.js
import { storeData, getData } from './storageService';

const EXPENSES_KEY = 'expenses';

export const addExpense = async (newExpense) => {
  const currentExpenses = await getData(EXPENSES_KEY) || [];
  const updatedExpenses = [...currentExpenses.filter(item => item.key !== newExpense.key), newExpense]; // Исключаем существующую категорию с таким же ключом
  await storeData(EXPENSES_KEY, updatedExpenses);
};

export const removeExpense = async (keyToRemove) => {
  const currentExpenses = await getData(EXPENSES_KEY) || [];
  const updatedExpenses = currentExpenses.filter(item => item.key !== keyToRemove);
  await storeData(EXPENSES_KEY, updatedExpenses);
};

export const getExpenses = async () => {
  return await getData(EXPENSES_KEY);
};
