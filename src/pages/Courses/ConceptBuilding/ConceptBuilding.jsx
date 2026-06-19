import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Monitor, GraduationCap, BookOpen, CheckCircle } from 'lucide-react';
import SEO from '../../../components/common/SEO';
import '../CoursePage.css';

const SIDEBAR_ITEMS = [
  { label: 'Duration', value: '3 Months', icon: <Calendar size={18} strokeWidth={1.8} /> },
  { label: 'Eligibility', value: 'Any Graduate / Student', icon: <GraduationCap size={18} strokeWidth={1.8} /> },
  { label: 'Mode', value: 'Online (Live + Recorded)', icon: <Monitor size={18} strokeWidth={1.8} /> },
  { label: 'Batch Size', value: 'Max 40 Students', icon: <Users size={18} strokeWidth={1.8} /> },
  { label: 'Study Material', value: 'Digital Notes & PDFs', icon: <BookOpen size={18} strokeWidth={1.8} /> },
  { label: 'Exams Covered', value: 'UPSC & APSC', icon: <CheckCircle size={18} strokeWidth={1.8} /> },
];

const TABS = ['Overview', 'Eligibility', 'Fees', 'Start Date', 'How to Apply'];

export default function ConceptBuilding() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="course-page">
      <SEO 
        title="Concept-Building & NCERT Course"
        description="Strengthen your fundamentals with our Class 6-12 NCERT-focused concept-building course designed specifically for Civil Services aspirants."
      />
      <div className="course-breadcrumb">
        <div className="container course-breadcrumb__inner">
          <Link to="/" className="course-breadcrumb__link"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</Link>
          <span className="course-breadcrumb__sep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <Link to="/courses" className="course-breadcrumb__link">Courses</Link>
          <span className="course-breadcrumb__sep"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <span className="course-breadcrumb__current">Concept-Building Courses</span>
        </div>
      </div>

      <div className="course-hero">
        <div className="container">
          <span className="course-hero__tag">Beginner Friendly</span>
          <h1 className="course-hero__title">Concept-Building <span className="text-gold">Courses</span></h1>
          <p className="course-hero__desc">Master NCERT fundamentals and core concepts — the essential first step for every serious UPSC & APSC aspirant.</p>
          <div className="course-hero__meta">
            <span className="course-hero__meta-item"><Calendar size={15} strokeWidth={2} />3 Months</span>
            <span className="course-hero__meta-item"><Users size={15} strokeWidth={2} />Max 40 Students</span>
            <span className="course-hero__meta-item"><Monitor size={15} strokeWidth={2} />Online</span>
          </div>
        </div>
      </div>

      <section className="section course-overview">
        <div className="container course-overview__grid">
          <div className="course-overview__content">
            <div className="course-highlights">
              {[{ label: 'Duration', value: '3 Months' }, { label: 'Mode', value: 'Online' }, { label: 'Batch Size', value: '40 Seats' }, { label: 'Level', value: 'Beginner' }].map((h) => (
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
                    {['NCERT Class 6–12 complete coverage', 'History, Geography, Polity & Economy basics', 'Science & Environment fundamentals', 'Concept maps & visual summaries', 'Weekly concept-check quizzes', 'Recorded sessions for flexible learning', 'Doubt clearing via live Q&A sessions', 'Transition guidance to Foundation Program'].map((p) => (
                      <li key={p}><span className="course-check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span>{p}</li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'Eligibility' && (
                <>
                  <h3>Eligibility Criteria</h3>
                  <ul>
                    <li>Any student or graduate aspiring for UPSC / APSC</li>
                    <li>No minimum qualification required — open to all</li>
                    <li>Ideal for fresh aspirants with no prior preparation</li>
                    <li>Students in Class 12 or above can also enroll</li>
                  </ul>
                </>
              )}
              {activeTab === 'Fees' && (
                <>
                  <h3>Fee Structure</h3>
                  <table className="course-fee-table">
                    <thead><tr><th>Component</th><th>Amount</th></tr></thead>
                    <tbody>
                      <tr><td>Registration Fee (one-time)</td><td>₹500</td></tr>
                      <tr><td>Course Fee</td><td>₹12,000</td></tr>
                      <tr><td>Digital Study Material</td><td>Included</td></tr>
                      <tr><td>Total</td><td><strong>₹12,500</strong></td></tr>
                    </tbody>
                  </table>
                  <p>One-time payment. No hidden charges.</p>
                </>
              )}
              {activeTab === 'Start Date' && (
                <>
                  <h3>Upcoming Batch Dates</h3>
                  <table className="course-fee-table">
                    <thead><tr><th>Batch</th><th>Start Date</th><th>Seats Available</th></tr></thead>
                    <tbody>
                      <tr><td>Online Batch A</td><td>15th June 2025</td><td>20 Seats</td></tr>
                      <tr><td>Online Batch B</td><td>1st July 2025</td><td>40 Seats</td></tr>
                    </tbody>
                  </table>
                  <p>Classes are conducted online via live sessions with recorded backups.</p>
                </>
              )}
              {activeTab === 'How to Apply' && (
                <>
                  <h3>Application Process</h3>
                  <div className="course-steps">
                    {[
                      { title: 'Fill Enquiry Form', desc: 'Submit your details through our online enquiry form.' },
                      { title: 'Counselling Call', desc: 'Our team will call you within 24 hours to guide you.' },
                      { title: 'Fee Payment', desc: 'Pay the course fee online or at our office.' },
                      { title: 'Access Granted', desc: 'Receive login credentials and study material within 24 hours.' },
                    ].map((step, i) => (
                      <div key={step.title} className="course-step">
                        <div className="course-step__num">{i + 1}</div>
                        <div className="course-step__text"><strong>{step.title}</strong><span>{step.desc}</span></div>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" state={{ course: 'Concept-Building Courses' }} className="btn btn-primary">Apply Now →</Link>
                </>
              )}
            </div>

            {activeTab === 'Overview' && (
              <div className="course-cta">
                <Link to="/contact" state={{ course: 'Concept-Building Courses' }} className="btn btn-primary">Enquire Now →</Link>
                <Link to="/contact" state={{ course: 'Concept-Building Courses' }} className="btn btn-outline">Apply Now</Link>
              </div>
            )}
          </div>

          <aside className="course-sidebar">
            <div className="course-sidebar__card">
              <div className="course-sidebar__head"><h4 className="course-sidebar__title">Program Details</h4></div>
              <ul className="course-sidebar__list">
                {SIDEBAR_ITEMS.map((d) => (<li key={d.label}><span className="course-sidebar__icon">{d.icon}</span><div><span className="course-sidebar__label">{d.label}</span><span className="course-sidebar__value">{d.value}</span></div></li>))}
              </ul>
              <div className="course-sidebar__footer"><Link to="/contact" state={{ course: 'Concept-Building Courses' }} className="btn btn-primary">Enroll Now →</Link></div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
