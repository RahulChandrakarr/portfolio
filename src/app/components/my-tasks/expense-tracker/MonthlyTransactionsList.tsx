'use client';

import { useState, useMemo } from 'react';
import { ExpenseTransaction, ExpenseCategory } from '../types';

type SortOption = 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc' | 'category_asc';
type GroupOption = 'none' | 'date' | 'category';

type MonthlyTransactionsListProps = {
  transactions: ExpenseTransaction[];
  categories: ExpenseCategory[];
  currencyFormatter: Intl.NumberFormat;
  dateFormatter: Intl.DateTimeFormat;
  onEdit: (transaction: ExpenseTransaction) => void;
  onDelete: (transaction: ExpenseTransaction) => void;
  onDuplicate?: (transaction: ExpenseTransaction) => void;
};

export default function MonthlyTransactionsList({
  transactions,
  categories,
  currencyFormatter,
  dateFormatter,
  onEdit,
  onDelete,
  onDuplicate,
}: MonthlyTransactionsListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');
  const [groupBy, setGroupBy] = useState<GroupOption>('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Sort transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    switch (sortBy) {
      case 'date_desc':
        return new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime();
      case 'date_asc':
        return new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime();
      case 'amount_desc':
        return b.amount - a.amount;
      case 'amount_asc':
        return a.amount - b.amount;
      case 'category_asc': {
        const catA = categories.find((c) => c.id === a.category_id)?.name || '';
        const catB = categories.find((c) => c.id === b.category_id)?.name || '';
        return catA.localeCompare(catB);
      }
      default:
        return 0;
    }
  });

  // Group transactions
  const groupedTransactions = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All': sortedTransactions };
    }

    const groups: { [key: string]: ExpenseTransaction[] } = {};
    sortedTransactions.forEach((transaction) => {
      let key: string;
      if (groupBy === 'date') {
        key = new Date(transaction.transaction_date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      } else {
        const category = categories.find((c) => c.id === transaction.category_id);
        key = category?.name || 'Unknown';
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(transaction);
    });
    return groups;
  }, [sortedTransactions, groupBy, categories]);

  // Paginate
  const allItems = Object.entries(groupedTransactions).flatMap(([key, items]) =>
    groupBy !== 'none' ? [{ type: 'header', key } as any, ...items] : items
  );
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const paginatedItems = allItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-600 mb-2">No transactions for selected month.</p>
        <p className="text-xs text-slate-500">
          Click &apos;Add Transaction&apos; to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm font-medium text-slate-700">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as SortOption);
              setCurrentPage(1);
            }}
            className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            aria-label="Sort transactions"
          >
            <option value="date_desc">Date (Newest)</option>
            <option value="date_asc">Date (Oldest)</option>
            <option value="amount_desc">Amount (Highest)</option>
            <option value="amount_asc">Amount (Lowest)</option>
            <option value="category_asc">Category (A-Z)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="group-select" className="text-sm font-medium text-slate-700">Group by:</label>
          <select
            id="group-select"
            value={groupBy}
            onChange={(e) => {
              setGroupBy(e.target.value as GroupOption);
              setCurrentPage(1);
            }}
            className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            aria-label="Group transactions"
          >
            <option value="none">None</option>
            <option value="date">Date</option>
            <option value="category">Category</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="per-page-select" className="text-sm font-medium text-slate-700">Per page:</label>
          <select
            id="per-page-select"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            aria-label="Items per page"
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
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
                  Type
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedItems.map((item: any, index: number) => {
                if (item.type === 'header') {
                  return (
                    <tr key={`header-${item.key}-${index}`} className="bg-slate-100">
                      <td colSpan={6} className="px-4 py-2">
                        <p className="text-sm font-semibold text-slate-900">{item.key}</p>
                      </td>
                    </tr>
                  );
                }

                const transaction = item as ExpenseTransaction;
                const category = categories.find((c) => c.id === transaction.category_id);
                const isIncome = transaction.type === 'income';

                return (
                  <tr
                    key={transaction.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => onEdit(transaction)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Transaction: ${category?.name || 'Unknown'} - ${currencyFormatter.format(transaction.amount)} on ${new Date(transaction.transaction_date).toLocaleDateString()}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onEdit(transaction);
                      }
                    }}
                  >
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {new Date(transaction.transaction_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
                          style={{ backgroundColor: category?.color + '20', color: category?.color }}
                        >
                          {category?.icon || '💰'}
                        </div>
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
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          isIncome
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {isIncome ? 'Income' : 'Expense'}
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
                        {onDuplicate && (
                          <button
                            onClick={() => onDuplicate(transaction)}
                            className="min-w-[44px] min-h-[44px] rounded-lg p-1.5 hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                            aria-label={`Duplicate transaction: ${category?.name || 'Unknown'}`}
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
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(transaction)}
                          className="min-w-[44px] min-h-[44px] rounded-lg p-1.5 hover:bg-red-50 active:bg-red-100 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          aria-label={`Delete transaction: ${category?.name || 'Unknown'}`}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
