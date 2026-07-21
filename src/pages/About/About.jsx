import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import './About.css';
import CtaSection from '../Home/sections/CtaSection';

const WHY_POINTS = [
  { num: '01', title: 'Result-Oriented Approach', desc: 'Focused preparation strategy aligned with UPSC & APSC trends to maximize success rate.' },
  { num: '02', title: 'Structured & Integrated Courses', desc: 'Foundation + Advanced + Test Series + Mentorship — all in one ecosystem.' },
  { num: '03', title: 'Expert Faculty & Mentorship', desc: 'Learn from experienced educators with personalized guidance at every step.' },
  { num: '04', title: 'Daily Answer Writing Practice', desc: 'Build the most important skill for Mains with continuous evaluation & feedback.' },
  { num: '05', title: 'Current Affairs Mastery', desc: 'Daily analysis, monthly magazines, and exam-focused coverage.' },
  { num: '06', title: 'Performance Tracking System', desc: 'Regular tests, analytics, and improvement plans for every student.' },
  { num: '07', title: 'Holistic Development', desc: 'Personality development, interview guidance, and communication training.' },
  { num: '08', title: 'Affordable Fee Structure', desc: 'Premium coaching at a cost that remains accessible for all aspirants.' },
];

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#founders-vision') {
      const el = document.getElementById('founders-vision');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <div className="about-page">
      <SEO 
        title="About Us | Mission, Vision & Profile"
        description="Learn about the mission, vision, values, and institutional profile of Ashoka IAS Academy. Established in 2021, we are dedicated to helping UPSC & APSC aspirants achieve success."
      />

      {/* ── Page Header ── */}
      <PageHeader 
        title="About Us"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About Us' }
        ]}
      />

      {/* ── Main Content Section ── */}
      <section className="section about-content">
        <div className="container">
          <div className="about-grid">

            {/* Left Column: Core Overview Card */}
            <div className="about-text-card">
              <span className="about-sublabel">WHO WE ARE</span>
              <h2 className="about-heading">Ashoka IAS Academy</h2>
              <div className="about-accent-line" />

              <div className="about-paragraphs">
                <p>
                  Ashoka IAS Academy is a premier institute dedicated to shaping the next generation of civil servants and professionals. Founded on the principles of quality education, discipline, and mentorship, the academy has emerged as a trusted destination for aspirants preparing for <strong>UPSC, APSC, SSC, Banking, and Defence</strong> examinations.
                </p>
                <p>
                  At Ashoka IAS Academy, learning goes beyond conventional classroom coaching. The institute focuses on building strong conceptual clarity, consistent answer-writing practice, current affairs mastery, and personality development to prepare students for every stage of competitive examinations.
                </p>
                <p>
                  With a student-centric approach, structured programs, and continuous mentorship, the academy ensures that every aspirant receives the right guidance at the right time.
                </p>
                <p>
                  Since its inception in 2021, Ashoka IAS Academy has delivered remarkable results — producing successful candidates in various competitive examinations. In its very first year, the academy achieved outstanding success with <strong>ACS Rank 9 and APS Rank 3</strong>, followed by <strong>ACS Rank 24 and Rank 54</strong> in subsequent years. With over <strong>120+ officers produced</strong> across different fields, the academy continues to inspire and empower aspirants to achieve excellence.
                </p>
                <p>
                  At Ashoka IAS Academy, the mission is not just to teach subjects, but to build confidence, leadership, discipline, and a purpose-driven mindset that leads students toward success and service to the nation.
                </p>
              </div>
            </div>

            {/* Right Column: Quote + Results Card Showcase */}
            <div className="about-side-panel">
              
              {/* Highlight Quote Box */}
              <div className="about-quote-box">
                <div className="about-quote-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p>"Transforming your dreams into reality."</p>
                <span>— Ashoka IAS Academy</span>
              </div>

              {/* Outstanding Results Card */}
              <div className="about-results-card">
                <div className="about-results-header">
                  <h3>Our Key Milestones & Ranks</h3>
                  <p>Inception Year & Recent Achievements</p>
                </div>
                <div className="about-results-list">
                  <div className="about-result-row">
                    <div className="result-badge-col">
                      <span className="result-rank-badge">APS Rank 3</span>
                    </div>
                    <span className="result-year-label">1st Year</span>
                  </div>

                  <div className="about-result-row">
                    <div className="result-badge-col">
                      <span className="result-rank-badge">ACS Rank 9</span>
                    </div>
                    <span className="result-year-label">1st Year</span>
                  </div>

                  <div className="about-result-row">
                    <div className="result-badge-col">
                      <span className="result-rank-badge">ACS Rank 24</span>
                    </div>
                    <span className="result-year-label">Subsequent Year</span>
                  </div>

                  <div className="about-result-row">
                    <div className="result-badge-col">
                      <span className="result-rank-badge">ACS Rank 54</span>
                    </div>
                    <span className="result-year-label">Subsequent Year</span>
                  </div>

                  <div className="about-result-row total-officers-row">
                    <div className="result-badge-col">
                      <span className="result-rank-badge gold-badge">120+ Officers</span>
                    </div>
                    <span className="result-year-label">Across Various Services</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Why Ashoka ── */}
      <section className="section about-why">
        <div className="container">
          <div className="about-why__header">
            <span className="about-sublabel">WHY CHOOSE US</span>
            <h2 className="about-heading" style={{ textAlign: 'center' }}>Why Ashoka IAS Academy?</h2>
            <div className="about-accent-line" style={{ margin: '0 auto 1.5rem auto' }} />
            <p className="about-why__sub">Your Success is Our Commitment</p>
          </div>

          <div className="about-why__grid">
            {WHY_POINTS.map((p) => (
              <div key={p.num} className="about-why-card">
                <span className="about-why-card__num">{p.num}</span>
                <h3 className="about-why-card__title">{p.title}</h3>
                <p className="about-why-card__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common CTA Section  */}
      <CtaSection />

    </div>
  );
}
