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
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1" role="group" aria-label="Select time period">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`min-h-[44px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${
            selectedPeriod === period.value
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'
          }`}
          aria-pressed={selectedPeriod === period.value}
          aria-label={`Select ${period.label.toLowerCase()} period`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
