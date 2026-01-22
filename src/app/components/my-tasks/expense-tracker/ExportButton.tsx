'use client';

import { ExpenseTransaction, ExpenseCategory } from '../types';

type ExportButtonProps = {
  transactions: ExpenseTransaction[];
  categories: ExpenseCategory[];
  currencyFormatter: Intl.NumberFormat;
  fileName?: string;
  disabled?: boolean;
};

export default function ExportButton({
  transactions,
  categories,
  currencyFormatter,
  fileName,
  disabled = false,
}: ExportButtonProps) {
  const handleExport = () => {
    if (transactions.length === 0) {
      return;
    }

    // Create CSV content
    const headers = ['Date', 'Category', 'Description', 'Amount', 'Type'];
    const rows = transactions.map((transaction) => {
      const category = categories.find((c) => c.id === transaction.category_id);
      const date = new Date(transaction.transaction_date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      return [
        date,
        category?.name || 'Unknown',
        transaction.description || '',
        transaction.amount.toString(),
        transaction.type === 'income' ? 'Income' : 'Expense',
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName || 'expense_tracker.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled || transactions.length === 0}
      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Export as CSV (Ctrl/Cmd + E)"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Export as CSV
    </button>
  );
}
