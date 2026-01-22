'use client';

type MonthlySummaryProps = {
  income: number;
  expenses: number;
  net: number;
  incomeChange: number;
  expensesChange: number;
  incomeChangePercent: number;
  expensesChangePercent: number;
  averageDailyExpense: number;
  currencyFormatter: Intl.NumberFormat;
};

export default function MonthlySummary({
  income,
  expenses,
  net,
  incomeChange,
  expensesChange,
  incomeChangePercent,
  expensesChangePercent,
  averageDailyExpense,
  currencyFormatter,
}: MonthlySummaryProps) {
  const formatChange = (change: number, percent: number, label: string) => {
    const isPositive = change >= 0;
    const sign = isPositive ? '+' : '';
    return (
      <div className="mt-2 flex items-center gap-2">
        <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {label} {sign}{Math.abs(percent).toFixed(1)}% vs last month
        </span>
        <span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
          {isPositive ? '↑' : '↓'}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-medium text-emerald-700">Month Income</p>
          <p className="mt-2 text-2xl font-bold text-emerald-900">
            {currencyFormatter.format(income)}
          </p>
          {incomeChangePercent !== 0 && formatChange(incomeChange, incomeChangePercent, 'Income')}
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-xs font-medium text-red-700">Month Expenses</p>
          <p className="mt-2 text-2xl font-bold text-red-900">
            {currencyFormatter.format(expenses)}
          </p>
          {expensesChangePercent !== 0 &&
            formatChange(expensesChange, expensesChangePercent, 'Expenses')}
        </div>
        <div
          className={`rounded-xl border p-4 ${
            net >= 0 ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
          }`}
        >
          <p
            className={`text-xs font-medium ${net >= 0 ? 'text-emerald-700' : 'text-red-700'}`}
          >
            Month Net
          </p>
          <p
            className={`mt-2 text-2xl font-bold ${net >= 0 ? 'text-emerald-900' : 'text-red-900'}`}
          >
            {currencyFormatter.format(net)}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-600">Average Daily Expense</p>
        <p className="mt-1 text-lg font-semibold text-slate-900">
          {currencyFormatter.format(averageDailyExpense)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Based on {expenses > 0 ? Math.ceil(expenses / averageDailyExpense) : 0} days with expenses
        </p>
      </div>
    </div>
  );
}
