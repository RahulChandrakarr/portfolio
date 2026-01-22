'use client';

import { ExpenseCategory } from '../types';

type CategoryBreakdownTableProps = {
  categoryData: {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
    transactionCount: number;
  }[];
  totalExpenses: number;
  currencyFormatter: Intl.NumberFormat;
  onCategoryClick?: (categoryId: string) => void;
};

export default function CategoryBreakdownTable({
  categoryData,
  totalExpenses,
  currencyFormatter,
  onCategoryClick,
}: CategoryBreakdownTableProps) {
  if (categoryData.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">No category data for this month</p>
      </div>
    );
  }

  const sortedData = [...categoryData].sort((a, b) => b.amount - a.amount);

  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Percentage
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Transactions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sortedData.map((item) => (
            <tr
              key={item.category.id}
              className={`hover:bg-slate-50 transition-colors ${onCategoryClick ? 'cursor-pointer' : ''}`}
              onClick={() => onCategoryClick?.(item.category.id)}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
                    style={{ backgroundColor: item.category.color + '20', color: item.category.color }}
                  >
                    {item.category.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-900">{item.category.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-sm font-semibold text-slate-900">
                  {currencyFormatter.format(item.amount)}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.category.color,
                      }}
                    />
                  </div>
                  <span className="text-sm text-slate-600 w-12 text-right">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-sm text-slate-600">
                  {item.transactionCount} {item.transactionCount === 1 ? 'time' : 'times'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-50 border-t border-slate-200">
          <tr>
            <td className="px-4 py-3 text-sm font-semibold text-slate-900">Total</td>
            <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
              {currencyFormatter.format(totalExpenses)}
            </td>
            <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">100%</td>
            <td className="px-4 py-3 text-right text-sm text-slate-600">
              {sortedData.reduce((sum, item) => sum + item.transactionCount, 0)} total
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
