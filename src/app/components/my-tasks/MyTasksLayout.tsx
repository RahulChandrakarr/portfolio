'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type TabId = 'overview' | 'plans';

const tabs: {
  id: TabId;
  label: string;
  description: string;
}[] = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'Snapshot of your current workload and priorities.',
  },
  {
    id: 'plans',
    label: 'Plans',
    description: 'Upcoming milestones, timelines, and commitments.',
  },
];

export default function MyTasksLayout() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const content = useMemo(() => {
    if (activeTab === 'overview') {
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
              <p className="text-sm font-medium text-slate-800">
                Completion rate
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">72%</p>
              <p className="text-xs text-slate-500">+4% vs last sprint</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-800">
                Recent highlights
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>• Resolved onboarding blocker for new hires</li>
                <li>• Closed 5 customer-reported issues</li>
                <li>• Deployed analytics instrumentation</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-800">
                Watch list / risks
              </p>
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

    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Plans
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">
          What&apos;s next
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Upcoming milestones and commitments. Link to specs, tickets, and docs
          so you can jump in quickly.
        </p>

        <div className="mt-6 space-y-4">
          {[
            {
              title: 'Finalize Q1 roadmap',
              due: 'Due Friday',
              status: 'On track',
              description:
                'Confirm scope with stakeholders, finalize estimates, and publish the milestone doc.',
            },
            {
              title: 'Ship onboarding flow updates',
              due: 'Due next week',
              status: 'At risk',
              description:
                'Wrap validation fixes, add analytics events, and QA mobile edge cases.',
            },
            {
              title: 'Retrospective & action items',
              due: 'In 2 weeks',
              status: 'Planned',
              description:
                'Schedule retro, collect metrics, and create follow-up tasks for the next sprint.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">{item.due}</p>
                </div>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 lg:flex-row">
        <nav className="lg:sticky lg:top-10 lg:h-fit lg:w-64">
          <div className="flex items-center justify-between lg:block">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                My Tasks
              </h1>
              <p className="mt-2 text-sm text-slate-600 lg:block">
                Quick access to your work areas.
              </p>
            </div>

            {/* Mobile navbar: classic bar with title and hamburger */}
            <details className="group relative lg:hidden">
              <summary className="mt-2 flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-100">
                
                <span className="ml-auto text-lg leading-none text-slate-500">
                  ☰
                </span>
              </summary>
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="flex flex-col divide-y divide-slate-100">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className="px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          </div>

          {/* Desktop sidebar list */}
          <div className="mt-8 hidden flex-col gap-3 border-l border-slate-200 pl-4 lg:flex">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`group rounded-md px-3 py-2 text-left text-sm font-medium transition lg:-ml-4 lg:border-l lg:border-transparent lg:pl-4 ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 lg:border-slate-400'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 lg:hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-left">{tab.label}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {tab.description}
                  </p>
                </button>
              );
            })}
          </div>
        </nav>

        <main className="flex-1 space-y-12">{content}</main>
      </div>
    </div>
  );
}

