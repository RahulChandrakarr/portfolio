'use client';

import { ExpenseTransaction, ExpenseCategory, TransactionType } from '../types';

type TransactionModalProps = {
  show: boolean;
  editingTransaction: ExpenseTransaction | null;
  transactionType: TransactionType;
  transactionAmount: string;
  transactionCategory: string;
  transactionDescription: string;
  transactionDate: string;
  categories: ExpenseCategory[];
  error: string | null;
  onClose: () => void;
  onTypeChange: (type: TransactionType) => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSave: () => void;
};

export default function TransactionModal({
  show,
  editingTransaction,
  transactionType,
  transactionAmount,
  transactionCategory,
  transactionDescription,
  transactionDate,
  categories,
  error,
  onClose,
  onTypeChange,
  onAmountChange,
  onCategoryChange,
  onDescriptionChange,
  onDateChange,
  onSave,
}: TransactionModalProps) {
  if (!show) return null;

  const getCategoriesByType = (type: TransactionType) => {
    return categories.filter((c) => c.type === type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {/* Type Toggle */}
          <div className="flex gap-2 rounded-lg border border-slate-200 p-1">
            <button
              type="button"
              onClick={() => onTypeChange('expense')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                transactionType === 'expense'
                  ? 'bg-red-100 text-red-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => onTypeChange('income')}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                transactionType === 'income'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={transactionAmount}
              onChange={(e) => onAmountChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none"
              placeholder="0.00"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={transactionCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none"
            >
              <option value="">Select a category</option>
              {getCategoriesByType(transactionType).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
            <input
              type="date"
              value={transactionDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description (optional)
            </label>
            <textarea
              value={transactionDescription}
              onChange={(e) => onDescriptionChange(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none resize-y"
              placeholder="Add a note about this transaction..."
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              {editingTransaction ? 'Update' : 'Add'} Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
