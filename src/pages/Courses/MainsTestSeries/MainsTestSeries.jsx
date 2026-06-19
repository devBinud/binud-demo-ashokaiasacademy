import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Pencil, Globe, GraduationCap, BookOpen, CheckCircle } from 'lucide-react';
import SEO from '../../../components/common/SEO';
import '../CoursePage.css';

const SIDEBAR_ITEMS = [
  { label: 'Total Tests', value: '20+ Mock Tests', icon: <ClipboardCheck size={18} strokeWidth={1.8} /> },
  { label: 'Evaluation', value: 'Expert Faculty Review', icon: <Pencil size={18} strokeWidth={1.8} /> },
  { label: 'Eligibility', value: 'Prelims Cleared / Aspirants', icon: <GraduationCap size={18} strokeWidth={1.8} /> },
  { label: 'Mode', value: 'Offline + Online', icon: <Globe size={18} strokeWidth={1.8} /> },
  { label: 'Study Material', value: 'Model Answers + Feedback', icon: <BookOpen size={18} strokeWidth={1.8} /> },
  { label: 'Exams Covered', value: 'UPSC & APSC', icon: <CheckCircle size={18} strokeWidth={1.8} /> },
];

const TABS = ['Overview', 'Eligibility', 'Fees', 'Start Date', 'How to Apply'];

export default function MainsTestSeries() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="course-page">
      <SEO 
        title="UPSC & APSC Mains Test Series"
        description="Improve your answer writing with our Mains Test Series. Get detailed evaluations, model answers, and expert feedback from civil services mentors."
      />
      <div className="course-breadcrumb">
        <div className="container course-breadcrumb__inner">
          <Link to="/" className="course-breadcrumb__link"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</Link>
          <span className="course-breadcrumb__sep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <Link to="/courses" className="course-breadcrumb__link">Courses</Link>
          <span className="course-breadcrumb__sep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <span className="course-breadcrumb__current">Mains Test Series</span>
        </div>
      </div>

      <div className="course-hero">
        <div className="container">
          <span className="course-hero__tag">Advanced</span>
          <h1 className="course-hero__title">Mains <span className="text-gold">Test Series</span></h1>
          <p className="course-hero__desc">20+ comprehensive Mains mock tests with expert evaluation to help you master answer writing and score high in UPSC & APSC Mains.</p>
          <div className="course-hero__meta">
            <span className="course-hero__meta-item"><ClipboardCheck size={15} strokeWidth={2} />20+ Tests</span>
            <span className="course-hero__meta-item"><Pencil size={15} strokeWidth={2} />Expert Evaluation</span>
            <span className="course-hero__meta-item"><Globe size={15} strokeWidth={2} />Offline + Online</span>
          </div>
        </div>
      </div>

      <section className="section course-overview">
        <div className="container course-overview__grid">
          <div className="course-overview__content">
            <div className="course-highlights">
              {[{ label: 'Tests', value: '20+' }, { label: 'Evaluation', value: 'Expert' }, { label: 'Mode', value: 'Offline / Online' }, { label: 'Exams', value: 'UPSC & APSC' }].map((h) => (
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
                    {['20+ full-length GS Paper 1–4 tests', 'Essay paper mock tests', 'Personalised answer sheet evaluation', 'Detailed written feedback from faculty', 'Model answers & topper copies', 'Score improvement tracking', 'Discussion sessions after each test', 'Optional Essay & Ethics workshops'].map((p) => (
                      <li key={p}><span className="course-check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span>{p}</li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'Eligibility' && (
                <>
                  <h3>Eligibility Criteria</h3>
                  <ul>
                    <li>Aspirants who have cleared or are preparing for UPSC / APSC Mains</li>
                    <li>Students enrolled in Foundation Programs can also join</li>
                    <li>No minimum qualification — open to all serious aspirants</li>
                    <li>Basic answer writing skills recommended</li>
                  </ul>
                </>
              )}
              {activeTab === 'Fees' && (
                <>
                  <h3>Fee Structure</h3>
                  <table className="course-fee-table">
                    <thead><tr><th>Component</th><th>Amount</th></tr></thead>
                    <tbody>
                      <tr><td>Full Mains Test Series</td><td>₹9,999</td></tr>
                      <tr><td>Answer Evaluation (per test)</td><td>Included</td></tr>
                      <tr><td>Model Answers & Feedback</td><td>Included</td></tr>
                      <tr><td>Total</td><td><strong>₹9,999</strong></td></tr>
                    </tbody>
                  </table>
                  <p>Includes personalised evaluation for all 20+ tests.</p>
                </>
              )}
              {activeTab === 'Start Date' && (
                <>
                  <h3>Upcoming Batch Dates</h3>
                  <table className="course-fee-table">
                    <thead><tr><th>Series</th><th>Start Date</th><th>Tests</th></tr></thead>
                    <tbody>
                      <tr><td>UPSC Mains 2025</td><td>1st August 2025</td><td>20+ Tests</td></tr>
                      <tr><td>APSC Mains 2025</td><td>15th August 2025</td><td>10+ Tests</td></tr>
                    </tbody>
                  </table>
                  <p>Tests are scheduled weekly. Flexible submission deadlines available.</p>
                </>
              )}
              {activeTab === 'How to Apply' && (
                <>
                  <h3>Application Process</h3>
                  <div className="course-steps">
                    {[
                      { title: 'Fill Enquiry Form', desc: 'Submit your details through our online enquiry form.' },
                      { title: 'Counselling Call', desc: 'Our team will guide you on the test schedule.' },
                      { title: 'Fee Payment', desc: 'Pay the test series fee to confirm enrollment.' },
                      { title: 'Receive Schedule', desc: 'Get your test schedule and submission guidelines.' },
                      { title: 'Start Writing', desc: 'Submit answers and receive expert feedback within 5 days.' },
                    ].map((step, i) => (
                      <div key={step.title} className="course-step">
                        <div className="course-step__num">{i + 1}</div>
                        <div className="course-step__text"><strong>{step.title}</strong><span>{step.desc}</span></div>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" state={{ course: 'Mains Test Series' }} className="btn btn-primary">Apply Now →</Link>
                </>
              )}
            </div>

            {activeTab === 'Overview' && (
              <div className="course-cta">
                <Link to="/contact" state={{ course: 'Mains Test Series' }} className="btn btn-primary">Enquire Now →</Link>
                <Link to="/contact" state={{ course: 'Mains Test Series' }} className="btn btn-outline">Apply Now</Link>
              </div>
            )}
          </div>

          <aside className="course-sidebar">
            <div className="course-sidebar__card">
              <div className="course-sidebar__head"><h4 className="course-sidebar__title">Program Details</h4></div>
              <ul className="course-sidebar__list">
                {SIDEBAR_ITEMS.map((d) => (<li key={d.label}><span className="course-sidebar__icon">{d.icon}</span><div><span className="course-sidebar__label">{d.label}</span><span className="course-sidebar__value">{d.value}</span></div></li>))}
              </ul>
              <div className="course-sidebar__footer"><Link to="/contact" state={{ course: 'Mains Test Series' }} className="btn btn-primary">Enroll Now →</Link></div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
