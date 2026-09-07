import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import FieldError from './FieldError';

/**
 * ImageUploadBox Component
 * Basic file selector for urine test strip photos with file type & size validation.
 */
const ImageUploadBox = ({ onImageSelected, hasImage }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState('');

  const validateAndProcessFile = (file) => {
    setFileError('');

    if (!file) {
      setFileError('Please select a file to upload.');
      return;
    }

    // 1. Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/bmp'];
    const isImageExtension = /\.(png|jpe?g|webp|bmp)$/i.test(file.name || '');
    if (!validTypes.includes(file.type) && !isImageExtension) {
      setFileError('Invalid file format. Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    // 2. Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      const actualSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setFileError(`File size exceeds 10MB limit (selected: ${actualSizeMB} MB). Please choose a smaller photo.`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onImageSelected(file, previewUrl);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <UploadCloud size={20} color="var(--primary-600)" />
            <span>Upload Urine Test Strip</span>
          </h3>
          <p className="card-subtitle">
            Upload a clear photo of the test strip after dipping it in the sample.
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div
        className={`upload-dropzone ${isDragOver ? 'drag-active' : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon-circle">
          <ImageIcon size={26} />
        </div>
        <div className="upload-prompt">
          <h4>{hasImage ? 'Click to choose a different photo' : 'Click to select or drag & drop strip photo'}</h4>
          <p>Supports PNG, JPG, JPEG (Max 10MB)</p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginTop: '8px' }}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          Choose Photo from Device
        </button>
      </div>

      {fileError && (
        <div style={{ marginTop: '10px' }}>
          <FieldError error={fileError} />
        </div>
      )}
    </div>
  );
};

export default ImageUploadBox;
