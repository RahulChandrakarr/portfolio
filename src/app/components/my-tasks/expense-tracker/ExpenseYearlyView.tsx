'use client';

import { ExpenseCategory } from '../types';

type ExpenseYearlyViewProps = {
  yearlyBreakdown: { [key: string]: { income: number; expense: number } };
  currencyFormatter: Intl.NumberFormat;
};

export default function ExpenseYearlyView({
  yearlyBreakdown,
  currencyFormatter,
}: ExpenseYearlyViewProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Yearly Breakdown</h3>
      <div className="space-y-4">
        {Object.entries(yearlyBreakdown)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([year, data]) => {
            const net = data.income - data.expense;
            return (
              <div key={year} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-slate-900">{year}</h4>
                  <p
                    className={`text-lg font-bold ${
                      net >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {currencyFormatter.format(net)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Total Income</p>
                    <p className="text-xl font-semibold text-emerald-600">
                      {currencyFormatter.format(data.income)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Total Expenses</p>
                    <p className="text-xl font-semibold text-red-600">
                      {currencyFormatter.format(data.expense)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
