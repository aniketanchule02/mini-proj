import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Results from './pages/Results';

/**
 * Main Application Component
 */
function App() {
  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Header />

      {/* Main Content View */}
      <main className="main-content">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Patient Registration & Dashboard */}
          <Route path="/register" element={<Register />} />

          {/* Test Strip Upload */}
          <Route path="/upload/:patientId" element={<Upload />} />

          {/* Analysis & Results (Navigated directly after upload) */}
          <Route path="/results/:patientId" element={<Results />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
