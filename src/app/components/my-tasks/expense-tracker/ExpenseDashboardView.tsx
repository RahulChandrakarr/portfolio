'use client';

import { ExpenseTransaction, ExpenseCategory } from '../types';
import SummaryCards from './SummaryCards';
import ExpenseFilters from './ExpenseFilters';
import TransactionList from './TransactionList';
import CategoryBreakdown from './CategoryBreakdown';

type ExpenseDashboardViewProps = {
  summary: { income: number; expenses: number; net: number };
  recentTransactions: ExpenseTransaction[];
  categoryBreakdown: { [key: string]: number };
  categories: ExpenseCategory[];
  loading: boolean;
  searchQuery: string;
  filterCategory: string;
  filterDateFrom: string;
  filterDateTo: string;
  filterAmountMin: string;
  filterAmountMax: string;
  currencyFormatter: Intl.NumberFormat;
  dateFormatter: Intl.DateTimeFormat;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onAmountMinChange: (value: string) => void;
  onAmountMaxChange: (value: string) => void;
  onEditTransaction: (transaction: ExpenseTransaction) => void;
  onDeleteTransaction: (id: string) => void;
};

export default function ExpenseDashboardView({
  summary,
  recentTransactions,
  categoryBreakdown,
  categories,
  loading,
  searchQuery,
  filterCategory,
  filterDateFrom,
  filterDateTo,
  filterAmountMin,
  filterAmountMax,
  currencyFormatter,
  dateFormatter,
  onSearchChange,
  onCategoryChange,
  onDateFromChange,
  onDateToChange,
  onAmountMinChange,
  onAmountMaxChange,
  onEditTransaction,
  onDeleteTransaction,
}: ExpenseDashboardViewProps) {
  return (
    <div className="space-y-6">
      <SummaryCards
        income={summary.income}
        expenses={summary.expenses}
        net={summary.net}
        currencyFormatter={currencyFormatter}
      />

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

      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Recent Transactions</h3>
        <TransactionList
          transactions={recentTransactions}
          categories={categories}
          loading={loading}
          dateFormatter={dateFormatter}
          currencyFormatter={currencyFormatter}
          onEdit={onEditTransaction}
          onDelete={onDeleteTransaction}
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Spending by Category</h3>
        <CategoryBreakdown
          categoryBreakdown={categoryBreakdown}
          categories={categories}
          currencyFormatter={currencyFormatter}
        />
      </div>
    </div>
  );
}
