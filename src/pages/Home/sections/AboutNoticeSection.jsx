import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutNoticeSection.css';
import sbiPo2026Pdf from './notices_pdf/sbi_po_2026.pdf';

const NOTICES = {
  'Central Jobs': [
    { date: '2026-06-19', title: 'Advertisement for Recruitment of Assistant Branch Manager/ Assistant Manager-2026 - Offline Application start date 19-06-2026', pdf: sbiPo2026Pdf },
    { date: '2026-06-20', title: 'Download Admit Cards for recruitment of Assistants-2026', pdf: sbiPo2026Pdf },
    { date: '2026-06-21', title: 'Structure of Written Examination for Recruitment of Assistant', pdf: sbiPo2026Pdf },
    { date: '2026-06-22', title: 'Center wise list of Candidates applied', pdf: sbiPo2026Pdf }
  ],
  'State Jobs': [
    { date: '2026-06-19', title: 'Advertisement for Recruitment of Assistant Branch Manager/ Assistant Manager-2026 - Offline Application start date 19-06-2026', pdf: sbiPo2026Pdf },
    { date: '2026-06-20', title: 'Download Admit Cards for recruitment of Assistants-2026', pdf: sbiPo2026Pdf },
    { date: '2026-06-21', title: 'Structure of Written Examination for Recruitment of Assistant', pdf: sbiPo2026Pdf },
    { date: '2026-06-22', title: 'Center wise list of Candidates applied', pdf: sbiPo2026Pdf }
  ]
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
              <span className="notice-board__header-title">Notifications</span>
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
                  const isLink = !!item.pdf;
                  const Element = isLink ? 'a' : 'div';
                  return (
                    <Element
                      key={i}
                      href={isLink ? item.pdf : undefined}
                      target={isLink ? '_blank' : undefined}
                      rel={isLink ? 'noopener noreferrer' : undefined}
                      className="notice-item"
                      style={isLink ? { textDecoration: 'none', color: 'inherit' } : undefined}
                    >
                      <div className="notice-item__body">
                        <div className="notice-item__meta">
                          <span className="notice-item__date">{item.date}</span>
                        </div>
                        <p className="notice-item__title">
                          {item.title}
                          {isLink && (
                            <span className="notice-item__badge-pdf">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '3px', verticalAlign: 'middle', display: 'inline-block' }}>
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                              PDF
                            </span>
                          )}
                          <span className="notice-item__badge-new">NEW</span>
                        </p>
                      </div>
                    </Element>
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
