import React from 'react';
import FieldError from './FieldError';

/**
 * FormField Component (Experiment 3 Showcase: DRY Reusable Component Wrapper)
 * Standardized form field container handling labels, required asterisks, helper hints,
 * error state styling, and inline validation message rendering.
 * 
 * @param {Object} props
 * @param {string} props.label - Field label text
 * @param {string} [props.htmlFor] - Associated input ID
 * @param {boolean} [props.required] - If true, displays red asterisk
 * @param {string} [props.error] - Validation error message
 * @param {string} [props.hint] - Optional helper text
 * @param {boolean} [props.fullWidth] - If true, spans 2 columns in grid
 * @param {React.ReactNode} props.children - Input or control element
 */
const FormField = ({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  fullWidth = false,
  children
}) => {
  return (
    <div className={`form-field ${fullWidth ? 'form-full-width' : ''}`}>
      {label && (
        <label htmlFor={htmlFor} className="form-label">
          <span>
            {label}
            {required && <span className="required">*</span>}
          </span>
          {hint && <span className="form-hint">{hint}</span>}
        </label>
      )}

      {children}

      <FieldError error={error} />
    </div>
  );
};

export default FormField;
