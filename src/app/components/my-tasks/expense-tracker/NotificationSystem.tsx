'use client';

import { useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
};

type NotificationSystemProps = {
  notifications: Notification[];
  onRemove: (id: string) => void;
};

export default function NotificationSystem({
  notifications,
  onRemove,
}: NotificationSystemProps) {
  useEffect(() => {
    notifications.forEach((notification) => {
      const duration = notification.duration || 4000;
      const timer = setTimeout(() => {
        onRemove(notification.id);
      }, duration);

      return () => clearTimeout(timer);
    });
  }, [notifications, onRemove]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => {
        const bgColor = {
          success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          error: 'bg-red-50 border-red-200 text-red-800',
          warning: 'bg-amber-50 border-amber-200 text-amber-800',
          info: 'bg-blue-50 border-blue-200 text-blue-800',
        }[notification.type];

        const iconColor = {
          success: 'text-emerald-600',
          error: 'text-red-600',
          warning: 'text-amber-600',
          info: 'text-blue-600',
        }[notification.type];

        const icons = {
          success: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
          error: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
          warning: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          ),
          info: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };

        return (
          <div
            key={notification.id}
            className={`flex items-start gap-3 rounded-lg border p-4 shadow-lg min-w-[300px] max-w-[400px] animate-in slide-in-from-right-5 ${bgColor}`}
          >
            <div className={iconColor}>{icons[notification.type]}</div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className={`${iconColor} hover:opacity-70 transition-opacity`}
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
