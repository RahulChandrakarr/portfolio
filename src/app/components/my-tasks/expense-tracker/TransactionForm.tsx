'use client';

import { ExpenseCategory, TransactionType } from '../types';
import CategoryDropdown from './CategoryDropdown';

type TransactionFormProps = {
  transactionType: TransactionType;
  transactionAmount: string;
  transactionCategory: string;
  transactionDescription: string;
  transactionDate: string;
  transactionTime: string;
  categories: ExpenseCategory[];
  errors: {
    amount?: string;
    category?: string;
    date?: string;
  };
  onTypeChange: (type: TransactionType) => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onCreateCategory: () => void;
};

export default function TransactionForm({
  transactionType,
  transactionAmount,
  transactionCategory,
  transactionDescription,
  transactionDate,
  transactionTime,
  categories,
  errors,
  onTypeChange,
  onAmountChange,
  onCategoryChange,
  onDescriptionChange,
  onDateChange,
  onTimeChange,
  onCreateCategory,
}: TransactionFormProps) {
  return (
    <div className="space-y-4">
      {/* Type Toggle */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Transaction Type</label>
        <div className="flex gap-2 rounded-lg border border-slate-200 p-1 bg-slate-50">
          <button
            type="button"
            onClick={() => onTypeChange('expense')}
            className={`flex-1 min-h-[44px] rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${
              transactionType === 'expense'
                ? 'bg-red-100 text-red-700'
                : 'text-slate-600 hover:bg-slate-100 active:bg-slate-200'
            }`}
            aria-label="Transaction type: Expense"
            aria-pressed={transactionType === 'expense'}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => onTypeChange('income')}
            className={`flex-1 min-h-[44px] rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${
              transactionType === 'income'
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-100 active:bg-slate-200'
            }`}
            aria-label="Transaction type: Income"
            aria-pressed={transactionType === 'income'}
          >
            Income
          </button>
        </div>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-2">
          Amount <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">$</span>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={transactionAmount}
            onChange={(e) => onAmountChange(e.target.value)}
            className={`w-full min-h-[44px] rounded-lg border ${
              errors.amount ? 'border-red-300' : 'border-slate-200'
            } bg-white pl-8 pr-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2`}
            placeholder="0.00"
            aria-label="Transaction amount"
            aria-required="true"
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
          />
        </div>
        {errors.amount && (
          <p id="amount-error" className="mt-1 text-xs text-red-600" role="alert">
            {errors.amount}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <CategoryDropdown
          value={transactionCategory}
          categories={categories}
          transactionType={transactionType}
          onChange={onCategoryChange}
          onCreateNew={onCreateCategory}
          error={errors.category}
        />
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            type="date"
            value={transactionDate}
            onChange={(e) => onDateChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full min-h-[44px] rounded-lg border ${
              errors.date ? 'border-red-300' : 'border-slate-200'
            } bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2`}
            aria-label="Transaction date"
            aria-required="true"
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <p id="date-error" className="mt-1 text-xs text-red-600" role="alert">
              {errors.date}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">
            Time <span className="text-xs text-slate-500">(optional)</span>
          </label>
          <input
            id="time"
            type="time"
            value={transactionTime}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full min-h-[44px] rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            aria-label="Transaction time (optional)"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
          Description <span className="text-xs text-slate-500">(optional but recommended)</span>
        </label>
        <textarea
          id="description"
          value={transactionDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={3}
          className="w-full min-h-[88px] rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 resize-y"
          placeholder="Why did you spend/earn this?"
          aria-label="Transaction description (optional)"
        />
      </div>
    </div>
  );
}
