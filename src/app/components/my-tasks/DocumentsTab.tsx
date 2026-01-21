'use client';

import { DocumentWithUrl } from './types';

type Props = {
  title: string;
  description: string;
  search: string;
  uploading: boolean;
  docError: string | null;
  filteredDocs: DocumentWithUrl[];
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onSearchChange: (v: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenDoc: (doc: DocumentWithUrl) => void;
  formatBytes: (n: number) => string;
  dateFormatter: Intl.DateTimeFormat;
};

export default function DocumentsTab({
  title,
  description,
  search,
  uploading,
  docError,
  filteredDocs,
  onTitleChange,
  onDescriptionChange,
  onSearchChange,
  onUpload,
  onOpenDoc,
  formatBytes,
  dateFormatter,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Documents
      </p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">
        My documents (PDFs & images)
      </h2>
    

      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:items-center">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">Title *</label>
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none"
            placeholder="Quarterly plan"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">Description</label>
          <input
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none"
            placeholder="Optional context for this file"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-100">
          <input
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            onChange={onUpload}
            disabled={uploading}
          />
          <span className="rounded bg-slate-200 px-2 py-1 text-xs font-semibold">
            Upload
          </span>
          <span className="text-slate-700">
            {uploading ? 'Uploading…' : 'Choose PDF or image'}
          </span>
        </label>
        <div className="text-xs text-slate-500">
          Private bucket: <code className="rounded bg-slate-100 px-1">my-docs</code>
        </div>
      </div>

      <div className="mt-4">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none"
          placeholder="Search by title, description, or filename"
        />
      </div>

      {docError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {docError}
        </div>
      )}

      <div className="mt-6">
        {filteredDocs.length === 0 ? (
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
            No documents yet. Upload a PDF or image to get started.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDocs.map((doc) => {
              const isImage = doc.mime_type?.startsWith('image/');
              const isPdf = doc.mime_type === 'application/pdf';
              return (
                <div
                  key={doc.id}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
                >
                  <div
                    className="h-40 bg-slate-50 cursor-pointer"
                    onClick={() => onOpenDoc(doc)}
                  >
                    {doc.signedUrl && isImage ? (
                      <img
                        src={doc.signedUrl}
                        alt={doc.title || doc.file_name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : doc.signedUrl && isPdf ? (
                      <object
                        data={doc.signedUrl}
                        type="application/pdf"
                        className="h-full w-full"
                      >
                        <div className="flex h-full items-center justify-center text-xs text-slate-500">
                          PDF preview unavailable
                        </div>
                      </object>
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-500">
                        Preview unavailable
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {doc.title || doc.file_name}
                      </p>
                      <p className="truncate text-xs text-slate-600">
                        {doc.description || doc.file_name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {doc.mime_type} · {formatBytes(doc.size)}
                      </p>
                      <p className="text-xs text-slate-400">
                        {dateFormatter.format(new Date(doc.created_at))}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenDoc(doc)}
                        className="inline-flex w-full justify-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Open
                      </button>

                      {doc.signedUrl && (
                        <a
                          href={doc.signedUrl}
                          download
                          className="inline-flex w-full justify-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Download
                        </a>
                      )}

                      <button
                        type="button"
                        className="flex h-8 w-12 items-center justify-center rounded border border-slate-300 text-[10px] font-semibold text-slate-600 hover:bg-slate-100"
                        aria-label="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
