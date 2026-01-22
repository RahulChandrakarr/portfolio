'use client';

import { useMemo, useState, useEffect } from 'react';
import { ExpenseTransaction, ExpenseCategory } from '../types';
import MonthlyNavigation from './MonthlyNavigation';
import MonthlySummary from './MonthlySummary';
import MonthlyPieChart from './MonthlyPieChart';
import MonthlyBarChart from './MonthlyBarChart';
import CategoryBreakdownTable from './CategoryBreakdownTable';
import MonthlyFilters from './MonthlyFilters';
import MonthlyTransactionsList from './MonthlyTransactionsList';
import SearchBar from './SearchBar';
import ExportButton from './ExportButton';

type ExpenseMonthlyViewProps = {
  transactions: ExpenseTransaction[];
  categories: ExpenseCategory[];
  currencyFormatter: Intl.NumberFormat;
  dateFormatter: Intl.DateTimeFormat;
  initialYear?: number;
  initialMonth?: number;
  onEditTransaction: (transaction: ExpenseTransaction) => void;
  onDeleteTransaction: (transaction: ExpenseTransaction) => void;
  onDuplicateTransaction?: (transaction: ExpenseTransaction) => void;
};

export default function ExpenseMonthlyView({
  transactions,
  categories,
  currencyFormatter,
  dateFormatter,
  initialYear,
  initialMonth,
  onEditTransaction,
  onDeleteTransaction,
  onDuplicateTransaction,
}: ExpenseMonthlyViewProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (initialYear && initialMonth) {
      return new Date(initialYear, initialMonth - 1, 1);
    }
    return new Date();
  });

  // Update month when initial props change
  useEffect(() => {
    if (initialYear && initialMonth) {
      setCurrentMonth(new Date(initialYear, initialMonth - 1, 1));
    }
  }, [initialYear, initialMonth]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  const [transactionType, setTransactionType] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('');

  // Get month boundaries
  const monthStart = useMemo(() => {
    const date = new Date(currentMonth);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [currentMonth]);

  const monthEnd = useMemo(() => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    date.setHours(23, 59, 59, 999);
    return date;
  }, [currentMonth]);

  // Get previous month for comparison
  const previousMonth = useMemo(() => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() - 1);
    return date;
  }, [currentMonth]);

  const prevMonthStart = useMemo(() => {
    const date = new Date(previousMonth);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [previousMonth]);

  const prevMonthEnd = useMemo(() => {
    const date = new Date(previousMonth);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    date.setHours(23, 59, 59, 999);
    return date;
  }, [previousMonth]);

  // Filter transactions for current month
  const monthTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const tDate = new Date(t.transaction_date);
      return tDate >= monthStart && tDate <= monthEnd;
    });
  }, [transactions, monthStart, monthEnd]);

  // Filter transactions for previous month
  const prevMonthTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const tDate = new Date(t.transaction_date);
      return tDate >= prevMonthStart && tDate <= prevMonthEnd;
    });
  }, [transactions, prevMonthStart, prevMonthEnd]);

  // Apply filters
  const filteredTransactions = useMemo(() => {
    let filtered = [...monthTransactions];

    // Category filter (from pie chart click or filter panel)
    if (selectedCategoryFilter) {
      filtered = filtered.filter((t) => t.category_id === selectedCategoryFilter);
    } else if (selectedCategories.length > 0) {
      filtered = filtered.filter((t) => selectedCategories.includes(t.category_id));
    }

    // Transaction type filter
    if (transactionType !== 'all') {
      filtered = filtered.filter((t) => t.type === transactionType);
    }

    // Amount range filter
    if (amountMin) {
      const min = parseFloat(amountMin);
      filtered = filtered.filter((t) => t.amount >= min);
    }
    if (amountMax) {
      const max = parseFloat(amountMax);
      filtered = filtered.filter((t) => t.amount <= max);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) => t.description?.toLowerCase().includes(query) ||
        categories.find((c) => c.id === t.category_id)?.name.toLowerCase().includes(query)
      );
    }

    // Date range filter (within month)
    if (dateFrom) {
      filtered = filtered.filter((t) => t.transaction_date >= dateFrom);
    }
    if (dateTo) {
      filtered = filtered.filter((t) => t.transaction_date <= dateTo);
    }

    return filtered;
  }, [
    monthTransactions,
    selectedCategoryFilter,
    selectedCategories,
    transactionType,
    amountMin,
    amountMax,
    searchQuery,
    dateFrom,
    dateTo,
    categories,
  ]);

  // Calculate monthly summary
  const monthlySummary = useMemo(() => {
    const income = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const net = income - expenses;

    // Previous month calculations
    const prevIncome = prevMonthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const prevExpenses = prevMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // Changes
    const incomeChange = income - prevIncome;
    const expensesChange = expenses - prevExpenses;
    const incomeChangePercent = prevIncome > 0 ? (incomeChange / prevIncome) * 100 : 0;
    const expensesChangePercent = prevExpenses > 0 ? (expensesChange / prevExpenses) * 100 : 0;

    // Average daily expense
    const daysWithExpenses = new Set(
      monthTransactions
        .filter((t) => t.type === 'expense')
        .map((t) => t.transaction_date)
    ).size;
    const averageDailyExpense = daysWithExpenses > 0 ? expenses / daysWithExpenses : 0;

    return {
      income,
      expenses,
      net,
      incomeChange,
      expensesChange,
      incomeChangePercent,
      expensesChangePercent,
      averageDailyExpense,
    };
  }, [monthTransactions, prevMonthTransactions]);

  // Category breakdown for pie chart
  const categoryBreakdown = useMemo(() => {
    const breakdown: { [key: string]: { category: ExpenseCategory; amount: number; count: number } } = {};
    const expenseTransactions = monthTransactions.filter((t) => t.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    expenseTransactions.forEach((t) => {
      const category = categories.find((c) => c.id === t.category_id);
      if (!category) return;
      if (!breakdown[category.id]) {
        breakdown[category.id] = { category, amount: 0, count: 0 };
      }
      breakdown[category.id].amount += t.amount;
      breakdown[category.id].count++;
    });

    return Object.values(breakdown).map((item) => ({
      category: item.category,
      amount: item.amount,
      percentage: totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0,
      transactionCount: item.count,
    }));
  }, [monthTransactions, categories]);

  // Daily expense data for bar chart
  const dailyData = useMemo(() => {
    const daily: { [key: string]: number } = {};
    monthTransactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const date = t.transaction_date;
        if (!daily[date]) daily[date] = 0;
        daily[date] += t.amount;
      });

    // Fill in all days of the month
    const days: { date: string; amount: number }[] = [];
    const current = new Date(monthStart);
    while (current <= monthEnd) {
      const dateStr = current.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        amount: daily[dateStr] || 0,
      });
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, [monthTransactions, monthStart, monthEnd]);

  // Navigation handlers
  const handlePreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
    setSelectedCategoryFilter('');
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
    setSelectedCategoryFilter('');
  };

  const handleSelectMonth = (date: Date) => {
    setCurrentMonth(date);
    setSelectedCategoryFilter('');
  };

  const handleQuickSelect = (type: 'this_month' | 'last_month' | 'last_3_months') => {
    const now = new Date();
    switch (type) {
      case 'this_month':
        setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
        break;
      case 'last_month':
        setCurrentMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));
        break;
      case 'last_3_months':
        // Show current month, but we'll handle this in the view
        setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
        break;
    }
    setSelectedCategoryFilter('');
  };

  // Filter handlers
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setSelectedCategoryFilter('');
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories(categories.map((c) => c.id));
  };

  const handleClearAllCategories = () => {
    setSelectedCategories([]);
    setSelectedCategoryFilter('');
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setAmountMin('');
    setAmountMax('');
    setTransactionType('all');
    setSearchQuery('');
    setDateFrom('');
    setDateTo('');
    setSelectedCategoryFilter('');
  };

  // Set default date range to current month
  useEffect(() => {
    if (!dateFrom && !dateTo) {
      setDateFrom(monthStart.toISOString().split('T')[0]);
      setDateTo(monthEnd.toISOString().split('T')[0]);
    }
  }, [monthStart, monthEnd]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <MonthlyNavigation
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onSelectMonth={handleSelectMonth}
        onQuickSelect={handleQuickSelect}
      />

      {/* Monthly Summary */}
      <MonthlySummary
        income={monthlySummary.income}
        expenses={monthlySummary.expenses}
        net={monthlySummary.net}
        incomeChange={monthlySummary.incomeChange}
        expensesChange={monthlySummary.expensesChange}
        incomeChangePercent={monthlySummary.incomeChangePercent}
        expensesChangePercent={monthlySummary.expensesChangePercent}
        averageDailyExpense={monthlySummary.averageDailyExpense}
        currencyFormatter={currencyFormatter}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-4">Expense by Category</h4>
          <MonthlyPieChart
            categoryData={categoryBreakdown}
            totalExpenses={monthlySummary.expenses}
            currencyFormatter={currencyFormatter}
            onCategoryClick={(categoryId) => {
              setSelectedCategoryFilter(categoryId);
              setShowFilters(false);
            }}
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-4">Daily Expense Trend</h4>
          <MonthlyBarChart
            dailyData={dailyData}
            currencyFormatter={currencyFormatter}
            onDayClick={(date) => {
              setDateFrom(date);
              setDateTo(date);
              setShowFilters(true);
            }}
          />
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Category Breakdown</h4>
        <CategoryBreakdownTable
          categoryData={categoryBreakdown}
          totalExpenses={monthlySummary.expenses}
          currencyFormatter={currencyFormatter}
          onCategoryClick={(categoryId) => {
            setSelectedCategoryFilter(categoryId);
            setShowFilters(false);
          }}
        />
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        resultCount={filteredTransactions.length}
        totalCount={monthTransactions.length}
        placeholder="Search by description, category, or date (DD/MM/YYYY)..."
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      {/* Filters */}
      <MonthlyFilters
        show={showFilters}
        categories={categories}
        selectedCategories={selectedCategories}
        amountMin={amountMin}
        amountMax={amountMax}
        transactionType={transactionType}
        searchQuery={searchQuery}
        dateFrom={dateFrom}
        dateTo={dateTo}
        resultCount={filteredTransactions.length}
        totalCount={monthTransactions.length}
        onToggle={() => setShowFilters(!showFilters)}
        onCategoryToggle={handleCategoryToggle}
        onSelectAllCategories={handleSelectAllCategories}
        onClearAllCategories={handleClearAllCategories}
        onAmountMinChange={setAmountMin}
        onAmountMaxChange={setAmountMax}
        onTransactionTypeChange={setTransactionType}
        onSearchChange={setSearchQuery}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onReset={handleResetFilters}
      />

      {/* Transactions List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-slate-900">Transactions</h4>
          {selectedCategoryFilter && (
            <button
              onClick={() => setSelectedCategoryFilter('')}
              className="text-xs text-slate-600 hover:text-slate-900"
            >
              Clear category filter
            </button>
          )}
        </div>
        <MonthlyTransactionsList
          transactions={filteredTransactions}
          categories={categories}
          currencyFormatter={currencyFormatter}
          dateFormatter={dateFormatter}
          onEdit={onEditTransaction}
          onDelete={onDeleteTransaction}
          onDuplicate={onDuplicateTransaction}
        />
      </div>
    </div>
  );
}
