'use client';

import { ExpenseCategory } from '../types';

type ExpenseCategoriesViewProps = {
  categories: ExpenseCategory[];
  categoryBreakdown: { [key: string]: number };
  currencyFormatter: Intl.NumberFormat;
  onAddCategory: () => void;
  onEditCategory: (category: ExpenseCategory) => void;
  onDeleteCategory: (id: string) => void;
};

export default function ExpenseCategoriesView({
  categories,
  categoryBreakdown,
  currencyFormatter,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: ExpenseCategoriesViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Manage Categories</h3>
        <button
          onClick={onAddCategory}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          + Add Category
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const categoryTotal = categoryBreakdown[category.id] || 0;
          return (
            <div
              key={category.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  {category.icon}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditCategory(category)}
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
                    onClick={() => onDeleteCategory(category.id)}
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
              <h4 className="font-semibold text-slate-900">{category.name}</h4>
              <p className="mt-1 text-xs text-slate-500 capitalize">{category.type}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {currencyFormatter.format(categoryTotal)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
