import React from 'react';
import { Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { UserPlus, UploadCloud, CheckCircle, ArrowRight, FlaskConical } from 'lucide-react';
import OpticalRailScanner from '../components/OpticalRailScanner';

/**
 * Home Page - Minimal Landing page for the Urine Test Strip Reader project.
 */
const Home = () => {
  const { patients } = usePatients();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <FlaskConical size={16} />
          <span>Point-of-Care Healthcare Project</span>
        </div>
        <h1 className="hero-title">Urine Test Strip Reader</h1>
        <p className="hero-subtitle">
          A digital urinalysis system that reads reagent test strip images and provides quick diagnostic observations.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary btn-lg">
            <UserPlus size={18} />
            <span>Register New Patient</span>
          </Link>
          <a href="#workflow" className="btn btn-secondary btn-lg">
            <span>View Workflow</span>
          </a>
        </div>
      </section>

      {/* Live Optical Rail Scanner Animation (Hardware Digital Twin) */}
      <section className="section-block" style={{ marginTop: '0' }}>
        <OpticalRailScanner />
      </section>

      {/* Quick Stats Banner */}
      <section className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{patients.length}</span>
          <span className="stat-label">Registered Patients</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">10-SG</span>
          <span className="stat-label">Test Parameters</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">Fast</span>
          <span className="stat-label">Colorimetry Analysis</span>
        </div>
      </section>

      {/* Workflow Steps Section - 4 Steps */}
      <section id="workflow" className="section-block">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">A seamless 4-step point-of-care test strip evaluation workflow</p>

        <div className="workflow-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="workflow-card">
            <div className="workflow-num">1</div>
            <div className="workflow-icon"><UserPlus size={24} /></div>
            <h3>1. Patient Intake</h3>
            <p>Register demographics with client-side form validation for name, age, gender, and phone.</p>
          </div>

          <div className="workflow-card">
            <div className="workflow-num">2</div>
            <div className="workflow-icon"><UploadCloud size={24} /></div>
            <h3>2. Strip Image & Calibration</h3>
            <p>Upload strip photo with automated format/size verification and optical calibration.</p>
          </div>

          <div className="workflow-card">
            <div className="workflow-num">3</div>
            <div className="workflow-icon"><CheckCircle size={24} /></div>
            <h3>3. Clinical Observations</h3>
            <p>Record and validate physical test parameters, urinary pH range, and informed consent.</p>
          </div>

          <div className="workflow-card">
            <div className="workflow-num">4</div>
            <div className="workflow-icon"><FlaskConical size={24} /></div>
            <h3>4. Colorimetry & Report</h3>
            <p>Extract pad reflectance values and generate an objective, printable diagnostic report.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/register" className="btn btn-primary">
            <span>Start Test Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
