import { Link } from 'react-router-dom';
import './CoursesSection.css';

const COURSES = [
  {
    id: 'foundation-1yr',
    title: 'Foundation Programs',
    subtitle: 'Integrated 1-Year & 2-Year',
    to: '/courses',
    bg: '#1B2A4A',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(212,168,67,0.95)" strokeWidth="1.3">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    id: 'concept-ncert',
    title: 'Concept-Building Courses',
    subtitle: 'NCERT & Other Concepts',
    to: '/courses',
    bg: '#1B2A4A',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(212,168,67,0.95)" strokeWidth="1.3">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    id: 'test-prelims',
    title: 'Test Series',
    subtitle: 'Prelims & Mains',
    to: '/courses',
    bg: '#1A3A2A',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(212,168,67,0.95)" strokeWidth="1.3">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
];

export default function CoursesSection() {
  return (
    <section className="courses section">
      <div className="container courses__grid">

        {/* LEFT — Course Cards */}
        <div className="courses__left">
          {COURSES.map((course) => (
            <Link to={course.to} state={{ courseId: course.id }} key={course.id} className="course-row">
              {/* Dark angled panel */}
              <div className="course-row__panel" style={{ background: course.bg }}>
                <div className="course-row__panel-icon">{course.icon}</div>
              </div>
              {/* Text */}
              <div className="course-row__body">
                <h3 className="course-row__title">{course.title}</h3>
                <div className="course-row__divider" />
                <p className="course-row__subtitle">{course.subtitle}</p>
              </div>
              {/* Arrow */}
              <div className="course-row__arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* RIGHT — Heading + Info */}
        <div className="courses__right">
          <span className="section-label">Our Programs</span>
          <h2 className="courses__right-title">
            Choose Your Path<br />
            to <span className="text-gold">Success</span>
          </h2>
          <div className="divider-gold" />
          <p className="courses__right-desc">
            Whether you're just starting out or gearing up for your final attempt,
            we have a program built for every stage of your civil services journey.
          </p>

          <ul className="courses__right-points">
            <li>
              <span className="courses__right-dot" />
              Structured study plans designed by experts
            </li>
            <li>
              <span className="courses__right-dot" />
              Regular assessments &amp; performance tracking
            </li>
            <li>
              <span className="courses__right-dot" />
              Focused guidance for UPSC &amp; APSC aspirants
            </li>
            <li>
              <span className="courses__right-dot" />
              North-East specific content &amp; mentorship
            </li>
          </ul>

          <Link to="/courses" className="btn btn-primary courses__right-cta">
            View All Courses →
          </Link>
        </div>

      </div>
    </section>
  );
}
