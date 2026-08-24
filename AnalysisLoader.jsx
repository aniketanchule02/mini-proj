import React from 'react';
import { Activity } from 'lucide-react';

/**
 * AnalysisLoader Component
 * Simple loading indicator during test strip analysis.
 */
const AnalysisLoader = () => {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ margin: '0 auto 20px', width: '48px', height: '48px', borderRadius: '50%', border: '4px solid var(--primary-100)', borderTopColor: 'var(--primary-600)', animation: 'spin 0.9s linear infinite' }} />

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-900)' }}>
        Analyzing Test Strip...
      </h3>

      <p style={{ fontSize: '0.86rem', color: 'var(--slate-500)', marginTop: '6px' }}>
        Reading colorimetric reagent parameters and generating diagnostic summary.
      </p>
    </div>
  );
};

export default AnalysisLoader;
