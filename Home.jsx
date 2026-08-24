import React from 'react';
import { Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { UserPlus, UploadCloud, CheckCircle, ArrowRight, FlaskConical } from 'lucide-react';

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

      {/* Workflow Steps Section - 3 Steps (Form page removed) */}
      <section id="workflow" className="section-block">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">A simple 3-step process for test strip evaluation</p>

        <div className="workflow-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="workflow-card">
            <div className="workflow-num">1</div>
            <div className="workflow-icon"><UserPlus size={24} /></div>
            <h3>1. Patient Registration</h3>
            <p>Enter patient details including name, age, phone, blood group, and symptoms.</p>
          </div>

          <div className="workflow-card">
            <div className="workflow-num">2</div>
            <div className="workflow-icon"><UploadCloud size={24} /></div>
            <h3>2. Strip Photo Upload</h3>
            <p>Upload a clear photo of the exposed urine reagent test strip.</p>
          </div>

          <div className="workflow-card">
            <div className="workflow-num">3</div>
            <div className="workflow-icon"><CheckCircle size={24} /></div>
            <h3>3. Analysis & Report</h3>
            <p>View test readings for Glucose, Protein, pH, and get a printable summary.</p>
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
