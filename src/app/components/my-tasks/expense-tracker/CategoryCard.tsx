'use client';

import { ExpenseCategory } from '../types';

type CategoryCardProps = {
  category: ExpenseCategory;
  transactionCount: number;
  totalAmount: number;
  currencyFormatter: Intl.NumberFormat;
  onEdit: (category: ExpenseCategory) => void;
  onDelete: (id: string) => void;
};

export default function CategoryCard({
  category,
  transactionCount,
  totalAmount,
  currencyFormatter,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-2xl flex-shrink-0"
            style={{ backgroundColor: category.color + '20', color: category.color }}
          >
            {category.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 truncate">{category.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  category.type === 'income'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {category.type === 'income' ? 'Income' : 'Expense'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(category)}
            className="rounded-lg p-1.5 hover:bg-slate-100 transition-colors"
            aria-label="Edit"
          >
            <svg
              className="w-4 h-4 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="rounded-lg p-1.5 hover:bg-red-50 transition-colors"
            aria-label="Delete"
          >
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Transactions:</span>
          <span className="font-semibold text-slate-900">
            {transactionCount} {transactionCount === 1 ? 'time' : 'times'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Total Amount:</span>
          <span className="font-semibold text-slate-900">
            {currencyFormatter.format(totalAmount)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div
            className="h-2 flex-1 rounded-full"
            style={{ backgroundColor: category.color + '40' }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: transactionCount > 0 ? '100%' : '0%',
                backgroundColor: category.color,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
