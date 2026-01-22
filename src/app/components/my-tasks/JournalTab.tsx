'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type JournalCategory =
  | 'mind_emotions'
  | 'daily_focus'
  | 'learning_growth'
  | 'gratitude'
  | 'reflection';

type JournalEntry = {
  id: string;
  title: string;
  body_html: string;
  category: JournalCategory;
  created_at: string;
};

type EntriesByDate = {
  [dateKey: string]: JournalEntry[];
};

const journalQuestions: {
  id: JournalCategory;
  label: string;
  question: string;
  hint: string;
  icon: string;
  color: string;
  bgColor: string;
}[] = [
  {
    id: 'mind_emotions',
    label: 'Mind & Emotions (Self-awareness)',
    question: 'How am I feeling today, and why?',
    hint: 'Write honestly—stress, excitement, confusion, confidence. This helps you notice emotional patterns over time.',
    icon: '🧠',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
  },
  {
    id: 'daily_focus',
    label: 'Daily Focus & Intent',
    question: 'What is the ONE most important thing I want to accomplish today?',
    hint: 'Keeps your day intentional instead of reactive.',
    icon: '🎯',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
  },
  {
    id: 'learning_growth',
    label: 'Learning & Growth',
    question: 'What did I learn today? (skill, mistake, insight, or realization)',
    hint: "Especially useful since you're learning servers, deployment, freelancing, and tech.",
    icon: '📈',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
  },
  {
    id: 'gratitude',
    label: 'Gratitude & Positivity',
    question: 'What am I grateful for today? (at least one thing)',
    hint: 'Can be small: good food, solved a bug, talked to someone, good health.',
    icon: '🙏',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
  },
  {
    id: 'reflection',
    label: 'Reflection & Improvement',
    question: 'What could I do better tomorrow?',
    hint: 'Focus on one improvement only (time management, patience, consistency).',
    icon: '🔁',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-200',
  },
];

