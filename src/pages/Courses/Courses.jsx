import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Courses.css';

const CATEGORIES = [
  {
    id: 'foundation',
    title: 'Foundation Programs',
    subtitle: 'Integrated 1-Year & 2-Year',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    tag: 'Most Popular',
    heading: 'Foundation Programs',
    desc: 'Our flagship Foundation Programs are designed to take you from the basics to exam-readiness in a structured, mentor-guided environment. Choose between the 1-Year or 2-Year integrated batch based on your timeline and preparation level.',
    points: [
      'Complete GS Paper 1–4 coverage',
      'Weekly Prelims & Mains mock tests',
      'Answer writing practice with expert feedback',
      'Current affairs daily sessions',
      'Interview guidance & personality development',
      'Doubt clearing & one-on-one mentorship',
    ],
    highlights: [
      { label: 'Duration', value: '1 or 2 Years' },
      { label: 'Mode', value: 'Offline / Online' },
      { label: 'Batch Size', value: 'Limited 30 Seats' },
      { label: 'Exams', value: 'UPSC & APSC' },
    ],
    color: '#B8922A',
  },
  {
    id: 'concept',
    title: 'Concept-Building Courses',
    subtitle: 'NCERT & Other Concepts',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    tag: 'Beginner Friendly',
    heading: 'Concept-Building Courses',
    desc: 'Build a rock-solid conceptual foundation with our NCERT and subject-specific courses. Ideal for fresh aspirants or those who want to strengthen their fundamentals before joining a full program.',
    points: [
      'Class 6–12 NCERT coverage mapped to UPSC syllabus',
      'Topic-wise concept maps & notes',
      'Practice questions after every chapter',
      'Weekly doubt-clearing sessions',
      'Printed + digital study material',
      'Flexible online schedule',
    ],
    highlights: [
      { label: 'Duration', value: '3 Months' },
      { label: 'Mode', value: 'Online' },
      { label: 'Batch Size', value: 'Open Batch' },
      { label: 'Material', value: 'Printed + Digital' },
    ],
    color: '#B8922A',
  },
  {
    id: 'test-series',
    title: 'Test Series',
    subtitle: 'Prelims & Mains',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    tag: 'Exam Ready',
    heading: 'Test Series',
    desc: 'Sharpen your exam strategy with our comprehensive Prelims and Mains test series. Each test is modeled on the actual UPSC & APSC pattern, followed by detailed solution discussions and performance analysis.',
    points: [
      '50+ full-length Prelims mock tests',
      '20+ Mains answer writing tests',
      'Detailed solution discussion after every test',
      'Subject-wise performance analysis',
      'All-India rank tracking',
      'Previous year paper integration',
    ],
    highlights: [
      { label: 'Prelims Tests', value: '50+' },
      { label: 'Mains Tests', value: '20+' },
      { label: 'Mode', value: 'Online' },
      { label: 'Access', value: '1 Year Portal' },
    ],
    color: '#B8922A',
  },
];

export default function Courses() {
  const location = useLocation();
  const [activeId, setActiveId] = useState('foundation');

  useEffect(() => {
    if (location.state?.courseId) {
      if (location.state.courseId.startsWith('foundation')) setActiveId('foundation');
      else if (location.state.courseId.startsWith('concept'))  setActiveId('concept');
      else if (location.state.courseId.startsWith('test'))     setActiveId('test-series');
    }
  }, [location.state]);

  const active = CATEGORIES.find((c) => c.id === activeId);

  return (
    <div className="courses-page">

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Our Programs</span>
          <h1 className="page-hero__title">
            Choose Your Path to <span className="text-gold">Success</span>
          </h1>
          <div className="divider-gold" />
          <p className="page-hero__desc">
            Tailored programs for every stage of your civil services journey —
            from foundation to final selection.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="section courses-main">
        <div className="container courses-main__layout">

          {/* LEFT — 3 category tabs */}
          <aside className="courses-sidebar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`courses-tab${activeId === cat.id ? ' courses-tab--active' : ''}`}
                onClick={() => setActiveId(cat.id)}
              >
                {/* Icon */}
                <div className="courses-tab__icon">
                  {cat.icon}
                </div>
                {/* Text */}
                <div className="courses-tab__text">
                  <span className="courses-tab__title">{cat.title}</span>
                  <span className="courses-tab__sub">{cat.subtitle}</span>
                </div>
              </button>
            ))}
          </aside>

          {/* RIGHT — Active category detail */}
          <div className="courses-detail" key={active.id}>
            <div className="courses-detail__bar" style={{ background: active.color }} />
            <div className="courses-detail__body">

              {/* Header */}
              <div>
                <span className="courses-detail__tag">{active.tag}</span>
                <h2 className="courses-detail__title">{active.heading}</h2>
                <p className="courses-detail__desc">{active.desc}</p>
              </div>

              {/* Highlights */}
              <div className="courses-detail__highlights">
                {active.highlights.map((h) => (
                  <div key={h.label} className="courses-detail__highlight-item">
                    <span className="courses-detail__highlight-value" style={{ color: active.color }}>
                      {h.value}
                    </span>
                    <span className="courses-detail__highlight-label">{h.label}</span>
                  </div>
                ))}
              </div>

              {/* Points */}
              <div className="courses-detail__points-section">
                <h4 className="courses-detail__points-title">What's Included</h4>
                <ul className="courses-detail__points">
                  {active.points.map((p) => (
                    <li key={p}>
                      <span className="courses-detail__check" style={{ background: `${active.color}18`, color: active.color }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="courses-detail__cta">
                <Link to="/contact" state={{ course: active.heading }} className="btn btn-primary">
                  Enquire Now →
                </Link>
                <Link to="/contact" state={{ course: active.heading }} className="btn btn-outline">
                  Apply Now
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section courses-cta">
        <div className="container courses-cta__inner">
          <h2>Not Sure Which Course to <span className="text-gold">Choose?</span></h2>
          <p>Talk to our counselors and get personalized guidance for your preparation journey.</p>
          <Link to="/contact" className="btn btn-primary">Talk to a Counselor</Link>
        </div>
      </section>

    </div>
  );
}
