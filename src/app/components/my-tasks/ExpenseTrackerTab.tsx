'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  ExpenseTransaction,
  ExpenseCategory,
  TransactionType,
  ExpenseView,
} from './types';
import ExpenseDashboardView from './expense-tracker/ExpenseDashboardView';
import ExpenseMonthlyView from './expense-tracker/ExpenseMonthlyView';
import ExpenseYearlyView from './expense-tracker/ExpenseYearlyView';
import ExpenseCategoriesView from './expense-tracker/ExpenseCategoriesView';
import TransactionModal from './expense-tracker/TransactionModal';
import CategoryModal from './expense-tracker/CategoryModal';
import DeleteCategoryModal from './expense-tracker/DeleteCategoryModal';
import DeleteTransactionModal from './expense-tracker/DeleteTransactionModal';
import UndoNotification from './expense-tracker/UndoNotification';
import NotificationSystem, { Notification, NotificationType } from './expense-tracker/NotificationSystem';
import { useKeyboardShortcuts } from './expense-tracker/useKeyboardShortcuts';
import { PeriodType } from './expense-tracker/PeriodSelector';

// Default categories with icons and colors
const defaultCategories: Omit<ExpenseCategory, 'id' | 'user_id' | 'created_at'>[] = [
  { name: 'Food & Dining', color: '#EF4444', icon: '🍔', type: 'expense' },
  { name: 'Transportation', color: '#3B82F6', icon: '🚗', type: 'expense' },
  { name: 'Shopping', color: '#8B5CF6', icon: '🛍️', type: 'expense' },
  { name: 'Bills & Utilities', color: '#F59E0B', icon: '💡', type: 'expense' },
  { name: 'Entertainment', color: '#EC4899', icon: '🎬', type: 'expense' },
  { name: 'Healthcare', color: '#10B981', icon: '🏥', type: 'expense' },
  { name: 'Education', color: '#06B6D4', icon: '📚', type: 'expense' },
  { name: 'Salary', color: '#10B981', icon: '💰', type: 'income' },
  { name: 'Freelance', color: '#3B82F6', icon: '💼', type: 'income' },
  { name: 'Investment', color: '#8B5CF6', icon: '📈', type: 'income' },
];

