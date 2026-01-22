'use client';

import { ExpenseCategory, TransactionType } from '../types';

type CategoryDropdownProps = {
  value: string;
  categories: ExpenseCategory[];
  transactionType: TransactionType;
  onChange: (value: string) => void;
  onCreateNew: () => void;
  error?: string;
};

export default function CategoryDropdown({
  value,
  categories,
  transactionType,
  onChange,
  onCreateNew,
  error,
}: CategoryDropdownProps) {
  const filteredCategories = categories
    .filter((cat) => cat.type === transactionType)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border ${
          error ? 'border-red-300' : 'border-slate-200'
        } bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none`}
      >
        <option value="" className="text-slate-900">Select a category</option>
        {filteredCategories.map((cat) => (
          <option key={cat.id} value={cat.id} className="text-slate-900">
            {cat.icon} {cat.name}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
      <button
        type="button"
        onClick={onCreateNew}
        className="mt-2 flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create New Category
      </button>
    </div>
  );
}
