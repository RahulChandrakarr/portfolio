'use client';

import { ExpenseTransaction } from '../types';

type MonthlyBarChartProps = {
  dailyData: { date: string; amount: number }[];
  currencyFormatter: Intl.NumberFormat;
  onDayClick?: (date: string) => void;
};

export default function MonthlyBarChart({
  dailyData,
  currencyFormatter,
  onDayClick,
}: MonthlyBarChartProps) {
  if (dailyData.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">No expense data for this month</p>
      </div>
    );
  }

  const maxAmount = Math.max(...dailyData.map((d) => d.amount), 1);

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-1 h-48">
        {dailyData.map((day) => {
          const height = maxAmount > 0 ? (day.amount / maxAmount) * 100 : 0;
          return (
            <div
              key={day.date}
              className="flex-1 flex flex-col items-center group"
              onClick={() => onDayClick?.(day.date)}
            >
              <div className="w-full flex flex-col items-center justify-end h-full">
                <div
                  className="w-full bg-red-500 rounded-t hover:bg-red-600 transition-colors cursor-pointer relative"
                  style={{ height: `${height}%` }}
                  title={`${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${currencyFormatter.format(day.amount)}`}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {currencyFormatter.format(day.amount)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-500 mt-1">
                {new Date(day.date).getDate()}
              </span>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-500">Daily expenses across the month</p>
      </div>
    </div>
  );
}
