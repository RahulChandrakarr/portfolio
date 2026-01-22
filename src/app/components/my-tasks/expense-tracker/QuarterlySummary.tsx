'use client';

type QuarterlyData = {
  quarter: string;
  income: number;
  expenses: number;
  net: number;
  trend: 'up' | 'down' | 'stable';
};

type QuarterlySummaryProps = {
  quarterlyData: QuarterlyData[];
  currencyFormatter: Intl.NumberFormat;
};

export default function QuarterlySummary({
  quarterlyData,
  currencyFormatter,
}: QuarterlySummaryProps) {
  if (quarterlyData.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">No quarterly data available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quarterlyData.map((quarter) => (
        <div
          key={quarter.quarter}
          className={`rounded-xl border p-4 ${
            quarter.net >= 0
              ? 'border-emerald-200 bg-emerald-50'
              : 'border-red-200 bg-red-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-900">{quarter.quarter}</p>
            {quarter.trend === 'up' && (
              <span className="text-emerald-600">↑</span>
            )}
            {quarter.trend === 'down' && (
              <span className="text-red-600">↓</span>
            )}
            {quarter.trend === 'stable' && (
              <span className="text-slate-400">→</span>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Income:</span>
              <span className="font-medium text-emerald-700">
                {currencyFormatter.format(quarter.income)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Expenses:</span>
              <span className="font-medium text-red-700">
                {currencyFormatter.format(quarter.expenses)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
              <span className="text-slate-600">Net:</span>
              <span
                className={`font-semibold ${
                  quarter.net >= 0 ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {currencyFormatter.format(quarter.net)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
