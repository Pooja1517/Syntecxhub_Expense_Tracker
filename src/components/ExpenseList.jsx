import { useMemo } from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

function ExpenseList({ expenses, onUpdate, onDelete, loading }) {
  // useMemo to optimize sorting of expenses
  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses]);

  if (loading) {
    return (
      <div className="expense-list-container">
        <h2>📋 Your Expenses</h2>
        <div className="loading">Loading expenses...</div>
      </div>
    );
  }

  if (sortedExpenses.length === 0) {
    return (
      <div className="expense-list-container">
        <h2>📋 Your Expenses</h2>
        <div className="empty-state">
          <p>No expenses yet. Start tracking by adding your first expense!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <h2>📋 Your Expenses ({sortedExpenses.length})</h2>
      <div className="expense-list">
        {sortedExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
