import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * FieldError Component (Experiment 3 Showcase: Inline Accessible Error Messaging)
 * Replaces intrusive alert() popups with structured, accessible inline validation feedback.
 * 
 * @param {Object} props
 * @param {string} [props.error] - Validation error message to render
 */
const FieldError = ({ error }) => {
  if (!error) return null;

  return (
    <div className="field-error" role="alert">
      <AlertCircle size={14} style={{ flexShrink: 0 }} />
      <span>{error}</span>
    </div>
  );
};

export default FieldError;
