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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button
            onClick={handleClose}
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
          <button
            onClick={handleClose}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            {editingTransaction ? 'Update' : 'Add'} Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
