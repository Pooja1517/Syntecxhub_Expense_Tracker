import { useState, useCallback, useMemo } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import useExpenses from './hooks/useExpenses';
import './App.css';

function App() {
  const { expenses, loading, error, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [filter, setFilter] = useState('all');

  // useCallback to memoize the filter change handler
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  // useMemo to compute filtered expenses (performance optimization)
  const filteredExpenses = useMemo(() => {
    if (filter === 'all') return expenses;
    return expenses.filter(expense => expense.category.toLowerCase() === filter.toLowerCase());
  }, [expenses, filter]);

  // useMemo to calculate total expenses (performance optimization)
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  }, [expenses]);

  // useMemo to calculate expenses by category
  const expensesByCategory = useMemo(() => {
    const categoryTotals = {};
    expenses.forEach(expense => {
      const category = expense.category;
      categoryTotals[category] = (categoryTotals[category] || 0) + Number(expense.amount);
    });
    return categoryTotals;
  }, [expenses]);

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>💰 Expense Tracker</h1>
          <p className="subtitle">Track your expenses efficiently | Syntecxhub Project</p>
        </header>

        {error && <div className="error-message">{error}</div>}
        
        <div className="main-content">
          <div className="left-section">
            <ExpenseForm onAddExpense={addExpense} />
            <ExpenseSummary 
              total={totalExpenses}
              byCategory={expensesByCategory}
              loading={loading}
            />
          </div>

          <div className="right-section">
            <div className="filter-section">
              <label htmlFor="filter">Filter by Category:</label>
              <select 
                id="filter"
                value={filter} 
                onChange={(e) => handleFilterChange(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <ExpenseList 
              expenses={filteredExpenses}
              onUpdate={updateExpense}
              onDelete={deleteExpense}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
