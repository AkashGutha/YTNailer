import React from 'react';
import { Download } from 'lucide-react';

interface ThumbnailPreviewProps {
  imageUrl: string | null;
}

export function ThumbnailPreview({ imageUrl }: ThumbnailPreviewProps) {
  if (!imageUrl) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="relative group">
        <img
          src={imageUrl}
          alt="Generated thumbnail"
          className="w-full aspect-video rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
          <button
            onClick={() => window.open(imageUrl, '_blank')}
            className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <Download size={20} />
            Download Thumbnail
          </button>
        </div>
      </div>
    </div>
  );
}