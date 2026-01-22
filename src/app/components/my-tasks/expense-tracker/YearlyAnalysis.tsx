'use client';

import { ExpenseTransaction, ExpenseCategory } from '../types';

type YearlyAnalysisProps = {
  transactions: ExpenseTransaction[];
  categories: ExpenseCategory[];
  currencyFormatter: Intl.NumberFormat;
};

export default function YearlyAnalysis({
  transactions,
  categories,
  currencyFormatter,
}: YearlyAnalysisProps) {
  // Calculate highest spending month
  const monthlyExpenses: { [key: string]: number } = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const month = t.transaction_date.substring(0, 7); // YYYY-MM
      if (!monthlyExpenses[month]) monthlyExpenses[month] = 0;
      monthlyExpenses[month] += t.amount;
    });

  const highestMonth = Object.entries(monthlyExpenses).reduce(
    (max, [month, amount]) => (amount > max.amount ? { month, amount } : max),
    { month: '', amount: 0 }
  );

  const lowestMonth = Object.entries(monthlyExpenses).reduce(
    (min, [month, amount]) => (amount < min.amount && amount > 0 ? { month, amount } : min),
    { month: '', amount: Infinity }
  );

  // Most used category
  const categoryCounts: { [key: string]: { count: number; total: number } } = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      if (!categoryCounts[t.category_id]) {
        categoryCounts[t.category_id] = { count: 0, total: 0 };
      }
      categoryCounts[t.category_id].count++;
      categoryCounts[t.category_id].total += t.amount;
    });

  const mostUsedCategory = Object.entries(categoryCounts).reduce(
    (max, [catId, data]) => (data.count > max.count ? { catId, ...data } : max),
    { catId: '', count: 0, total: 0 }
  );

  const mostUsedCategoryName =
    categories.find((c) => c.id === mostUsedCategory.catId)?.name || 'Unknown';
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const categoryPercentage =
    totalExpenses > 0 ? (mostUsedCategory.total / totalExpenses) * 100 : 0;

  // Average daily expense
  const daysWithExpenses = new Set(
    transactions.filter((t) => t.type === 'expense').map((t) => t.transaction_date)
  ).size;
  const averageDailyExpense = daysWithExpenses > 0 ? totalExpenses / daysWithExpenses : 0;

  // Highest single transaction
  const highestTransaction = transactions.reduce(
    (max, t) => (t.amount > max.amount ? t : max),
    { amount: 0 } as ExpenseTransaction
  );

  const formatMonth = (monthStr: string) => {
    if (!monthStr) return 'N/A';
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h4 className="text-sm font-semibold text-slate-900 mb-4">Year Analysis</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600 mb-1">Highest Spending Month</p>
          <p className="text-sm font-semibold text-slate-900">
            {formatMonth(highestMonth.month)}
          </p>
          <p className="text-lg font-bold text-red-600 mt-1">
            {currencyFormatter.format(highestMonth.amount)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600 mb-1">Lowest Spending Month</p>
          <p className="text-sm font-semibold text-slate-900">
            {lowestMonth.amount !== Infinity ? formatMonth(lowestMonth.month) : 'N/A'}
          </p>
          {lowestMonth.amount !== Infinity && (
            <p className="text-lg font-bold text-emerald-600 mt-1">
              {currencyFormatter.format(lowestMonth.amount)}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600 mb-1">Most Used Category</p>
          <p className="text-sm font-semibold text-slate-900">{mostUsedCategoryName}</p>
          <p className="text-xs text-slate-500 mt-1">
            {mostUsedCategory.count} transactions ({categoryPercentage.toFixed(1)}% of total)
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600 mb-1">Average Daily Expense</p>
          <p className="text-lg font-bold text-slate-900 mt-1">
            {currencyFormatter.format(averageDailyExpense)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600 mb-1">Highest Single Transaction</p>
          {highestTransaction.amount > 0 && (
            <>
              <p className="text-lg font-bold text-slate-900 mt-1">
                {currencyFormatter.format(highestTransaction.amount)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {highestTransaction.description || 'No description'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
