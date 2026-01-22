'use client';

import { ExpenseTransaction, ExpenseCategory } from '../types';

type DeleteTransactionModalProps = {
  show: boolean;
  transaction: ExpenseTransaction | null;
  category: ExpenseCategory | null;
  currencyFormatter: Intl.NumberFormat;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteTransactionModal({
  show,
  transaction,
  category,
  currencyFormatter,
  onClose,
  onDelete,
}: DeleteTransactionModalProps) {
  if (!show || !transaction) return null;

  const isIncome = transaction.type === 'income';
  const formattedDate = new Date(transaction.transaction_date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Delete Transaction</h3>
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
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this transaction? This action cannot be undone.
          </p>

          {/* Transaction Details */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {category && (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
                    style={{ backgroundColor: category.color + '20', color: category.color }}
                  >
                    {category.icon}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-900">
                    {category?.name || 'Unknown Category'}
                  </p>
                  <p className="text-xs text-slate-500">{formattedDate}</p>
                </div>
              </div>
              <span
                className={`text-lg font-bold ${
                  isIncome ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {isIncome ? '+' : '-'}
                {currencyFormatter.format(transaction.amount)}
              </span>
            </div>
            {transaction.description && (
              <p className="text-sm text-slate-600 mt-2">{transaction.description}</p>
            )}
            <div className="mt-2">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  isIncome
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {isIncome ? 'Income' : 'Expense'}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              Delete Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
