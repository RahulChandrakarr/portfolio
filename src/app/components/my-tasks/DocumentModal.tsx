'use client';

import { DocumentWithUrl } from './types';

type Props = {
  doc: DocumentWithUrl;
  editTitle: string;
  editDescription: string;
  onChangeTitle: (v: string) => void;
  onChangeDescription: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
  formatBytes: (n: number) => string;
  dateFormatter: Intl.DateTimeFormat;
  error: string | null;
};

export default function DocumentModal({
  doc,
  editTitle,
  editDescription,
  onChangeTitle,
  onChangeDescription,
  onClose,
  onSave,
  formatBytes,
  dateFormatter,
  error,
}: Props) {
  const isImage = doc.mime_type?.startsWith('image/');
  const isPdf = doc.mime_type === 'application/pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {doc.title || doc.file_name}
            </h3>
            <p className="text-xs text-slate-500">{doc.file_name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
            {doc.signedUrl && isImage ? (
              <img
                src={doc.signedUrl}
                alt={doc.title || doc.file_name}
                className="h-64 w-full rounded-md object-contain"
              />
            ) : doc.signedUrl && isPdf ? (
              <object
                data={doc.signedUrl}
                type="application/pdf"
                className="h-64 w-full rounded-md object-contain"
              >
                <div className="flex h-64 items-center justify-center text-xs text-slate-500">
                  PDF preview unavailable
                </div>
              </object>
            ) : (
              <div className="flex h-64 items-center justify-center text-xs text-slate-500">
                Preview unavailable
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-800">Title *</label>
              <input
                value={editTitle}
                onChange={(e) => onChangeTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800">
                Description
              </label>
              <textarea
                value={editDescription}
                onChange={(e) => onChangeDescription(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none"
                rows={4}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>{doc.mime_type}</span>
              <span>•</span>
              <span>{formatBytes(doc.size)}</span>
              <span>•</span>
              <span>{dateFormatter.format(new Date(doc.created_at))}</span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onSave}
                className="inline-flex flex-1 justify-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex flex-1 justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
