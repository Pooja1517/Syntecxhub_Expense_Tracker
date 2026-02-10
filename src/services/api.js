// Mock API service for expenses
const STORAGE_KEY = 'syntecxhub_expenses';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initial mock data
const initialExpenses = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 85.50,
    category: 'Food',
    date: '2026-02-08',
  },
  {
    id: '2',
    title: 'Uber Ride',
    amount: 25.00,
    category: 'Transport',
    date: '2026-02-09',
  },
  {
    id: '3',
    title: 'Movie Tickets',
    amount: 30.00,
    category: 'Entertainment',
    date: '2026-02-07',
  },
  {
    id: '4',
    title: 'Electric Bill',
    amount: 120.00,
    category: 'Bills',
    date: '2026-02-05',
  },
];

// Get expenses from localStorage or use initial data
const getStoredExpenses = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialExpenses;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return initialExpenses;
  }
};

// Save expenses to localStorage
const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Mock API functions
export const expenseAPI = {
  // Fetch all expenses (simulate API call)
  async getAll() {
    await delay(500); // Simulate network delay
    const expenses = getStoredExpenses();
    return { data: expenses, error: null };
  },

  // Add new expense
  async create(expense) {
    await delay(300);
    const expenses = getStoredExpenses();
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    const updatedExpenses = [...expenses, newExpense];
    saveExpenses(updatedExpenses);
    return { data: newExpense, error: null };
  },

  // Update expense
  async update(id, updatedData) {
    await delay(300);
    const expenses = getStoredExpenses();
    const index = expenses.findIndex(exp => exp.id === id);
    
    if (index === -1) {
      return { data: null, error: 'Expense not found' };
    }

    expenses[index] = { ...expenses[index], ...updatedData };
    saveExpenses(expenses);
    return { data: expenses[index], error: null };
  },

  // Delete expense
  async delete(id) {
    await delay(300);
    const expenses = getStoredExpenses();
    const filteredExpenses = expenses.filter(exp => exp.id !== id);
    saveExpenses(filteredExpenses);
    return { data: { id }, error: null };
  },

  // Get expenses by category
  async getByCategory(category) {
    await delay(400);
    const expenses = getStoredExpenses();
    const filtered = expenses.filter(exp => exp.category === category);
    return { data: filtered, error: null };
  },

  // Get expenses by date range
  async getByDateRange(startDate, endDate) {
    await delay(400);
    const expenses = getStoredExpenses();
    const filtered = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate >= new Date(startDate) && expDate <= new Date(endDate);
    });
    return { data: filtered, error: null };
  },
};

export default expenseAPI;
