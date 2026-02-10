import { useState, useRef, useEffect } from 'react';
import './ExpenseForm.css';

function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  // useRef for form field focus management
  const titleInputRef = useRef(null);

  // Focus on title input when component mounts or edit mode changes
  useEffect(() => {
    titleInputRef.current?.focus();
  }, [editingExpense]);

  // Populate form when editing
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !amount || !date) {
      alert('Please fill in all fields');
      return;
    }

    const expenseData = {
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
    };

    if (editingExpense) {
      onUpdateExpense({ ...expenseData, id: editingExpense.id });
    } else {
      onAddExpense(expenseData);
    }

    // Reset form
    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate('');
    titleInputRef.current?.focus();
  };

  const handleCancel = () => {
    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate('');
    onCancelEdit && onCancelEdit();
    titleInputRef.current?.focus();
  };

  return (
    <div className="expense-form-container">
      <h2>{editingExpense ? '✏️ Edit Expense' : '➕ Add New Expense'}</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            ref={titleInputRef}
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Lunch at cafe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Food">🍔 Food</option>
            <option value="Transport">🚗 Transport</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Bills">💡 Bills</option>
            <option value="Other">📦 Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