export default function JournalTab() {
  const supabase = useMemo(() => createClientComponentClient(), []);
  const [entries, setEntries] = useState<Record<JournalCategory, string>>({
    mind_emotions: '',
    daily_focus: '',
    learning_growth: '',
    gratitude: '',
    reflection: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todayEntries, setTodayEntries] = useState<JournalEntry[]>([]);
  const [allEntries, setAllEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    []
  );

  const dateOnlyFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
      }),
    []
  );

  const shortDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    []
  );

  const loadTodayEntries = async () => {
    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data, error: fetchError } = await supabase
        .from('journals')
        .select('id, title, body_html, category, created_at')
        .gte('created_at', today.toISOString())
        .lt('created_at', tomorrow.toISOString())
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Fetch today entries error', fetchError);
        return;
      }

      const mapped: JournalEntry[] =
        data?.map((row: any) => ({
          id: row.id,
          title: row.title,
          body_html: row.body_html ?? '',
          category: row.category as JournalCategory,
          created_at: row.created_at,
        })) ?? [];

      setTodayEntries(mapped);

      // Pre-fill form with today's entries if they exist
      const entriesMap: Record<JournalCategory, string> = {
        mind_emotions: '',
        daily_focus: '',
        learning_growth: '',
        gratitude: '',
        reflection: '',
      };

      mapped.forEach((entry) => {
        if (entry.category in entriesMap) {
          entriesMap[entry.category] = entry.body_html;
        }
      });

      setEntries(entriesMap);
    } finally {
      setLoading(false);
    }
  };

  const loadAllEntries = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const { data, error: fetchError } = await supabase
        .from('journals')
        .select('id, title, body_html, category, created_at')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Fetch all entries error', fetchError);
        return;
      }

      const mapped: JournalEntry[] =
        data?.map((row: any) => ({
          id: row.id,
          title: row.title,
          body_html: row.body_html ?? '',
          category: row.category as JournalCategory,
          created_at: row.created_at,
        })) ?? [];

      setAllEntries(mapped);
    } catch (err) {
      console.error('Error loading all entries', err);
    }
  };

  const getDateKey = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const entriesByDate = useMemo(() => {
    const grouped: EntriesByDate = {};
    allEntries.forEach((entry) => {
      const dateKey = getDateKey(entry.created_at);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(entry);
    });
    return grouped;
  }, [allEntries]);

  const sortedDates = useMemo(() => {
    return Object.keys(entriesByDate).sort((a, b) => b.localeCompare(a));
  }, [entriesByDate]);

  const handleDateClick = (dateKey: string) => {
    setSelectedDate(dateKey);
    setShowDateModal(true);
  };

  const closeDateModal = () => {
    setShowDateModal(false);
    setSelectedDate(null);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setEditTitle(entry.title);
    setEditBody(entry.body_html);
  };

  const closeEditModal = () => {
    setEditingEntry(null);
    setEditTitle('');
    setEditBody('');
  };

  const handleUpdate = async () => {
    if (!editingEntry) return;

    setSaving(true);
    setError(null);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError(userError?.message || 'You must be signed in to update journal entries.');
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('journals')
      .update({
        title: editTitle.trim(),
        body_html: editBody.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', editingEntry.id)
      .eq('user_id', userData.user.id);

    if (updateError) {
      console.error('Update journal error', updateError);
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    closeEditModal();
    await loadTodayEntries();
    await loadAllEntries();
  };

  const handleDelete = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')) {
      return;
    }

    setDeletingEntryId(entryId);
    setError(null);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError(userError?.message || 'You must be signed in to delete journal entries.');
      setDeletingEntryId(null);
      return;
    }

    const { error: deleteError } = await supabase
      .from('journals')
      .delete()
      .eq('id', entryId)
      .eq('user_id', userData.user.id);

    if (deleteError) {
      console.error('Delete journal error', deleteError);
      setError(deleteError.message);
      setDeletingEntryId(null);
      return;
    }

    setDeletingEntryId(null);
    await loadTodayEntries();
    await loadAllEntries();
    
    // Close date modal if the deleted entry was the last one for that date
    if (selectedDate && entriesByDate[selectedDate]?.length === 1) {
      closeDateModal();
    }
  };

  useEffect(() => {
    loadTodayEntries();
    loadAllEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError(userError?.message || 'You must be signed in to save journal entries.');
      setSaving(false);
      return;
    }

    const userId = userData.user.id;
    const now = new Date().toISOString();

    // Prepare entries to save (only non-empty ones)
    const entriesToSave = journalQuestions
      .map((q) => ({
        user_id: userId,
        title: q.question,
        body_html: entries[q.id].trim(),
        category: q.id,
        created_at: now,
      }))
      .filter((e) => e.body_html.length > 0);

    if (entriesToSave.length === 0) {
      setError('Please write at least one entry before saving.');
      setSaving(false);
      return;
    }

    // Delete today's existing entries first (to allow re-saving)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    await supabase
      .from('journals')
      .delete()
      .eq('user_id', userId)
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString())
      .in('category', journalQuestions.map((q) => q.id));

    // Insert new entries
    const { error: insertError } = await supabase
      .from('journals')
      .insert(entriesToSave);

    if (insertError) {
      console.error('Insert journal error', insertError);
      setError(insertError.message);
      setSaving(false);
      return;
    }

    setSuccess(true);
    setSaving(false);
    await loadTodayEntries();
    await loadAllEntries();

    // Clear form after successful save
    setTimeout(() => {
      setEntries({
        mind_emotions: '',
        daily_focus: '',
        learning_growth: '',
        gratitude: '',
        reflection: '',
      });
      setSuccess(false);
    }, 2000);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Daily Journal
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">
          Reflect on your day
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Answer these five questions daily to build self-awareness, focus, and growth.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {journalQuestions.map((question) => (
          <div
            key={question.id}
            className={`rounded-xl border-2 p-5 ${question.bgColor} ${question.color} border`}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{question.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">{question.label}</h3>
                <p className="text-sm font-medium mb-2">{question.question}</p>
                <p className="text-xs opacity-80">{question.hint}</p>
              </div>
            </div>
            <textarea
              value={entries[question.id]}
              onChange={(e) =>
                setEntries((prev) => ({ ...prev, [question.id]: e.target.value }))
              }
              rows={4}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 resize-y leading-relaxed"
              placeholder={`Write your answer here...`}
            />
          </div>
        ))}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            ✓ Journal entries saved successfully!
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save All Entries'}
          </button>
        </div>
      </form>

      {todayEntries.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Today&apos;s entries
          </h3>
          <div className="space-y-3">
            {todayEntries.map((entry) => {
              const question = journalQuestions.find((q) => q.id === entry.category);
              return (
                <div
                  key={entry.id}
                  className={`rounded-lg border p-4 ${question?.bgColor || 'bg-slate-50'} border`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">{question?.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-medium opacity-80 mb-1">
                        {question?.label}
                      </p>
                      <p className="text-sm font-semibold">{entry.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        {dateFormatter.format(new Date(entry.created_at))}
                      </span>
                      <button
                        onClick={() => handleEdit(entry)}
                        className="rounded-lg p-1.5 hover:bg-white/50 transition-colors"
                        aria-label="Edit entry"
                      >
                        <svg
                          className="w-4 h-4 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        disabled={deletingEntryId === entry.id}
                        className="rounded-lg p-1.5 hover:bg-red-50 transition-colors disabled:opacity-50"
                        aria-label="Delete entry"
                      >
                        <svg
                          className="w-4 h-4 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap ml-7">
                    {entry.body_html}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          All Journal Entries
        </h3>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4 animate-pulse"
              >
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : sortedDates.length === 0 ? (
          <p className="text-sm text-slate-500">
            No journal entries yet. Fill out the form above to start your journal.
          </p>
        ) : (
          <div className="space-y-3">
            {sortedDates.map((dateKey) => {
              const dateEntries = entriesByDate[dateKey];
              const date = new Date(dateKey + 'T00:00:00');
              const isToday = dateKey === getDateKey(new Date().toISOString());
              
              return (
                <button
                  key={dateKey}
                  onClick={() => handleDateClick(dateKey)}
                  className="w-full text-left rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-slate-100">
                        <span className="text-xs font-semibold text-slate-600">
                          {date.getDate()}
                        </span>
                        <span className="text-xs text-slate-500 uppercase">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {isToday ? 'Today' : shortDateFormatter.format(date)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {dateEntries.length} {dateEntries.length === 1 ? 'entry' : 'entries'}
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {showDateModal && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {dateOnlyFormatter.format(new Date(selectedDate + 'T00:00:00'))}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {entriesByDate[selectedDate]?.length || 0}{' '}
                  {entriesByDate[selectedDate]?.length === 1 ? 'entry' : 'entries'}
                </p>
              </div>
              <button
                onClick={closeDateModal}
                className="rounded-lg p-2 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {entriesByDate[selectedDate]?.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">
                  No entries for this date.
                </p>
              ) : (
                <div className="space-y-4">
                  {entriesByDate[selectedDate]
                    ?.sort((a, b) => {
                      const categoryOrder = journalQuestions.map((q) => q.id);
                      return (
                        categoryOrder.indexOf(a.category) -
                        categoryOrder.indexOf(b.category)
                      );
                    })
                    .map((entry) => {
                      const question = journalQuestions.find(
                        (q) => q.id === entry.category
                      );
                      return (
                        <div
                          key={entry.id}
                          className={`rounded-xl border-2 p-5 ${question?.bgColor || 'bg-slate-50'} border`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <span className="text-2xl">{question?.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm mb-1">
                                {question?.label}
                              </h3>
                              <p className="text-sm font-medium mb-2">{entry.title}</p>
                              <p className="text-xs text-slate-500">
                                {dateFormatter.format(new Date(entry.created_at))}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(entry)}
                                className="rounded-lg p-2 hover:bg-white/50 transition-colors"
                                aria-label="Edit entry"
                              >
                                <svg
                                  className="w-4 h-4 text-slate-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(entry.id)}
                                disabled={deletingEntryId === entry.id}
                                className="rounded-lg p-2 hover:bg-red-50 transition-colors disabled:opacity-50"
                                aria-label="Delete entry"
                              >
                                <svg
                                  className="w-4 h-4 text-red-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700 whitespace-pre-wrap ml-11">
                            {entry.body_html}
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {editingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Edit Journal Entry</h2>
                <p className="text-sm text-slate-500 mt-1">
                  {journalQuestions.find((q) => q.id === editingEntry.category)?.label}
                </p>
              </div>
              <button
                onClick={closeEditModal}
                className="rounded-lg p-2 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    id="edit-title"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Entry title"
                  />
                </div>
                <div>
                  <label htmlFor="edit-body" className="block text-sm font-medium text-slate-700 mb-2">
                    Content
                  </label>
                  <textarea
                    id="edit-body"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={8}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 resize-y"
                    placeholder="Write your entry here..."
                  />
                </div>
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <button
                onClick={closeEditModal}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={saving || !editTitle.trim() || !editBody.trim()}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
