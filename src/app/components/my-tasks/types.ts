'use client';

export type TabId = 'overview' | 'plans' | 'documents' | 'journal' | 'expenses';

export type DocumentRow = {
  id: string;
  file_name: string;
  file_path: string;
  mime_type: string;
  size: number;
  created_at: string;
  title: string | null;
  description: string | null;
};

export type DocumentWithUrl = DocumentRow & { signedUrl?: string };

// Expense Tracker Types
export type TransactionType = 'income' | 'expense';

export type ExpenseCategory = {
  id: string;
  user_id: string;
  name: string;
  color: string;
  icon: string;
  type: TransactionType;
  created_at: string;
};

export type ExpenseTransaction = {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  category_id: string;
  description: string | null;
  transaction_date: string;
  created_at: string;
  updated_at: string;
  category?: ExpenseCategory;
};

export type ExpenseView = 'dashboard' | 'monthly' | 'yearly' | 'categories';
