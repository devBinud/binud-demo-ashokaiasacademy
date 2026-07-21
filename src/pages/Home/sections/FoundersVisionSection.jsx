import React from 'react';
import { Link } from 'react-router-dom';
import './FoundersVisionSection.css';

export default function FoundersVisionSection() {
  return (
    <section className="founders-vision-section section">
      <div className="container">
        <div className="founders-vision__wrapper">
          {/* Header */}
          <div className="founders-vision__header">
            <span className="section-label">Leadership & Mission</span>
            <h2 className="founders-vision__title">Founder's Vision</h2>
            <div className="divider-gold" />
          </div>

          <div className="founders-vision__grid">
            {/* Main Message Column */}
            <div className="founders-vision__content">
              <p className="founders-vision__lead">
                Ashoka IAS Academy was born from a simple yet powerful vision — to bridge the gap between aspiration and opportunity for students, especially from regions where access to quality guidance has traditionally been limited.
              </p>
              <p className="founders-vision__body">
                The academy was established to build strong conceptual clarity, consistent answer-writing practice, and a purpose-driven mindset that leads students toward success in UPSC, APSC, and national-level examinations.
              </p>
              
              <div className="founders-vision__pillars">
                <div className="vision-pillar">
                  <div className="vision-pillar__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="vision-pillar__title">Quality Education & Mentorship</h4>
                    <p className="vision-pillar__desc">Personalized guidance and continuous feedback at every step of preparation.</p>
                  </div>
                </div>

                <div className="vision-pillar">
                  <div className="vision-pillar__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="vision-pillar__title">Empowering Youth</h4>
                    <p className="vision-pillar__desc">Transforming ambition into achievement through structured learning ecosystems.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Card Column */}
            <div className="founders-vision__card">
              <div className="founders-vision__quote-symbol">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <blockquote className="founders-vision__quote">
                "Every student deserves the right guidance to succeed."
              </blockquote>
              <p className="founders-vision__author">Founder & Director</p>
              <span className="founders-vision__org">Ashoka IAS Academy</span>
              
              <div className="founders-vision__cta">
                <Link to="/about" className="btn btn-gold">
                  Learn More About Our Journey →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
