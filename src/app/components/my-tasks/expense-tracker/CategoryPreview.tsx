'use client';

import { TransactionType } from '../types';

type CategoryPreviewProps = {
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
};

export default function CategoryPreview({
  name,
  icon,
  color,
  type,
}: CategoryPreviewProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-600 mb-3">Preview:</p>
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
          style={{ backgroundColor: color + '20', color: color }}
        >
          {icon || '💰'}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {name || 'Category Name'}
          </p>
          <span
            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              type === 'income'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {type === 'income' ? 'Income' : 'Expense'}
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500 italic">
        This is how your category will appear in transactions
      </p>
    </div>
  );
}
