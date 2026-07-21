import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';

export default function PageHeader({ title, breadcrumbs = [] }) {
  return (
    <section className="page-banner">
      <div className="page-banner__main container">
        <h1 className="page-banner__title">{title}</h1>
      </div>
      
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="page-breadcrumb-bar">
          <div className="container">
            <nav className="page-breadcrumb" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="page-breadcrumb__sep">›</span>}
                  {crumb.to ? (
                    <Link to={crumb.to} className="page-breadcrumb__link">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="page-breadcrumb__current">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>
      )}
    </section>
  );
}
