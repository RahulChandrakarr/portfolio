'use client';

export default function OverviewTab() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Overview
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            Current status
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            A quick snapshot of what is happening right now. Highlight key
            metrics and blockers so you can act fast.
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Up to date
        </span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-800">Active tasks</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">8</p>
          <p className="text-xs text-slate-500">3 due this week</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-800">Completion rate</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">72%</p>
          <p className="text-xs text-slate-500">+4% vs last sprint</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-800">Recent highlights</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>• Resolved onboarding blocker for new hires</li>
            <li>• Closed 5 customer-reported issues</li>
            <li>• Deployed analytics instrumentation</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-800">Watch list / risks</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>• API latency spike in EU region</li>
            <li>• Pending dependency update for auth SDK</li>
            <li>• UX polish needed on billing flow</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
