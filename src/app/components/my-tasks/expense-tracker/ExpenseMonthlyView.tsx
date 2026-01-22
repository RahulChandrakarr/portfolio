'use client';

import { ExpenseTransaction, ExpenseCategory } from '../types';

type ExpenseMonthlyViewProps = {
  monthlyBreakdown: { [key: string]: { income: number; expense: number } };
  filteredTransactions: ExpenseTransaction[];
  categories: ExpenseCategory[];
  currencyFormatter: Intl.NumberFormat;
};

export default function ExpenseMonthlyView({
  monthlyBreakdown,
  filteredTransactions,
  categories,
  currencyFormatter,
}: ExpenseMonthlyViewProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Monthly Breakdown</h3>
      <div className="space-y-4">
        {Object.entries(monthlyBreakdown)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([month, data]) => {
            const net = data.income - data.expense;
            return (
              <div key={month} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-slate-900">
                    {new Date(month + '-01').toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h4>
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
                    <p className="text-xs text-slate-500">Income</p>
                    <p className="text-xl font-semibold text-emerald-600">
                      {currencyFormatter.format(data.income)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Expenses</p>
                    <p className="text-xl font-semibold text-red-600">
                      {currencyFormatter.format(data.expense)}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  {filteredTransactions
                    .filter((t) => t.transaction_date.startsWith(month))
                    .map((transaction) => {
                      const category = categories.find((c) => c.id === transaction.category_id);
                      return (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between border-t border-slate-100 py-2"
                        >
                          <div className="flex items-center gap-3">
                            <span>{category?.icon || '💰'}</span>
                            <span className="text-sm text-slate-700">
                              {category?.name || 'Unknown'}
                            </span>
                            {transaction.description && (
                              <span className="text-xs text-slate-500">
                                - {transaction.description}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-sm font-semibold ${
                              transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                            }`}
                          >
                            {transaction.type === 'income' ? '+' : '-'}
                            {currencyFormatter.format(transaction.amount)}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
