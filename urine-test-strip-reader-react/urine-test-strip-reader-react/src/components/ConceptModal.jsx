import React from 'react';
import { X, BookOpen, CheckCircle, Code2, FlaskConical, Award } from 'lucide-react';

/**
 * ConceptModal Component
 * Interactive educational dialog outlining the college mini-project rubric,
 * experiment mapping, and academic reference details.
 */
const ConceptModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--primary-100)', color: 'var(--primary-800)', padding: '8px', borderRadius: '8px' }}>
              <FlaskConical size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Urine Test Strip Reader — Academic Reference & Rubric Map
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                AI Use Case KJS-HC-03 • Dr. Ninad Mehendale, K J Somaiya Hospital
              </p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
          {/* Institutional Credit Box */}
          <div style={{ background: 'linear-gradient(135deg, var(--sky-50), #f0fdfa)', border: '1px solid var(--sky-200)', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--sky-700)', fontWeight: 600, fontSize: '0.86rem' }}>
              <Award size={16} />
              <span>Healthcare Colorimetry System Overview</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-700)', marginTop: '4px', lineHeight: 1.45 }}>
              This point-of-care digital diagnostics system analyzes standard 10-parameter urinalysis strips using computerized colorimetry. It converts reflectance spectral shifts on reagent pads (Glucose, Protein, pH, Leukocytes, Ketones) into diagnostic conclusions.
            </p>
          </div>

          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-800)', marginTop: '8px' }}>
            Four-Experiment React Syllabus Alignment
          </h3>

          {/* Experiment 1 */}
          <div className="concept-item">
            <div className="concept-title">
              <span className="exp-tag">Page 1: /register</span>
              <span>Experiment 1 — Basic Components, JSX & Props Composition</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', lineHeight: 1.45 }}>
              Demonstrates JSX structuring, props-driven child components (<code>&lt;PatientCard /&gt;</code>, <code>&lt;StatusBadge /&gt;</code>), and dynamic list rendering inside <code>&lt;PatientDashboard /&gt;</code>.
            </p>
          </div>

          {/* Experiment 2 */}
          <div className="concept-item">
            <div className="concept-title">
              <span className="exp-tag">Page 2: /upload/:id</span>
              <span>Experiment 2 — React Hooks (useState, useEffect Lifecycle)</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', lineHeight: 1.45 }}>
              Demonstrates <code>useState</code> for local image file & preview URL handling, combined with <code>useEffect</code> lifecycle: cleanup of object URLs via <code>URL.revokeObjectURL</code> on unmount/re-upload, and an 800ms calibration reference loader effect.
            </p>
          </div>

          {/* Experiment 3 */}
          <div className="concept-item">
            <div className="concept-title">
              <span className="exp-tag">Page 3: /test-form/:id</span>
              <span>Experiment 3 — Controlled Components & Inline Form Validation</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', lineHeight: 1.45 }}>
              Demonstrates a fully controlled form (state bound to inputs with <code>onChange</code>), reusable input wrapper (<code>&lt;FormField /&gt;</code>), and strict client-side validation with real inline error messages (<code>&lt;FieldError /&gt;</code>).
            </p>
          </div>

          {/* Experiment 4 */}
          <div className="concept-item">
            <div className="concept-title">
              <span className="exp-tag">Page 4: /results/:id</span>
              <span>Experiment 4 — Asynchronous API Flow & Diagnostic Reporting</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', lineHeight: 1.45 }}>
              Demonstrates async lifecycle integration using <code>fetch</code>/Promise simulation: loading state with spectrum animation, error state with retry button, and structured diagnostic report rendering.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Got it, continue testing
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConceptModal;
