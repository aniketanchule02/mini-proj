import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import PatientSummaryHeader from '../components/PatientSummaryHeader';
import FormField from '../components/FormField';
import { ClipboardList, ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * TestForm Component
 * Controlled form for clinical observations and strip test parameters.
 */
const TestForm = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { getPatient, activeSession, setFormData: saveContextFormData } = usePatients();

  const patient = getPatient(patientId);

  const [formData, setLocalFormData] = useState(() => {
    return {
      testDate: activeSession.formData?.testDate || new Date().toISOString().split('T')[0],
      testType: activeSession.formData?.testType || 'Routine',
      phValue: activeSession.formData?.phValue || '6.5',
      hydration: activeSession.formData?.hydration || 'Normal',
      consent: activeSession.formData?.consent !== undefined ? activeSession.formData.consent : true,
      notes: activeSession.formData?.notes || ''
    };
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Route Guard: Redirect back to /register if patient context is missing
  useEffect(() => {
    if (!patient) {
      navigate('/register', { replace: true });
    }
  }, [patient, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setLocalFormData((prev) => ({
      ...prev,
      [name]: fieldValue
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const todayStr = new Date().toISOString().split('T')[0];

    // 1. Test date required and not in future
    if (!formData.testDate) {
      newErrors.testDate = 'Test date is required.';
    } else if (formData.testDate > todayStr) {
      newErrors.testDate = 'Test date cannot be in the future.';
    }

    // 2. pH must be between 4.5 and 8.5 if provided
    if (formData.phValue !== '') {
      const ph = parseFloat(formData.phValue);
      if (isNaN(ph) || ph < 4.5 || ph > 8.5) {
        newErrors.phValue = 'Urinary pH must be between 4.5 and 8.5.';
      }
    }

    // 3. Consent checkbox must be checked
    if (!formData.consent) {
      newErrors.consent = 'Informed consent confirmation is required.';
    }

    // 4. Test type required
    if (!formData.testType) {
      newErrors.testType = 'Please select a test type.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = validateForm();

    if (isValid) {
      saveContextFormData(formData);
      navigate(`/results/${patientId}`);
    } else {
      setIsSubmitting(false);
    }
  };

  if (!patient) return null;

  return (
    <div>
      {/* Patient Summary Header */}
      <PatientSummaryHeader patient={patient} />

      {/* Clinical Test Form */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <ClipboardList size={20} color="var(--primary-600)" />
              <span>Clinical Test Observations</span>
            </h2>
            <p className="card-subtitle">
              Enter accompanying physical observations and verify sample details before analysis.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Test Date */}
            <FormField
              label="Test Date"
              htmlFor="test-date"
              required
              error={errors.testDate}
              hint="Today or earlier"
            >
              <input
                id="test-date"
                name="testDate"
                type="date"
                max={new Date().toISOString().split('T')[0]}
                value={formData.testDate}
                onChange={handleInputChange}
                className={`form-input ${errors.testDate ? 'has-error' : ''}`}
                required
              />
            </FormField>

            {/* Test Panel Type */}
            <FormField
              label="Test Panel Type"
              htmlFor="test-type"
              required
              error={errors.testType}
            >
              <select
                id="test-type"
                name="testType"
                value={formData.testType}
                onChange={handleInputChange}
                className={`form-select ${errors.testType ? 'has-error' : ''}`}
              >
                <option value="Routine">Routine Urinalysis (10-SG)</option>
                <option value="Diabetes Screening">Diabetes Screening</option>
                <option value="Kidney Panel">Kidney Panel</option>
                <option value="Complete Metabolic">Complete Urinalysis</option>
              </select>
            </FormField>

            {/* Manual pH Reading */}
            <FormField
              label="Manual pH Reading (Optional)"
              htmlFor="ph-value"
              error={errors.phValue}
              hint="Range: 4.5 – 8.5"
            >
              <input
                id="ph-value"
                name="phValue"
                type="number"
                step="0.1"
                min="4.5"
                max="8.5"
                placeholder="e.g. 6.5"
                value={formData.phValue}
                onChange={handleInputChange}
                className={`form-input ${errors.phValue ? 'has-error' : ''}`}
              />
            </FormField>

            {/* Hydration Level */}
            <FormField label="Visual Hydration Level" hint="Estimated from sample color">
              <div className="radio-group" style={{ marginTop: '8px' }}>
                {['Low (Dark)', 'Normal (Amber)', 'High (Clear)'].map((level) => {
                  const val = level.split(' ')[0];
                  return (
                    <label key={val} className="radio-option">
                      <input
                        type="radio"
                        name="hydration"
                        value={val}
                        checked={formData.hydration === val}
                        onChange={handleInputChange}
                      />
                      <span>{level}</span>
                    </label>
                  );
                })}
              </div>
            </FormField>

            {/* Additional Clinical Notes */}
            <FormField
              label="Additional Notes / Observations"
              htmlFor="test-notes"
              fullWidth
            >
              <textarea
                id="test-notes"
                name="notes"
                rows={3}
                placeholder="e.g. Strip dipped for 2 seconds and observed under standard room light..."
                value={formData.notes}
                onChange={handleInputChange}
                className="form-textarea"
              />
            </FormField>

            {/* Informed Consent */}
            <div className="form-full-width" style={{ marginTop: '8px', padding: '14px', background: 'var(--slate-50)', borderRadius: '8px', border: '1px solid var(--slate-200)' }}>
              <label className="checkbox-option" style={{ alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  style={{ marginTop: '3px' }}
                />
                <span style={{ fontSize: '0.86rem', color: 'var(--slate-700)', lineHeight: 1.4 }}>
                  I confirm that the urine test strip has been handled properly and consent has been verified. <span className="required">*</span>
                </span>
              </label>
              <FormField error={errors.consent} />
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/upload/${patientId}`)}
            >
              <ArrowLeft size={16} />
              <span>Back to Upload</span>
            </button>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              <span>Analyze Strip</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestForm;
