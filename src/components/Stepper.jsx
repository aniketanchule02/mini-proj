import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { Check } from 'lucide-react';

/**
 * Stepper Component
 * Visual progress stepper tracking user workflow across all 4 experiments:
 * 1. Register -> 2. Upload -> 3. Test Form -> 4. Results
 */
const Stepper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientId: routePatientId } = useParams();
  const { activeSession } = usePatients();

  const currentPatientId = routePatientId || activeSession.patientId;

  const steps = [
    {
      index: 1,
      id: 'register',
      title: '1. Register Patient',
      subtitle: 'Exp 1: Props & JSX',
      path: '/register',
      isAccessible: true
    },
    {
      index: 2,
      id: 'upload',
      title: '2. Upload Strip',
      subtitle: 'Exp 2: Hooks & Lifecycle',
      path: currentPatientId ? `/upload/${currentPatientId}` : '/register',
      isAccessible: Boolean(currentPatientId)
    },
    {
      index: 3,
      id: 'test-form',
      title: '3. Clinical Form',
      subtitle: 'Exp 3: Form Validation',
      path: currentPatientId ? `/test-form/${currentPatientId}` : '/register',
      isAccessible: Boolean(currentPatientId && activeSession.previewUrl)
    },
    {
      index: 4,
      id: 'results',
      title: '4. AI Diagnostics',
      subtitle: 'Exp 4: Async API Flow',
      path: currentPatientId ? `/results/${currentPatientId}` : '/register',
      isAccessible: Boolean(currentPatientId && activeSession.formData)
    }
  ];

  const getCurrentStepIndex = () => {
    const path = location.pathname;
    if (path.includes('/register') || path === '/') return 1;
    if (path.includes('/upload')) return 2;
    if (path.includes('/test-form')) return 3;
    if (path.includes('/results')) return 4;
    return 1;
  };

  const currentStep = getCurrentStepIndex();
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleStepClick = (step) => {
    if (step.isAccessible) {
      navigate(step.path);
    }
  };

  return (
    <div className="stepper-container">
      <div className="stepper-inner">
        <div className="stepper-track">
          <div className="stepper-progress" style={{ width: `${progressPercent}%` }} />
        </div>

        {steps.map((step) => {
          const isActive = currentStep === step.index;
          const isCompleted = currentStep > step.index;

          return (
            <button
              key={step.id}
              type="button"
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              disabled={!step.isAccessible}
              onClick={() => handleStepClick(step)}
              title={step.title}
            >
              <div className="step-circle">
                {isCompleted ? <Check size={18} strokeWidth={2.5} /> : step.index}
              </div>
              <span className="step-title">{step.title}</span>
              <span className="step-subtitle">{step.subtitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
