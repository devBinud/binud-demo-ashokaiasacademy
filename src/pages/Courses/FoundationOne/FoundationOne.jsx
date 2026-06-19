import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Globe, GraduationCap, BookOpen, CheckCircle } from 'lucide-react';
import SEO from '../../../components/common/SEO';
import '../CoursePage.css';

const SIDEBAR_ITEMS = [
  { label: 'Duration', value: '12 Months', icon: <Calendar size={18} strokeWidth={1.8} /> },
  { label: 'Eligibility', value: 'Graduate / Final Year', icon: <GraduationCap size={18} strokeWidth={1.8} /> },
  { label: 'Mode', value: 'Offline + Online', icon: <Globe size={18} strokeWidth={1.8} /> },
  { label: 'Batch Size', value: 'Max 30 Students', icon: <Users size={18} strokeWidth={1.8} /> },
  { label: 'Study Material', value: 'Printed + Digital', icon: <BookOpen size={18} strokeWidth={1.8} /> },
  { label: 'Exams Covered', value: 'UPSC & APSC', icon: <CheckCircle size={18} strokeWidth={1.8} /> },
];

const TABS = ['Overview', 'Eligibility', 'Fees', 'Start Date', 'How to Apply'];

export default function FoundationOne() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="course-page">
      <SEO 
        title="1-Year UPSC & APSC Foundation Course"
        description="Our flagship 1-Year integrated foundation program for UPSC and APSC exams. Features complete syllabus coverage, weekly tests, and personal mentorship."
      />

      {/* Breadcrumb */}
      <div className="course-breadcrumb">
        <div className="container course-breadcrumb__inner">
          <Link to="/" className="course-breadcrumb__link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Home
          </Link>
          <span className="course-breadcrumb__sep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <Link to="/courses" className="course-breadcrumb__link">Courses</Link>
          <span className="course-breadcrumb__sep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <span className="course-breadcrumb__current">Foundation Program — 1 Year</span>
        </div>
      </div>

      {/* Hero */}
      <div className="course-hero">
        <div className="container">
          <span className="course-hero__tag">Most Popular</span>
          <h1 className="course-hero__title">Foundation Program — <span className="text-gold">1 Year</span></h1>
          <p className="course-hero__desc">An intensive one-year integrated program designed for focused UPSC & APSC preparation with structured mentorship.</p>
          <div className="course-hero__meta">
            <span className="course-hero__meta-item"><Calendar size={15} strokeWidth={2} />12 Months</span>
            <span className="course-hero__meta-item"><Users size={15} strokeWidth={2} />Max 30 Students</span>
            <span className="course-hero__meta-item"><Globe size={15} strokeWidth={2} />Offline + Online</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="section course-overview">
        <div className="container course-overview__grid">

          <div className="course-overview__content">

            {/* Highlights */}
            <div className="course-highlights">
              {[
                { label: 'Duration', value: '1 Year' },
                { label: 'Mode', value: 'Offline / Online' },
                { label: 'Batch Size', value: '30 Seats' },
                { label: 'Exams', value: 'UPSC & APSC' },
              ].map((h) => (
                <div key={h.label} className="course-highlight-item">
                  <span className="course-highlight-value">{h.value}</span>
                  <span className="course-highlight-label">{h.label}</span>
                </div>
              ))}
            </div>

            {/* Nav Tabs */}
            <div className="course-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`course-tab-btn${activeTab === tab ? ' course-tab-btn--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="course-tab-content">

              {activeTab === 'Overview' && (
                <>
                  <h3>What's Included</h3>
                  <ul className="course-includes__list">
                    {[
                      'Complete GS Paper 1–4 coverage',
                      'Weekly Prelims & Mains mock tests',
                      'Answer writing practice with expert feedback',
                      'Current affairs daily sessions',
                      'Interview guidance & personality development',
                      'Doubt clearing & one-on-one mentorship',
                    ].map((p) => (
                      <li key={p}>
                        <span className="course-check">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {activeTab === 'Eligibility' && (
                <>
                  <h3>Eligibility Criteria</h3>
                  <ul>
                    <li>Graduate or final year undergraduate student from any recognized university</li>
                    <li>Age limit: 21–32 years (as per UPSC norms; relaxation for reserved categories)</li>
                    <li>Indian nationals only</li>
                    <li>No prior coaching experience required — beginners welcome</li>
                    <li>Basic proficiency in English or Hindi for classroom sessions</li>
                  </ul>
                  <p>Students appearing in their final year examination are also eligible to apply provisionally.</p>
                </>
              )}

              {activeTab === 'Fees' && (
                <>
                  <h3>Fee Structure</h3>
                  <table className="course-fee-table">
                    <thead>
                      <tr><th>Component</th><th>Amount</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Registration Fee (one-time)</td><td>₹2,000</td></tr>
                      <tr><td>Tuition Fee (per month)</td><td>₹8,000</td></tr>
                      <tr><td>Study Material</td><td>Included</td></tr>
                      <tr><td>Test Series Access</td><td>Included</td></tr>
                      <tr><td>Total (12 months)</td><td><strong>₹98,000</strong></td></tr>
                    </tbody>
                  </table>
                  <p>EMI options available. Scholarships offered to meritorious students. Contact us for details.</p>
                </>
              )}

              {activeTab === 'Start Date' && (
                <>
                  <h3>Upcoming Batch Dates</h3>
                  <table className="course-fee-table">
                    <thead>
                      <tr><th>Batch</th><th>Start Date</th><th>Seats Available</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Batch A (Morning)</td><td>1st July 2025</td><td>12 Seats</td></tr>
                      <tr><td>Batch B (Evening)</td><td>15th July 2025</td><td>18 Seats</td></tr>
                      <tr><td>Batch C (Weekend)</td><td>1st August 2025</td><td>30 Seats</td></tr>
                    </tbody>
                  </table>
                  <p>Seats are limited. Early registration is recommended to secure your preferred batch.</p>
                </>
              )}

              {activeTab === 'How to Apply' && (
                <>
                  <h3>Application Process</h3>
                  <div className="course-steps">
                    {[
                      { title: 'Fill Enquiry Form', desc: 'Submit your details through our online enquiry form or visit our office.' },
                      { title: 'Counselling Session', desc: 'Our team will contact you within 24 hours to schedule a free counselling session.' },
                      { title: 'Document Submission', desc: 'Submit required documents: ID proof, educational certificates, and passport photo.' },
                      { title: 'Fee Payment', desc: 'Pay the registration fee to confirm your seat. EMI options available.' },
                      { title: 'Batch Confirmation', desc: 'Receive your batch schedule, study material, and orientation details.' },
                    ].map((step, i) => (
                      <div key={step.title} className="course-step">
                        <div className="course-step__num">{i + 1}</div>
                        <div className="course-step__text">
                          <strong>{step.title}</strong>
                          <span>{step.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" state={{ course: 'Foundation Program — 1 Year' }} className="btn btn-primary">
                    Apply Now →
                  </Link>
                </>
              )}

            </div>

            {activeTab === 'Overview' && (
              <div className="course-cta">
                <Link to="/contact" state={{ course: 'Foundation Program — 1 Year' }} className="btn btn-primary">Enquire Now →</Link>
                <Link to="/contact" state={{ course: 'Foundation Program — 1 Year' }} className="btn btn-outline">Apply Now</Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="course-sidebar">
            <div className="course-sidebar__card">
              <div className="course-sidebar__head">
                <h4 className="course-sidebar__title">Program Details</h4>
              </div>
              <ul className="course-sidebar__list">
                {SIDEBAR_ITEMS.map((d) => (
                  <li key={d.label}>
                    <span className="course-sidebar__icon">{d.icon}</span>
                    <div>
                      <span className="course-sidebar__label">{d.label}</span>
                      <span className="course-sidebar__value">{d.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="course-sidebar__footer">
                <Link to="/contact" state={{ course: 'Foundation Program — 1 Year' }} className="btn btn-primary">Enroll Now →</Link>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
}
