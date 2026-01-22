'use client';

type MonthlyData = {
  month: string;
  monthNumber: number;
  income: number;
  expenses: number;
};

type YearlyTrendChartProps = {
  monthlyData: MonthlyData[];
  currencyFormatter: Intl.NumberFormat;
  onMonthClick?: (monthNumber: number) => void;
};

export default function YearlyTrendChart({
  monthlyData,
  currencyFormatter,
  onMonthClick,
}: YearlyTrendChartProps) {
  if (monthlyData.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">No data for this year</p>
      </div>
    );
  }

  const maxAmount = Math.max(
    ...monthlyData.map((d) => Math.max(d.income, d.expenses)),
    1
  );

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-4" role="img" aria-label="Monthly income and expense trend chart">
      <div className="flex items-end gap-1 md:gap-2 h-48 md:h-64 overflow-x-auto">
        {monthlyData.map((month) => {
          const incomeHeight = (month.income / maxAmount) * 100;
          const expensesHeight = (month.expenses / maxAmount) * 100;
          return (
            <div
              key={month.month}
              className="flex-1 flex flex-col items-center group cursor-pointer"
              onClick={() => onMonthClick?.(month.monthNumber)}
            >
              <div className="w-full flex items-end justify-center gap-0.5 h-full">
                <div
                  className="flex-1 bg-emerald-500 rounded-t hover:bg-emerald-600 transition-colors relative"
                  style={{ height: `${incomeHeight}%` }}
                  title={`${monthNames[month.monthNumber - 1]}: Income ${currencyFormatter.format(month.income)}`}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    Income: {currencyFormatter.format(month.income)}
                  </div>
                </div>
                <div
                  className="flex-1 bg-red-500 rounded-t hover:bg-red-600 transition-colors relative"
                  style={{ height: `${expensesHeight}%` }}
                  title={`${monthNames[month.monthNumber - 1]}: Expenses ${currencyFormatter.format(month.expenses)}`}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    Expenses: {currencyFormatter.format(month.expenses)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-500 mt-1">
                {monthNames[month.monthNumber - 1]}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded" />
          <span className="text-xs text-slate-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span className="text-xs text-slate-600">Expenses</span>
        </div>
      </div>
    </div>
  );
}
