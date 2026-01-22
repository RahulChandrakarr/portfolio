'use client';

type YearlyNavigationProps = {
  currentYear: number;
  onPreviousYear: () => void;
  onNextYear: () => void;
  onSelectYear: (year: number) => void;
  onQuickSelect: (type: 'this_year' | 'last_year' | 'last_2_years') => void;
};

export default function YearlyNavigation({
  currentYear,
  onPreviousYear,
  onNextYear,
  onSelectYear,
  onQuickSelect,
}: YearlyNavigationProps) {
  const currentDate = new Date();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 2; i++) {
    years.push(i);
  }

  const handleYearClick = () => {
    // Open year picker
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '2000';
    input.max = '2100';
    input.value = currentYear.toString();
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.value) {
        onSelectYear(parseInt(target.value, 10));
      }
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      {/* Main Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPreviousYear}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Previous year"
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
          onClick={handleYearClick}
          className="px-4 py-2 text-lg font-semibold text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
        >
          {currentYear}
        </button>

        <button
          onClick={onNextYear}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Next year"
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

      {/* Year Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelectYear(year)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              year === currentYear
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Quick Select Buttons */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => onQuickSelect('this_year')}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          This Year
        </button>
        <button
          onClick={() => onQuickSelect('last_year')}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Last Year
        </button>
        <button
          onClick={() => onQuickSelect('last_2_years')}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Last 2 Years
        </button>
      </div>
    </div>
  );
}
