'use client';

import { ExpenseCategory } from '../types';

type MonthlyPieChartProps = {
  categoryData: { category: ExpenseCategory; amount: number; percentage: number }[];
  totalExpenses: number;
  currencyFormatter: Intl.NumberFormat;
  onCategoryClick?: (categoryId: string) => void;
};

export default function MonthlyPieChart({
  categoryData,
  totalExpenses,
  currencyFormatter,
  onCategoryClick,
}: MonthlyPieChartProps) {
  if (categoryData.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">No expense data for this month</p>
      </div>
    );
  }

  // Simple pie chart using CSS
  const sortedData = [...categoryData].sort((a, b) => b.amount - a.amount);
  const topCategories = sortedData.slice(0, 6);
  const otherAmount = sortedData.slice(6).reduce((sum, item) => sum + item.amount, 0);
  const otherPercentage = totalExpenses > 0 ? (otherAmount / totalExpenses) * 100 : 0;

  let currentAngle = 0;

  return (
    <div className="space-y-4" role="img" aria-label="Monthly expense breakdown by category">
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {topCategories.map((item) => {
              const percentage = item.percentage;
              const angle = (percentage / 100) * 360;
              const largeArc = percentage > 50 ? 1 : 0;
              const x1 = 50 + 50 * Math.cos((currentAngle * Math.PI) / 180);
              const y1 = 50 + 50 * Math.sin((currentAngle * Math.PI) / 180);
              const x2 = 50 + 50 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
              const y2 = 50 + 50 * Math.sin(((currentAngle + angle) * Math.PI) / 180);

              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 50 50 0 ${largeArc} 1 ${x2} ${y2}`,
                `Z`,
              ].join(' ');

              currentAngle += angle;

              return (
                <path
                  key={item.category.id}
                  d={pathData}
                  fill={item.category.color}
                  className={onCategoryClick ? 'cursor-pointer hover:opacity-80' : ''}
                  onClick={() => onCategoryClick?.(item.category.id)}
                />
              );
            })}
            {otherAmount > 0 && (
              <path
                d={`M 50 50 L ${50 + 50 * Math.cos((currentAngle * Math.PI) / 180)} ${50 + 50 * Math.sin((currentAngle * Math.PI) / 180)} A 50 50 0 ${otherPercentage > 50 ? 1 : 0} 1 50 0 Z`}
                fill="#94a3b8"
                className={onCategoryClick ? 'cursor-pointer hover:opacity-80' : ''}
              />
            )}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {topCategories.map((item) => (
          <button
            key={item.category.id}
            onClick={() => onCategoryClick?.(item.category.id)}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.category.color }}
              />
              <span className="text-sm font-medium text-slate-900">
                {item.category.icon} {item.category.name}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {currencyFormatter.format(item.amount)}
              </p>
              <p className="text-xs text-slate-500">{item.percentage.toFixed(1)}%</p>
            </div>
          </button>
        ))}
        {otherAmount > 0 && (
          <div className="flex items-center justify-between p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-400" />
              <span className="text-sm font-medium text-slate-900">Other</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {currencyFormatter.format(otherAmount)}
              </p>
              <p className="text-xs text-slate-500">{otherPercentage.toFixed(1)}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
