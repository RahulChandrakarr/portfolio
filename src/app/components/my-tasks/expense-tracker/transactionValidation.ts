export type TransactionFormErrors = {
  amount?: string;
  category?: string;
  date?: string;
};

export type TransactionFormData = {
  amount: string;
  category: string;
  date: string;
  description: string;
  time: string;
};

export function validateTransactionForm(
  data: TransactionFormData
): TransactionFormErrors {
  const errors: TransactionFormErrors = {};

  // Validate amount
  if (!data.amount || data.amount.trim() === '') {
    errors.amount = 'Amount is required';
  } else {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      errors.amount = 'Amount must be a positive number';
    }
  }

  // Validate category
  if (!data.category || data.category.trim() === '') {
    errors.category = 'Category is required';
  }

  // Validate date
  if (!data.date || data.date.trim() === '') {
    errors.date = 'Date is required';
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    
    if (selectedDate > today) {
      errors.date = 'Date cannot be in the future';
    }
  }

  return errors;
}

export function hasFormData(data: TransactionFormData): boolean {
  return !!(
    data.amount ||
    data.category ||
    data.date ||
    data.description ||
    data.time
  );
}
