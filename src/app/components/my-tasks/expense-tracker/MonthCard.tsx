'use client';

type MonthCardProps = {
  monthName: string;
  monthNumber: number;
  income: number;
  expenses: number;
  net: number;
  dailyData: { date: string; amount: number }[];
  currencyFormatter: Intl.NumberFormat;
  onClick: () => void;
};

export default function MonthCard({
  monthName,
  income,
  expenses,
  net,
  dailyData,
  currencyFormatter,
  onClick,
}: MonthCardProps) {
  // Calculate sparkline data
  const maxDaily = Math.max(...dailyData.map((d) => d.amount), 1);
  const sparklinePoints = dailyData.map((d) => {
    const dayOfMonth = new Date(d.date).getDate();
    const x = ((dayOfMonth - 1) / (dailyData.length - 1 || 1)) * 100;
    const y = maxDaily > 0 ? 100 - (d.amount / maxDaily) * 100 : 50;
    return `${x},${y}`;
  });

  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition-all hover:shadow-md ${
        net >= 0
          ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
          : 'border-red-200 bg-red-50 hover:bg-red-100'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-slate-900">{monthName}</h4>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded ${
            net >= 0 ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {net >= 0 ? '+' : ''}
          {currencyFormatter.format(net)}
        </span>
      </div>

      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600">Income:</span>
          <span className="font-medium text-emerald-700">
            {currencyFormatter.format(income)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600">Expenses:</span>
          <span className="font-medium text-red-700">
            {currencyFormatter.format(expenses)}
          </span>
        </div>
      </div>

      {/* Mini Sparkline */}
      {dailyData.length > 0 && (
        <div className="h-12 w-full">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <polyline
              points={sparklinePoints.join(' ')}
              fill="none"
              stroke={net >= 0 ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
