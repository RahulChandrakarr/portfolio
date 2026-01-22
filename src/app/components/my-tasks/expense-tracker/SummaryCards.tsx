'use client';

type SummaryCardsProps = {
  income: number;
  expenses: number;
  net: number;
  incomeChange?: number;
  expensesChange?: number;
  netChange?: number;
  incomeChangePercent?: number;
  expensesChangePercent?: number;
  netChangePercent?: number;
  currencyFormatter: Intl.NumberFormat;
};

export default function SummaryCards({
  income,
  expenses,
  net,
  incomeChange = 0,
  expensesChange = 0,
  netChange = 0,
  incomeChangePercent = 0,
  expensesChangePercent = 0,
  netChangePercent = 0,
  currencyFormatter,
}: SummaryCardsProps) {
  const formatChange = (change: number, percent: number) => {
    const isPositive = change >= 0;
    const sign = isPositive ? '+' : '';
    return (
      <div className="mt-2 flex items-center gap-2">
        <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {sign}{currencyFormatter.format(Math.abs(change))}
        </span>
        <span className={`text-xs ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          ({sign}{Math.abs(percent).toFixed(1)}%)
        </span>
        <span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
          {isPositive ? '↑' : '↓'}
        </span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-xs font-medium text-emerald-700">Total Income</p>
        <p className="mt-2 text-2xl font-bold text-emerald-900">
          {currencyFormatter.format(income)}
        </p>
        {incomeChange !== 0 && formatChange(incomeChange, incomeChangePercent)}
        <p className="mt-1 text-xs text-emerald-600">vs last month</p>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-xs font-medium text-red-700">Total Expenses</p>
        <p className="mt-2 text-2xl font-bold text-red-900">
          {currencyFormatter.format(expenses)}
        </p>
        {expensesChange !== 0 && formatChange(expensesChange, expensesChangePercent)}
        <p className="mt-1 text-xs text-red-600">vs last month</p>
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
        {netChange !== 0 && formatChange(netChange, netChangePercent)}
        <p className={`mt-1 text-xs ${net >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          vs last month
        </p>
      </div>
    </div>
  );
}
