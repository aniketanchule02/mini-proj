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
/**
 * RegistrationForm Component
 * Demographics and medical history intake for patient registration.
 * Features comprehensive validation for all fields except symptoms and medical history.
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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formBannerError, setFormBannerError] = useState('');

  // Validation function for individual fields
  const validateField = (name, value) => {
    switch (name) {
      case 'id': {
        if (value && value.trim()) {
          const idPattern = /^[A-Za-z0-9\-_]{2,20}$/;
          if (!idPattern.test(value.trim())) {
            return 'Patient ID must be 2–20 alphanumeric characters or hyphens.';
          }
        }
        return '';
      }
      case 'fullName': {
        const trimmed = (value || '').trim();
        if (!trimmed) {
          return 'Full name is required.';
        }
        if (trimmed.length < 3) {
          return 'Full name must be at least 3 characters.';
        }
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
          return 'Full name can only contain letters, spaces, hyphens, and periods.';
        }
        return '';
      }
      case 'age': {
        if (value === '' || value === null || value === undefined) {
          return 'Age is required.';
        }
        const parsed = Number(value);
        if (!Number.isInteger(parsed) || isNaN(parsed) || parsed < 1 || parsed > 120) {
          return 'Please enter a valid age between 1 and 120.';
        }
        return '';
      }
      case 'gender': {
        if (!value || !['Male', 'Female', 'Other'].includes(value)) {
          return 'Please select a valid gender.';
        }
        return '';
      }
      case 'phone': {
        const trimmed = (value || '').trim();
        if (!trimmed) {
          return 'Phone number is required.';
        }
        // Accepts 10-digit mobile numbers with optional +91 prefix
        const phoneClean = trimmed.replace(/[\s\-]/g, '');
        if (!/^(\+91)?[6-9]\d{9}$/.test(phoneClean)) {
          return 'Please enter a valid 10-digit mobile number (e.g. 9820012345).';
        }
        return '';
      }
      case 'email': {
        const trimmed = (value || '').trim();
        if (trimmed) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
          if (!emailPattern.test(trimmed)) {
            return 'Please enter a valid email address (e.g. patient@example.com).';
          }
        }
        return '';
      }
      case 'bloodGroup': {
        const allowedGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        if (!value || !allowedGroups.includes(value)) {
          return 'Please select a valid blood group.';
        }
        return '';
      }
      // Symptoms and Medical History are explicitly exempt from validation
      case 'symptoms':
      case 'medicalHistory':
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const fieldsToValidate = ['id', 'fullName', 'age', 'gender', 'phone', 'email', 'bloodGroup'];

    fieldsToValidate.forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) {
        newErrors[key] = err;
      }
    });

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formBannerError) setFormBannerError('');

    // Clear or update error for this field if it was already touched
    if (touched[name]) {
      const fieldErr = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErr
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErr = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErr
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all relevant fields as touched
    setTouched({
      id: true,
      fullName: true,
      age: true,
      gender: true,
      phone: true,
      email: true,
      bloodGroup: true
    });

    const validationErrors = validateAll();

    if (Object.keys(validationErrors).length > 0) {
      setFormBannerError('Please resolve the highlighted validation errors before continuing.');
      return;
    }

    setFormBannerError('');

    const generatedId = formData.id.trim() || `P-${Math.floor(100 + Math.random() * 900)}`;

    onSubmitPatient({
      ...formData,
      id: generatedId,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
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
    setErrors({});
    setTouched({});
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

      {formBannerError && (
        <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger-text)', padding: '10px 14px', borderRadius: '8px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{formBannerError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Patient ID */}
          <FormField
            label="Patient ID (Optional)"
            htmlFor="patient-id"
            hint="Auto-generated if empty"
            error={errors.id}
          >
            <input
              id="patient-id"
              name="id"
              type="text"
              placeholder="e.g. P-105"
              value={formData.id}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.id ? 'has-error' : ''}`}
              aria-invalid={Boolean(errors.id)}
            />
          </FormField>

          {/* Full Name */}
          <FormField
            label="Full Name"
            htmlFor="patient-name"
            required
            error={errors.fullName}
          >
            <input
              id="patient-name"
              name="fullName"
              type="text"
              placeholder="e.g. Aarav Sharma"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.fullName ? 'has-error' : ''}`}
              aria-invalid={Boolean(errors.fullName)}
              required
            />
          </FormField>

          {/* Age */}
          <FormField
            label="Age"
            htmlFor="patient-age"
            required
            hint="1–120 years"
            error={errors.age}
          >
            <input
              id="patient-age"
              name="age"
              type="number"
              min="1"
              max="120"
              placeholder="e.g. 45"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.age ? 'has-error' : ''}`}
              aria-invalid={Boolean(errors.age)}
              required
            />
          </FormField>

          {/* Gender */}
          <FormField
            label="Gender"
            htmlFor="patient-gender"
            required
            error={errors.gender}
          >
            <select
              id="patient-gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-select ${errors.gender ? 'has-error' : ''}`}
              aria-invalid={Boolean(errors.gender)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </FormField>

          {/* Email */}
          <FormField
            label="Email Address"
            htmlFor="patient-email"
            hint="Optional, for report dispatch"
            error={errors.email}
          >
            <input
              id="patient-email"
              name="email"
              type="email"
              placeholder="patient@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              aria-invalid={Boolean(errors.email)}
            />
          </FormField>

          {/* Phone */}
          <FormField
            label="Phone Number"
            htmlFor="patient-phone"
            required
            hint="10-digit mobile"
            error={errors.phone}
          >
            <input
              id="patient-phone"
              name="phone"
              type="tel"
              placeholder="9820012345"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.phone ? 'has-error' : ''}`}
              aria-invalid={Boolean(errors.phone)}
              required
            />
          </FormField>

          {/* Blood Group */}
          <FormField
            label="Blood Group"
            htmlFor="patient-blood"
            required
            error={errors.bloodGroup}
          >
            <select
              id="patient-blood"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-select ${errors.bloodGroup ? 'has-error' : ''}`}
              aria-invalid={Boolean(errors.bloodGroup)}
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
          <FormField
            label="Symptoms"
            htmlFor="patient-symptoms"
            fullWidth
          >
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
          <FormField
            label="Medical History"
            htmlFor="patient-history"
            fullWidth
          >
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
            <span>Register & Proceed to Test</span>
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
    navigate(`/upload/${newId}`);
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
