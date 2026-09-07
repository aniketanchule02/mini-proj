import React, { createContext, useContext, useState } from 'react';

/**
 * PatientContext - In-memory React state store for patients and active test sessions.
 */
const PatientContext = createContext(null);

const INITIAL_SESSION = {
  patientId: null,
  uploadedFile: null,
  previewUrl: null,
  calibrationDone: false,
  analysisResult: null,
  formData: null
};

export const PatientProvider = ({ children }) => {
  // Clear any previously saved localStorage keys from previous sessions
  try {
    localStorage.removeItem('kjs_patients');
  } catch (e) {
    // ignore
  }

  // Pure in-memory React state (clears upon browser refresh)
  const [patients, setPatients] = useState([]);
  const [activeSession, setActiveSession] = useState(INITIAL_SESSION);

  /**
   * Register a new patient or update returning patient
   */
  const addPatient = (patientData) => {
    const newId = (patientData.id || '').trim() || `P-${100 + patients.length + 1}`;
    
    // Check if patient already exists (returning customer)
    const existingIndex = patients.findIndex(
      (p) => String(p.id).toUpperCase() === String(newId).toUpperCase()
    );

    if (existingIndex >= 0) {
      // Returning patient: update demographic details while preserving previous test history
      const existingPatient = patients[existingIndex];
      const updatedPatient = {
        ...existingPatient,
        ...patientData,
        id: newId,
        status: 'registered',
        lastVisitAt: new Date().toISOString(),
        testHistory: existingPatient.testHistory || []
      };
      setPatients((prev) => prev.map((p, idx) => (idx === existingIndex ? updatedPatient : p)));
      return newId;
    }

    const newPatient = {
      ...patientData,
      id: newId,
      status: 'registered',
      registeredAt: new Date().toISOString(),
      testHistory: []
    };
    setPatients((prev) => [newPatient, ...prev]);
    return newId;
  };

  /**
   * Look up patient by ID
   */
  const getPatient = (id) => {
    return patients.find((p) => String(p.id).toUpperCase() === String(id).toUpperCase());
  };

  /**
   * Update status of patient
   */
  const updatePatientStatus = (id, status) => {
    setPatients((prev) =>
      prev.map((p) => (String(p.id).toUpperCase() === String(id).toUpperCase() ? { ...p, status } : p))
    );
  };

  /**
   * Initialize or switch active session for a specific patient
   */
  const startSession = (patientId) => {
    setActiveSession({
      ...INITIAL_SESSION,
      patientId
    });
  };

  /**
   * Store uploaded test strip image and generated object URL
   */
  const setStripImage = (file, previewUrl) => {
    setActiveSession((prev) => ({
      ...prev,
      uploadedFile: file,
      previewUrl: previewUrl
    }));
  };

  /**
   * Set calibration complete status
   */
  const setCalibrationDone = (status = true) => {
    setActiveSession((prev) => ({
      ...prev,
      calibrationDone: status
    }));
  };

  /**
   * Store clinical test form data
   */
  const setFormData = (formData) => {
    setActiveSession((prev) => ({
      ...prev,
      formData
    }));
  };

  /**
   * Store AI colorimetry analysis results and record into patient's longitudinal history
   */
  const setAnalysisResult = (result, targetPatientId) => {
    const pId = targetPatientId || activeSession.patientId;

    setActiveSession((prev) => ({
      ...prev,
      analysisResult: result
    }));

    if (pId) {
      setPatients((prev) =>
        prev.map((p) => {
          if (String(p.id).toUpperCase() === String(pId).toUpperCase()) {
            const history = p.testHistory || [];
            const exists = history.some((h) => h.reportId === result.reportId);
            const updatedHistory = exists ? history : [...history, result];

            return {
              ...p,
              status: result.flagged ? 'flagged' : 'analyzed',
              testHistory: updatedHistory,
              latestReport: result
            };
          }
          return p;
        })
      );
    }
  };

  /**
   * Add a historical test record (e.g. baseline or follow-up visit for trends)
   */
  const addHistoricalTest = (patientId, pastReport) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (String(p.id).toUpperCase() === String(patientId).toUpperCase()) {
          const history = p.testHistory || [];
          return {
            ...p,
            testHistory: [pastReport, ...history]
          };
        }
        return p;
      })
    );
  };

  /**
   * Reset the active session and clean up state
   */
  const resetActiveSession = () => {
    setActiveSession(INITIAL_SESSION);
  };

  const value = {
    patients,
    activeSession,
    addPatient,
    getPatient,
    updatePatientStatus,
    startSession,
    setStripImage,
    setCalibrationDone,
    setFormData,
    setAnalysisResult,
    addHistoricalTest,
    resetActiveSession
  };

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
};

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

export default PatientContext;
