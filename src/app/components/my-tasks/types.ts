'use client';

export type TabId = 'overview' | 'plans' | 'documents' | 'journal';

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
