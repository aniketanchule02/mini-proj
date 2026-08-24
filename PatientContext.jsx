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
  analysisResult: null
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
   * Register a new patient
   */
  const addPatient = (patientData) => {
    const newId = patientData.id || `P-${100 + patients.length + 1}`;
    const newPatient = {
      ...patientData,
      id: newId,
      status: 'registered',
      registeredAt: new Date().toISOString()
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
   * Store AI colorimetry analysis results
   */
  const setAnalysisResult = (result) => {
    setActiveSession((prev) => ({
      ...prev,
      analysisResult: result
    }));
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
    setAnalysisResult,
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
