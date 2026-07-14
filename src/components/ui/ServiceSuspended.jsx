import React, { useEffect } from 'react';
import './ServiceSuspended.css';

function ServiceSuspended() {
  useEffect(() => {
    // Disable right click and view source shortcuts for a clean presentation
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (e.keyCode === 123 || e.key === 'F12') {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      if (e.ctrlKey && ['u', 's'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="maintenance-container">
      <div className="maintenance-stars"></div>
      <div className="maintenance-glow-1"></div>
      <div className="maintenance-glow-2"></div>

      <div className="maintenance-card">
        <div className="maintenance-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="maintenance-icon"
          >
            <g className="gear-main">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </g>
            <path className="wrench-icon" d="M14.7 14.7 20 20" />
          </svg>
        </div>

        <h1 className="maintenance-title">Under Maintenance</h1>

        <p className="maintenance-message">
          We are upgrading our systems to provide a faster, more secure, and enriched learning experience.
          The Ashoka IAS Academy platform will be back online shortly. Thank you for your patience!
        </p>

        <div className="maintenance-details">
          <div className="maintenance-details-row">
            <span className="maintenance-details-label">Domain:</span>
            <a
              href="https://ashokaiasacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="maintenance-details-link"
            >
              ashokaiasacademy.com
            </a>
          </div>
          <div className="maintenance-details-row">
            <span className="maintenance-details-label">Status:</span>
            <span className="maintenance-details-value status-upgrading">Updating Platform</span>
          </div>
          <div className="maintenance-details-row">
            <span className="maintenance-details-label">Expected Back:</span>
            <span className="maintenance-details-value highlight-value">Very Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceSuspended;
