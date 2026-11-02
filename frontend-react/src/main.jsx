import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PatientProvider } from './context/PatientContext';
import App from './App';
import './index.css';

/**
 * Root Application Entry Point
 * Wraps the application with BrowserRouter and PatientProvider context.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PatientProvider>
        <App />
      </PatientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
