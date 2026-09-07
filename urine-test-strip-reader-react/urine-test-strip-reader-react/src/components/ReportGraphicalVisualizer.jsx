import React from 'react';
import { BarChart3, Activity, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * Helper to compute numerical gauge percentage and status
 */
function getGaugeData(key, value) {
  const str = String(value || '').toLowerCase();

  switch (key) {
    case 'glucose': {
      if (str.includes('180') || str.includes('1+')) return { pct: 60, status: 'abnormal', color: '#ef4444', label: '180 mg/dL (Elevated)' };
      if (str.includes('500') || str.includes('3+')) return { pct: 100, status: 'abnormal', color: '#dc2626', label: '500 mg/dL (Critical)' };
      if (str.includes('trace')) return { pct: 25, status: 'warning', color: '#f59e0b', label: 'Trace (5 mg/dL)' };
      return { pct: 8, status: 'normal', color: '#10b981', label: '< 15 mg/dL (Normal)' };
    }
    case 'protein': {
      if (str.includes('30') || str.includes('1+')) return { pct: 45, status: 'abnormal', color: '#ef4444', label: '30 mg/dL (Elevated)' };
      if (str.includes('100') || str.includes('2+')) return { pct: 75, status: 'abnormal', color: '#dc2626', label: '100 mg/dL (High)' };
      if (str.includes('trace') || str.includes('15')) return { pct: 20, status: 'warning', color: '#f59e0b', label: '15 mg/dL (Borderline)' };
      return { pct: 5, status: 'normal', color: '#10b981', label: 'Negative (Normal)' };
    }
    case 'pH': {
      const num = parseFloat(value) || 6.5;
      const pct = Math.min(Math.max(((num - 4.5) / 4.0) * 100, 5), 100);
      const isAbnormal = num < 5.0 || num > 7.5;
      return {
        pct,
        status: isAbnormal ? 'warning' : 'normal',
        color: isAbnormal ? '#f59e0b' : '#10b981',
        label: `pH ${num.toFixed(1)} (Range: 5.0–7.5)`
      };
    }
    case 'specificGravity': {
      const num = parseFloat(value) || 1.018;
      const pct = Math.min(Math.max(((num - 1.000) / 0.035) * 100, 5), 100);
      const isAbnormal = num < 1.005 || num > 1.030;
      return {
        pct,
        status: isAbnormal ? 'warning' : 'normal',
        color: isAbnormal ? '#f59e0b' : '#10b981',
        label: `${num.toFixed(3)} (Normal: 1.005–1.030)`
      };
    }
    case 'leukocytes': {
      if (str.includes('negative')) return { pct: 5, status: 'normal', color: '#10b981', label: 'Negative (0 Leu/µL)' };
      return { pct: 70, status: 'abnormal', color: '#ef4444', label: 'Positive (Elevated)' };
    }
    case 'ketones': {
      if (str.includes('negative')) return { pct: 5, status: 'normal', color: '#10b981', label: 'Negative (< 5 mg/dL)' };
      return { pct: 65, status: 'abnormal', color: '#ef4444', label: 'Trace / Positive' };
    }
    case 'blood': {
      if (str.includes('negative')) return { pct: 5, status: 'normal', color: '#10b981', label: 'Negative (0 Ery/µL)' };
      return { pct: 80, status: 'abnormal', color: '#ef4444', label: 'Positive' };
    }
    case 'nitrite': {
      if (str.includes('negative')) return { pct: 5, status: 'normal', color: '#10b981', label: 'Negative (0 mg/dL)' };
      return { pct: 90, status: 'abnormal', color: '#ef4444', label: 'Positive' };
    }
    default:
      return { pct: 10, status: 'normal', color: '#10b981', label: 'Normal' };
  }
}

/**
 * ReportGraphicalVisualizer
 * Renders graphical spectral gauges and colorimetric strip pad reflectance.
 */
const ReportGraphicalVisualizer = ({ report }) => {
  if (!report) return null;

  const keyGauges = [
    { key: 'glucose', title: 'Glucose (Glycosuria)', unit: 'mg/dL' },
    { key: 'protein', title: 'Protein (Albuminuria)', unit: 'mg/dL' },
    { key: 'pH', title: 'Urinary pH Level', unit: 'pH' },
    { key: 'specificGravity', title: 'Specific Gravity (SG)', unit: '' },
    { key: 'leukocytes', title: 'Leukocyte Esterase', unit: 'Leu/µL' },
    { key: 'ketones', title: 'Acetoacetate Ketones', unit: 'mg/dL' },
    { key: 'blood', title: 'Occult Blood (Hemoglobin)', unit: '' },
    { key: 'nitrite', title: 'Nitrite (Bacterial Marker)', unit: '' }
  ];

  return (
    <div className="graph-card-section">
      <div className="graph-section-title">
        <h3>
          <BarChart3 size={18} color="var(--primary-600)" />
          <span>Graphical Analyte Spectrum & Ranges</span>
        </h3>
        <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)', background: 'var(--slate-100)', padding: '3px 10px', borderRadius: '12px' }}>
          Semi-Quantitative Colorimetric Reflectance
        </span>
      </div>

      {/* Optical Reagent Strip Color Model */}
      {report.colorPads && report.colorPads.length > 0 && (
        <div style={{ marginBottom: '22px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Layers size={15} color="var(--primary-700)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-700)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Extracted Reagent Pad Color Spectrum
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {report.colorPads.map((pad, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  minWidth: '60px',
                  flex: 1
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '28px',
                    borderRadius: '4px',
                    backgroundColor: pad.hex,
                    border: '1px solid rgba(0,0,0,0.12)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                  }}
                  title={`${pad.name}: ${pad.status} (${pad.hex})`}
                />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--slate-700)' }}>
                  {pad.name}
                </span>
                <span style={{ fontSize: '0.66rem', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>
                  {pad.hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Graphical Gauge Spectrum Bars */}
      <div className="spectrum-bars-grid">
        {keyGauges.map((item) => {
          const rawVal = report[item.key] || 'Negative';
          const gauge = getGaugeData(item.key, rawVal);

          return (
            <div key={item.key} className="spectrum-bar-item">
              <div className="spectrum-bar-meta">
                <span className="spectrum-bar-name">{item.title}</span>
                <span className="spectrum-bar-val" style={{ color: gauge.color }}>
                  {gauge.label}
                </span>
              </div>

              <div className="spectrum-track">
                {/* Safe zone indicator for pH and SG */}
                {item.key === 'pH' && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '12.5%',
                      width: '62.5%',
                      height: '100%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      pointerEvents: 'none'
                    }}
                    title="Normal Physiological Range (5.0 - 7.5)"
                  />
                )}
                {item.key === 'specificGravity' && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '14%',
                      width: '71%',
                      height: '100%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      pointerEvents: 'none'
                    }}
                    title="Normal SG Range (1.005 - 1.030)"
                  />
                )}

                <div
                  className="spectrum-fill"
                  style={{
                    width: `${gauge.pct}%`,
                    backgroundColor: gauge.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportGraphicalVisualizer;
