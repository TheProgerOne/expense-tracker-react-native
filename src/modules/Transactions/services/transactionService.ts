// transactionService.ts

export interface ExpenseHistoryItem {
    id: string;
    amount: string; // В реальном приложении вы можете использовать number для суммы
    date: string; // ISO строка даты для упрощения примера
  }
  
  // Пример данных о транзакциях
  const mockExpenseHistory: ExpenseHistoryItem[] = [
    {
      id: '1',
      amount: '50.00',
      date: '2024-02-01T12:00:00.000Z',
    },
    {
      id: '2',
      amount: '23.50',
      date: '2024-02-05T15:00:00.000Z',
    },
    {
      id: '3',
      amount: '9.99',
      date: '2024-02-12T09:30:00.000Z',
    },
  ];
  
  // Функция для асинхронного получения транзакций
  export const getTransactions = async (): Promise<ExpenseHistoryItem[]> => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    // Возвращаем копию данных, чтобы имитировать поведение API
    return [...mockExpenseHistory];
  };
  