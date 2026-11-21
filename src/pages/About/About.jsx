import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import CtaSection from '../Home/sections/CtaSection';
import introImg from '../../assets/images/gallery/classroom/3.jpeg';
import './About.css';

const RESULTS = [
  { value: 'Rank 3', label: 'APS', note: 'First year' },
  { value: 'Rank 9', label: 'ACS', note: 'First year' },
  { value: 'Rank 24', label: 'ACS', note: 'Subsequent year' },
  { value: 'Rank 54', label: 'ACS', note: 'Subsequent year' },
  { value: '120+', label: 'Officers', note: 'Across various services' },
];

const WHY_POINTS = [
  { icon: 'fa-solid fa-bullseye', title: 'Result-Oriented Approach', desc: 'Focused preparation strategy aligned with UPSC & APSC trends to maximize success rate.' },
  { icon: 'fa-solid fa-layer-group', title: 'Structured & Integrated Courses', desc: 'Foundation + Advanced + Test Series + Mentorship — all in one ecosystem.' },
  { icon: 'fa-solid fa-chalkboard-user', title: 'Expert Faculty & Mentorship', desc: 'Learn from experienced educators with personalized guidance at every step.' },
  { icon: 'fa-solid fa-pen-nib', title: 'Daily Answer Writing Practice', desc: 'Build the most important skill for Mains with continuous evaluation & feedback.' },
  { icon: 'fa-solid fa-newspaper', title: 'Current Affairs Mastery', desc: 'Daily analysis, monthly magazines, and exam-focused coverage.' },
  { icon: 'fa-solid fa-chart-line', title: 'Performance Tracking System', desc: 'Regular tests, analytics, and improvement plans for every student.' },
  { icon: 'fa-solid fa-user-tie', title: 'Holistic Development', desc: 'Personality development, interview guidance, and communication training.' },
  { icon: 'fa-solid fa-indian-rupee-sign', title: 'Affordable Fee Structure', desc: 'Premium coaching at a cost that remains accessible for all aspirants.' },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

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

      <PageHeader
        title="About Us"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About Us' },
        ]}
      />

      {/* ── Who we are ── */}
      <section className="about-intro">
        <div className="container about-intro__grid">
          <div className="about-intro__text">
            <h2 className="about-title">
              Shaping the next generation of <span>civil servants</span>
            </h2>
            <p>
              Ashoka IAS Academy is a premier institute founded on the principles of quality
              education, discipline and mentorship. It has emerged as a trusted destination for
              aspirants preparing for <strong>UPSC, APSC, SSC, Banking and Defence</strong> examinations.
            </p>
            <p>
              Learning here goes beyond conventional classroom coaching. We focus on strong
              conceptual clarity, consistent answer-writing practice, current affairs mastery and
              personality development to prepare students for every stage of competitive examinations.
            </p>
            <p>
              With a student-centric approach, structured programmes and continuous mentorship, every
              aspirant receives the right guidance at the right time.
            </p>

            <div className="about-intro__actions">
              <Link to="/online-application" className="about-btn about-btn--primary">
                Apply Now <Arrow />
              </Link>
              <Link to="/courses-all" className="about-btn about-btn--ghost">
                Explore Courses
              </Link>
            </div>
          </div>

          <div className="about-intro__media">
            <img src={introImg} alt="Students writing a test at Ashoka IAS Academy" loading="lazy" />
            <div className="about-intro__badge">
              <strong>2021</strong>
              <span>Established</span>
            </div>
            <figure className="about-intro__quote">
              <i className="fa-solid fa-quote-left" aria-hidden="true" />
              <blockquote>Transforming your dreams into reality.</blockquote>
              <figcaption>Ashoka IAS Academy</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Track record ── */}
      <section className="about-results">
        <div className="container">
          <div className="about-results__head">
            <h2 className="about-title about-title--light">Results that speak for themselves</h2>
            <p>
              Since our inception in 2021, our students have secured top ranks in the Assam Civil
              Services, with over 120 officers produced across different fields.
            </p>
          </div>

          <div className="about-results__grid">
            {RESULTS.map((r) => (
              <div key={`${r.label}-${r.value}`} className="about-result">
                <span className="about-result__label">{r.label}</span>
                <strong className="about-result__value">{r.value}</strong>
                <span className="about-result__note">{r.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Ashoka + Mission ── */}
      <section className="about-why">
        <div className="container about-why__layout">
          <div className="about-why__intro">
            <h2 className="about-title">
              Why <span>Ashoka IAS Academy?</span>
            </h2>
            <p className="about-why__lead">
              Everything an aspirant needs to prepare with confidence, from the first concept to
              the final interview, under one roof.
            </p>

            <div className="about-mission">
              <span className="about-mission__icon"><i className="fa-solid fa-flag" aria-hidden="true" /></span>
              <span className="about-mission__label">Our Mission</span>
              <p>
                Not just to teach subjects, but to build confidence, leadership, discipline and a
                purpose-driven mindset that leads students toward success and service to the nation.
              </p>
            </div>
          </div>

          <div className="about-why__grid">
            {WHY_POINTS.map((p) => (
              <div key={p.title} className="about-why-item">
                <span className="about-why-item__icon"><i className={p.icon} aria-hidden="true" /></span>
                <div>
                  <h3 className="about-why-item__title">{p.title}</h3>
                  <p className="about-why-item__desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
