import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
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

const STATS = [
  { value: '120+', label: 'Officers Produced' },
  { value: '500+', label: 'Students Enrolled' },
  { value: 'ACS 9', label: 'Top Rank' },
  { value: '2021', label: 'Est. Year' },
];

export default function About() {
  return (
    <div className="about-page">
      <SEO 
        title="About Us | Mission, Vision & Profile"
        description="Learn about the mission, vision, values, and institutional profile of Ashoka IAS Academy. Established in 2021, we are dedicated to helping UPSC & APSC aspirants achieve success."
      />

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div className="about-hero__content">
            <span className="section-label">About Us</span>
            <h1 className="about-hero__title">
              Building Future Civil Servants
              & Leaders
            </h1>
            <p className="about-hero__desc">
              Ashoka IAS Academy is a premier institute dedicated to shaping the next generation
              of civil servants and professionals. Founded on the principles of quality education,
              discipline, and mentorship.
            </p>
            <div className="about-hero__actions">
              <Link to="/contact" className="btn btn-gold">Apply Now →</Link>
            </div>
          </div>
          {/* Stats */}
          <div className="about-hero__stats">
            {STATS.map((s) => (
              <div key={s.label} className="about-hero__stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Content ── */}
      <section className="section about-content">
        <div className="container about-content__grid">

          {/* Left */}
          <div className="about-content__left">
            <span className="section-label">Who We Are</span>
            <h2 className="about-content__title">Ashoka IAS Academy</h2>
            <div className="divider-gold" />
            <p>
              Ashoka IAS Academy is a premier institute dedicated to shaping the next generation of civil servants
              and professionals. Founded on the principles of quality education, discipline, and mentorship, the
              academy has emerged as a trusted destination for aspirants preparing for <strong>UPSC, APSC, SSC,
                Banking, and Defence</strong> examinations.
            </p>
            <p>
              At Ashoka IAS Academy, learning goes beyond conventional classroom coaching. The institute focuses on
              building strong conceptual clarity, consistent answer-writing practice, current affairs mastery, and
              personality development to prepare students for every stage of competitive examinations.
            </p>
            <p>
              With a student-centric approach, structured programs, and continuous mentorship, the academy ensures
              that every aspirant receives the right guidance at the right time.
            </p>
            <p>
              Since its inception in 2021, Ashoka IAS Academy has delivered remarkable results — producing successful
              candidates in various competitive examinations. In its very first year, the academy achieved outstanding
              success with <strong>ACS Rank 9 and APS Rank 3</strong>, followed by ACS Rank 24 and Rank 54 in
              subsequent years. With more than <strong>120+ officers produced</strong> across different fields, the
              academy continues to inspire and empower aspirants to achieve excellence.
            </p>
            <p>
              At Ashoka IAS Academy, the mission is not just to teach subjects, but to build confidence, leadership,
              discipline, and a purpose-driven mindset that leads students toward success and service to the nation.
            </p>
          </div>

          {/* Right — Quote + Stats */}
          <div className="about-content__right">
            <div className="about-quote">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-gold)', opacity: 0.4 }}>
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p>Transforming your dreams into reality</p>
              <span>— Ashoka IAS Academy</span>
            </div>

            <div className="about-results">
              <h4 className="about-results__title">Our Results</h4>
              <div className="about-results__list">
                <div className="about-result-item">
                  <span className="about-result-item__rank">APS Rank 3</span>
                  <span className="about-result-item__year">1st Year</span>
                </div>

                <div className="about-result-item">
                  <span className="about-result-item__rank">ACS Rank 9</span>
                  <span className="about-result-item__year">1st Year</span>
                </div>

                <div className="about-result-item">
                  <span className="about-result-item__rank">ACS Rank 24</span>
                  <span className="about-result-item__year">Subsequent Year</span>
                </div>
                <div className="about-result-item">
                  <span className="about-result-item__rank">ACS Rank 54</span>
                  <span className="about-result-item__year">Subsequent Year</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Founder's Vision ── */}
      <section className="section about-founder">
        <div className="container about-founder__grid">

          <div className="about-founder__badge">
            <div className="about-founder__badge-inner">
              <span className="about-founder__badge-label">Founder's</span>
              <span className="about-founder__badge-word">Vision</span>
            </div>
          </div>

          <div className="about-founder__content">
            <span className="section-label">Our Foundation</span>
            <h2 className="about-founder__title">Founder's Vision</h2>
            <div className="divider-gold" />
            <p>
              Ashoka IAS Academy was born from a simple yet powerful vision — to bridge the gap between
              aspiration and opportunity for students, especially from regions where access to quality
              guidance has traditionally been limited.
            </p>
            <p>
              The founder envisioned an institution that would not only prepare students for exams but also
              empower them with the confidence, awareness, and skills required to succeed in life. Having
              closely observed the struggles of aspirants — lack of direction, inconsistency, and limited
              mentorship — the idea was to create a platform that offers clarity, structure, and continuous support.
            </p>
            <p>
              Starting with a small setup and a big dream, Ashoka IAS Academy has grown through dedication,
              trust, and consistent results. Today, the academy stands as more than just a coaching institute —
              it is a movement towards empowering youth, nurturing leadership, and contributing to nation-building.
            </p>
            <blockquote className="about-founder__quote">
              "Every student deserves the right guidance to succeed."
            </blockquote>
            <p>
              The vision ahead is clear: To build a comprehensive learning ecosystem that integrates coaching,
              higher education, skill development, and personality transformation — creating not just successful
              candidates, but responsible citizens and future leaders.
            </p>
          </div>

        </div>
      </section>

      {/* ── Why Ashoka ── */}
      <section className="section about-why">
        <div className="container">
          <div className="about-why__header">
            <span className="section-label">Why Choose Us</span>
            <h2 className="about-why__title">
              Why Ashoka IAS Academy?
            </h2>
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
