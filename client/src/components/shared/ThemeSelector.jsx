import React from 'react';

const themes = [
  { id: 'default', name: 'Default', color: 'bg-white' },
  { id: 'vintage', name: 'Vintage', color: 'bg-amber-50' },
  { id: 'modern', name: 'Modern', color: 'bg-slate-50' },
  { id: 'minimalist', name: 'Minimalist', color: 'bg-gray-50' },
  { id: 'colorful', name: 'Colorful', color: 'bg-gradient-to-r from-pink-50 to-orange-50' }
];

const ThemeSelector = ({ selectedTheme, onThemeChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Choose Theme
      </label>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`
              relative p-3 rounded-lg border transition-all
              ${theme.color}
              ${selectedTheme === theme.id
                ? 'border-orange-500 ring-2 ring-orange-500'
                : 'border-gray-200 hover:border-orange-200'
              }
            `}
          >
            <div className="flex flex-col items-center">
              <span className="block w-8 h-8 rounded-full border-2 border-white shadow-sm"></span>
              <span className="mt-2 text-xs font-medium text-gray-900">
                {theme.name}
              </span>
            </div>
            {selectedTheme === theme.id && (
              <span className="absolute top-1 right-1 text-orange-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector; 