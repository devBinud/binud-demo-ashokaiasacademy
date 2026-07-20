import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import logoImg from '../../../assets/images/logo.png';
import './PopularCourses.css';

const COURSES = [
  {
    title: 'Integrated Program for Class 11 & 12 Students',
    duration: '2 Years',
    eligibility: 'Class 11 & 12 Students',
    batch: 'Enrolling Now',
    to: '/courses-all',
    state: { courseId: 'integrated-class-11-12' },
    bannerTitle: 'INTEGRATED PROGRAM 2026',
    bannerBadge: 'CLASS 11 & 12',
    badgeColor: '#e53e3e',
  },
  {
    title: 'One Year Foundation Course',
    duration: '1 Year',
    eligibility: 'Degree Students / Beginners',
    batch: '1st July 2026',
    to: '/courses-all',
    state: { courseId: 'one-year-foundation' },
    bannerTitle: 'ONE YEAR FOUNDATION BATCH',
    bannerBadge: 'LIVE & OFFLINE',
    badgeColor: '#38a169',
  },
  {
    title: '6-Month Pre-Foundation Course',
    duration: '6 Months',
    eligibility: 'College Students / Beginners',
    batch: 'June 2026',
    to: '/courses-all',
    state: { courseId: 'pre-foundation' },
    bannerTitle: 'PRE-FOUNDATION BATCH',
    bannerBadge: '6-MONTHS',
    badgeColor: '#3182ce',
  },
  {
    title: 'Crash Course Programme',
    duration: '3–4 Months',
    eligibility: 'APSC / UPSC / SSC Aspirants',
    batch: 'Available Now',
    to: '/courses-all',
    state: { courseId: 'crash-course' },
    bannerTitle: 'CRASH COURSE PROGRAMME',
    bannerBadge: '3-4 MONTHS',
    badgeColor: '#d69e2e',
  },
  {
    title: 'Integrated Degree + Competitive Exam Coaching Programme',
    duration: '36 Months',
    eligibility: 'APSC / UPSC / SSC Aspirants',
    batch: 'Available Now',
    to: '/courses-all',
    state: { courseId: 'crash-course' },
    bannerTitle: 'INTEGRATED DEGREE + COACHING',
    bannerBadge: '3 YEAR PROGRAM',
    badgeColor: '#805ad5',
  },
];

export default function PopularCourses() {
  return (
    <section className="popular-courses section">
      <div className="container">

        <div className="popular-courses__header">
          <span className="section-label">Our Programs</span>
          <h2 className="popular-courses__title">
            Popular <span className="text-gold">Courses</span>
          </h2>
          <p className="popular-courses__sub">
            Structured programs for every stage of your civil services journey.
          </p>
        </div>

        <div className="popular-courses__grid">
          {COURSES.map((course) => (
            <Link to={course.to} state={course.state} key={course.title} className="pc-card">
              
              {/* Banner Area (Matches screenshot header format) */}
              <div className="pc-card__banner">
                <img src={logoImg} alt="Ashoka IAS Academy" className="pc-card__banner-logo" />
                <span className="pc-card__banner-badge" style={{ backgroundColor: course.badgeColor }}>
                  {course.bannerBadge}
                </span>
                <div className="pc-card__banner-title">
                  {course.bannerTitle}
                </div>
                <div className="pc-card__banner-date">
                  <Calendar size={12} className="pc-card__banner-date-icon" />
                  <span>Batch Starts: {course.batch}</span>
                </div>
              </div>

              {/* Body Area */}
              <div className="pc-card__body">
                <h3 className="pc-card__title">{course.title}</h3>
                
                <div className="pc-card__meta-row">
                  <span className="pc-card__meta-label">Eligibility</span>
                  <span className="pc-card__meta-value">{course.eligibility}</span>
                </div>

                <div className="pc-card__divider" />

                <div className="pc-card__meta-row">
                  <span className="pc-card__meta-label">Duration</span>
                  <span className="pc-card__meta-value">{course.duration}</span>
                </div>

                <div className="pc-card__divider" />

                <div className="pc-card__footer">
                  <div className="pc-card__btn">View Details</div>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
