'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type JournalCategory =
  | 'relationships'
  | 'daily_experiences'
  | 'emotions'
  | 'dreams'
  | 'gratitude';

type Entry = {
  id: string;
  title: string;
  body: string;
  category: JournalCategory | null;
  createdAt: string;
};

const categories: {
  id: JournalCategory;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  icon: string;
  prompts: string[];
}[] = [
  {
    id: 'relationships',
    label: 'Relationships',
    description: 'Meaningful conversations, conflicts resolved, time spent with people you care about',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-200',
    icon: '💬',
    prompts: [
      'Who did you connect with today?',
      'What conversation stood out to you?',
      'How are your relationships evolving?',
      'What conflict did you resolve or learn from?',
    ],
  },
  {
    id: 'daily_experiences',
    label: 'Daily Experiences',
    description: 'Interesting things that happened, people you met, places you visited',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    icon: '✨',
    prompts: [
      'What interesting thing happened today?',
      'Who did you meet or reconnect with?',
      'What place did you visit or discover?',
      'What small moment stood out to you?',
    ],
  },
  {
    id: 'emotions',
    label: 'Emotions & Feelings',
    description: 'What you\'re feeling and why, things that made you happy or upset you',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    icon: '💭',
    prompts: [
      'What are you feeling right now?',
      'What made you happy today?',
      'What upset you and how did you handle it?',
      'How are you processing difficult emotions?',
    ],
  },
  {
    id: 'dreams',
    label: 'Dreams & Aspirations',
    description: 'What you want to achieve, career ideas, creative pursuits, future vision',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
    icon: '🌟',
    prompts: [
      'What do you want to achieve?',
      'What career or creative ideas excite you?',
      'Where do you see yourself in the future?',
      'What dreams are you working towards?',
    ],
  },
  {
    id: 'gratitude',
    label: 'Gratitude & Appreciation',
    description: 'Things you\'re grateful for, people who made a difference, positive moments',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    icon: '🙏',
    prompts: [
      'What are you grateful for today?',
      'Who made a difference in your day?',
      'What positive moment is worth remembering?',
      'What simple thing brought you joy?',
    ],
  },
];

export default function JournalTab() {
  const supabase = useMemo(() => createClientComponentClient(), []);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<JournalCategory | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    []
  );

  const loadEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('journals')
        .select('id, title, body_html, category, created_at')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Fetch journals error', fetchError);
        setError(fetchError.message);
        return;
      }

      const mapped: Entry[] =
        data?.map((row: any) => ({
          id: row.id,
          title: row.title,
          body: row.body_html ?? '',
          category: row.category as JournalCategory | null,
          createdAt: row.created_at,
        })) ?? [];

      setEntries(mapped);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNewModal = () => {
    setEditingId(null);
    setSelectedCategory(null);
    setTitle('');
    setBody('');
    setIsModalOpen(true);
  };

  const openEditModal = (entry: Entry) => {
    setEditingId(entry.id);
    setSelectedCategory(entry.category);
    setTitle(entry.title);
    setBody(entry.body);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;

    setSaving(true);
    setError(null);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError(userError?.message || 'You must be signed in to save journal entries.');
      setSaving(false);
      return;
    }

    const userId = userData.user.id;

    if (editingId == null) {
      const { data, error: insertError } = await supabase
        .from('journals')
        .insert({
          user_id: userId,
          title: title.trim() || 'Untitled',
          body_html: body.trim(),
          category: selectedCategory,
        })
        .select('id, title, body_html, category, created_at')
        .single();

      if (insertError) {
        console.error('Insert journal error', insertError);
        setError(insertError.message);
        setSaving(false);
        return;
      }

      const newEntry: Entry = {
        id: data.id,
        title: data.title,
        body: data.body_html ?? '',
        category: data.category as JournalCategory | null,
        createdAt: data.created_at,
      };

      setEntries((prev) => [newEntry, ...prev]);
    } else {
      const { data, error: updateError } = await supabase
        .from('journals')
        .update({
          title: title.trim() || 'Untitled',
          body_html: body.trim(),
          category: selectedCategory,
        })
        .eq('id', editingId)
        .eq('user_id', userId)
        .select('id, title, body_html, category, created_at')
        .single();

      if (updateError) {
        console.error('Update journal error', updateError);
        setError(updateError.message);
        setSaving(false);
        return;
      }

      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingId
            ? {
                id: data.id,
                title: data.title,
                body: data.body_html ?? '',
                category: data.category as JournalCategory | null,
                createdAt: data.created_at,
              }
            : entry
        )
      );
    }

    setSaving(false);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    setError(null);
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError(userError?.message || 'You must be signed in to delete journal entries.');
      return;
    }

    const userId = userData.user.id;
    const { error: deleteError } = await supabase
      .from('journals')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Delete journal error', deleteError);
      setError(deleteError.message);
      return;
    }

    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Journal
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            Capture your thoughts
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Reflect on relationships, experiences, emotions, dreams, and gratitude. Your
            thoughts are saved securely.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewModal}
          className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
        >
          Add entry
        </button>
      </div>

      <div className="mt-6 space-y-3">
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
        ) : entries.length === 0 ? (
          <p className="text-sm text-slate-500">
            No entries yet. Click &quot;Add entry&quot; to start your journal.
          </p>
        ) : (
          entries.map((entry) => {
            const categoryInfo = entry.category
              ? categories.find((c) => c.id === entry.category)
              : null;
            return (
              <article
                key={entry.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {categoryInfo && (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${categoryInfo.bgColor} ${categoryInfo.color} border`}
                        >
                          <span>{categoryInfo.icon}</span>
                          <span>{categoryInfo.label}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {entry.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {dateFormatter.format(new Date(entry.createdAt))}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(entry)}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry.id)}
                      className="rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {entry.body && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 line-clamp-3">
                    {entry.body}
                  </p>
                )}
              </article>
            );
          })
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-xl my-8">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingId == null ? 'New Journal Entry' : 'Edit Journal Entry'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-slate-500 hover:text-slate-800 text-xl leading-none"
                aria-label="Close journal editor"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6">
              {!selectedCategory && editingId == null ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Choose a journaling category
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`text-left p-4 rounded-xl border-2 transition-all hover:scale-[1.02] ${cat.bgColor} ${cat.color} border`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{cat.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm mb-1">
                                {cat.label}
                              </h4>
                              <p className="text-xs opacity-80">
                                {cat.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedCategory && (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingId == null) setSelectedCategory(null);
                        }}
                        className="text-xs text-slate-500 hover:text-slate-700 mb-3"
                      >
                        ← Change category
                      </button>
                      {(() => {
                        const cat = categories.find(
                          (c) => c.id === selectedCategory
                        )!;
                        return (
                          <div
                            className={`${cat.bgColor} border-2 ${cat.color} border rounded-xl p-4 mb-4`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xl">{cat.icon}</span>
                              <h4 className="font-semibold">{cat.label}</h4>
                            </div>
                            <p className="text-sm opacity-90 mb-3">
                              {cat.description}
                            </p>
                            <div className="space-y-1">
                              <p className="text-xs font-medium opacity-80">
                                Prompts to get started:
                              </p>
                              <ul className="text-xs space-y-1 opacity-70">
                                {cat.prompts.map((prompt, idx) => (
                                  <li key={idx}>• {prompt}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      placeholder="Give your entry a title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Your thoughts
                    </label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={12}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 resize-y leading-relaxed"
                      placeholder="Take your time and write freely. There's no right or wrong way to journal..."
                    />
                  </div>

                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Save Entry'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
