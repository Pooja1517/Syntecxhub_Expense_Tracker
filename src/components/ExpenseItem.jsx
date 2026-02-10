import { useState, useCallback } from 'react';
import './ExpenseItem.css';

const categoryEmojis = {
  Food: '🍔',
  Transport: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Bills: '💡',
  Other: '📦'
};

function ExpenseItem({ expense, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(expense);

  // useCallback to memoize the edit handler
  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  // useCallback to memoize the save handler
  const handleSave = useCallback(() => {
    onUpdate(editData);
    setIsEditing(false);
  }, [editData, onUpdate]);

  // useCallback to memoize the cancel handler
  const handleCancel = useCallback(() => {
    setEditData(expense);
    setIsEditing(false);
  }, [expense]);

  // useCallback to memoize the delete handler
  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(expense.id);
    }
  }, [expense.id, onDelete]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="expense-item editing">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="edit-input"
        />
        <input
          type="number"
          value={editData.amount}
          onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
          className="edit-input small"
          step="0.01"
        />
        <select
          value={editData.category}
          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          className="edit-input small"
        >
          <option value="Food">🍔 Food</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Entertainment">🎬 Entertainment</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Bills">💡 Bills</option>
          <option value="Other">📦 Other</option>
        </select>
        <input
          type="date"
          value={editData.date}
          onChange={(e) => setEditData({ ...editData, date: e.target.value })}
          className="edit-input small"
        />
        <div className="expense-actions">
          <button onClick={handleSave} className="btn-icon save" title="Save">
            ✓
          </button>
          <button onClick={handleCancel} className="btn-icon cancel" title="Cancel">
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-item">
      <div className="expense-icon">
        {categoryEmojis[expense.category] || '📦'}
      </div>
      <div className="expense-details">
        <h3 className="expense-title">{expense.title}</h3>
        <div className="expense-meta">
          <span className="expense-category">{expense.category}</span>
          <span className="expense-date">{formatDate(expense.date)}</span>
        </div>
      </div>
      <div className="expense-amount">
        ${Number(expense.amount).toFixed(2)}
      </div>
      <div className="expense-actions">
        <button onClick={handleEdit} className="btn-icon edit" title="Edit">
          ✏️
        </button>
        <button onClick={handleDelete} className="btn-icon delete" title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