export default function ExpenseTrackerTab() {
  const supabase = useMemo(() => createClientComponentClient(), []);
  const [activeView, setActiveView] = useState<ExpenseView>('dashboard');
  const [navigateToMonth, setNavigateToMonth] = useState<{ year: number; month: number } | null>(null);
  const [transactions, setTransactions] = useState<ExpenseTransaction[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Transaction modal state
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<ExpenseTransaction | null>(null);
  const [transactionType, setTransactionType] = useState<TransactionType>('expense');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionCategory, setTransactionCategory] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [transactionTime, setTransactionTime] = useState('');

  // Category modal state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#3B82F6');
  const [categoryIcon, setCategoryIcon] = useState('💰');
  const [categoryType, setCategoryType] = useState<TransactionType>('expense');
  const [categoryModalFromTransaction, setCategoryModalFromTransaction] = useState(false);
  const [categoryValidationErrors, setCategoryValidationErrors] = useState<{ name?: string }>({});
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ExpenseCategory | null>(null);
  const [showDeleteTransactionModal, setShowDeleteTransactionModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<ExpenseTransaction | null>(null);
  const [deletedTransaction, setDeletedTransaction] = useState<ExpenseTransaction | null>(null);
  const [showUndoNotification, setShowUndoNotification] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const searchInputRef = useState<HTMLInputElement | null>(null)[0];

  // Period selector state
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('today');

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterAmountMin, setFilterAmountMin] = useState('');
  const [filterAmountMax, setFilterAmountMax] = useState('');

  // Date formatters
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    []
  );

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    []
  );

  // Load categories
  const loadCategories = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const { data, error: fetchError } = await supabase
        .from('expense_categories')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('name', { ascending: true });

      if (fetchError) {
        console.error('Fetch categories error', fetchError);
        return;
      }

      if (data && data.length > 0) {
        setCategories(data as ExpenseCategory[]);
      } else {
        // Initialize default categories
        const userId = userData.user.id;
        const defaultCats = defaultCategories.map((cat) => ({
          ...cat,
          user_id: userId,
        }));

        const { error: insertError } = await supabase
          .from('expense_categories')
          .insert(defaultCats);

        if (!insertError) {
          const { data: newData } = await supabase
            .from('expense_categories')
            .select('*')
            .eq('user_id', userId);
          if (newData) setCategories(newData as ExpenseCategory[]);
        }
      }
    } catch (err) {
      console.error('Error loading categories', err);
    }
  };

  // Load transactions
  const loadTransactions = async () => {
    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const { data, error: fetchError } = await supabase
        .from('expense_transactions')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('transaction_date', { ascending: false })
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Fetch transactions error', fetchError);
        setError(fetchError.message);
        return;
      }

      // Ensure data is properly formatted
      const formattedData = (data || []).map((t: any) => {
        // Normalize transaction_date to YYYY-MM-DD format
        let normalizedDate = t.transaction_date;
        if (normalizedDate) {
          // If it's a full timestamp, extract just the date part
          if (normalizedDate.includes('T')) {
            normalizedDate = normalizedDate.split('T')[0];
          }
          // If it's not in YYYY-MM-DD format, try to parse it
          if (!normalizedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            try {
              const date = new Date(normalizedDate);
              normalizedDate = date.toISOString().split('T')[0];
            } catch (e) {
              console.warn('Could not parse date:', normalizedDate);
            }
          }
        }
        
        return {
          ...t,
          transaction_date: normalizedDate, // Ensure date is in YYYY-MM-DD format
          amount: typeof t.amount === 'string' ? parseFloat(t.amount) : Number(t.amount), // Ensure amount is a number
        };
      });
      
      console.log(`Loaded ${formattedData.length} transactions from database`);
      if (formattedData.length > 0) {
        console.log('Sample transactions:', formattedData.slice(0, 3).map(t => ({
          id: t.id,
          date: t.transaction_date,
          amount: t.amount,
          type: t.type,
        })));
      }
      
      setTransactions(formattedData);
      setError(null);
    } catch (err) {
      console.error('Error loading transactions', err);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get date range based on period
  const getPeriodDateRange = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (selectedPeriod) {
      case 'today': {
        const todayStr = today.toISOString().split('T')[0];
        return {
          from: todayStr,
          to: todayStr,
          label: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
      }
      case 'this_month': {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        return {
          from: firstDay.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0],
          label: `${firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        };
      }
      case 'all_time':
      default:
        return {
          from: '',
          to: '',
          label: 'All Time',
        };
    }
  }, [selectedPeriod]);

  // Enhanced search function with date parsing
  const parseSearchQuery = (query: string) => {
    const trimmed = query.trim().toLowerCase();
    
    // Try to parse date in DD/MM/YYYY or DD-MM-YYYY format
    const dateMatch = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (dateMatch) {
      const [, day, month, year] = dateMatch;
      const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      return { type: 'date' as const, value: dateStr };
    }
    
    return { type: 'text' as const, value: trimmed };
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Period filter
    if (selectedPeriod !== 'all_time') {
      const { from, to } = getPeriodDateRange;
      
      // Normalize transaction dates to YYYY-MM-DD format for comparison
      const normalizeDate = (dateStr: string | Date): string => {
        if (!dateStr) return '';
        
        // If it's already in YYYY-MM-DD format, return as is
        if (typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return dateStr;
        }
        
        // If it's a Date object, convert to YYYY-MM-DD
        if (dateStr instanceof Date) {
          const year = dateStr.getFullYear();
          const month = String(dateStr.getMonth() + 1).padStart(2, '0');
          const day = String(dateStr.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
        
        // Otherwise, try to parse and format
        try {
          // Handle various date formats
          let date: Date;
          if (typeof dateStr === 'string') {
            // If it includes time, extract just the date part
            if (dateStr.includes('T')) {
              date = new Date(dateStr.split('T')[0]);
            } else {
              date = new Date(dateStr);
            }
          } else {
            date = new Date(dateStr);
          }
          
          // Check if date is valid
          if (isNaN(date.getTime())) {
            console.warn('Invalid date:', dateStr);
            return '';
          }
          
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        } catch (e) {
          console.warn('Error normalizing date:', dateStr, e);
          return '';
        }
      };
      
      if (from && to) {
        // For date range filters, include transactions on both start and end dates
        filtered = filtered.filter((t) => {
          if (!t.transaction_date) return false;
          const normalizedDate = normalizeDate(t.transaction_date);
          if (!normalizedDate) return false;
          // Use string comparison for dates in YYYY-MM-DD format
          return normalizedDate >= from && normalizedDate <= to;
        });
      } else if (from) {
        filtered = filtered.filter((t) => {
          if (!t.transaction_date) return false;
          const normalizedDate = normalizeDate(t.transaction_date);
          if (!normalizedDate) return false;
          return normalizedDate >= from;
        });
      } else if (to) {
        filtered = filtered.filter((t) => {
          if (!t.transaction_date) return false;
          const normalizedDate = normalizeDate(t.transaction_date);
          if (!normalizedDate) return false;
          return normalizedDate <= to;
        });
      }
      
      // Debug logging
      console.log(`[Period Filter] Period: ${selectedPeriod}, From: ${from}, To: ${to}`);
      console.log(`[Period Filter] Total transactions: ${transactions.length}, Filtered: ${filtered.length}`);
      if (filtered.length > 0) {
        console.log('[Period Filter] Sample filtered transactions:', filtered.slice(0, 3).map(t => {
          const normalized = normalizeDate(t.transaction_date);
          return {
            original: t.transaction_date,
            normalized: normalized,
            amount: t.amount,
            type: t.type,
            inRange: from && to ? (normalized >= from && normalized <= to) : 'N/A'
          };
        }));
      } else if (transactions.length > 0) {
        console.log('[Period Filter] No transactions match. Sample transaction dates:', transactions.slice(0, 3).map(t => ({
          original: t.transaction_date,
          normalized: normalizeDate(t.transaction_date),
          from: from,
          to: to
        })));
      }
    }

    // Enhanced search filter
    if (searchQuery.trim()) {
      const parsed = parseSearchQuery(searchQuery);
      if (parsed.type === 'date') {
        filtered = filtered.filter((t) => t.transaction_date === parsed.value);
      } else {
        const query = parsed.value;
        filtered = filtered.filter((t) => {
          const category = categories.find((c) => c.id === t.category_id);
          return (
            t.description?.toLowerCase().includes(query) ||
            category?.name.toLowerCase().includes(query) ||
            t.transaction_date.includes(query) ||
            t.amount.toString().includes(query)
          );
        });
      }
    }

    // Category filter
    if (filterCategory) {
      filtered = filtered.filter((t) => t.category_id === filterCategory);
    }

    // Date range filter (manual override)
    if (filterDateFrom) {
      filtered = filtered.filter((t) => t.transaction_date >= filterDateFrom);
    }
    if (filterDateTo) {
      filtered = filtered.filter((t) => t.transaction_date <= filterDateTo);
    }

    // Amount range filter
    if (filterAmountMin) {
      const min = parseFloat(filterAmountMin);
      filtered = filtered.filter((t) => t.amount >= min);
    }
    if (filterAmountMax) {
      const max = parseFloat(filterAmountMax);
      filtered = filtered.filter((t) => t.amount <= max);
    }

    // Sort by transaction_date (descending) then created_at (descending)
    return filtered.sort((a, b) => {
      const dateCompare = new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime();
      if (dateCompare !== 0) return dateCompare;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [
    transactions,
    selectedPeriod,
    getPeriodDateRange,
    searchQuery,
    filterCategory,
    filterDateFrom,
    filterDateTo,
    filterAmountMin,
    filterAmountMax,
    categories,
  ]);

  // Get previous period transactions for comparison
  const previousPeriodTransactions = useMemo((): ExpenseTransaction[] => {
    const now = new Date();
    let from: string;
    let to: string;

    switch (selectedPeriod) {
      case 'today': {
        // Compare with yesterday
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        from = yesterday.toISOString().split('T')[0];
        to = yesterday.toISOString().split('T')[0];
        break;
      }
      case 'this_month': {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        from = lastMonth.toISOString().split('T')[0];
        to = lastMonthEnd.toISOString().split('T')[0];
        break;
      }
      case 'all_time':
      default:
        return [];
    }

    return transactions.filter(
      (t) => t.transaction_date >= from && t.transaction_date <= to
    );
  }, [transactions, selectedPeriod]);

  // Calculate summary statistics with month-over-month comparison
  const summary = useMemo(() => {
    console.log(`[Summary] Calculating for period: ${selectedPeriod}`);
    console.log(`[Summary] Filtered transactions count: ${filteredTransactions.length}`);
    console.log(`[Summary] Date range: ${getPeriodDateRange.from} to ${getPeriodDateRange.to}`);
    
    // Ensure amounts are numbers (handle string/numeric types from database)
    const incomeTransactions = filteredTransactions.filter((t) => t.type === 'income');
    const expenseTransactions = filteredTransactions.filter((t) => t.type === 'expense');
    
    console.log(`[Summary] Income transactions: ${incomeTransactions.length}, Expense transactions: ${expenseTransactions.length}`);
    
    const income = incomeTransactions.reduce((sum, t) => {
      const amount = typeof t.amount === 'string' ? parseFloat(t.amount) : Number(t.amount);
      const validAmount = isNaN(amount) ? 0 : amount;
      return sum + validAmount;
    }, 0);
    
    const expenses = expenseTransactions.reduce((sum, t) => {
      const amount = typeof t.amount === 'string' ? parseFloat(t.amount) : Number(t.amount);
      const validAmount = isNaN(amount) ? 0 : amount;
      return sum + validAmount;
    }, 0);
    
    const net = income - expenses;
    
    console.log(`[Summary] Income: ${income}, Expenses: ${expenses}, Net: ${net}`);

    // Previous period calculations
    const prevIncome = previousPeriodTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => {
        const amount = typeof t.amount === 'string' ? parseFloat(t.amount) : Number(t.amount);
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
    const prevExpenses = previousPeriodTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => {
        const amount = typeof t.amount === 'string' ? parseFloat(t.amount) : Number(t.amount);
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
    const prevNet = prevIncome - prevExpenses;

    // Calculate changes
    const incomeChange = income - prevIncome;
    const expensesChange = expenses - prevExpenses;
    const netChange = net - prevNet;

    // Calculate percentages
    const incomeChangePercent = prevIncome > 0 ? (incomeChange / prevIncome) * 100 : 0;
    const expensesChangePercent = prevExpenses > 0 ? (expensesChange / prevExpenses) * 100 : 0;
    const netChangePercent = prevNet !== 0 ? (netChange / Math.abs(prevNet)) * 100 : 0;

    return {
      income,
      expenses,
      net,
      incomeChange,
      expensesChange,
      netChange,
      incomeChangePercent,
      expensesChangePercent,
      netChangePercent,
    };
  }, [filteredTransactions, previousPeriodTransactions]);

  // Monthly breakdown
  const monthlyBreakdown = useMemo(() => {
    const breakdown: { [key: string]: { income: number; expense: number } } = {};
    filteredTransactions.forEach((t) => {
      const month = t.transaction_date.substring(0, 7); // YYYY-MM
      if (!breakdown[month]) {
        breakdown[month] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        breakdown[month].income += t.amount;
      } else {
        breakdown[month].expense += t.amount;
      }
    });
    return breakdown;
  }, [filteredTransactions]);

  // Yearly breakdown
  const yearlyBreakdown = useMemo(() => {
    const breakdown: { [key: string]: { income: number; expense: number } } = {};
    filteredTransactions.forEach((t) => {
      const year = t.transaction_date.substring(0, 4); // YYYY
      if (!breakdown[year]) {
        breakdown[year] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        breakdown[year].income += t.amount;
      } else {
        breakdown[year].expense += t.amount;
      }
    });
    return breakdown;
  }, [filteredTransactions]);

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const breakdown: { [key: string]: number } = {};
    filteredTransactions.forEach((t) => {
      const catId = t.category_id;
      if (!breakdown[catId]) breakdown[catId] = 0;
      breakdown[catId] += t.amount;
    });
    return breakdown;
  }, [filteredTransactions]);

  // Category transaction counts
  const categoryTransactionCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    transactions.forEach((t) => {
      const catId = t.category_id;
      if (!counts[catId]) counts[catId] = 0;
      counts[catId]++;
    });
    return counts;
  }, [transactions]);

  // Recent transactions (last 10, from ALL transactions regardless of period filter)
  // This shows the most recent transactions to help users see their latest activity
  const recentTransactions = useMemo(() => {
    // Sort all transactions by most recent first (by transaction_date, then created_at)
    const sorted = [...transactions].sort((a, b) => {
      const dateCompare = new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime();
      if (dateCompare !== 0) return dateCompare;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    return sorted.slice(0, 10);
  }, [transactions]);

  // Open transaction modal
  const openTransactionModal = (transaction?: ExpenseTransaction, isDuplicate = false) => {
    if (transaction) {
      // If duplicating, don't set editingTransaction so it creates a new one
      setEditingTransaction(isDuplicate ? null : transaction);
      setTransactionType(transaction.type);
      setTransactionAmount(transaction.amount.toString());
      setTransactionCategory(transaction.category_id);
      setTransactionDescription(transaction.description || '');
      setTransactionDate(transaction.transaction_date);
      // Extract time if available (assuming format YYYY-MM-DD HH:MM:SS)
      const dateTime = new Date(transaction.created_at);
      const hours = String(dateTime.getHours()).padStart(2, '0');
      const minutes = String(dateTime.getMinutes()).padStart(2, '0');
      setTransactionTime(`${hours}:${minutes}`);
    } else {
      setEditingTransaction(null);
      setTransactionType('expense');
      setTransactionAmount('');
      setTransactionCategory('');
      setTransactionDescription('');
      setTransactionDate(new Date().toISOString().split('T')[0]);
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTransactionTime(`${hours}:${minutes}`);
    }
    setShowTransactionModal(true);
  };

  // Close transaction modal
  const closeTransactionModal = () => {
    setShowTransactionModal(false);
    setEditingTransaction(null);
    setTransactionType('expense');
    setTransactionAmount('');
    setTransactionCategory('');
    setTransactionDescription('');
    setTransactionDate(new Date().toISOString().split('T')[0]);
    setTransactionTime('');
  };

  // Save transaction
  const handleSaveTransaction = async () => {
    setError(null);
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError('You must be signed in to save transactions.');
      return;
    }

    // Combine date and time if time is provided
    let finalDate = transactionDate;
    if (transactionTime) {
      const [hours, minutes] = transactionTime.split(':');
      const dateWithTime = new Date(transactionDate);
      dateWithTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      finalDate = dateWithTime.toISOString().split('T')[0];
    }

    const transactionData = {
      user_id: userData.user.id,
      type: transactionType,
      amount: parseFloat(transactionAmount),
      category_id: transactionCategory,
      description: transactionDescription.trim() || null,
      transaction_date: finalDate,
    };

    if (editingTransaction) {
      // Update
      const { error: updateError } = await supabase
        .from('expense_transactions')
        .update(transactionData)
        .eq('id', editingTransaction.id)
        .eq('user_id', userData.user.id);

      if (updateError) {
        setError(updateError.message);
        return;
      }
      addNotification('success', 'Transaction updated successfully!');
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from('expense_transactions')
        .insert(transactionData);

      if (insertError) {
        setError(insertError.message);
        return;
      }
      addNotification('success', 'Transaction added successfully!');
    }

    // Reload transactions immediately
    await loadTransactions();

    // Clear form and close modal after a short delay
    setTimeout(() => {
      closeTransactionModal();
    }, 1500);
  };

  // Notification helper
  const addNotification = (type: NotificationType, message: string, duration = 4000) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, type, message, duration }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Open delete transaction modal
  const handleDeleteTransactionClick = (transaction: ExpenseTransaction) => {
    setTransactionToDelete(transaction);
    setShowDeleteTransactionModal(true);
  };

  // Delete transaction (from modal)
  const handleDeleteTransaction = async () => {
    if (!transactionToDelete) return;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError('You must be signed in to delete transactions.');
      setShowDeleteTransactionModal(false);
      setTransactionToDelete(null);
      return;
    }

    // Store transaction for undo
    setDeletedTransaction(transactionToDelete);

    const { error: deleteError } = await supabase
      .from('expense_transactions')
      .delete()
      .eq('id', transactionToDelete.id)
      .eq('user_id', userData.user.id);

    if (deleteError) {
      setError(deleteError.message);
      setShowDeleteTransactionModal(false);
      setTransactionToDelete(null);
      setDeletedTransaction(null);
      return;
    }

    setShowDeleteTransactionModal(false);
    setTransactionToDelete(null);
    addNotification('success', 'Transaction deleted successfully!');
    setShowUndoNotification(true);

    await loadTransactions();

    // Auto-hide undo notification after 5 seconds
    setTimeout(() => {
      setShowUndoNotification(false);
      setDeletedTransaction(null);
    }, 5000);
  };

  // Undo delete transaction
  const handleUndoDelete = async () => {
    if (!deletedTransaction) return;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError('You must be signed in to restore transactions.');
      return;
    }

    // Find the category for the transaction
    const category = categories.find((c) => c.id === deletedTransaction.category_id);
    if (!category) {
      setError('Category not found. Cannot restore transaction.');
      return;
    }

    const transactionData = {
      user_id: userData.user.id,
      type: deletedTransaction.type,
      amount: deletedTransaction.amount,
      category_id: deletedTransaction.category_id,
      description: deletedTransaction.description,
      transaction_date: deletedTransaction.transaction_date,
    };

    const { error: insertError } = await supabase
      .from('expense_transactions')
      .insert(transactionData);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setShowUndoNotification(false);
    setDeletedTransaction(null);
    addNotification('success', 'Transaction restored successfully!');

    await loadTransactions();
  };

  // Open category modal
  const openCategoryModal = (category?: ExpenseCategory, fromTransaction = false) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.name);
      setCategoryColor(category.color);
      setCategoryIcon(category.icon);
      setCategoryType(category.type);
    } else {
      setEditingCategory(null);
      setCategoryName('');
      setCategoryColor('#3B82F6');
      setCategoryIcon('💰');
      // If opened from transaction modal, use the transaction type
      setCategoryType(fromTransaction ? transactionType : 'expense');
    }
    setCategoryModalFromTransaction(fromTransaction);
    setShowCategoryModal(true);
  };

  // Close category modal
  const closeCategoryModal = () => {
    const wasFromTransaction = categoryModalFromTransaction;
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryName('');
    setCategoryColor('#3B82F6');
    setCategoryIcon('💰');
    setCategoryType('expense');
    setCategoryModalFromTransaction(false);
    setCategoryValidationErrors({});
    
    // If opened from transaction modal, reopen transaction modal
    if (wasFromTransaction) {
      setShowTransactionModal(true);
    }
  };

  // Save category
  const handleSaveCategory = async () => {
    setCategoryValidationErrors({});
    setError(null);

    if (!categoryName.trim()) {
      setCategoryValidationErrors({ name: 'Category name is required' });
      return;
    }

    if (categoryName.trim().length > 20) {
      setCategoryValidationErrors({ name: 'Category name must be 20 characters or less' });
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError('You must be signed in to save categories.');
      return;
    }

    // Check for duplicate name (within same type)
    const duplicate = categories.find(
      (cat) =>
        cat.name.toLowerCase() === categoryName.trim().toLowerCase() &&
        cat.type === categoryType &&
        (!editingCategory || cat.id !== editingCategory.id)
    );

    if (duplicate) {
      setCategoryValidationErrors({
        name: `A ${categoryType} category with this name already exists`,
      });
      return;
    }

    const categoryData = {
      user_id: userData.user.id,
      name: categoryName.trim(),
      color: categoryColor,
      icon: categoryIcon,
      type: categoryType,
    };

    let newCategoryId: string | null = null;

    if (editingCategory) {
      // Update
      const { error: updateError } = await supabase
        .from('expense_categories')
        .update(categoryData)
        .eq('id', editingCategory.id)
        .eq('user_id', userData.user.id);

      if (updateError) {
        setError(updateError.message);
        return;
      }
      newCategoryId = editingCategory.id;
      addNotification('success', 'Category updated successfully!');
    } else {
      // Insert
      const { data: insertedData, error: insertError } = await supabase
        .from('expense_categories')
        .insert(categoryData)
        .select('id')
        .single();

      if (insertError) {
        setError(insertError.message);
        return;
      }
      newCategoryId = insertedData?.id || null;
      addNotification('success', 'Category created successfully!');
    }

    await loadCategories();

    // If opened from transaction modal, select the new category and return to transaction modal
    if (showTransactionModal && newCategoryId) {
      setTransactionCategory(newCategoryId);
    }

    setTimeout(() => {
      closeCategoryModal();
    }, 1500);
  };

  // Open delete category modal
  const handleDeleteCategoryClick = (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (category) {
      setCategoryToDelete(category);
      setShowDeleteCategoryModal(true);
    }
  };

  // Delete category with reassignment
  const handleDeleteCategory = async (reassignToCategoryId?: string) => {
    if (!categoryToDelete) return;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError('You must be signed in to delete categories.');
      return;
    }

    // If reassigning, update transactions first
    if (reassignToCategoryId) {
      const { error: updateError } = await supabase
        .from('expense_transactions')
        .update({ category_id: reassignToCategoryId })
        .eq('category_id', categoryToDelete.id)
        .eq('user_id', userData.user.id);

      if (updateError) {
        setError(updateError.message);
        setShowDeleteCategoryModal(false);
        setCategoryToDelete(null);
        return;
      }
    }

    // Delete the category
    const { error: deleteError } = await supabase
      .from('expense_categories')
      .delete()
      .eq('id', categoryToDelete.id)
      .eq('user_id', userData.user.id);

    if (deleteError) {
      setError(deleteError.message);
      setShowDeleteCategoryModal(false);
      setCategoryToDelete(null);
      return;
    }

    setShowDeleteCategoryModal(false);
    setCategoryToDelete(null);
    addNotification('success', 'Category deleted successfully!');
    
    await loadCategories();
    await loadTransactions();
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
    const rows = filteredTransactions.map((t) => [
      t.transaction_date,
      t.type,
      t.category?.name || 'Unknown',
      t.amount.toString(),
      t.description || '',
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Expense Tracker
              </p>
              {activeView === 'dashboard' && (
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                  {getPeriodDateRange.label}
                </span>
              )}
            </div>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Track Your Finances
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Monitor income and expenses with detailed analytics.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openTransactionModal()}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              + Add Transaction
            </button>
            {filteredTransactions.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Export CSV
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="mb-6 flex gap-2 border-b border-slate-200 overflow-x-auto scrollbar-hide">
        {(['dashboard', 'monthly', 'yearly', 'categories'] as ExpenseView[]).map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeView === view
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <ExpenseDashboardView
          summary={summary}
          recentTransactions={recentTransactions}
          categoryBreakdown={categoryBreakdown}
          categories={categories}
          loading={loading}
          selectedPeriod={selectedPeriod}
          dateRangeLabel={getPeriodDateRange.label}
          searchQuery={searchQuery}
          filterCategory={filterCategory}
          filterDateFrom={filterDateFrom}
          filterDateTo={filterDateTo}
          filterAmountMin={filterAmountMin}
          filterAmountMax={filterAmountMax}
          currencyFormatter={currencyFormatter}
          dateFormatter={dateFormatter}
          onPeriodChange={setSelectedPeriod}
          onSearchChange={setSearchQuery}
          onCategoryChange={setFilterCategory}
          onDateFromChange={setFilterDateFrom}
          onDateToChange={setFilterDateTo}
          onAmountMinChange={setFilterAmountMin}
          onAmountMaxChange={setFilterAmountMax}
          onEditTransaction={openTransactionModal}
          onDeleteTransaction={handleDeleteTransactionClick}
          onViewAllTransactions={() => setActiveView('monthly')}
          allTransactions={transactions}
        />
      )}

      {/* Monthly View */}
      {activeView === 'monthly' && (
        <ExpenseMonthlyView
          transactions={transactions}
          categories={categories}
          currencyFormatter={currencyFormatter}
          dateFormatter={dateFormatter}
          initialYear={navigateToMonth?.year}
          initialMonth={navigateToMonth?.month}
          onEditTransaction={openTransactionModal}
          onDeleteTransaction={handleDeleteTransactionClick}
          onDuplicateTransaction={(transaction) => {
            openTransactionModal(transaction, true);
          }}
        />
      )}

      {/* Yearly View */}
      <div role="tabpanel" id="yearly-panel" aria-labelledby="yearly-tab" hidden={activeView !== 'yearly'}>
      {activeView === 'yearly' && (
        <ExpenseYearlyView
          transactions={transactions}
          categories={categories}
          currencyFormatter={currencyFormatter}
          dateFormatter={dateFormatter}
          onEditTransaction={openTransactionModal}
          onDeleteTransaction={handleDeleteTransactionClick}
          onNavigateToMonth={(year, month) => {
            setNavigateToMonth({ year, month });
            setActiveView('monthly');
            // Clear navigation state after a brief delay
            setTimeout(() => setNavigateToMonth(null), 100);
          }}
        />
      )}
      </div>

      {/* Categories View */}
      <div role="tabpanel" id="categories-panel" aria-labelledby="categories-tab" hidden={activeView !== 'categories'}>
      {activeView === 'categories' && (
        <ExpenseCategoriesView
          categories={categories}
          categoryBreakdown={categoryBreakdown}
          categoryTransactionCounts={categoryTransactionCounts}
          currencyFormatter={currencyFormatter}
          onAddCategory={() => openCategoryModal()}
          onEditCategory={openCategoryModal}
          onDeleteCategory={handleDeleteCategoryClick}
        />
      )}
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        show={showTransactionModal}
        editingTransaction={editingTransaction}
        transactionType={transactionType}
        transactionAmount={transactionAmount}
        transactionCategory={transactionCategory}
        transactionDescription={transactionDescription}
        transactionDate={transactionDate}
        transactionTime={transactionTime}
        categories={categories}
        error={error}
        onClose={closeTransactionModal}
        onTypeChange={setTransactionType}
        onAmountChange={setTransactionAmount}
        onCategoryChange={setTransactionCategory}
        onDescriptionChange={setTransactionDescription}
        onDateChange={setTransactionDate}
        onTimeChange={setTransactionTime}
        onSave={handleSaveTransaction}
        onDelete={
          editingTransaction
            ? () => {
                setShowTransactionModal(false);
                handleDeleteTransactionClick(editingTransaction);
              }
            : undefined
        }
        onCreateCategory={() => {
          setCategoryModalFromTransaction(true);
          setShowTransactionModal(false);
          openCategoryModal();
        }}
      />

      {/* Delete Transaction Modal */}
      <DeleteTransactionModal
        show={showDeleteTransactionModal}
        transaction={transactionToDelete}
        category={
          transactionToDelete
            ? categories.find((c) => c.id === transactionToDelete.category_id) || null
            : null
        }
        currencyFormatter={currencyFormatter}
        onClose={() => {
          setShowDeleteTransactionModal(false);
          setTransactionToDelete(null);
        }}
        onDelete={handleDeleteTransaction}
      />

      {/* Undo Notification */}
      <UndoNotification
        show={showUndoNotification}
        message="Transaction deleted"
        onUndo={handleUndoDelete}
        onClose={() => {
          setShowUndoNotification(false);
          setDeletedTransaction(null);
        }}
      />

      {/* Category Modal */}
      <CategoryModal
        show={showCategoryModal}
        editingCategory={editingCategory}
        categoryName={categoryName}
        categoryColor={categoryColor}
        categoryIcon={categoryIcon}
        categoryType={categoryType}
        transactionCount={
          editingCategory ? categoryTransactionCounts[editingCategory.id] || 0 : 0
        }
        error={error}
        validationErrors={categoryValidationErrors}
        onClose={closeCategoryModal}
        onNameChange={setCategoryName}
        onColorChange={setCategoryColor}
        onIconChange={setCategoryIcon}
        onTypeChange={setCategoryType}
        onSave={handleSaveCategory}
      />

      {/* Delete Category Modal */}
      <DeleteCategoryModal
        show={showDeleteCategoryModal}
        category={categoryToDelete}
        transactionCount={
          categoryToDelete ? categoryTransactionCounts[categoryToDelete.id] || 0 : 0
        }
        availableCategories={categories}
        onClose={() => {
          setShowDeleteCategoryModal(false);
          setCategoryToDelete(null);
        }}
        onDelete={handleDeleteCategory}
      />
    </section>
  );
}
