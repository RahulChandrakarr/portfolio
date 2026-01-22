'use client';

type SummaryCardsProps = {
  income: number;
  expenses: number;
  net: number;
  currencyFormatter: Intl.NumberFormat;
};

export default function SummaryCards({
  income,
  expenses,
  net,
  currencyFormatter,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-xs font-medium text-emerald-700">Total Income</p>
        <p className="mt-2 text-2xl font-bold text-emerald-900">
          {currencyFormatter.format(income)}
        </p>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-xs font-medium text-red-700">Total Expenses</p>
        <p className="mt-2 text-2xl font-bold text-red-900">
          {currencyFormatter.format(expenses)}
        </p>
      </div>
      <div
        className={`rounded-xl border p-4 ${
          net >= 0 ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
        }`}
      >
        <p
          className={`text-xs font-medium ${net >= 0 ? 'text-emerald-700' : 'text-red-700'}`}
        >
          Net Balance
        </p>
        <p
          className={`mt-2 text-2xl font-bold ${net >= 0 ? 'text-emerald-900' : 'text-red-900'}`}
        >
          {currencyFormatter.format(net)}
        </p>
      </div>
    </div>
  );
}
