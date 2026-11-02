/**
 * AI Colorimetry Analysis API Client
 * Point-of-Care Healthcare System (AI Use Case KJS-HC-03)
 * Developed with reference to Dr. Ninad Mehendale, K J Somaiya Hospital.
 * 
 * Demonstrates asynchronous data flow, native fetch simulation with Promise & Response handling,
 * loading latency, error interception, and retry logic (Experiment 4).
 */

/**
 * Standard reference parameters for 10-parameter urinalysis strip
 */
export const STRIP_PARAMETERS = [
  { key: 'glucose', name: 'Glucose', normalRange: 'Negative (< 15 mg/dL)', unit: 'mg/dL' },
  { key: 'protein', name: 'Protein', normalRange: 'Negative (< 15 mg/dL)', unit: 'mg/dL' },
  { key: 'pH', name: 'pH Level', normalRange: '5.0 - 8.0', unit: '' },
  { key: 'leukocytes', name: 'Leukocytes', normalRange: 'Negative (< 10 Leu/µL)', unit: 'Leu/µL' },
  { key: 'ketones', name: 'Ketones', normalRange: 'Negative (< 5 mg/dL)', unit: 'mg/dL' },
  { key: 'blood', name: 'Occult Blood', normalRange: 'Negative', unit: 'Ery/µL' },
  { key: 'nitrite', name: 'Nitrite', normalRange: 'Negative', unit: '' },
  { key: 'specificGravity', name: 'Specific Gravity', normalRange: '1.005 - 1.030', unit: '' }
];

/**
 * Analyze urine strip image and clinical observations
 * @param {Object} payload - { patientId, patient, formData, stripImage }
 * @param {Object} [options] - { forceError?: boolean }
 * @returns {Promise<Object>} Formatted diagnostic report object
 */
export async function analyzeUrineStrip(payload, options = {}) {
  const { patientId, patient, formData } = payload;

  // Artificial latency simulation (1.2 seconds) to display async loading states
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // If force error flag is requested or simulated network failure
  if (options.forceError) {
    throw new Error('Colorimetry Model Connection Failed: Color calibration socket timed out (504).');
  }

  // Derive parameters based on patient context and clinical inputs for realistic variation
  const patientText = (patient?.symptoms || '') + ' ' + (formData?.notes || '');
  const isDiabeticRisk = /diabetes|sugar|thirst|polyuria/i.test(patientText) || formData?.testType === 'Diabetes Screening';
  const isKidneyRisk = /kidney|edema|back|stone/i.test(patientText) || formData?.testType === 'Kidney Panel';
  const manualPh = formData?.phValue ? parseFloat(formData.phValue) : 6.5;

  let glucose = 'Negative (< 15 mg/dL)';
  let protein = 'Negative';
  let leukocytes = 'Negative';
  let ketones = 'Negative';
  let blood = 'Negative';
  let nitrite = 'Negative';
  let specificGravity = '1.018';
  let ph = manualPh.toFixed(1);
  let confidence = 0.94;
  let conclusion = 'Normal urine analysis. No significant colorimetric abnormalities detected.';
  let recommendation = 'Routine annual check-up recommended. Maintain adequate hydration.';
  let flagged = false;

  if (isDiabeticRisk) {
    glucose = '180 mg/dL (1+)';
    ketones = 'Trace (5 mg/dL)';
    confidence = 0.91;
    conclusion = 'Elevated Glycosuria detected. Colorimetric shift indicates positive glucose reagent oxidation.';
    recommendation = 'Schedule Fasting Plasma Glucose (FPG) and HbA1c testing. Consult consulting diabetologist.';
    flagged = true;
  } else if (isKidneyRisk) {
    protein = '30 mg/dL (1+)';
    specificGravity = '1.028';
    confidence = 0.89;
    conclusion = 'Mild Microalbuminuria indicated. Pad reflectance demonstrates early protein excretion.';
    recommendation = 'Recommend 24-hour urinary protein estimation and renal function test (Serum Creatinine/eGFR).';
    flagged = true;
  } else if (manualPh < 5.0 || manualPh > 7.5) {
    confidence = 0.93;
    conclusion = `Urinary pH deviation detected (${ph}). Normal biochemical metabolic spectrum otherwise.`;
    recommendation = 'Evaluate dietary intake and hydration balance. Recheck in 7 days if symptomatic.';
  }

  // Build the standardized mock report matching specification
  const report = {
    reportId: `REP-${Math.floor(100000 + Math.random() * 900000)}`,
    patientId: patientId || 'P-101',
    patientName: patient?.fullName || 'Anonymous Patient',
    testDate: formData?.testDate || new Date().toISOString().split('T')[0],
    testType: formData?.testType || 'Routine',
    glucose: glucose,
    protein: protein,
    pH: ph,
    leukocytes: leukocytes,
    ketones: ketones,
    blood: blood,
    nitrite: nitrite,
    specificGravity: specificGravity,
    confidence: confidence,
    conclusion: conclusion,
    recommendation: recommendation,
    flagged: flagged,
    generatedAt: new Date().toISOString(),
    colorPads: [
      { name: 'Leukocytes', hex: leukocytes === 'Negative' ? '#fdf6b2' : '#b45309', status: leukocytes },
      { name: 'Nitrite', hex: nitrite === 'Negative' ? '#ffffff' : '#f43f5e', status: nitrite },
      { name: 'pH', hex: manualPh > 6.5 ? '#10b981' : '#f59e0b', status: ph },
      { name: 'Protein', hex: protein === 'Negative' ? '#fef08a' : '#84cc16', status: protein },
      { name: 'Glucose', hex: isDiabeticRisk ? '#9333ea' : '#06b6d4', status: glucose },
      { name: 'Ketones', hex: ketones === 'Negative' ? '#fde047' : '#ec4899', status: ketones },
      { name: 'Blood', hex: blood === 'Negative' ? '#fed7aa' : '#b91c1c', status: blood }
    ]
  };

  return report;
}
