'use client';

import { ExpenseCategory, TransactionType } from '../types';
import CategoryForm from './CategoryForm';

type CategoryModalProps = {
  show: boolean;
  editingCategory: ExpenseCategory | null;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  categoryType: TransactionType;
  transactionCount?: number;
  error: string | null;
  validationErrors: { name?: string };
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
  transactionCount = 0,
  error,
  validationErrors,
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
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            {editingCategory ? 'Edit Category' : 'Create New Category'}
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

        {/* Content */}
        <div className="p-6">
          {editingCategory && transactionCount > 0 && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-sm text-amber-700">
                This category is used in {transactionCount} transaction{transactionCount !== 1 ? 's' : ''}.
                Changes will update all related transactions.
              </p>
            </div>
          )}

          <CategoryForm
            categoryName={categoryName}
            categoryColor={categoryColor}
            categoryIcon={categoryIcon}
            categoryType={categoryType}
            isEditing={!!editingCategory}
            transactionCount={transactionCount}
            errors={validationErrors}
            onNameChange={onNameChange}
            onColorChange={onColorChange}
            onIconChange={onIconChange}
            onTypeChange={onTypeChange}
          />

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex gap-3">
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
            {editingCategory ? 'Update' : 'Create'} Category
          </button>
        </div>
      </div>
    </div>
  );
}
