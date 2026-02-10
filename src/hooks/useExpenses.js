import { useState, useEffect, useCallback } from 'react';
import expenseAPI from '../services/api';

/**
 * Custom hook for managing expenses with API integration
 * Demonstrates useState, useEffect, and useCallback hooks
 */
function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch expenses from mock API on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: apiError } = await expenseAPI.getAll();
        
        if (apiError) {
          setError(apiError);
        } else {
          setExpenses(data);
        }
      } catch (err) {
        setError('Failed to fetch expenses. Please try again.');
        console.error('Error fetching expenses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []); // Empty dependency array means this runs once on mount

  // useCallback to memoize the addExpense function
  const addExpense = useCallback(async (expenseData) => {
    try {
      setError(null);
      const { data, error: apiError } = await expenseAPI.create(expenseData);
      
      if (apiError) {
        setError(apiError);
        return false;
      }

      // Optimistically update UI
      setExpenses(prevExpenses => [...prevExpenses, data]);
      return true;
    } catch (err) {
      setError('Failed to add expense. Please try again.');
      console.error('Error adding expense:', err);
      return false;
    }
  }, []);

  // useCallback to memoize the updateExpense function
  const updateExpense = useCallback(async (updatedExpense) => {
    try {
      setError(null);
      const { data, error: apiError } = await expenseAPI.update(
        updatedExpense.id,
        updatedExpense
      );
      
      if (apiError) {
        setError(apiError);
        return false;
      }

      // Update the expense in state
      setExpenses(prevExpenses =>
        prevExpenses.map(exp => (exp.id === data.id ? data : exp))
      );
      return true;
    } catch (err) {
      setError('Failed to update expense. Please try again.');
      console.error('Error updating expense:', err);
      return false;
    }
  }, []);

  // useCallback to memoize the deleteExpense function
  const deleteExpense = useCallback(async (id) => {
    try {
      setError(null);
      const { error: apiError } = await expenseAPI.delete(id);
      
      if (apiError) {
        setError(apiError);
        return false;
      }

      // Remove the expense from state
      setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete expense. Please try again.');
      console.error('Error deleting expense:', err);
      return false;
    }
  }, []);

  // useCallback to memoize the refresh function
  const refreshExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: apiError } = await expenseAPI.getAll();
      
      if (apiError) {
        setError(apiError);
      } else {
        setExpenses(data);
      }
    } catch (err) {
      setError('Failed to refresh expenses. Please try again.');
      console.error('Error refreshing expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    refreshExpenses,
  };
}

export default useExpenses;
