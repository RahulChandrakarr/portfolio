'use client';

import { ExpenseCategory } from '../types';
import CategoryCard from './CategoryCard';

type ExpenseCategoriesViewProps = {
  categories: ExpenseCategory[];
  categoryBreakdown: { [key: string]: number };
  categoryTransactionCounts: { [key: string]: number };
  currencyFormatter: Intl.NumberFormat;
  onAddCategory: () => void;
  onEditCategory: (category: ExpenseCategory) => void;
  onDeleteCategory: (id: string) => void;
};

export default function ExpenseCategoriesView({
  categories,
  categoryBreakdown,
  categoryTransactionCounts,
  currencyFormatter,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: ExpenseCategoriesViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Category Management</h3>
          <p className="mt-1 text-sm text-slate-600">
            Organize your income and expense categories
          </p>
        </div>
        <button
          onClick={onAddCategory}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          + Add New Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-600 mb-2">No categories yet.</p>
          <p className="text-xs text-slate-500 mb-4">
            Create your first category to start organizing transactions.
          </p>
          <button
            onClick={onAddCategory}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            + Add Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const transactionCount = categoryTransactionCounts[category.id] || 0;
            const totalAmount = categoryBreakdown[category.id] || 0;
            return (
              <CategoryCard
                key={category.id}
                category={category}
                transactionCount={transactionCount}
                totalAmount={totalAmount}
                currencyFormatter={currencyFormatter}
                onEdit={onEditCategory}
                onDelete={onDeleteCategory}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
