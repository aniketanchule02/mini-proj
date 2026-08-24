import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { FileText, UserPlus, Printer, CheckCircle, AlertTriangle } from 'lucide-react';

/**
 * DiagnosticReportCard Component
 * Displays a clean, minimal test report summary for the student project.
 */
const DiagnosticReportCard = ({ report, patient }) => {
  const navigate = useNavigate();
  const { resetActiveSession } = usePatients();

  if (!report) return null;

  const handleRegisterAnother = () => {
    resetActiveSession();
    navigate('/register');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
      {/* Report Header */}
      <div style={{ background: 'var(--primary-700)', color: '#ffffff', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} />
            <span>Urinalysis Diagnostic Report</span>
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--primary-100)', marginTop: '2px' }}>
            Point-of-Care Colorimetry Test Results
          </p>
        </div>

        <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '4px', fontFamily: 'monospace' }}>
          {report.reportId || 'REP-001'}
        </span>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Patient Summary Info */}
        <div style={{ background: 'var(--slate-50)', padding: '14px 18px', borderRadius: '8px', border: '1px solid var(--slate-200)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 600 }}>Patient</span>
            <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--slate-900)' }}>
              {patient?.fullName || report.patientName} ({patient?.id || report.patientId})
            </p>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 600 }}>Age / Gender</span>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--slate-800)' }}>
              {patient?.age || '45'} yrs • {patient?.gender || 'Male'}
            </p>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 600 }}>Blood Group</span>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--slate-800)' }}>
              {patient?.bloodGroup || 'Not specified'}
            </p>
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 600 }}>Test Date</span>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--slate-800)' }}>
              {report.testDate || new Date().toISOString().split('T')[0]}
            </p>
          </div>
        </div>

        {/* Results Parameters Table */}
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '10px' }}>
            Colorimetric Test Parameters
          </h3>

          <div className="results-grid">
            <div className={`metric-box ${report.glucose !== 'Negative' && !report.glucose?.includes('Negative') ? 'abnormal' : ''}`}>
              <span className="metric-label">Glucose</span>
              <span className="metric-value">{report.glucose}</span>
              <span className="metric-ref">Ref: Negative (&lt; 15 mg/dL)</span>
            </div>

            <div className={`metric-box ${report.protein !== 'Negative' ? 'abnormal' : ''}`}>
              <span className="metric-label">Protein</span>
              <span className="metric-value">{report.protein}</span>
              <span className="metric-ref">Ref: Negative (&lt; 15 mg/dL)</span>
            </div>

            <div className={`metric-box ${parseFloat(report.pH) < 5.0 || parseFloat(report.pH) > 7.5 ? 'abnormal' : ''}`}>
              <span className="metric-label">pH Level</span>
              <span className="metric-value">{report.pH}</span>
              <span className="metric-ref">Ref: 5.0 - 7.5</span>
            </div>

            <div className={`metric-box ${report.leukocytes !== 'Negative' ? 'abnormal' : ''}`}>
              <span className="metric-label">Leukocytes</span>
              <span className="metric-value">{report.leukocytes}</span>
              <span className="metric-ref">Ref: Negative</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">Ketones</span>
              <span className="metric-value">{report.ketones || 'Negative'}</span>
              <span className="metric-ref">Ref: Negative</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">Occult Blood</span>
              <span className="metric-value">{report.blood || 'Negative'}</span>
              <span className="metric-ref">Ref: Negative</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">Nitrite</span>
              <span className="metric-value">{report.nitrite || 'Negative'}</span>
              <span className="metric-ref">Ref: Negative</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">Specific Gravity</span>
              <span className="metric-value">{report.specificGravity || '1.018'}</span>
              <span className="metric-ref">Ref: 1.005 - 1.030</span>
            </div>
          </div>
        </div>

        {/* Diagnostic Conclusion */}
        <div className={`conclusion-box ${report.flagged ? 'abnormal' : ''}`}>
          <div className="conclusion-title">
            {report.flagged ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
            <span>Diagnostic Conclusion</span>
          </div>

          <p className="conclusion-text">
            {report.conclusion}
          </p>

          {report.recommendation && (
            <div className="recommendation-text">
              <strong>Recommendation:</strong> {report.recommendation}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '10px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrint}
          >
            <Printer size={16} />
            <span>Print Report</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRegisterAnother}
          >
            <UserPlus size={16} />
            <span>Register Another Patient</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticReportCard;
