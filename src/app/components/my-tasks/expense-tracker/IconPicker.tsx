'use client';

const PRESET_ICONS = [
  '💰', '🍔', '🚗', '🛍️', '💡', '🎬', '🏥', '📚',
  '💼', '📈', '🏠', '✈️', '🍕', '☕', '🎮', '🎵',
  '🏋️', '📱', '💻', '🎨', '📷', '🎭', '🌮', '🍰',
  '🚲', '🚇', '⛽', '🏖️', '🎪', '🎯', '🎲', '🎁',
];

type IconPickerProps = {
  selectedIcon: string;
  onIconChange: (icon: string) => void;
};

export default function IconPicker({ selectedIcon, onIconChange }: IconPickerProps) {
  return (
    <div className="space-y-3">
      <div>
        <input
          type="text"
          value={selectedIcon}
          onChange={(e) => onIconChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none text-center text-2xl"
          placeholder="💰"
          maxLength={2}
        />
        <p className="mt-1 text-xs text-slate-500 text-center">
          Enter an emoji or choose from presets below
        </p>
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-2">Or choose from presets:</p>
        <div className="grid grid-cols-8 gap-2">
          {PRESET_ICONS.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => onIconChange(icon)}
              className={`h-10 w-10 rounded-lg border-2 text-xl transition-all flex items-center justify-center ${
                selectedIcon === icon
                  ? 'border-slate-900 bg-slate-100 scale-110'
                  : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
              }`}
              aria-label={`Select icon ${icon}`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
