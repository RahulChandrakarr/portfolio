'use client';

const PRESET_COLORS = [
  '#EF4444', // Red
  '#F59E0B', // Amber
  '#EAB308', // Yellow
  '#84CC16', // Lime
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Purple
  '#A855F7', // Violet
  '#EC4899', // Pink
  '#F43F5E', // Rose
  '#64748B', // Slate
  '#78716C', // Stone
  '#DC2626', // Dark Red
];

type ColorPickerProps = {
  selectedColor: string;
  onColorChange: (color: string) => void;
};

export default function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="h-10 w-20 rounded-lg border border-slate-200 cursor-pointer"
        />
        <input
          type="text"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
          placeholder="#3B82F6"
          maxLength={7}
        />
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-2">Or choose from presets:</p>
        <div className="grid grid-cols-8 gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onColorChange(color)}
              className={`h-8 w-8 rounded-lg border-2 transition-all ${
                selectedColor.toUpperCase() === color.toUpperCase()
                  ? 'border-slate-900 scale-110'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
