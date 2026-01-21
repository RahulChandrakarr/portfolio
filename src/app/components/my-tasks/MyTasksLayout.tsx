'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import OverviewTab from './OverviewTab';
import PlansTab from './PlansTab';
import DocumentsTab from './DocumentsTab';
import DocumentModal from './DocumentModal';
import { DocumentWithUrl, TabId } from './types';

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
  {
    id: 'documents',
    label: 'My Documents',
    description: 'Upload and manage PDFs or images stored securely.',
  },
];

export default function MyTasksLayout() {
  const supabase = useMemo(() => createClientComponentClient(), []);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [docs, setDocs] = useState<DocumentWithUrl[]>([]);
  const [uploading, setUploading] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentWithUrl | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'UTC',
      }),
    []
  );

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
  };

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) {
      console.error('Fetch documents error', error);
      setDocError(error.message);
      return;
    }
    if (!data) {
      setDocs([]);
      return;
    }

    const withUrls = await Promise.all(
      data.map(async (doc) => {
        const { data: signed, error: signedErr } = await supabase.storage
          .from('my-docs')
          .createSignedUrl(doc.file_path, 60 * 60);
        if (signedErr) {
          console.error('Signed URL error', signedErr);
          return { ...doc };
        }
        return { ...doc, signedUrl: signed?.signedUrl };
      })
    );

    setDocs(withUrls);
    setDocError(null);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '') as TabId;
    if (hash && tabs.find((t) => t.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'documents') {
      fetchDocuments();
    }
  }, [activeTab]);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.hash = tabId;
      window.history.replaceState(null, '', url.toString());
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!title.trim()) {
      setDocError('Please add a title before uploading.');
      return;
    }
    setDocError(null);
    setUploading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      console.error('Supabase getUser error', userError);
      setDocError(userError?.message || 'You must be signed in to upload.');
      setUploading(false);
      return;
    }

    const userId = userData.user.id;
    const path = `${userId}/${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase.storage
      .from('my-docs')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (storageError) {
      console.error('Storage upload error', storageError);
      setDocError(storageError.message);
      setUploading(false);
      return;
    }

    const { error: insertError } = await supabase.from('documents').insert({
      user_id: userId,
      file_path: path,
      file_name: file.name,
      mime_type: file.type,
      size: file.size,
      title: title.trim(),
      description: description.trim() || null,
    });

    if (insertError) {
      console.error('Insert documents error', insertError);
      setDocError(insertError.message);
      setUploading(false);
      return;
    }

    await fetchDocuments();
    setTitle('');
    setDescription('');
    setUploading(false);
  };

  const filteredDocs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return docs;
    return docs.filter((d) => {
      const haystack = [d.title, d.description, d.file_name, d.mime_type]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [search, docs]);

  const openDocModal = (doc: DocumentWithUrl) => {
    setSelectedDoc(doc);
    setEditTitle(doc.title || doc.file_name);
    setEditDescription(doc.description || '');
  };

  const closeDocModal = () => {
    setSelectedDoc(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleUpdateDoc = async () => {
    if (!selectedDoc) return;
    if (!editTitle.trim()) {
      setDocError('Title is required.');
      return;
    }
    setDocError(null);
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setDocError(userError?.message || 'You must be signed in to update.');
      return;
    }
    const userId = userData.user.id;
    const { error: updateError } = await supabase
      .from('documents')
      .update({
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      })
      .eq('id', selectedDoc.id)
      .eq('user_id', userId);

    if (updateError) {
      setDocError(updateError.message);
      return;
    }

    setDocs((prev) =>
      prev.map((d) =>
        d.id === selectedDoc.id
          ? { ...d, title: editTitle.trim(), description: editDescription.trim() || null }
          : d
      )
    );
    closeDocModal();
  };

  const content = useMemo(() => {
    if (activeTab === 'overview') return <OverviewTab />;
    if (activeTab === 'plans') return <PlansTab />;
    return (
      <DocumentsTab
        title={title}
        description={description}
        search={search}
        uploading={uploading}
        docError={docError}
        filteredDocs={filteredDocs}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSearchChange={setSearch}
        onUpload={handleUpload}
        onOpenDoc={openDocModal}
        formatBytes={formatBytes}
        dateFormatter={dateFormatter}
      />
    );
  }, [
    activeTab,
    title,
    description,
    search,
    uploading,
    docError,
    filteredDocs,
    dateFormatter,
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 lg:flex-row">
        <nav className="lg:sticky lg:top-10 lg:h-fit lg:w-64">
          <div className="flex items-center justify-between lg:block">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">My Tasks</h1>
              <p className="mt-2 text-sm text-slate-600 lg:block">
                Quick access to your work areas.
              </p>
            </div>

            <details className="group relative lg:hidden">
              <summary className="mt-2 flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-100">
                
                <span className="ml-auto text-lg leading-none text-slate-500">☰</span>
              </summary>
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="flex flex-col divide-y divide-slate-100">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className="px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      onClick={() => handleTabChange(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          </div>

          <div className="mt-8 hidden flex-col gap-3 border-l border-slate-200 pl-4 lg:flex">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`group rounded-md px-3 py-2 text-left text-sm font-medium transition lg:-ml-4 lg:border-l lg:border-transparent lg:pl-4 ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 lg:border-slate-400'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 lg:hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-left">{tab.label}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{tab.description}</p>
                </button>
              );
            })}
          </div>
        </nav>

        <main className="flex-1 space-y-12">{content}</main>
      </div>

      {selectedDoc && (
        <DocumentModal
          doc={selectedDoc}
          editTitle={editTitle}
          editDescription={editDescription}
          onChangeTitle={setEditTitle}
          onChangeDescription={setEditDescription}
          onClose={closeDocModal}
          onSave={handleUpdateDoc}
          formatBytes={formatBytes}
          dateFormatter={dateFormatter}
          error={docError}
        />
      )}
    </div>
  );
}
