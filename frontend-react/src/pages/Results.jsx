import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { analyzeUrineStrip } from '../api/analysisApi';
import PatientSummaryHeader from '../components/PatientSummaryHeader';
import AnalysisLoader from '../components/AnalysisLoader';
import ErrorState from '../components/ErrorState';
import DiagnosticReportCard from '../components/DiagnosticReportCard';

/**
 * Results Page
 * Handles async test strip analysis and report rendering.
 */
const Results = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { getPatient, activeSession, setAnalysisResult, updatePatientStatus } = usePatients();

  const patient = getPatient(patientId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(activeSession.analysisResult || null);

  // Route Guard: Redirect back to /register if patient context is lost
  useEffect(() => {
    if (!patient) {
      navigate('/register', { replace: true });
    }
  }, [patient, navigate]);

  const performAnalysis = useCallback(async () => {
    if (!patient) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        patientId,
        patient,
        formData: activeSession.formData,
        stripImage: activeSession.uploadedFile
      };

      const diagnosticData = await analyzeUrineStrip(payload);

      setReport(diagnosticData);
      setAnalysisResult(diagnosticData);
      updatePatientStatus(patientId, diagnosticData.flagged ? 'flagged' : 'analyzed');
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Unable to analyze test strip image. Please try again.');
      setLoading(false);
    }
  }, [patient, patientId, activeSession.formData, activeSession.uploadedFile, setAnalysisResult, updatePatientStatus]);

  useEffect(() => {
    if (!activeSession.analysisResult) {
      performAnalysis();
    } else {
      setReport(activeSession.analysisResult);
      setLoading(false);
    }
  }, [activeSession.analysisResult, performAnalysis]);

  const handleRetry = () => {
    performAnalysis();
  };

  if (!patient) return null;

  return (
    <div>
      {/* Patient Summary Header */}
      <PatientSummaryHeader patient={patient} />

      {/* Async State Handling */}
      {loading && <AnalysisLoader />}

      {!loading && error && (
        <ErrorState message={error} onRetry={handleRetry} />
      )}

      {!loading && !error && report && (
        <DiagnosticReportCard report={report} patient={patient} />
      )}
    </div>
  );
};

export default Results;
