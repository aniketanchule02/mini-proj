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
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formBannerError, setFormBannerError] = useState('');

  // Route Guard: Redirect back to /register if patient context is missing
  useEffect(() => {
    if (!patient) {
      navigate('/register', { replace: true });
    }
  }, [patient, navigate]);

  const validateField = (name, value) => {
    const todayStr = new Date().toISOString().split('T')[0];
    switch (name) {
      case 'testDate': {
        if (!value) return 'Test date is required.';
        if (value > todayStr) return 'Test date cannot be in the future.';
        if (value < '2020-01-01') return 'Test date cannot be prior to 2020.';
        return '';
      }
      case 'testType': {
        if (!value) return 'Please select a test panel type.';
        return '';
      }
      case 'phValue': {
        if (value !== '' && value !== null && value !== undefined) {
          const ph = parseFloat(value);
          if (isNaN(ph) || ph < 4.5 || ph > 8.5) {
            return 'Urinary pH must be a valid number between 4.5 and 8.5.';
          }
        }
        return '';
      }
      case 'hydration': {
        if (!value) return 'Please select a visual hydration level.';
        return '';
      }
      case 'consent': {
        if (!value) return 'Informed consent confirmation is required.';
        return '';
      }
      case 'notes':
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setLocalFormData((prev) => ({
      ...prev,
      [name]: fieldValue
    }));

    if (formBannerError) setFormBannerError('');

    if (errors[name]) {
      const err = validateField(name, fieldValue);
      setErrors((prev) => {
        const next = { ...prev };
        if (err) {
          next[name] = err;
        } else {
          delete next[name];
        }
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    const err = validateField(name, fieldValue);
    if (err) {
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    ['testDate', 'testType', 'phValue', 'hydration', 'consent'].forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) {
        newErrors[key] = err;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = validateForm();

    if (isValid) {
      setFormBannerError('');
      saveContextFormData(formData);
      navigate(`/results/${patientId}`);
    } else {
      setFormBannerError('Please resolve the highlighted validation errors before proceeding to analysis.');
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

        {formBannerError && (
          <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger-text)', padding: '10px 14px', borderRadius: '8px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600 }}>Validation Alert:</span>
            <span>{formBannerError}</span>
          </div>
        )}

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
                onBlur={handleBlur}
                className={`form-input ${errors.testDate ? 'has-error' : ''}`}
                aria-invalid={Boolean(errors.testDate)}
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
                onBlur={handleBlur}
                className={`form-select ${errors.testType ? 'has-error' : ''}`}
                aria-invalid={Boolean(errors.testType)}
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
                onBlur={handleBlur}
                className={`form-input ${errors.phValue ? 'has-error' : ''}`}
                aria-invalid={Boolean(errors.phValue)}
              />
            </FormField>

            {/* Hydration Level */}
            <FormField
              label="Visual Hydration Level"
              hint="Estimated from sample color"
              required
              error={errors.hydration}
            >
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
