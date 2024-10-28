import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, User } from 'lucide-react';

interface MainSubjectProps {
  subject: File | null;
  onSubjectChange: (file: File | null) => void;
}

export function MainSubject({ subject, onSubjectChange }: MainSubjectProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (files) => onSubjectChange(files[0] || null),
  });

  return (
    <div className="space-y-2">
      <span className="text-gray-700 font-medium block">Main Subject</span>
      {!subject ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Upload main subject or presenter image
          </p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={URL.createObjectURL(subject)}
            alt="Main subject"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={() => onSubjectChange(null)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}