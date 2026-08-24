import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * ErrorState Component (Experiment 4 Async Error Handling Showcase)
 * Displays structured error feedback with retry action and navigation fallback.
 * 
 * @param {Object} props
 * @param {string} props.message - Error message description
 * @param {Function} props.onRetry - Callback to retry the failed async operation
 */
const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="error-card">
      <div className="error-icon-circle">
        <AlertTriangle size={32} />
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-900)' }}>
        Diagnostic Inference Failed
      </h3>

      <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', marginTop: '8px', maxWidth: '420px', marginInline: 'auto', lineHeight: 1.45 }}>
        {message || 'An unexpected error occurred while communicating with the colorimetry analysis service.'}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onRetry}
        >
          <RefreshCw size={16} />
          <span>Retry Analysis</span>
        </button>

        <Link to="/register" className="btn btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Patient Registry</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorState;
