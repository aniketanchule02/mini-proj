import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { ArrowRight, User, Droplet, Clock } from 'lucide-react';

/**
 * PatientCard Component (Experiment 1 Showcase: Props, Component Composition, JSX)
 * Demonstrates clean props passing, conditional badge rendering, and modular layout.
 * 
 * @param {Object} props
 * @param {Object} props.patient - Patient record data
 * @param {Function} [props.onSelect] - Callback when "Start Test" is triggered
 */
const PatientCard = ({ patient, onSelect }) => {
  const navigate = useNavigate();

  if (!patient) return null;

  const handleStartTest = () => {
    if (onSelect) {
      onSelect(patient.id);
    } else {
      navigate(`/upload/${patient.id}`);
    }
  };

  const formattedDate = patient.registeredAt
    ? new Date(patient.registeredAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Recent';

  return (
    <div className="patient-card">
      <div>
        <div className="patient-card-header">
          <span className="patient-id-badge">{patient.id}</span>
          <StatusBadge status={patient.status} />
        </div>

        <h3 className="patient-name">{patient.fullName}</h3>

        <div className="patient-meta-grid" style={{ marginTop: '12px' }}>
          <div className="meta-item">
            <strong>Age / Gender:</strong> {patient.age} yrs • {patient.gender}
          </div>
          <div className="meta-item">
            <strong>Blood Group:</strong> {patient.bloodGroup || 'N/A'}
          </div>
          <div className="meta-item" style={{ gridColumn: 'span 2' }}>
            <strong>Phone:</strong> {patient.phone || 'N/A'}
          </div>
        </div>

        {patient.symptoms && (
          <div style={{ marginTop: '12px' }}>
            <p className="patient-symptoms-snippet">
              <strong style={{ color: 'var(--slate-700)' }}>Symptoms:</strong> {patient.symptoms}
            </p>
          </div>
        )}
      </div>

      <div style={{ paddingTop: '12px', borderTop: '1px solid var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.74rem', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {formattedDate}
        </span>
        <button
          type="button"
          className="btn btn-primary"
          style={{ padding: '7px 14px', fontSize: '0.82rem' }}
          onClick={handleStartTest}
        >
          <span>Start Test</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
