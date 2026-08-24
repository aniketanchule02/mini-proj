import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import PatientDashboard from '../components/PatientDashboard';
import FormField from '../components/FormField';
import { UserPlus, AlertCircle } from 'lucide-react';

/**
 * RegistrationForm Component
 * Demographics and medical history intake for patient registration.
 */
const RegistrationForm = ({ onSubmitPatient }) => {
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    age: '',
    gender: 'Male',
    email: '',
    phone: '',
    bloodGroup: 'B+',
    symptoms: '',
    medicalHistory: ''
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.age) {
      setFormError('Please provide at least Patient Full Name and Age to register.');
      return;
    }

    const generatedId = formData.id.trim() || `P-${Math.floor(100 + Math.random() * 900)}`;

    onSubmitPatient({
      ...formData,
      id: generatedId,
      age: parseInt(formData.age, 10) || 30
    });

    // Reset form
    setFormData({
      id: '',
      fullName: '',
      age: '',
      gender: 'Male',
      email: '',
      phone: '',
      bloodGroup: 'B+',
      symptoms: '',
      medicalHistory: ''
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <UserPlus size={20} color="var(--primary-600)" />
            <span>Patient Registration</span>
          </h2>
          <p className="card-subtitle">
            Enter patient details to initiate test strip reading.
          </p>
        </div>
      </div>

      {formError && (
        <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger-text)', padding: '10px 14px', borderRadius: '8px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <AlertCircle size={16} />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Patient ID */}
          <FormField label="Patient ID (Optional)" htmlFor="patient-id" hint="Auto-generated if empty">
            <input
              id="patient-id"
              name="id"
              type="text"
              placeholder="e.g. P-105"
              value={formData.id}
              onChange={handleChange}
              className="form-input"
            />
          </FormField>

          {/* Full Name */}
          <FormField label="Full Name" htmlFor="patient-name" required>
            <input
              id="patient-name"
              name="fullName"
              type="text"
              placeholder="e.g. Aarav Sharma"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </FormField>

          {/* Age */}
          <FormField label="Age" htmlFor="patient-age" required>
            <input
              id="patient-age"
              name="age"
              type="number"
              min="1"
              max="120"
              placeholder="e.g. 45"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              required
            />
          </FormField>

          {/* Gender */}
          <FormField label="Gender" htmlFor="patient-gender" required>
            <select
              id="patient-gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </FormField>

          {/* Email */}
          <FormField label="Email Address" htmlFor="patient-email">
            <input
              id="patient-email"
              name="email"
              type="email"
              placeholder="patient@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </FormField>

          {/* Phone */}
          <FormField label="Phone Number" htmlFor="patient-phone">
            <input
              id="patient-phone"
              name="phone"
              type="tel"
              placeholder="+91 98000 00000"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </FormField>

          {/* Blood Group */}
          <FormField label="Blood Group" htmlFor="patient-blood">
            <select
              id="patient-blood"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="form-select"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </FormField>

          {/* Spacer */}
          <div />

          {/* Symptoms */}
          <FormField label="Symptoms" htmlFor="patient-symptoms" fullWidth>
            <textarea
              id="patient-symptoms"
              name="symptoms"
              rows={2}
              placeholder="e.g. Frequent urination, fatigue..."
              value={formData.symptoms}
              onChange={handleChange}
              className="form-textarea"
            />
          </FormField>

          {/* Medical History */}
          <FormField label="Medical History" htmlFor="patient-history" fullWidth>
            <textarea
              id="patient-history"
              name="medicalHistory"
              rows={2}
              placeholder="e.g. Diabetes, high blood pressure..."
              value={formData.medicalHistory}
              onChange={handleChange}
              className="form-textarea"
            />
          </FormField>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <UserPlus size={18} />
            <span>Register Patient</span>
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * Register Page
 */
const Register = () => {
  const navigate = useNavigate();
  const { patients, addPatient, startSession } = usePatients();

  const handleAddPatient = (patientData) => {
    const newId = addPatient(patientData);
    startSession(newId);
  };

  const handleStartTest = (patientId) => {
    startSession(patientId);
    navigate(`/upload/${patientId}`);
  };

  return (
    <div>
      {/* Registration Form */}
      <RegistrationForm onSubmitPatient={handleAddPatient} />

      {/* Registered Patients List */}
      <PatientDashboard patients={patients} onSelectPatient={handleStartTest} />
    </div>
  );
};

export default Register;
