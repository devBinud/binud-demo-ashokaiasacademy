import { Link } from 'react-router-dom';
import './PopularCourses.css';

/* Each card shows a poster on top. Add `image: someImport` to a course to use a
   real poster instead of the built-in navy/gold one. */
const COURSES = [
  {
    poster: { top: 'Integrated', main: 'Program', sub: 'Class 11 & 12 · UPSC / APSC' },
    icon: 'fa-solid fa-school',
    mode: 'Class 11 & 12',
    title: 'Integrated Program for Class 11 & 12 Students',
    eligibility: 'Class 11 & 12 Students',
    duration: '2 Years',
    batch: 'Enrolling Now',
    courseId: 'integrated-class-11-12',
  },
  {
    poster: { top: 'One Year', main: 'Foundation', sub: 'UPSC & APSC Preparation' },
    icon: 'fa-solid fa-graduation-cap',
    mode: 'Live & Offline',
    title: 'One Year Foundation Course',
    eligibility: 'Degree Students / Beginners',
    duration: '1 Year',
    batch: '1st July 2026',
    courseId: 'one-year-foundation',
  },
  {
    poster: { top: '6-Month', main: 'Pre-Foundation', sub: 'Build Strong Basics Early' },
    icon: 'fa-solid fa-seedling',
    mode: '6 Months',
    title: '6-Month Pre-Foundation Course',
    eligibility: 'College Students / Beginners',
    duration: '6 Months',
    batch: 'June 2026',
    courseId: 'pre-foundation',
  },
  {
    poster: { top: 'Exam Ready', main: 'Crash Course', sub: 'APSC · UPSC · SSC' },
    icon: 'fa-solid fa-bolt',
    mode: '3–4 Months',
    title: 'Crash Course Programme',
    eligibility: 'APSC / UPSC / SSC Aspirants',
    duration: '3–4 Months',
    batch: 'Available Now',
    courseId: 'crash-course',
  },
  {
    poster: { top: 'Integrated', main: 'Degree + Coaching', sub: 'Graduation with Exam Preparation' },
    icon: 'fa-solid fa-building-columns',
    mode: '3 Years',
    title: 'Integrated Degree + Competitive Exam Coaching Programme',
    eligibility: 'APSC / UPSC / SSC Aspirants',
    duration: '36 Months',
    batch: 'Available Now',
    courseId: 'integrated-degree-competitive-coaching-programme',
  },
];

/* "Enrolling Now" / "Available Now" → admission open; otherwise it's a start date */
const isOpenNow = (batch) => /now/i.test(batch);

function Poster({ course }) {
  if (course.image) {
    return <img src={course.image} alt={course.title} className="pc-poster pc-poster--img" loading="lazy" />;
  }
  const { top, main, sub } = course.poster;
  return (
    <div className="pc-poster" aria-hidden="true">
      <i className={`${course.icon} pc-poster__bg-icon`} />
      <span className="pc-poster__top">{top}</span>
      <strong className="pc-poster__main">{main}</strong>
      <span className="pc-poster__sub">{sub}</span>
      <span className="pc-poster__ribbon">
        {isOpenNow(course.batch) ? 'Admissions Open' : `Batch starts ${course.batch}`}
      </span>
      <span className="pc-poster__mode">{course.mode}</span>
    </div>
  );
}

export default function PopularCourses() {
  return (
    <section className="popular-courses section">
      <div className="container">

        <div className="popular-courses__header">
          <h2 className="popular-courses__title">
            Popular <span className="text-gold">Courses</span>
          </h2>
          <p className="popular-courses__sub">
            Structured programs for every stage of your civil services journey.
          </p>
        </div>

        <div className="popular-courses__grid">
          {COURSES.map((course) => (
            <article key={course.title} className="pc-card">
              <Poster course={course} />

              <div className="pc-card__body">
                <h3 className="pc-card__name">{course.title}</h3>

                <p className="pc-card__info">
                  For {course.eligibility}
                  <span>Duration: {course.duration}</span>
                </p>

                <span className="pc-card__date">
                  {isOpenNow(course.batch) ? (
                    'Admission Open'
                  ) : (
                    <>Course Start Date: <strong>{course.batch}</strong></>
                  )}
                </span>

                <div className="pc-card__actions">
                  <Link
                    to="/courses-all"
                    state={{ courseId: course.courseId }}
                    className="pc-btn pc-btn--outline"
                  >
                    View Details <i className="fa-regular fa-eye" aria-hidden="true" />
                  </Link>
                  <Link to="/online-application" className="pc-btn pc-btn--solid">
                    Enroll Now <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
