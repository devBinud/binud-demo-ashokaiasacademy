import React, { useEffect } from 'react';
import './ServiceSuspended.css';

function ServiceSuspended() {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      // Disable F12
      if (e.keyCode === 123 || e.key === 'F12') {
        e.preventDefault();
      }
      // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      // Disable Ctrl+U (View Source) and Ctrl+S (Save)
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
    <div className="suspended-container">
      <div className="suspended-card">
        <div className="suspended-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="suspended-icon"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1 className="suspended-title">Service Overdue Notice</h1>
        <div className="suspended-status">Account Suspended</div>

        <p className="suspended-message">
          Due to unpaid server overdue charges, the website has been temporarily not served or working properly.
          Kindly pay to make it work. Please contact the administrator/service provider immediately to clear the outstanding dues.
        </p>

        <div className="suspended-details">
          <div className="suspended-details-row">
            <span className="suspended-details-label">Domain:</span>
            <a 
              href="https://ashokaiasacademy.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="suspended-details-link"
            >
              ashokaiasacademy.com
            </a>
          </div>
          <div className="suspended-details-row">
            <span className="suspended-details-label">Status Code:</span>
            <span className="suspended-details-value">ERR_SERVER_SUSPENDED_BILLING</span>
          </div>
          <div className="suspended-details-row">
            <span className="suspended-details-label">Restriction:</span>
            <span className="suspended-details-value">Access Blocked</span>
          </div>
        </div>

        <a 
          href="tel:9706393924"
          className="suspended-contact-btn"
        >
          Contact Developer
        </a>
      </div>
    </div>
  );
}

export default ServiceSuspended;
