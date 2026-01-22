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
import SuccessNotification from './expense-tracker/SuccessNotification';
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Category modal state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#3B82F6');
  const [categoryIcon, setCategoryIcon] = useState('💰');
  const [categoryType, setCategoryType] = useState<TransactionType>('expense');
  const [categoryModalFromTransaction, setCategoryModalFromTransaction] = useState(false);

  // Period selector state
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('this_month');

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
        .select('*, category:expense_categories(*)')
        .eq('user_id', userData.user.id)
        .order('transaction_date', { ascending: false })
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Fetch transactions error', fetchError);
        setError(fetchError.message);
        return;
      }

      setTransactions((data as any) || []);
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
      case 'this_month': {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        return {
          from: firstDay.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0],
          label: `${firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        };
      }
      case 'last_30_days': {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return {
          from: thirtyDaysAgo.toISOString().split('T')[0],
          to: today.toISOString().split('T')[0],
          label: `${thirtyDaysAgo.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
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

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Period filter
    if (selectedPeriod !== 'all_time') {
      const { from, to } = getPeriodDateRange;
      if (from) filtered = filtered.filter((t) => t.transaction_date >= from);
      if (to) filtered = filtered.filter((t) => t.transaction_date <= to);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description?.toLowerCase().includes(query) ||
          t.category?.name.toLowerCase().includes(query)
      );
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

    return filtered;
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
  ]);

  // Get previous period transactions for comparison
  const previousPeriodTransactions = useMemo(() => {
    const now = new Date();
    let from: string;
    let to: string;

    switch (selectedPeriod) {
      case 'this_month': {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        from = lastMonth.toISOString().split('T')[0];
        to = lastMonthEnd.toISOString().split('T')[0];
        break;
      }
      case 'last_30_days': {
        const sixtyDaysAgo = new Date(now);
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        from = sixtyDaysAgo.toISOString().split('T')[0];
        to = thirtyDaysAgo.toISOString().split('T')[0];
        break;
      }
      default:
        return [];
    }

    return transactions.filter(
      (t) => t.transaction_date >= from && t.transaction_date <= to
    );
  }, [transactions, selectedPeriod]);

  // Calculate summary statistics with month-over-month comparison
  const summary = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const net = income - expenses;

    // Previous period calculations
    const prevIncome = previousPeriodTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const prevExpenses = previousPeriodTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
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

  // Recent transactions (last 10)
  const recentTransactions = useMemo(() => {
    return filteredTransactions.slice(0, 10);
  }, [filteredTransactions]);

  // Open transaction modal
  const openTransactionModal = (transaction?: ExpenseTransaction) => {
    if (transaction) {
      setEditingTransaction(transaction);
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
      setSuccessMessage('Transaction updated successfully!');
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from('expense_transactions')
        .insert(transactionData);

      if (insertError) {
        setError(insertError.message);
        return;
      }
      setSuccessMessage('Transaction added successfully!');
    }

    // Clear form and close modal after a short delay
    setTimeout(() => {
      closeTransactionModal();
      setSuccessMessage(null);
    }, 1500);

    await loadTransactions();
  };

  // Delete transaction
  const handleDeleteTransaction = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError('You must be signed in to delete transactions.');
      return;
    }

    const { error: deleteError } = await supabase
      .from('expense_transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', userData.user.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

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
    
    // If opened from transaction modal, reopen transaction modal
    if (wasFromTransaction) {
      setShowTransactionModal(true);
    }
  };

  // Save category
  const handleSaveCategory = async () => {
    if (!categoryName.trim()) {
      setError('Please enter a category name');
      return;
    }

    setError(null);
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError('You must be signed in to save categories.');
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
    }

    await loadCategories();

    // If opened from transaction modal, select the new category and return to transaction modal
    if (showTransactionModal && newCategoryId) {
      setTransactionCategory(newCategoryId);
    }

    closeCategoryModal();
  };

  // Delete category
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? All transactions in this category will be deleted.')) return;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError('You must be signed in to delete categories.');
      return;
    }

    const { error: deleteError } = await supabase
      .from('expense_categories')
      .delete()
      .eq('id', id)
      .eq('user_id', userData.user.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

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
      <div className="mb-6 flex gap-2 border-b border-slate-200">
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
          onDeleteTransaction={handleDeleteTransaction}
          onViewAllTransactions={() => setActiveView('monthly')}
        />
      )}

      {/* Monthly View */}
      {activeView === 'monthly' && (
        <ExpenseMonthlyView
          monthlyBreakdown={monthlyBreakdown}
          filteredTransactions={filteredTransactions}
          categories={categories}
          currencyFormatter={currencyFormatter}
        />
      )}

      {/* Yearly View */}
      {activeView === 'yearly' && (
        <ExpenseYearlyView
          yearlyBreakdown={yearlyBreakdown}
          currencyFormatter={currencyFormatter}
        />
      )}

      {/* Categories View */}
      {activeView === 'categories' && (
        <ExpenseCategoriesView
          categories={categories}
          categoryBreakdown={categoryBreakdown}
          currencyFormatter={currencyFormatter}
          onAddCategory={() => openCategoryModal()}
          onEditCategory={openCategoryModal}
          onDeleteCategory={handleDeleteCategory}
        />
      )}

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
        onCreateCategory={() => {
          setCategoryModalFromTransaction(true);
          setShowTransactionModal(false);
          openCategoryModal();
        }}
      />

      {/* Success Notification */}
      {successMessage && (
        <SuccessNotification
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      {/* Category Modal */}
      <CategoryModal
        show={showCategoryModal}
        editingCategory={editingCategory}
        categoryName={categoryName}
        categoryColor={categoryColor}
        categoryIcon={categoryIcon}
        categoryType={categoryType}
        error={error}
        onClose={closeCategoryModal}
        onNameChange={setCategoryName}
        onColorChange={setCategoryColor}
        onIconChange={setCategoryIcon}
        onTypeChange={setCategoryType}
        onSave={handleSaveCategory}
      />
    </section>
  );
}
