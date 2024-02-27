// FinancialContext.js
import React, { createContext, useContext, useState } from 'react';

const FinancialContext = createContext();

export const useFinancials = () => useContext(FinancialContext);

export const FinancialProvider = ({ children }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);

  return (
    <FinancialContext.Provider value={{ totalExpenses, setTotalExpenses, totalIncomes, setTotalIncomes }}>
      {children}
    </FinancialContext.Provider>
  );
};
