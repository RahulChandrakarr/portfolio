'use client';

export type PeriodType = 'this_month' | 'all_time' | 'last_30_days';

type PeriodSelectorProps = {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
};

export default function PeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: PeriodSelectorProps) {
  const periods: { value: PeriodType; label: string }[] = [
    { value: 'this_month', label: 'This Month' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'all_time', label: 'All Time' },
  ];

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            selectedPeriod === period.value
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
