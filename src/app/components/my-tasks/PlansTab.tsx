'use client';

export default function PlansTab() {
  const items = [
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
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Plans
      </p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">What&apos;s next</h2>
      <p className="mt-2 text-sm text-slate-600">
        Upcoming milestones and commitments. Link to specs, tickets, and docs so you can
        jump in quickly.
      </p>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.title}</p>
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
}
