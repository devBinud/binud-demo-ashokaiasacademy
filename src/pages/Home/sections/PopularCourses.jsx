import { Link } from 'react-router-dom';
import course11 from '../../../assets/images/courses/1.jpg';
import course3 from '../../../assets/images/courses/2.jpg';
import course4 from '../../../assets/images/courses/4.jpg';
import course5 from '../../../assets/images/courses/6.jpg';
import course6 from '../../../assets/images/courses/5.jpg';
import './PopularCourses.css';

const COURSES = [
  {
    title: 'Integrated Program for Class 11 & 12 Students',
    duration: '2 Years',
    eligibility: 'Class 11 & 12 Students',
    batch: 'Enrolling Now',
    to: '/courses-all',
    state: { courseId: 'integrated-class-11-12' },
    img: course11,
  },
  {
    title: 'One Year Foundation Course',
    duration: '1 Year',
    eligibility: 'Degree Students / Beginners',
    batch: 'July 2026',
    to: '/courses-all',
    state: { courseId: 'one-year-foundation' },
    img: course3,
  },
  {
    title: '6-Month Pre-Foundation Course',
    duration: '6 Months',
    eligibility: 'College Students / Beginners',
    batch: 'June 2026',
    to: '/courses-all',
    state: { courseId: 'pre-foundation' },
    img: course4,
  },
  {
    title: 'Crash Course Programme',
    duration: '3–4 Months',
    eligibility: 'APSC / UPSC / SSC Aspirants',
    batch: 'Available Now',
    to: '/courses-all',
    state: { courseId: 'crash-course' },
    img: course5,
  },
   {
    title: 'Integrated Degree + Competitive Exam Coaching Programme',
    duration: '36 Months',
    eligibility: 'APSC / UPSC / SSC Aspirants',
    batch: 'Available Now',
    to: '/courses-all',
    state: { courseId: 'crash-course' },
    img: course6,
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
              <div className="pc-card__accent">
                <img src={course.img} alt={course.title} className="pc-card__img" />
              </div>
              <div className="pc-card__body">
                <h3 className="pc-card__title">{course.title}</h3>
                <div className="pc-card__meta">
                  <span><strong>Duration :</strong> {course.duration}</span>
                  <span><strong>Eligibility :</strong> {course.eligibility}</span>
                  <span><strong>Batch Starts :</strong> {course.batch}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
