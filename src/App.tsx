import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { MainSubject } from './components/MainSubject';
import { LogoSection } from './components/LogoSection';
import { TextOverlay } from './components/TextOverlay';
import { ThumbnailPreview } from './components/ThumbnailPreview';
import type { LogoPosition, ThumbnailText } from './types';

function App() {
  const [script, setScript] = useState('');
  const [mainSubject, setMainSubject] = useState<File | null>(null);
  const [logos, setLogos] = useState<LogoPosition[]>([]);
  const [texts, setTexts] = useState<ThumbnailText[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    // For demo purposes, use a placeholder image
    setGeneratedImage('https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80');
    setIsGenerating(false);
  };

  const canGenerate = script.trim() && mainSubject;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">YouTube Thumbnail Generator</h1>
          <p className="text-gray-600">Create eye-catching thumbnails with AI assistance</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="space-y-6">
            <label className="block">
              <span className="text-gray-700 font-medium">Video Script or Description</span>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                placeholder="Enter your video script or description to help generate a relevant thumbnail..."
              />
            </label>

            <MainSubject subject={mainSubject} onSubjectChange={setMainSubject} />
            <LogoSection logos={logos} onLogosChange={setLogos} />
            <TextOverlay texts={texts} onTextsChange={setTexts} />

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !canGenerate}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
                isGenerating || !canGenerate
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Wand2 size={20} />
              {isGenerating ? 'Generating...' : 'Generate Thumbnail'}
            </button>
          </div>

          <ThumbnailPreview imageUrl={generatedImage} />
        </div>
      </div>
    </div>
  );
}

export default App;