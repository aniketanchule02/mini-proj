import React from 'react';

/**
 * PatientSummaryHeader Component
 * Clean patient banner displayed at the top of test pages.
 */
const PatientSummaryHeader = ({ patient }) => {
  if (!patient) return null;

  const initials = patient.fullName
    ? patient.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'PT';

  return (
    <div className="patient-summary-header">
      <div className="patient-summary-info">
        <div className="patient-avatar">{initials}</div>
        <div className="summary-details">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="patient-id-badge">{patient.id}</span>
            <h3>{patient.fullName}</h3>
          </div>
          <div className="summary-meta">
            <span>
              <strong>Age:</strong> {patient.age} yrs ({patient.gender})
            </span>
            <span>•</span>
            <span>
              <strong>Blood:</strong> {patient.bloodGroup || 'Not specified'}
            </span>
            <span>•</span>
            <span>
              <strong>Phone:</strong> {patient.phone || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSummaryHeader;
