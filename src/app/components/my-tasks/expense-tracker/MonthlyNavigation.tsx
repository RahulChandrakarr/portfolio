'use client';

type MonthlyNavigationProps = {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectMonth: (month: Date) => void;
  onQuickSelect: (type: 'this_month' | 'last_month' | 'last_3_months') => void;
};

export default function MonthlyNavigation({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  onSelectMonth,
  onQuickSelect,
}: MonthlyNavigationProps) {
  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handleMonthClick = () => {
    // Open month picker (using date input)
    const input = document.createElement('input');
    input.type = 'month';
    input.value = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.value) {
        const [year, month] = target.value.split('-');
        onSelectMonth(new Date(parseInt(year), parseInt(month) - 1, 1));
      }
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      {/* Main Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPreviousMonth}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Previous month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={handleMonthClick}
          className="px-4 py-2 text-lg font-semibold text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
        >
          {monthName}
        </button>

        <button
          onClick={onNextMonth}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Next month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onQuickSelect('this_month')}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          This Month
        </button>
        <button
          onClick={() => onQuickSelect('last_month')}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Last Month
        </button>
        <button
          onClick={() => onQuickSelect('last_3_months')}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Last 3 Months
        </button>
      </div>
    </div>
  );
}
