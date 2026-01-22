'use client';

type SuccessNotificationProps = {
  message: string;
  onClose: () => void;
};

export default function SuccessNotification({
  message,
  onClose,
}: SuccessNotificationProps) {
  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-lg flex items-center gap-3 min-w-[300px]">
        <svg
          className="w-5 h-5 text-emerald-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p className="text-sm font-medium text-emerald-900 flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-emerald-600 hover:text-emerald-800 transition-colors"
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
  );
}
