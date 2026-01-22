'use client';

import { ExpenseCategory } from '../types';

type CategoryBreakdownProps = {
  categoryBreakdown: { [key: string]: number };
  categories: ExpenseCategory[];
  currencyFormatter: Intl.NumberFormat;
};

export default function CategoryBreakdown({
  categoryBreakdown,
  categories,
  currencyFormatter,
}: CategoryBreakdownProps) {
  const sortedCategories = Object.entries(categoryBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  if (sortedCategories.length === 0) {
    return (
      <p className="text-sm text-slate-500">No spending data available yet.</p>
    );
  }

  const maxAmount = Math.max(...Object.values(categoryBreakdown));

  return (
    <div className="space-y-2">
      {sortedCategories.map(([catId, amount]) => {
        const category = categories.find((c) => c.id === catId);
        if (!category) return null;
        const percentage = (amount / maxAmount) * 100;

        return (
          <div key={catId} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span>{category.icon}</span>
                <span className="font-medium text-slate-900">{category.name}</span>
              </div>
              <span className="font-semibold text-slate-900">
                {currencyFormatter.format(amount)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full transition-all"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: category.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
