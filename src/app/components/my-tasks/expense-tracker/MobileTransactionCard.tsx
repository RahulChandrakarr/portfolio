'use client';

import { ExpenseTransaction, ExpenseCategory } from '../types';

type MobileTransactionCardProps = {
  transaction: ExpenseTransaction;
  category: ExpenseCategory | null;
  currencyFormatter: Intl.NumberFormat;
  dateFormatter: Intl.DateTimeFormat;
  onEdit: (transaction: ExpenseTransaction) => void;
  onDelete: (transaction: ExpenseTransaction) => void;
};

export default function MobileTransactionCard({
  transaction,
  category,
  currencyFormatter,
  onEdit,
  onDelete,
}: MobileTransactionCardProps) {
  const isIncome = transaction.type === 'income';
  const formattedDate = new Date(transaction.transaction_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white p-4 active:bg-slate-50 transition-colors"
      onClick={() => onEdit(transaction)}
      role="button"
      tabIndex={0}
      aria-label={`Edit transaction: ${category?.name || 'Unknown'} - ${currencyFormatter.format(transaction.amount)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEdit(transaction);
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-xl flex-shrink-0"
            style={{ backgroundColor: category?.color + '20', color: category?.color }}
            aria-hidden="true"
          >
            {category?.icon || '💰'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {category?.name || 'Unknown'}
              </p>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                  isIncome
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
                aria-label={isIncome ? 'Income' : 'Expense'}
              >
                {isIncome ? 'Income' : 'Expense'}
              </span>
            </div>
            {transaction.description && (
              <p className="text-xs text-slate-600 truncate mb-1">
                {transaction.description}
              </p>
            )}
            <p className="text-xs text-slate-500">{formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`text-base font-bold ${
              isIncome ? 'text-emerald-600' : 'text-red-600'
            }`}
            aria-label={`Amount: ${isIncome ? 'plus' : 'minus'}${currencyFormatter.format(transaction.amount)}`}
          >
            {isIncome ? '+' : '-'}
            {currencyFormatter.format(transaction.amount)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(transaction);
            }}
            className="min-w-[44px] min-h-[44px] rounded-lg p-2 hover:bg-red-50 active:bg-red-100 transition-colors flex items-center justify-center"
            aria-label={`Delete transaction: ${category?.name || 'Unknown'}`}
          >
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
}
