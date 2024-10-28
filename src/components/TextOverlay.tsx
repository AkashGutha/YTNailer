import React from 'react';
import { X, Plus } from 'lucide-react';
import { ThumbnailText } from '../types';

interface TextOverlayProps {
  texts: ThumbnailText[];
  onTextsChange: (texts: ThumbnailText[]) => void;
}

export function TextOverlay({ texts, onTextsChange }: TextOverlayProps) {
  const addText = () => {
    onTextsChange([
      ...texts,
      {
        id: crypto.randomUUID(),
        text: '',
        size: 'medium',
        color: '#ffffff',
        position: 'middle',
      },
    ]);
  };

  const updateText = (id: string, updates: Partial<ThumbnailText>) => {
    onTextsChange(
      texts.map((text) => (text.id === id ? { ...text, ...updates } : text))
    );
  };

  const removeText = (id: string) => {
    onTextsChange(texts.filter((text) => text.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">Text Overlays</span>
        <button
          onClick={addText}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Plus size={16} /> Add Text
        </button>
      </div>

      <div className="space-y-4">
        {texts.map((text) => (
          <div key={text.id} className="p-4 border rounded-lg space-y-3">
            <textarea
              value={text.text}
              onChange={(e) => updateText(text.id, { text: e.target.value })}
              placeholder="Enter text..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={2}
            />

            <div className="grid grid-cols-3 gap-2">
              <select
                value={text.size}
                onChange={(e) => updateText(text.id, { size: e.target.value as ThumbnailText['size'] })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>

              <select
                value={text.position}
                onChange={(e) => updateText(text.id, { position: e.target.value as ThumbnailText['position'] })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
              </select>

              <input
                type="color"
                value={text.color}
                onChange={(e) => updateText(text.id, { color: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10"
              />
            </div>

            <button
              onClick={() => removeText(text.id)}
              className="text-red-600 hover:text-red-700 text-sm w-full text-center"
            >
              Remove Text
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}