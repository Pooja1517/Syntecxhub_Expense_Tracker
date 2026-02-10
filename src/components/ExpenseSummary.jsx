import { useMemo } from 'react';
import './ExpenseSummary.css';

function ExpenseSummary({ total, byCategory, loading }) {
  // useMemo to format the total amount
  const formattedTotal = useMemo(() => {
    return total.toFixed(2);
  }, [total]);

  // useMemo to get sorted categories by amount
  const sortedCategories = useMemo(() => {
    return Object.entries(byCategory).sort(([, a], [, b]) => b - a);
  }, [byCategory]);

  const categoryEmojis = {
    Food: '🍔',
    Transport: '🚗',
    Entertainment: '🎬',
    Shopping: '🛍️',
    Bills: '💡',
    Other: '📦'
  };

  if (loading) {
    return (
      <div className="expense-summary">
        <h2>📊 Summary</h2>
        <div className="summary-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="expense-summary">
      <h2>📊 Summary</h2>
      
      <div className="total-section">
        <h3>Total Expenses</h3>
        <div className="total-amount">${formattedTotal}</div>
      </div>

      {sortedCategories.length > 0 && (
        <div className="category-breakdown">
          <h3>By Category</h3>
          <div className="category-list">
            {sortedCategories.map(([category, amount]) => (
              <div key={category} className="category-item">
                <div className="category-info">
                  <span className="category-emoji">{categoryEmojis[category]}</span>
                  <span className="category-name">{category}</span>
                </div>
                <span className="category-amount">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseSummary;
