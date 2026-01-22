'use client';

import { ExpenseTransaction, ExpenseCategory } from '../types';

type TransactionListProps = {
  transactions: ExpenseTransaction[];
  categories: ExpenseCategory[];
  loading: boolean;
  dateFormatter: Intl.DateTimeFormat;
  currencyFormatter: Intl.NumberFormat;
  onEdit: (transaction: ExpenseTransaction) => void;
  onDelete: (transaction: ExpenseTransaction) => void;
};

export default function TransactionList({
  transactions,
  categories,
  loading,
  dateFormatter,
  currencyFormatter,
  onEdit,
  onDelete,
}: TransactionListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4 animate-pulse"
          >
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <p className="text-sm text-slate-500">No transactions yet. Add your first transaction!</p>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => {
        const category = categories.find((c) => c.id === transaction.category_id);
        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
                style={{ backgroundColor: category?.color + '20', color: category?.color }}
              >
                {category?.icon || '💰'}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {category?.name || 'Unknown'}
                </p>
                <p className="text-xs text-slate-500">
                  {dateFormatter.format(new Date(transaction.transaction_date))}
                </p>
                {transaction.description && (
                  <p className="mt-1 text-xs text-slate-600">{transaction.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p
                className={`text-lg font-bold ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {currencyFormatter.format(transaction.amount)}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(transaction)}
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
                  onClick={() => onDelete(transaction)}
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
          </div>
        );
      })}
    </div>
  );
}
