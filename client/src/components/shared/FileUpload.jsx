import React, { useState } from 'react';

const FileUpload = ({ onFileSelect, maxFiles = 5 }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return 'Only images (JPEG, PNG, GIF) and MP4 videos are allowed';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setError('');

    if (files.length + selectedFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files`);
      return;
    }

    const newFiles = files.filter(file => {
      const error = validateFile(file);
      if (error) {
        setError(error);
        return false;
      }
      return true;
    });

    setSelectedFiles(prev => [...prev, ...newFiles]);
    onFileSelect([...selectedFiles, ...newFiles]);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileSelect(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center w-full">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-orange-200 cursor-pointer hover:bg-orange-50 transition-colors">
          <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span className="mt-2 text-sm text-gray-600">
            Select files to attach
          </span>
          <input
            type="file"
            className="hidden"
            multiple
            accept="image/jpeg,image/png,image/gif,video/mp4"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative bg-gray-100 rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
              <span className="text-sm truncate">{file.name}</span>
            </div>
            <button
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload; 