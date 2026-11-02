import React, { useState, useEffect } from 'react';

/**
 * OpticalRailScanner Component
 * Interactive visual animation recreating the physical colorimetric optical rail scanner.
 * Features an automated scanning laser sweep across 10 reagent pads with dynamic wavelength
 * readouts, biochemical color development, and pad reflectance inspection.
 */
const PAD_DATA = [
  { id: 'glu', label: 'GLU', name: 'Glucose', color: '#06b6d4', wavelength: '525 nm', timing: '30s', normal: 'Negative' },
  { id: 'bil', label: 'BIL', name: 'Bilirubin', color: '#d97706', wavelength: '550 nm', timing: '30s', normal: 'Negative' },
  { id: 'ket', label: 'KET', name: 'Ketones', color: '#ec4899', wavelength: '540 nm', timing: '40s', normal: 'Negative' },
  { id: 'sg', label: 'SG', name: 'Specific Gravity', color: '#3b82f6', wavelength: '620 nm', timing: '45s', normal: '1.005–1.030' },
  { id: 'blo', label: 'BLO', name: 'Occult Blood', color: '#ef4444', wavelength: '635 nm', timing: '60s', normal: 'Negative' },
  { id: 'ph', label: 'pH', name: 'pH Level', color: '#84cc16', wavelength: '610 nm', timing: '60s', normal: '5.0–8.0' },
  { id: 'pro', label: 'PRO', name: 'Protein', color: '#f59e0b', wavelength: '610 nm', timing: '60s', normal: 'Negative' },
  { id: 'uro', label: 'URO', name: 'Urobilinogen', color: '#f43f5e', wavelength: '555 nm', timing: '60s', normal: 'Normal' },
  { id: 'nit', label: 'NIT', name: 'Nitrite', color: '#8b5cf6', wavelength: '540 nm', timing: '60s', normal: 'Negative' },
  { id: 'leu', label: 'LEU', name: 'Leukocytes', color: '#a78bfa', wavelength: '565 nm', timing: '120s', normal: 'Negative' }
];

const OpticalRailScanner = () => {
  const [activePadIndex, setActivePadIndex] = useState(6); // Default on PRO pad matching reference photo
  const [isAutoScanning, setIsAutoScanning] = useState(true);

  // Automated sweep across the 10 pads
  useEffect(() => {
    if (!isAutoScanning) return;

    const interval = setInterval(() => {
      setActivePadIndex((prev) => (prev + 1) % PAD_DATA.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isAutoScanning]);

  const currentPad = PAD_DATA[activePadIndex];

  return (
    <div className="optical-rail-card">
      {/* Top Header */}
      <div className="optical-rail-header">
        <span className="rail-title-mono">OPTICAL RAIL — LIVE SCAN</span>
        <div className="rail-status-pill">
          <span className="status-dot-pulse" />
          <span className="status-text-mono">Reading: {currentPad.name} ({currentPad.wavelength})</span>
        </div>
      </div>

      {/* Main Recessed Scanning Chamber Rail */}
      <div
        className="optical-rail-chamber"
        onMouseEnter={() => setIsAutoScanning(false)}
        onMouseLeave={() => setIsAutoScanning(true)}
      >
        <div className="optical-rail-pads-track">
          {PAD_DATA.map((pad, idx) => {
            const isActive = idx === activePadIndex;
            const isScanned = idx <= activePadIndex;

            return (
              <div
                key={pad.id}
                className={`optical-pad-slot ${isActive ? 'is-active' : ''} ${isScanned ? 'is-scanned' : ''}`}
                onClick={() => {
                  setActivePadIndex(idx);
                  setIsAutoScanning(false);
                }}
                title={`${pad.name} (${pad.label}) • Wavelength: ${pad.wavelength} • Timing: ${pad.timing} (Click to inspect)`}
              >
                {/* Physical Reagent Pad */}
                <div
                  className="optical-pad-surface"
                  style={{
                    backgroundColor: isScanned ? pad.color : '#d1d5db',
                    border: isActive ? '1.5px solid #ffffff' : '1px solid rgba(0,0,0,0.04)'
                  }}
                >
                  {/* Subtle Optical Center Slit (matches reference photo without outward glow) */}
                  {/* No slit */}
                </div>

                {/* Pad Abbreviation Label */}
                <span className={`optical-pad-label ${isActive ? 'active-label' : ''}`}>
                  {pad.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Parameters */}
      <div className="optical-rail-footer">
        <div className="rail-param-item">
          <span className="param-label">Wavelength</span>
          <span className="param-value-mono">525–635nm</span>
          <span className="param-badge-active">{currentPad.wavelength} active</span>
        </div>

        <div className="rail-param-item text-right">
          <span className="param-label">Read Timing</span>
          <span className="param-value-mono">Pad-Specific</span>
          <span className="param-badge-sub">Auto 120s Exposure</span>
        </div>
      </div>
    </div>
  );
};

export default OpticalRailScanner;
