'use client';

import { ExpenseTransaction, ExpenseCategory } from '../types';
import SummaryCards from './SummaryCards';
import ExpenseFilters from './ExpenseFilters';
import SearchBar from './SearchBar';
import ExportButton from './ExportButton';
import RecentTransactionsTable from './RecentTransactionsTable';
import MobileTransactionCard from './MobileTransactionCard';
import CategoryBreakdown from './CategoryBreakdown';
import PeriodSelector, { PeriodType } from './PeriodSelector';

type ExpenseDashboardViewProps = {
  summary: {
    income: number;
    expenses: number;
    net: number;
    incomeChange?: number;
    expensesChange?: number;
    netChange?: number;
    incomeChangePercent?: number;
    expensesChangePercent?: number;
    netChangePercent?: number;
  };
  recentTransactions: ExpenseTransaction[];
  categoryBreakdown: { [key: string]: number };
  categories: ExpenseCategory[];
  loading: boolean;
  selectedPeriod: PeriodType;
  dateRangeLabel: string;
  searchQuery: string;
  filterCategory: string;
  filterDateFrom: string;
  filterDateTo: string;
  filterAmountMin: string;
  filterAmountMax: string;
  currencyFormatter: Intl.NumberFormat;
  dateFormatter: Intl.DateTimeFormat;
  onPeriodChange: (period: PeriodType) => void;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onAmountMinChange: (value: string) => void;
  onAmountMaxChange: (value: string) => void;
  onEditTransaction: (transaction: ExpenseTransaction) => void;
  onDeleteTransaction: (transaction: ExpenseTransaction) => void;
  onViewAllTransactions?: () => void;
  allTransactions?: ExpenseTransaction[];
};

export default function ExpenseDashboardView({
  summary,
  recentTransactions,
  categoryBreakdown,
  categories,
  loading,
  selectedPeriod,
  dateRangeLabel,
  searchQuery,
  filterCategory,
  filterDateFrom,
  filterDateTo,
  filterAmountMin,
  filterAmountMax,
  currencyFormatter,
  dateFormatter,
  onPeriodChange,
  onSearchChange,
  onCategoryChange,
  onDateFromChange,
  onDateToChange,
  onAmountMinChange,
  onAmountMaxChange,
  onEditTransaction,
  onDeleteTransaction,
  onViewAllTransactions,
}: ExpenseDashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* Period Selector */}
      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <p className="text-xs text-slate-500 mb-1">Focus Period</p>
          <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} />
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-slate-500">Date Range</p>
          <p className="text-sm font-medium text-slate-700">{dateRangeLabel}</p>
        </div>
      </div> */}

      {/* Summary Cards */}
      {/* <SummaryCards
        income={summary.income}
        expenses={summary.expenses}
        net={summary.net}
        incomeChange={summary.incomeChange}
        expensesChange={summary.expensesChange}
        netChange={summary.netChange}
        incomeChangePercent={summary.incomeChangePercent}
        expensesChangePercent={summary.expensesChangePercent}
        netChangePercent={summary.netChangePercent}
        currencyFormatter={currencyFormatter}
      /> */}

      {/* Quick Chart Section */}
      {/* <div className="md:block">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Spending by Category</h3>
        <div className="md:max-h-64 overflow-y-auto">
          <CategoryBreakdown
            categoryBreakdown={categoryBreakdown}
            categories={categories}
            currencyFormatter={currencyFormatter}
          />
        </div>
      </div> */}

      {/* Filters */}
      <ExpenseFilters
        searchQuery={searchQuery}
        filterCategory={filterCategory}
        filterDateFrom={filterDateFrom}
        filterDateTo={filterDateTo}
        filterAmountMin={filterAmountMin}
        filterAmountMax={filterAmountMax}
        categories={categories}
        onSearchChange={onSearchChange}
        onCategoryChange={onCategoryChange}
        onDateFromChange={onDateFromChange}
        onDateToChange={onDateToChange}
        onAmountMinChange={onAmountMinChange}
        onAmountMaxChange={onAmountMaxChange}
      />

      {/* Recent Transactions */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
          <p className="text-xs text-slate-500">Last {recentTransactions.length} transactions</p>
        </div>
        <RecentTransactionsTable
          transactions={recentTransactions}
          categories={categories}
          loading={loading}
          dateFormatter={dateFormatter}
          currencyFormatter={currencyFormatter}
          onEdit={onEditTransaction}
          onDelete={onDeleteTransaction}
          onViewAll={onViewAllTransactions}
        />
      </div>
    </div>
  );
}
