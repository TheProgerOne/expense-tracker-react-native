// service/addexpense.js
import { storeData, getData } from './storageService';


const INCOME_KEY = 'incomes';

export const addIncome = async (newIncome) => {
  const currentIncome = await getData(INCOME_KEY) || [];
  const updatedIncome = [...currentIncome, newIncome]; 
  await storeData(INCOME_KEY, updatedIncome);
};

export const getIncomes = async () => {
  return await getData(INCOME_KEY);
};

export const deleteIncome = async (incomeId) => {
  const currentIncome = await getData(INCOME_KEY) || [];
  const updatedIncome = currentIncome.filter(item => item.id !== incomeId); 
  await storeData(INCOME_KEY, updatedIncome);
};