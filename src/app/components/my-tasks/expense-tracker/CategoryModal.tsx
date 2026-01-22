'use client';

import { ExpenseCategory, TransactionType } from '../types';

type CategoryModalProps = {
  show: boolean;
  editingCategory: ExpenseCategory | null;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  categoryType: TransactionType;
  error: string | null;
  onClose: () => void;
  onNameChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onIconChange: (value: string) => void;
  onTypeChange: (type: TransactionType) => void;
  onSave: () => void;
};

export default function CategoryModal({
  show,
  editingCategory,
  categoryName,
  categoryColor,
  categoryIcon,
  categoryType,
  error,
  onClose,
  onNameChange,
  onColorChange,
  onIconChange,
  onTypeChange,
  onSave,
}: CategoryModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            {editingCategory ? 'Edit Category' : 'Add Category'}
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
                categoryType === 'expense'
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
                categoryType === 'income'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Income
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
              placeholder="Category name"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Icon</label>
            <input
              type="text"
              value={categoryIcon}
              onChange={(e) => onIconChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
              placeholder="💰"
              maxLength={2}
            />
            <p className="mt-1 text-xs text-slate-500">Enter an emoji (e.g., 🍔, 🚗, 💰)</p>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={categoryColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="h-10 w-20 rounded-lg border border-slate-200 cursor-pointer"
              />
              <input
                type="text"
                value={categoryColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                placeholder="#3B82F6"
              />
            </div>
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
              {editingCategory ? 'Update' : 'Add'} Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
