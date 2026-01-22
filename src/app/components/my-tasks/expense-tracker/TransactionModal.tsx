'use client';

import { useState, useEffect } from 'react';
import { ExpenseTransaction, ExpenseCategory, TransactionType } from '../types';
import TransactionForm from './TransactionForm';
import { validateTransactionForm, hasFormData, TransactionFormErrors } from './transactionValidation';

type TransactionModalProps = {
  show: boolean;
  editingTransaction: ExpenseTransaction | null;
  transactionType: TransactionType;
  transactionAmount: string;
  transactionCategory: string;
  transactionDescription: string;
  transactionDate: string;
  transactionTime: string;
  categories: ExpenseCategory[];
  error: string | null;
  onClose: () => void;
  onTypeChange: (type: TransactionType) => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onSave: () => void;
  onDelete?: () => void;
  onCreateCategory: () => void;
};

export default function TransactionModal({
  show,
  editingTransaction,
  transactionType,
  transactionAmount,
  transactionCategory,
  transactionDescription,
  transactionDate,
  transactionTime,
  categories,
  error,
  onClose,
  onTypeChange,
  onAmountChange,
  onCategoryChange,
  onDescriptionChange,
  onDateChange,
  onTimeChange,
  onSave,
  onDelete,
  onCreateCategory,
}: TransactionModalProps) {
  const [validationErrors, setValidationErrors] = useState<TransactionFormErrors>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Check for unsaved changes
  useEffect(() => {
    if (show) {
      const formData = {
        amount: transactionAmount,
        category: transactionCategory,
        date: transactionDate,
        description: transactionDescription,
        time: transactionTime,
      };
      setHasUnsavedChanges(hasFormData(formData));
    } else {
      setHasUnsavedChanges(false);
      setValidationErrors({});
    }
  }, [show, transactionAmount, transactionCategory, transactionDate, transactionDescription, transactionTime]);

  const handleClose = () => {
    if (hasUnsavedChanges && !editingTransaction) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleSave = () => {
    const formData = {
      amount: transactionAmount,
      category: transactionCategory,
      date: transactionDate,
      description: transactionDescription,
      time: transactionTime,
    };

    const errors = validateTransactionForm(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSave();
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Desktop Modal */}
      <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50 p-4">
        <div
          className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="transaction-modal-title"
        >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 id="transaction-modal-title" className="text-xl font-semibold text-slate-900">
            {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button
            onClick={handleClose}
            className="min-w-[44px] min-h-[44px] rounded-lg p-2 hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center"
            aria-label="Close modal"
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

        {/* Form Content */}
        <div className="p-6">
          <TransactionForm
            transactionType={transactionType}
            transactionAmount={transactionAmount}
            transactionCategory={transactionCategory}
            transactionDescription={transactionDescription}
            transactionDate={transactionDate}
            transactionTime={transactionTime}
            categories={categories}
            errors={validationErrors}
            onTypeChange={onTypeChange}
            onAmountChange={onAmountChange}
            onCategoryChange={onCategoryChange}
            onDescriptionChange={onDescriptionChange}
            onDateChange={onDateChange}
            onTimeChange={onTimeChange}
            onCreateCategory={onCreateCategory}
          />

          {/* Server Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex gap-3">
          {editingTransaction && onDelete ? (
            <>
              <button
                onClick={onDelete}
                className="min-h-[44px] rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 active:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Delete transaction"
              >
                Delete
              </button>
              <button
                onClick={handleClose}
                className="flex-1 min-h-[44px] rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 min-h-[44px] rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Update Transaction
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleClose}
                className="flex-1 min-h-[44px] rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 min-h-[44px] rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Add Transaction
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Modal (Bottom Sheet) */}
      <div className="md:hidden fixed inset-0 z-50">
        <div
          className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom"
          role="dialog"
          aria-modal="true"
          aria-labelledby="transaction-modal-title-mobile"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <h3 id="transaction-modal-title-mobile" className="text-lg font-semibold text-slate-900">
              {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </h3>
            <button
              onClick={handleClose}
              className="min-w-[44px] min-h-[44px] rounded-lg p-2 hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
          <div className="p-4">
            <TransactionForm
              transactionType={transactionType}
              transactionAmount={transactionAmount}
              transactionCategory={transactionCategory}
              transactionDescription={transactionDescription}
              transactionDate={transactionDate}
              transactionTime={transactionTime}
              categories={categories}
              errors={validationErrors}
              onTypeChange={onTypeChange}
              onAmountChange={onAmountChange}
              onCategoryChange={onCategoryChange}
              onDescriptionChange={onDescriptionChange}
              onDateChange={onDateChange}
              onTimeChange={onTimeChange}
              onCreateCategory={onCreateCategory}
            />

            {/* Server Error */}
            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 px-4 py-3 flex gap-3">
            {editingTransaction && onDelete ? (
              <>
                <button
                  onClick={onDelete}
                  className="min-h-[44px] flex-1 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 active:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Delete transaction"
                >
                  Delete
                </button>
                <button
                  onClick={handleClose}
                  className="min-h-[44px] flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="min-h-[44px] flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleClose}
                  className="min-h-[44px] flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="min-h-[44px] flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </>
            )}
          </div>
        </div>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 -z-10"
          onClick={handleClose}
          aria-hidden="true"
        />
      </div>
    </>
  );
}
