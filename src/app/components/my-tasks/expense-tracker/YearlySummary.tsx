'use client';

type YearlySummaryProps = {
  income: number;
  expenses: number;
  net: number;
  previousYearIncome: number;
  previousYearExpenses: number;
  previousYearNet: number;
  averageMonthlyIncome: number;
  averageMonthlyExpense: number;
  currencyFormatter: Intl.NumberFormat;
};

export default function YearlySummary({
  income,
  expenses,
  net,
  previousYearIncome,
  previousYearExpenses,
  previousYearNet,
  averageMonthlyIncome,
  averageMonthlyExpense,
  currencyFormatter,
}: YearlySummaryProps) {
  const incomeChange = income - previousYearIncome;
  const expensesChange = expenses - previousYearExpenses;
  const netChange = net - previousYearNet;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-medium text-emerald-700">Year Income</p>
          <p className="mt-2 text-2xl font-bold text-emerald-900">
            {currencyFormatter.format(income)}
          </p>
          {previousYearIncome > 0 && (
            <p className="mt-2 text-sm text-emerald-700">
              {incomeChange >= 0 ? '+' : ''}
              {currencyFormatter.format(incomeChange)} vs last year
            </p>
          )}
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-xs font-medium text-red-700">Year Expenses</p>
          <p className="mt-2 text-2xl font-bold text-red-900">
            {currencyFormatter.format(expenses)}
          </p>
          {previousYearExpenses > 0 && (
            <p className="mt-2 text-sm text-red-700">
              {expensesChange >= 0 ? '+' : ''}
              {currencyFormatter.format(expensesChange)} vs last year
            </p>
          )}
        </div>
        <div
          className={`rounded-xl border p-4 ${
            net >= 0 ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
          }`}
        >
          <p
            className={`text-xs font-medium ${net >= 0 ? 'text-emerald-700' : 'text-red-700'}`}
          >
            Year Net
          </p>
          <p
            className={`mt-2 text-2xl font-bold ${net >= 0 ? 'text-emerald-900' : 'text-red-900'}`}
          >
            {currencyFormatter.format(net)}
          </p>
          {previousYearNet !== 0 && (
            <p
              className={`mt-2 text-sm ${netChange >= 0 ? 'text-emerald-700' : 'text-red-700'}`}
            >
              {netChange >= 0 ? '+' : ''}
              {currencyFormatter.format(netChange)} vs last year
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Average Monthly Income</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {currencyFormatter.format(averageMonthlyIncome)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-600">Average Monthly Expense</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {currencyFormatter.format(averageMonthlyExpense)}
          </p>
        </div>
      </div>
    </div>
  );
}
