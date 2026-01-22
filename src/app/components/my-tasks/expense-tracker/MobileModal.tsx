'use client';

import { ReactNode } from 'react';

type MobileModalProps = {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
};

export default function MobileModal({
  show,
  title,
  children,
  onClose,
  footer,
}: MobileModalProps) {
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Modal (Bottom Sheet) */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <h2 id="mobile-modal-title" className="text-lg font-semibold text-slate-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] rounded-lg p-2 hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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

        {/* Content */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="sticky bottom-0 bg-white border-t border-slate-200 px-4 py-3">
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
