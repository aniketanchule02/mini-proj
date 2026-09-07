import React from 'react';
import PatientCard from './PatientCard';
import { Users } from 'lucide-react';

/**
 * PatientDashboard Component
 * Renders the list of registered patients.
 */
const PatientDashboard = ({ patients = [], onSelectPatient }) => {
  return (
    <div className="card" style={{ marginTop: '28px' }}>
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Users size={20} color="var(--primary-600)" />
            <span>Registered Patients</span>
            <span style={{ fontSize: '0.8rem', background: 'var(--slate-100)', color: 'var(--slate-700)', padding: '2px 8px', borderRadius: '12px', marginLeft: '6px' }}>
              {patients.length} Total
            </span>
          </h2>
          <p className="card-subtitle">
            Select a patient below to start the urine test strip reading.
          </p>
        </div>
      </div>

      {patients.length === 0 ? (
        <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--slate-500)' }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>No patients registered yet.</p>
          <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>Fill in the form above to register your first patient.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} onSelect={onSelectPatient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
