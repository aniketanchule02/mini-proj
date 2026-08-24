import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import PatientSummaryHeader from '../components/PatientSummaryHeader';
import ImageUploadBox from '../components/ImageUploadBox';
import ImagePreview from '../components/ImagePreview';
import CalibrationLoader from '../components/CalibrationLoader';
import { ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * Upload Page
 * Handles strip photo selection and proceeds directly to analysis.
 */
const Upload = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { getPatient, activeSession, setStripImage, setCalibrationDone, updatePatientStatus } = usePatients();

  const patient = getPatient(patientId);

  const [selectedFile, setSelectedFile] = useState(activeSession.uploadedFile || null);
  const [previewUrl, setPreviewUrl] = useState(activeSession.previewUrl || null);
  const [isCalibrated, setIsCalibrated] = useState(activeSession.calibrationDone || false);

  // Route Guard: Redirect back to /register if patient is not found
  useEffect(() => {
    if (!patient) {
      navigate('/register', { replace: true });
    }
  }, [patient, navigate]);

  // Cleanup object URL on unmount or URL change
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageSelected = (file, objectUrl) => {
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setStripImage(file, objectUrl);
    updatePatientStatus(patientId, 'ready');
  };

  const handleCalibrationComplete = (status) => {
    setIsCalibrated(status);
    setCalibrationDone(status);
  };

  const handleAnalyze = () => {
    if (previewUrl && isCalibrated) {
      // Direct navigation to Results page (Form page removed from flow)
      navigate(`/results/${patientId}`);
    }
  };

  if (!patient) return null;

  return (
    <div>
      {/* Patient Summary Header */}
      <PatientSummaryHeader patient={patient} />

      {/* Upload Layout */}
      <div className="upload-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <ImageUploadBox
            onImageSelected={handleImageSelected}
            hasImage={Boolean(previewUrl)}
          />

          <CalibrationLoader
            isCalibrated={isCalibrated}
            onCalibrationComplete={handleCalibrationComplete}
          />
        </div>

        <div>
          {previewUrl ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <ImagePreview
                previewUrl={previewUrl}
                fileName={selectedFile?.name || 'test-strip.png'}
              />

              {/* Single action button: Directly Analyze Strip */}
              <button
                type="button"
                className="btn btn-primary btn-lg"
                disabled={!previewUrl || !isCalibrated}
                onClick={handleAnalyze}
                style={{ width: '100%' }}
              >
                <span>Analyze Test Strip</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--slate-50)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--slate-700)' }}>
                No Strip Photo Selected
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)', marginTop: '4px' }}>
                Please select or upload a strip image on the left to proceed.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/register')}
        >
          <ArrowLeft size={16} />
          <span>Back to Patients</span>
        </button>
      </div>
    </div>
  );
};

export default Upload;
