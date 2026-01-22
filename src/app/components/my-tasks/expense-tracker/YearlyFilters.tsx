'use client';

import { ExpenseCategory } from '../types';

type YearlyFiltersProps = {
  show: boolean;
  categories: ExpenseCategory[];
  selectedCategories: string[];
  selectedQuarters: string[];
  amountMin: string;
  amountMax: string;
  transactionType: 'all' | 'income' | 'expense';
  searchQuery: string;
  compareWithPrevious: boolean;
  resultCount: number;
  totalCount: number;
  onToggle: () => void;
  onCategoryToggle: (categoryId: string) => void;
  onSelectAllCategories: () => void;
  onClearAllCategories: () => void;
  onQuarterToggle: (quarter: string) => void;
  onSelectAllQuarters: () => void;
  onClearAllQuarters: () => void;
  onAmountMinChange: (value: string) => void;
  onAmountMaxChange: (value: string) => void;
  onTransactionTypeChange: (type: 'all' | 'income' | 'expense') => void;
  onSearchChange: (value: string) => void;
  onCompareToggle: (value: boolean) => void;
  onReset: () => void;
};

export default function YearlyFilters({
  show,
  categories,
  selectedCategories,
  selectedQuarters,
  amountMin,
  amountMax,
  transactionType,
  searchQuery,
  compareWithPrevious,
  resultCount,
  totalCount,
  onToggle,
  onCategoryToggle,
  onSelectAllCategories,
  onClearAllCategories,
  onQuarterToggle,
  onSelectAllQuarters,
  onClearAllQuarters,
  onAmountMinChange,
  onAmountMaxChange,
  onTransactionTypeChange,
  onSearchChange,
  onCompareToggle,
  onReset,
}: YearlyFiltersProps) {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <span>Filters</span>
          <svg
            className={`w-4 h-4 transition-transform ${show ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <p className="text-sm text-slate-600">
          Showing {resultCount} of {totalCount} transactions
        </p>
      </div>

      {show && (
        <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-4">
          {/* Transaction Type Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Transaction Type
            </label>
            <div className="flex gap-2 rounded-lg border border-slate-200 p-1 bg-slate-50">
              <button
                type="button"
                onClick={() => onTransactionTypeChange('all')}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  transactionType === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Both
              </button>
              <button
                type="button"
                onClick={() => onTransactionTypeChange('income')}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  transactionType === 'income'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => onTransactionTypeChange('expense')}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  transactionType === 'expense'
                    ? 'bg-red-100 text-red-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          {/* Quarter Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">Quarters</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onSelectAllQuarters}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={onClearAllQuarters}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              {quarters.map((quarter) => (
                <label
                  key={quarter}
                  className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded border border-slate-200 flex-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedQuarters.includes(quarter)}
                    onChange={() => onQuarterToggle(quarter)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                  />
                  <span className="text-sm text-slate-900">{quarter}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">Categories</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onSelectAllCategories}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={onClearAllCategories}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-200 rounded-lg p-3">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => onCategoryToggle(category.id)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                  />
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-slate-900">
                    {category.icon} {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amount Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={amountMin}
                onChange={(e) => onAmountMinChange(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                value={amountMax}
                onChange={(e) => onAmountMaxChange(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Description Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Search Description
            </label>
            <input
              type="text"
              placeholder="Search transaction descriptions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
            />
          </div>

          {/* Comparison Toggle */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={compareWithPrevious}
                onChange={(e) => onCompareToggle(e.target.checked)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-500"
              />
              <span className="text-sm text-slate-700">
                Compare with previous year month-by-month
              </span>
            </label>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
