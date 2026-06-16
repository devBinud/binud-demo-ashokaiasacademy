import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutNoticeSection.css';

const NOTICES = {
  'Central Jobs': [
    { date: '2025-05-10', title: 'UPSC CSE 2025 - Notification Released', tag: 'UPSC' },
    { date: '2025-05-05', title: 'SSC CGL 2025 - Application Window Open', tag: 'SSC' },
    { date: '2025-04-28', title: 'IBPS PO 2025 - Official Notification Out', tag: 'Banking' },
    { date: '2025-04-20', title: 'Railway NTPC 2025 - New Vacancy Announced', tag: 'Railway' },
    { date: '2025-04-12', title: 'NDA 2025 - UPSC Notification Published', tag: 'Defence' },
    { date: '2025-04-01', title: 'SSC CHSL 2025 - Exam Date Announced', tag: 'SSC' },
    { date: '2025-03-22', title: 'IBPS Clerk 2025 - Registration Started', tag: 'Banking' },
    { date: '2025-03-10', title: 'UPSC CAPF 2025 - Notification Out', tag: 'UPSC' },
  ],
  'State Jobs': [
    { date: '2025-05-08', title: 'APSC CCE 2025 - Notification Released', tag: 'APSC' },
    { date: '2025-05-01', title: 'ADRE Grade III 2025 - Apply Now', tag: 'ADRE' },
    { date: '2025-04-25', title: 'Assam Police SI 2025 - Vacancy Announced', tag: 'Police' },
    { date: '2025-04-15', title: 'APSC ACS 2025 - Prelims Date Declared', tag: 'APSC' },
    { date: '2025-04-05', title: 'ADRE Grade IV 2025 - Registration Open', tag: 'ADRE' },
    { date: '2025-03-28', title: 'Assam TET 2025 - Notification Published', tag: 'TET' },
    { date: '2025-03-18', title: 'APSC Fishery 2025 - New Posts Notified', tag: 'APSC' },
    { date: '2025-03-05', title: 'Assam Rifles 2025 - Technical Vacancy Out', tag: 'Defence' },
  ],
};

export default function AboutNoticeSection() {
  const [activeTab, setActiveTab] = useState('Central Jobs');

  return (
    <section className="about-notice section">
      <div className="container about-notice__grid">

        {/* ── LEFT - About ── */}
        <div className="about-notice__left">
          <span className="section-label">Who We Are</span>
          <h2 className="about-notice__title">
            Ashoka IAS Academy
          </h2>
          <div className="divider-gold" />

          <p className="about-notice__desc">
            Ashoka IAS Academy is a premier institute dedicated to shaping the next generation of civil servants and professionals. Founded on the principles of quality education, discipline, and mentorship, the academy has emerged as a trusted destination for aspirants preparing for UPSC, APSC, SSC, Banking, and Defence examinations.
          </p>

          <p className="about-notice__desc">
            At Ashoka IAS Academy, learning goes beyond conventional classroom coaching. The institute focuses on building strong conceptual clarity, consistent answer-writing practice, current affairs mastery, and personality development to prepare students for every stage of competitive examinations.
          </p>
          <p className="about-notice__desc">
            <strong>At Ashoka IAS Academy, the mission is not just to teach subjects, but to build confidence, leadership, discipline, and a purpose-driven mindset that leads students toward success and service to the nation.</strong>
          </p>

        </div>

        {/* ── RIGHT - Notice Board ── */}
        <div className="about-notice__right">
          <div className="notice-board">

            {/* Header */}
            <div className="notice-board__header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="notice-board__header-icon">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notice-board__header-title">Latest Notices</span>
            </div>

            {/* Tabs */}
            <div className="notice-board__tabs">
              {Object.keys(NOTICES).map((tab) => (
                <button
                  key={tab}
                  className={`notice-board__tab${activeTab === tab ? ' notice-board__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Scrolling marquee list */}
            <div className="notice-board__marquee-wrap">
              <div className="notice-board__marquee">
                {/* Duplicate items for seamless loop */}
                {[...NOTICES[activeTab], ...NOTICES[activeTab]].map((item, i) => {
                  return (
                    <div key={i} className="notice-item">
                      <div className="notice-item__body">
                        <div className="notice-item__meta">
                          <span className="notice-item__date">{item.date}</span>
                        </div>
                        <p className="notice-item__title">
                          {item.title}
                          <span className="notice-item__badge-new">NEW</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="notice-board__footer">
              <Link to="/results" className="notice-board__view-all">
                View All Updates →
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
