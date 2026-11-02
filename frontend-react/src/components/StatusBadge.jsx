import React from 'react';

/**
 * StatusBadge Component
 * Reusable badge indicating patient/diagnostic stage.
 * 
 * @param {Object} props
 * @param {'registered'|'ready'|'analyzed'|'flagged'} props.status - The current state
 * @param {string} [props.customLabel] - Optional override label
 */
const StatusBadge = ({ status = 'registered', customLabel }) => {
  const config = {
    registered: {
      label: 'Registered',
      className: 'registered',
      icon: '👤'
    },
    ready: {
      label: 'Strip Uploaded',
      className: 'ready',
      icon: '📸'
    },
    analyzed: {
      label: 'Analysis Complete',
      className: 'analyzed',
      icon: '✓'
    },
    flagged: {
      label: 'Attention Needed',
      className: 'flagged',
      icon: '⚠️'
    }
  };

  const current = config[status] || config.registered;

  return (
    <span className={`status-badge ${current.className}`}>
      <span>{current.icon}</span>
      <span>{customLabel || current.label}</span>
    </span>
  );
};

export default StatusBadge;
