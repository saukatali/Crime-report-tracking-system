import React, { useState } from 'react';
import { Upload, X, File, Image, Video } from 'lucide-react';

const FileUpload = ({ 
  label, 
  accept = '*/*', 
  multiple = false, 
  onChange,
  className = '' 
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Create previews for images
    const newPreviews = selectedFiles.map(file => {
      if (file.type.startsWith('image/')) {
        return {
          type: 'image',
          url: URL.createObjectURL(file),
          name: file.name
        };
      } else if (file.type.startsWith('video/')) {
        return {
          type: 'video',
          url: URL.createObjectURL(file),
          name: file.name
        };
      } else {
        return {
          type: 'file',
          name: file.name
        };
      }
    });
    setPreviews(newPreviews);

    if (onChange) {
      onChange(selectedFiles);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
    if (onChange) {
      onChange(newFiles);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Click to upload or drag and drop
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {multiple ? 'Multiple files supported' : 'Single file only'}
          </span>
        </label>
      </div>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {preview.type === 'image' && (
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="w-full h-32 object-cover"
                />
              )}
              {preview.type === 'video' && (
                <video
                  src={preview.url}
                  className="w-full h-32 object-cover"
                  controls
                />
              )}
              {preview.type === 'file' && (
                <div className="w-full h-32 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <File className="w-10 h-10 text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 px-2 truncate w-full text-center">
                    {preview.name}
                  </span>
                </div>
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
