-- Expense Tracker Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create expense_categories table
CREATE TABLE IF NOT EXISTS public.expense_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  icon TEXT NOT NULL DEFAULT '💰',
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT expense_categories_pkey PRIMARY KEY (id),
  CONSTRAINT expense_categories_user_id_fkey FOREIGN KEY (user_id) 
    REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create expense_transactions table
CREATE TABLE IF NOT EXISTS public.expense_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  category_id UUID NOT NULL,
  description TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT expense_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT expense_transactions_user_id_fkey FOREIGN KEY (user_id) 
    REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT expense_transactions_category_id_fkey FOREIGN KEY (category_id) 
    REFERENCES public.expense_categories(id) ON DELETE CASCADE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS expense_transactions_user_id_idx ON public.expense_transactions(user_id);
CREATE INDEX IF NOT EXISTS expense_transactions_category_id_idx ON public.expense_transactions(category_id);
CREATE INDEX IF NOT EXISTS expense_transactions_transaction_date_idx ON public.expense_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS expense_transactions_type_idx ON public.expense_transactions(type);
CREATE INDEX IF NOT EXISTS expense_categories_user_id_idx ON public.expense_categories(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_expense_transactions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS expense_transactions_set_updated_at ON public.expense_transactions;
CREATE TRIGGER expense_transactions_set_updated_at
  BEFORE UPDATE ON public.expense_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_expense_transactions_updated_at();

-- Enable Row Level Security
ALTER TABLE public.expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for expense_categories
-- Policy: Users can view their own categories
DROP POLICY IF EXISTS "Users can view their own categories" ON public.expense_categories;
CREATE POLICY "Users can view their own categories"
  ON public.expense_categories
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own categories
DROP POLICY IF EXISTS "Users can insert their own categories" ON public.expense_categories;
CREATE POLICY "Users can insert their own categories"
  ON public.expense_categories
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own categories
DROP POLICY IF EXISTS "Users can update their own categories" ON public.expense_categories;
CREATE POLICY "Users can update their own categories"
  ON public.expense_categories
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own categories
DROP POLICY IF EXISTS "Users can delete their own categories" ON public.expense_categories;
CREATE POLICY "Users can delete their own categories"
  ON public.expense_categories
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for expense_transactions
-- Policy: Users can view their own transactions
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.expense_transactions;
CREATE POLICY "Users can view their own transactions"
  ON public.expense_transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own transactions
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.expense_transactions;
CREATE POLICY "Users can insert their own transactions"
  ON public.expense_transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own transactions
DROP POLICY IF EXISTS "Users can update their own transactions" ON public.expense_transactions;
CREATE POLICY "Users can update their own transactions"
  ON public.expense_transactions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own transactions
DROP POLICY IF EXISTS "Users can delete their own transactions" ON public.expense_transactions;
CREATE POLICY "Users can delete their own transactions"
  ON public.expense_transactions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.expense_categories TO anon, authenticated;
GRANT ALL ON public.expense_transactions TO anon, authenticated;
