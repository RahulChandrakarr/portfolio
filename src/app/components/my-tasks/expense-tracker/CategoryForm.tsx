'use client';

import { TransactionType } from '../types';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';
import CategoryPreview from './CategoryPreview';

type CategoryFormProps = {
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  categoryType: TransactionType;
  isEditing?: boolean;
  transactionCount?: number;
  errors: {
    name?: string;
  };
  onNameChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onIconChange: (value: string) => void;
  onTypeChange: (type: TransactionType) => void;
};

export default function CategoryForm({
  categoryName,
  categoryColor,
  categoryIcon,
  categoryType,
  isEditing = false,
  transactionCount = 0,
  errors,
  onNameChange,
  onColorChange,
  onIconChange,
  onTypeChange,
}: CategoryFormProps) {
  const canChangeType = !isEditing || transactionCount === 0;

  return (
    <div className="space-y-4">
      {/* Type Toggle */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Category Type <span className="text-red-500">*</span>
        </label>
        <div className={`flex gap-2 rounded-lg border border-slate-200 p-1 ${canChangeType ? 'bg-slate-50' : 'bg-slate-100'}`}>
          <button
            type="button"
            onClick={() => canChangeType && onTypeChange('expense')}
            disabled={!canChangeType}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              categoryType === 'expense'
                ? 'bg-red-100 text-red-700'
                : 'text-slate-600 hover:bg-slate-100'
            } ${!canChangeType ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => canChangeType && onTypeChange('income')}
            disabled={!canChangeType}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              categoryType === 'income'
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-100'
            } ${!canChangeType ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Income
          </button>
        </div>
        {!canChangeType && (
          <p className="mt-1 text-xs text-slate-500">
            Category type cannot be changed when category is in use
          </p>
        )}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="category-name" className="block text-sm font-medium text-slate-700 mb-2">
          Category Name <span className="text-red-500">*</span>
        </label>
        <input
          id="category-name"
          type="text"
          value={categoryName}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={20}
          className={`w-full rounded-lg border ${
            errors.name ? 'border-red-300' : 'border-slate-200'
          } bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none`}
          placeholder="Category name"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
        )}
        <p className="mt-1 text-xs text-slate-500">
          {categoryName.length}/20 characters
        </p>
      </div>

      {/* Color Picker */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
        <ColorPicker selectedColor={categoryColor} onColorChange={onColorChange} />
      </div>

      {/* Icon Picker */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Icon <span className="text-xs text-slate-500">(optional)</span>
        </label>
        <IconPicker selectedIcon={categoryIcon} onIconChange={onIconChange} />
      </div>

      {/* Preview */}
      <CategoryPreview
        name={categoryName || 'Category Name'}
        icon={categoryIcon || '💰'}
        color={categoryColor}
        type={categoryType}
      />
    </div>
  );
}
