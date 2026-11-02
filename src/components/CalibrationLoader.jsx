import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * CalibrationLoader Component
 * Simulates brief calibration check for the strip reader.
 */
const CalibrationLoader = ({ isCalibrated, onCalibrationComplete }) => {
  const [loading, setLoading] = useState(!isCalibrated);

  useEffect(() => {
    if (isCalibrated) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const timer = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
        if (onCalibrationComplete) {
          onCalibrationComplete(true);
        }
      }
    }, 800);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isCalibrated, onCalibrationComplete]);

  if (loading) {
    return (
      <div className="calibration-status loading">
        <div className="spinner" />
        <div>
          <strong>Checking calibration data...</strong>
          <p style={{ fontSize: '0.75rem', color: 'var(--sky-700)', marginTop: '2px' }}>
            Preparing color reference parameters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="calibration-status calibrated">
      <CheckCircle2 size={18} color="var(--success-accent)" />
      <div>
        <strong>Ready for Clinical Form</strong>
        <p style={{ fontSize: '0.75rem', color: 'var(--success-text)', marginTop: '2px' }}>
          Reference parameters calibrated
        </p>
      </div>
    </div>
  );
};

export default CalibrationLoader;
