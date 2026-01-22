'use client';

import { useEffect, useState } from 'react';

type UndoNotificationProps = {
  show: boolean;
  message: string;
  onUndo: () => void;
  onClose: () => void;
  duration?: number;
};

export default function UndoNotification({
  show,
  message,
  onUndo,
  onClose,
  duration = 5000,
}: UndoNotificationProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    if (!show) {
      setTimeRemaining(duration);
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 100) {
          onClose();
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [show, duration, onClose]);

  if (!show) return null;

  const progress = (timeRemaining / duration) * 100;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-slate-900 text-white rounded-lg shadow-xl p-4 min-w-[300px]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
            <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onUndo}
              className="px-3 py-1.5 rounded-md bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              Undo
            </button>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-4 h-4"
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
        </div>
      </div>
    </div>
  );
}
