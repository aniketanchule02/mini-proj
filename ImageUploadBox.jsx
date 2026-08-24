import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

/**
 * ImageUploadBox Component
 * Basic file selector for urine test strip photos.
 */
const ImageUploadBox = ({ onImageSelected, hasImage }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
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
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const previewUrl = URL.createObjectURL(file);
    onImageSelected(file, previewUrl);
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
    </div>
  );
};

export default ImageUploadBox;
