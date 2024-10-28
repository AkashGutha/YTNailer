import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Plus } from 'lucide-react';
import { LogoPosition } from '../types';

interface LogoSectionProps {
  logos: LogoPosition[];
  onLogosChange: (logos: LogoPosition[]) => void;
}

export function LogoSection({ logos, onLogosChange }: LogoSectionProps) {
  const addLogo = () => {
    onLogosChange([
      ...logos,
      {
        id: crypto.randomUUID(),
        file: null,
        prominence: 'medium',
        position: 'top-right',
      },
    ]);
  };

  const updateLogo = (id: string, updates: Partial<LogoPosition>) => {
    onLogosChange(
      logos.map((logo) => (logo.id === id ? { ...logo, ...updates } : logo))
    );
  };

  const removeLogo = (id: string) => {
    onLogosChange(logos.filter((logo) => logo.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">Logos</span>
        <button
          onClick={addLogo}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Plus size={16} /> Add Logo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logos.map((logo) => (
          <LogoItem
            key={logo.id}
            logo={logo}
            onUpdate={(updates) => updateLogo(logo.id, updates)}
            onRemove={() => removeLogo(logo.id)}
          />
        ))}
      </div>
    </div>
  );
}

function LogoItem({
  logo,
  onUpdate,
  onRemove,
}: {
  logo: LogoPosition;
  onUpdate: (updates: Partial<LogoPosition>) => void;
  onRemove: () => void;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (files) => onUpdate({ file: files[0] || null }),
  });

  return (
    <div className="p-4 border rounded-lg space-y-3">
      {!logo.file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-1 text-sm text-gray-600">Upload logo</p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={URL.createObjectURL(logo.file)}
            alt="Logo"
            className="w-full h-24 object-contain rounded-lg"
          />
          <button
            onClick={() => onUpdate({ file: null })}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <select
          value={logo.prominence}
          onChange={(e) => onUpdate({ prominence: e.target.value as LogoPosition['prominence'] })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <select
          value={logo.position}
          onChange={(e) => onUpdate({ position: e.target.value as LogoPosition['position'] })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="center">Center</option>
        </select>
      </div>

      <button
        onClick={onRemove}
        className="text-red-600 hover:text-red-700 text-sm w-full text-center"
      >
        Remove Logo
      </button>
    </div>
  );
}