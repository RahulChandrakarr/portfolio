'use client';

type SearchBarProps = {
  value: string;
  resultCount?: number;
  totalCount?: number;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export default function SearchBar({
  value,
  resultCount,
  totalCount,
  placeholder = 'Search transactions...',
  onChange,
  onClear,
}: SearchBarProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {value && resultCount !== undefined && totalCount !== undefined && (
        <p className="text-xs text-slate-500">
          Found {resultCount} of {totalCount} transaction{resultCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
