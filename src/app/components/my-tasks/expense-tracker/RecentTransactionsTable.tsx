'use client';

import { ExpenseTransaction, ExpenseCategory } from '../types';

type RecentTransactionsTableProps = {
  transactions: ExpenseTransaction[];
  categories: ExpenseCategory[];
  loading: boolean;
  dateFormatter: Intl.DateTimeFormat;
  currencyFormatter: Intl.NumberFormat;
  onEdit: (transaction: ExpenseTransaction) => void;
  onDelete: (id: string) => void;
  onViewAll?: () => void;
};

export default function RecentTransactionsTable({
  transactions,
  categories,
  loading,
  dateFormatter,
  currencyFormatter,
  onEdit,
  onDelete,
  onViewAll,
}: RecentTransactionsTableProps) {
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
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-600 mb-2">No transactions yet.</p>
        <p className="text-xs text-slate-500">
          Click &apos;Add Transaction&apos; to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((transaction) => {
              const category = categories.find((c) => c.id === transaction.category_id);
              const isIncome = transaction.type === 'income';
              return (
                <tr
                  key={transaction.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onEdit(transaction)}
                >
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {new Date(transaction.transaction_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category?.icon || '💰'}</span>
                      <span className="text-sm font-medium text-slate-900">
                        {category?.name || 'Unknown'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-600">
                      {transaction.description || (
                        <span className="text-slate-400 italic">No description</span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`text-sm font-semibold ${
                        isIncome ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {isIncome ? '+' : '-'}
                      {currencyFormatter.format(transaction.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="flex items-center justify-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                        onClick={() => onDelete(transaction.id)}
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {onViewAll && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            View All in Monthly View →
          </button>
        </div>
      )}
    </div>
  );
}
