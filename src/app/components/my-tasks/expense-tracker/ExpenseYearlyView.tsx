'use client';

import { useMemo, useState } from 'react';
import { ExpenseTransaction, ExpenseCategory } from '../types';
import YearlyNavigation from './YearlyNavigation';
import YearlySummary from './YearlySummary';
import YearlyTrendChart from './YearlyTrendChart';
import YearlyCategoryChart from './YearlyCategoryChart';
import QuarterlySummary from './QuarterlySummary';
import MonthCard from './MonthCard';
import YearlyFilters from './YearlyFilters';
import YearlyAnalysis from './YearlyAnalysis';
import SearchBar from './SearchBar';

type ExpenseYearlyViewProps = {
  transactions: ExpenseTransaction[];
  categories: ExpenseCategory[];
  currencyFormatter: Intl.NumberFormat;
  onNavigateToMonth: (year: number, month: number) => void;
};

export default function ExpenseYearlyView({
  transactions,
  categories,
  currencyFormatter,
  onNavigateToMonth,
}: ExpenseYearlyViewProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedQuarters, setSelectedQuarters] = useState<string[]>([]);
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  const [transactionType, setTransactionType] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareWithPrevious, setCompareWithPrevious] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('');

  // Get year boundaries
  const yearStart = useMemo(() => {
    return new Date(currentYear, 0, 1);
  }, [currentYear]);

  const yearEnd = useMemo(() => {
    return new Date(currentYear, 11, 31, 23, 59, 59, 999);
  }, [currentYear]);

  // Get previous year for comparison
  const previousYear = currentYear - 1;

  // Filter transactions for current year
  const yearTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const tDate = new Date(t.transaction_date);
      return tDate >= yearStart && tDate <= yearEnd;
    });
  }, [transactions, yearStart, yearEnd]);

  // Filter transactions for previous year
  const prevYearTransactions = useMemo(() => {
    const prevYearStart = new Date(previousYear, 0, 1);
    const prevYearEnd = new Date(previousYear, 11, 31, 23, 59, 59, 999);
    return transactions.filter((t) => {
      const tDate = new Date(t.transaction_date);
      return tDate >= prevYearStart && tDate <= prevYearEnd;
    });
  }, [transactions, previousYear]);

  // Apply filters
  const filteredTransactions = useMemo(() => {
    let filtered = [...yearTransactions];

    // Category filter
    if (selectedCategoryFilter) {
      filtered = filtered.filter((t) => t.category_id === selectedCategoryFilter);
    } else if (selectedCategories.length > 0) {
      filtered = filtered.filter((t) => selectedCategories.includes(t.category_id));
    }

    // Transaction type filter
    if (transactionType !== 'all') {
      filtered = filtered.filter((t) => t.type === transactionType);
    }

    // Quarter filter
    if (selectedQuarters.length > 0) {
      filtered = filtered.filter((t) => {
        const month = new Date(t.transaction_date).getMonth();
        const quarter = Math.floor(month / 3) + 1;
        return selectedQuarters.includes(`Q${quarter}`);
      });
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
        (t) =>
          t.description?.toLowerCase().includes(query) ||
          categories.find((c) => c.id === t.category_id)?.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [
    yearTransactions,
    selectedCategoryFilter,
    selectedCategories,
    transactionType,
    selectedQuarters,
    amountMin,
    amountMax,
    searchQuery,
    categories,
  ]);

  // Calculate yearly summary
  const yearlySummary = useMemo(() => {
    const income = yearTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = yearTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const net = income - expenses;

    const prevIncome = prevYearTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const prevExpenses = prevYearTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const prevNet = prevIncome - prevExpenses;

    const averageMonthlyIncome = income / 12;
    const averageMonthlyExpense = expenses / 12;

    return {
      income,
      expenses,
      net,
      previousYearIncome: prevIncome,
      previousYearExpenses: prevExpenses,
      previousYearNet: prevNet,
      averageMonthlyIncome,
      averageMonthlyExpense,
    };
  }, [yearTransactions, prevYearTransactions]);

  // Calculate monthly data
  const monthlyData = useMemo(() => {
    const monthly: { [key: string]: { income: number; expenses: number } } = {};
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    yearTransactions.forEach((t) => {
      const month = new Date(t.transaction_date).getMonth() + 1;
      const monthKey = `${currentYear}-${String(month).padStart(2, '0')}`;
      if (!monthly[monthKey]) {
        monthly[monthKey] = { income: 0, expenses: 0 };
      }
      if (t.type === 'income') {
        monthly[monthKey].income += t.amount;
      } else {
        monthly[monthKey].expenses += t.amount;
      }
    });

    return monthNames.map((name, index) => {
      const monthNumber = index + 1;
      const monthKey = `${currentYear}-${String(monthNumber).padStart(2, '0')}`;
      const data = monthly[monthKey] || { income: 0, expenses: 0 };
      return {
        month: monthKey,
        monthNumber,
        monthName: name,
        income: data.income,
        expenses: data.expenses,
        net: data.income - data.expenses,
      };
    });
  }, [yearTransactions, currentYear]);

  // Calculate quarterly data
  const quarterlyData = useMemo(() => {
    const quarters: { [key: number]: { income: number; expenses: number } } = {};
    yearTransactions.forEach((t) => {
      const month = new Date(t.transaction_date).getMonth();
      const quarter = Math.floor(month / 3) + 1;
      if (!quarters[quarter]) {
        quarters[quarter] = { income: 0, expenses: 0 };
      }
      if (t.type === 'income') {
        quarters[quarter].income += t.amount;
      } else {
        quarters[quarter].expenses += t.amount;
      }
    });

    return [1, 2, 3, 4].map((q) => {
      const data = quarters[q] || { income: 0, expenses: 0 };
      const net = data.income - data.expenses;
      // Calculate trend (compare with previous quarter)
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (q > 1) {
        const prevData = quarters[q - 1] || { expenses: 0 };
        if (data.expenses > prevData.expenses) trend = 'up';
        else if (data.expenses < prevData.expenses) trend = 'down';
      }
      return {
        quarter: `Q${q}`,
        income: data.income,
        expenses: data.expenses,
        net,
        trend,
      };
    });
  }, [yearTransactions]);

  // Category breakdown for pie chart
  const categoryBreakdown = useMemo(() => {
    const breakdown: {
      [key: string]: { category: ExpenseCategory; amount: number };
    } = {};
    const expenseTransactions = yearTransactions.filter((t) => t.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    expenseTransactions.forEach((t) => {
      const category = categories.find((c) => c.id === t.category_id);
      if (!category) return;
      if (!breakdown[category.id]) {
        breakdown[category.id] = { category, amount: 0 };
      }
      breakdown[category.id].amount += t.amount;
    });

    return Object.values(breakdown)
      .map((item) => ({
        category: item.category,
        amount: item.amount,
        percentage: totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [yearTransactions, categories]);

  // Daily data for each month (for sparklines)
  const monthDailyData = useMemo(() => {
    const daily: { [key: string]: { [key: string]: number } } = {};
    yearTransactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const month = t.transaction_date.substring(0, 7);
        const date = t.transaction_date;
        if (!daily[month]) daily[month] = {};
        if (!daily[month][date]) daily[month][date] = 0;
        daily[month][date] += t.amount;
      });
    return daily;
  }, [yearTransactions]);

  // Navigation handlers
  const handlePreviousYear = () => {
    setCurrentYear((prev) => prev - 1);
    setSelectedCategoryFilter('');
  };

  const handleNextYear = () => {
    setCurrentYear((prev) => prev + 1);
    setSelectedCategoryFilter('');
  };

  const handleSelectYear = (year: number) => {
    setCurrentYear(year);
    setSelectedCategoryFilter('');
  };

  const handleQuickSelect = (type: 'this_year' | 'last_year' | 'last_2_years') => {
    const now = new Date();
    switch (type) {
      case 'this_year':
        setCurrentYear(now.getFullYear());
        break;
      case 'last_year':
        setCurrentYear(now.getFullYear() - 1);
        break;
      case 'last_2_years':
        // Show current year, but we'll handle this in the view
        setCurrentYear(now.getFullYear());
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

  const handleQuarterToggle = (quarter: string) => {
    setSelectedQuarters((prev) =>
      prev.includes(quarter)
        ? prev.filter((q) => q !== quarter)
        : [...prev, quarter]
    );
  };

  const handleSelectAllQuarters = () => {
    setSelectedQuarters(['Q1', 'Q2', 'Q3', 'Q4']);
  };

  const handleClearAllQuarters = () => {
    setSelectedQuarters([]);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedQuarters([]);
    setAmountMin('');
    setAmountMax('');
    setTransactionType('all');
    setSearchQuery('');
    setCompareWithPrevious(false);
    setSelectedCategoryFilter('');
  };

  const handleMonthClick = (monthNumber: number) => {
    onNavigateToMonth(currentYear, monthNumber);
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <YearlyNavigation
        currentYear={currentYear}
        onPreviousYear={handlePreviousYear}
        onNextYear={handleNextYear}
        onSelectYear={handleSelectYear}
        onQuickSelect={handleQuickSelect}
      />

      {/* Yearly Summary */}
      <YearlySummary
        income={yearlySummary.income}
        expenses={yearlySummary.expenses}
        net={yearlySummary.net}
        previousYearIncome={yearlySummary.previousYearIncome}
        previousYearExpenses={yearlySummary.previousYearExpenses}
        previousYearNet={yearlySummary.previousYearNet}
        averageMonthlyIncome={yearlySummary.averageMonthlyIncome}
        averageMonthlyExpense={yearlySummary.averageMonthlyExpense}
        currencyFormatter={currencyFormatter}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-4">Monthly Trend</h4>
          <YearlyTrendChart
            monthlyData={monthlyData}
            currencyFormatter={currencyFormatter}
            onMonthClick={handleMonthClick}
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-4">Category Breakdown</h4>
          <YearlyCategoryChart
            categoryData={categoryBreakdown}
            totalExpenses={yearlySummary.expenses}
            currencyFormatter={currencyFormatter}
            onCategoryClick={(categoryId) => {
              setSelectedCategoryFilter(categoryId);
              setShowFilters(false);
            }}
          />
        </div>
      </div>

      {/* Quarterly Summary */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Quarterly Summary</h4>
        <QuarterlySummary
          quarterlyData={quarterlyData}
          currencyFormatter={currencyFormatter}
        />
      </div>

      {/* Month Grid */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Monthly Overview</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {monthlyData.map((month) => {
            const monthKey = `${currentYear}-${String(month.monthNumber).padStart(2, '0')}`;
            const dailyData = Object.entries(monthDailyData[monthKey] || {}).map(
              ([date, amount]) => ({ date, amount })
            );
            return (
              <MonthCard
                key={month.month}
                monthName={month.monthName}
                monthNumber={month.monthNumber}
                income={month.income}
                expenses={month.expenses}
                net={month.net}
                dailyData={dailyData}
                currencyFormatter={currencyFormatter}
                onClick={() => handleMonthClick(month.monthNumber)}
              />
            );
          })}
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        resultCount={filteredTransactions.length}
        totalCount={yearTransactions.length}
        placeholder="Search by description, category, or date (DD/MM/YYYY)..."
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      {/* Filters */}
      <YearlyFilters
        show={showFilters}
        categories={categories}
        selectedCategories={selectedCategories}
        selectedQuarters={selectedQuarters}
        amountMin={amountMin}
        amountMax={amountMax}
        transactionType={transactionType}
        searchQuery={searchQuery}
        compareWithPrevious={compareWithPrevious}
        resultCount={filteredTransactions.length}
        totalCount={yearTransactions.length}
        onToggle={() => setShowFilters(!showFilters)}
        onCategoryToggle={handleCategoryToggle}
        onSelectAllCategories={handleSelectAllCategories}
        onClearAllCategories={handleClearAllCategories}
        onQuarterToggle={handleQuarterToggle}
        onSelectAllQuarters={handleSelectAllQuarters}
        onClearAllQuarters={handleClearAllQuarters}
        onAmountMinChange={setAmountMin}
        onAmountMaxChange={setAmountMax}
        onTransactionTypeChange={setTransactionType}
        onSearchChange={setSearchQuery}
        onCompareToggle={setCompareWithPrevious}
        onReset={handleResetFilters}
      />

      {/* Yearly Analysis */}
      <YearlyAnalysis
        transactions={yearTransactions}
        categories={categories}
        currencyFormatter={currencyFormatter}
      />
    </div>
  );
}
