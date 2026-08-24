import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

/**
 * ImagePreview Component
 * Simple, clean image preview of the uploaded urine test strip photo.
 */
const ImagePreview = ({ previewUrl, fileName }) => {
  if (!previewUrl) return null;

  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '14px', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon size={18} color="var(--primary-600)" />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--slate-800)' }}>
            Uploaded Strip Photo
          </h4>
        </div>
      </div>

      <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
        <img
          src={previewUrl}
          alt="Urine Reagent Strip"
          style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '6px' }}
        />
      </div>

      {fileName && (
        <p style={{ fontSize: '0.76rem', color: 'var(--slate-500)', marginTop: '8px', textAlign: 'center' }}>
          {fileName}
        </p>
      )}
    </div>
  );
};

export default ImagePreview;
