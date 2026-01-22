'use client';

import { useState } from 'react';
import { ExpenseCategory } from '../types';

type DeleteCategoryModalProps = {
  show: boolean;
  category: ExpenseCategory | null;
  transactionCount: number;
  availableCategories: ExpenseCategory[];
  onClose: () => void;
  onDelete: (reassignToCategoryId?: string) => void;
};

export default function DeleteCategoryModal({
  show,
  category,
  transactionCount,
  availableCategories,
  onClose,
  onDelete,
}: DeleteCategoryModalProps) {
  const [reassignTo, setReassignTo] = useState<string>('');

  if (!show || !category) return null;

  const canDelete = transactionCount === 0;
  const filteredCategories = availableCategories.filter(
    (cat) => cat.id !== category.id && cat.type === category.type
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Delete Category</h3>
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
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-xl"
              style={{ backgroundColor: category.color + '20', color: category.color }}
            >
              {category.icon}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{category.name}</p>
              <p className="text-xs text-slate-500 capitalize">{category.type}</p>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-900 mb-1">
              This category is used in {transactionCount} transaction{transactionCount !== 1 ? 's' : ''}
            </p>
            {canDelete ? (
              <p className="text-xs text-amber-700">
                You can safely delete this category as it&apos;s not in use.
              </p>
            ) : (
              <p className="text-xs text-amber-700">
                Deleting this category will affect {transactionCount} transaction{transactionCount !== 1 ? 's' : ''}.
                Please choose how to handle these transactions.
              </p>
            )}
          </div>

          {!canDelete && filteredCategories.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reassign transactions to:
              </label>
              <select
                value={reassignTo}
                onChange={(e) => setReassignTo(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
              >
                <option value="" className="text-slate-900">
                  Select a category
                </option>
                {filteredCategories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-slate-900">
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-slate-500">
                All transactions in this category will be moved to the selected category
              </p>
            </div>
          )}

          {!canDelete && filteredCategories.length === 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">
                Cannot delete this category. You need at least one other {category.type} category
                to reassign {transactionCount} transaction{transactionCount !== 1 ? 's' : ''}.
                Please create another category first.
              </p>
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
              onClick={() => {
                if (canDelete || reassignTo) {
                  onDelete(reassignTo || undefined);
                }
              }}
              disabled={!canDelete && !reassignTo}
              className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
