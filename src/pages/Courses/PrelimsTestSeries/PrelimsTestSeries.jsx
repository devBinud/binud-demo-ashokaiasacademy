import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Clock, Monitor, GraduationCap, BarChart2, CheckCircle } from 'lucide-react';
import '../CoursePage.css';

const SIDEBAR_ITEMS = [
  { label: 'Total Tests', value: '50+ Mock Tests', icon: <ClipboardCheck size={18} strokeWidth={1.8} /> },
  { label: 'Access Period', value: '6 Months', icon: <Clock size={18} strokeWidth={1.8} /> },
  { label: 'Eligibility', value: 'Any UPSC / APSC Aspirant', icon: <GraduationCap size={18} strokeWidth={1.8} /> },
  { label: 'Mode', value: 'Online', icon: <Monitor size={18} strokeWidth={1.8} /> },
  { label: 'Analytics', value: 'Detailed Performance Reports', icon: <BarChart2 size={18} strokeWidth={1.8} /> },
  { label: 'Exams Covered', value: 'UPSC & APSC', icon: <CheckCircle size={18} strokeWidth={1.8} /> },
];

const TABS = ['Overview', 'Eligibility', 'Fees', 'Start Date', 'How to Apply'];

export default function PrelimsTestSeries() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="course-page">
      <div className="course-breadcrumb">
        <div className="container course-breadcrumb__inner">
          <Link to="/" className="course-breadcrumb__link"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</Link>
          <span className="course-breadcrumb__sep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <Link to="/courses" className="course-breadcrumb__link">Courses</Link>
          <span className="course-breadcrumb__sep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <span className="course-breadcrumb__current">Prelims Test Series</span>
        </div>
      </div>

      <div className="course-hero">
        <div className="container">
          <span className="course-hero__tag">Exam Ready</span>
          <h1 className="course-hero__title">Prelims <span className="text-gold">Test Series</span></h1>
          <p className="course-hero__desc">50+ rigorously designed mock tests to sharpen your accuracy, speed, and exam temperament for UPSC & APSC Prelims.</p>
          <div className="course-hero__meta">
            <span className="course-hero__meta-item"><ClipboardCheck size={15} strokeWidth={2} />50+ Tests</span>
            <span className="course-hero__meta-item"><Clock size={15} strokeWidth={2} />6 Months Access</span>
            <span className="course-hero__meta-item"><Monitor size={15} strokeWidth={2} />Online</span>
          </div>
        </div>
      </div>

      <section className="section course-overview">
        <div className="container course-overview__grid">
          <div className="course-overview__content">
            <div className="course-highlights">
              {[{ label: 'Tests', value: '50+' }, { label: 'Access', value: '6 Months' }, { label: 'Mode', value: 'Online' }, { label: 'Exams', value: 'UPSC & APSC' }].map((h) => (
                <div key={h.label} className="course-highlight-item"><span className="course-highlight-value">{h.value}</span><span className="course-highlight-label">{h.label}</span></div>
              ))}
            </div>

            <div className="course-tabs">
              {TABS.map((tab) => (
                <button key={tab} className={`course-tab-btn${activeTab === tab ? ' course-tab-btn--active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
              ))}
            </div>

            <div className="course-tab-content">
              {activeTab === 'Overview' && (
                <>
                  <h3>What's Included</h3>
                  <ul className="course-includes__list">
                    {['30 full-length GS Paper I mock tests', '20+ subject-wise sectional tests', 'CSAT practice tests included', 'Detailed solutions & explanations', 'Performance analytics & rank tracking', 'All-India ranking among test takers', 'Current affairs-based questions', '6-month access to test portal'].map((p) => (
                      <li key={p}><span className="course-check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span>{p}</li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'Eligibility' && (
                <>
                  <h3>Eligibility Criteria</h3>
                  <ul>
                    <li>Any UPSC or APSC aspirant preparing for Prelims</li>
                    <li>No minimum qualification required</li>
                    <li>Suitable for both first-time and repeat aspirants</li>
                    <li>Can be taken alongside any coaching program</li>
                  </ul>
                </>
              )}
              {activeTab === 'Fees' && (
                <>
                  <h3>Fee Structure</h3>
                  <table className="course-fee-table">
                    <thead><tr><th>Component</th><th>Amount</th></tr></thead>
                    <tbody>
                      <tr><td>Full Test Series (50+ tests)</td><td>₹4,999</td></tr>
                      <tr><td>Portal Access</td><td>6 Months</td></tr>
                      <tr><td>Performance Analytics</td><td>Included</td></tr>
                      <tr><td>Total</td><td><strong>₹4,999</strong></td></tr>
                    </tbody>
                  </table>
                  <p>One-time payment. Instant access after payment.</p>
                </>
              )}
              {activeTab === 'Start Date' && (
                <>
                  <h3>Access Details</h3>
                  <table className="course-fee-table">
                    <thead><tr><th>Series</th><th>Available From</th><th>Tests</th></tr></thead>
                    <tbody>
                      <tr><td>UPSC Prelims 2025</td><td>Immediately</td><td>50+ Tests</td></tr>
                      <tr><td>APSC Prelims 2025</td><td>Immediately</td><td>20+ Tests</td></tr>
                    </tbody>
                  </table>
                  <p>Access starts immediately after enrollment. Valid for 6 months.</p>
                </>
              )}
              {activeTab === 'How to Apply' && (
                <>
                  <h3>Application Process</h3>
                  <div className="course-steps">
                    {[
                      { title: 'Register Online', desc: 'Fill the enquiry form or contact us directly.' },
                      { title: 'Make Payment', desc: 'Pay the test series fee online or at our office.' },
                      { title: 'Get Access', desc: 'Receive your portal login credentials within 2 hours.' },
                      { title: 'Start Practicing', desc: 'Begin with any test at your own pace.' },
                    ].map((step, i) => (
                      <div key={step.title} className="course-step">
                        <div className="course-step__num">{i + 1}</div>
                        <div className="course-step__text"><strong>{step.title}</strong><span>{step.desc}</span></div>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" state={{ course: 'Prelims Test Series' }} className="btn btn-primary">Apply Now →</Link>
                </>
              )}
            </div>

            {activeTab === 'Overview' && (
              <div className="course-cta">
                <Link to="/contact" state={{ course: 'Prelims Test Series' }} className="btn btn-primary">Enquire Now →</Link>
                <Link to="/contact" state={{ course: 'Prelims Test Series' }} className="btn btn-outline">Apply Now</Link>
              </div>
            )}
          </div>

          <aside className="course-sidebar">
            <div className="course-sidebar__card">
              <div className="course-sidebar__head"><h4 className="course-sidebar__title">Program Details</h4></div>
              <ul className="course-sidebar__list">
                {SIDEBAR_ITEMS.map((d) => (<li key={d.label}><span className="course-sidebar__icon">{d.icon}</span><div><span className="course-sidebar__label">{d.label}</span><span className="course-sidebar__value">{d.value}</span></div></li>))}
              </ul>
              <div className="course-sidebar__footer"><Link to="/contact" state={{ course: 'Prelims Test Series' }} className="btn btn-primary">Enroll Now →</Link></div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
