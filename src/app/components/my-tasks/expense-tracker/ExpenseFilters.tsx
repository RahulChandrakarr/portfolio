'use client';

import { ExpenseCategory } from '../types';

type ExpenseFiltersProps = {
  searchQuery: string;
  filterCategory: string;
  filterDateFrom: string;
  filterDateTo: string;
  filterAmountMin: string;
  filterAmountMax: string;
  categories: ExpenseCategory[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onAmountMinChange: (value: string) => void;
  onAmountMaxChange: (value: string) => void;
};

export default function ExpenseFilters({
  searchQuery,
  filterCategory,
  filterDateFrom,
  filterDateTo,
  filterAmountMin,
  filterAmountMax,
  categories,
  onSearchChange,
  onCategoryChange,
  onDateFromChange,
  onDateToChange,
  onAmountMinChange,
  onAmountMaxChange,
}: ExpenseFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
        />
        <select
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filterDateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          placeholder="From"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
        />
        <input
          type="date"
          value={filterDateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          placeholder="To"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
        />
      </div>
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Min Amount"
          value={filterAmountMin}
          onChange={(e) => onAmountMinChange(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={filterAmountMax}
          onChange={(e) => onAmountMaxChange(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
