'use client';

import { useEffect } from 'react';

type KeyboardShortcuts = {
  onAddTransaction?: () => void;
  onSearch?: () => void;
  onCloseModal?: () => void;
  onExport?: () => void;
  enabled?: boolean;
};

export function useKeyboardShortcuts({
  onAddTransaction,
  onSearch,
  onCloseModal,
  onExport,
  enabled = true,
}: KeyboardShortcuts) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N: Add Transaction
      if ((e.ctrlKey || e.metaKey) && e.key === 'n' && onAddTransaction) {
        e.preventDefault();
        onAddTransaction();
      }

      // Ctrl/Cmd + F: Focus Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f' && onSearch) {
        e.preventDefault();
        onSearch();
      }

      // Ctrl/Cmd + E: Export
      if ((e.ctrlKey || e.metaKey) && e.key === 'e' && onExport) {
        e.preventDefault();
        onExport();
      }

      // Escape: Close Modal
      if (e.key === 'Escape' && onCloseModal) {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onAddTransaction, onSearch, onCloseModal, onExport]);
}
