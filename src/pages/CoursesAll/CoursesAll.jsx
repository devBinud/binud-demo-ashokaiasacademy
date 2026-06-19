import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import './CoursesAll.css';

const COURSES = [
  {
    id: 'integrated-class-11-12',
    label: 'Integrated Program — Class 11 & 12',
    sublabel: '2 Years',
    tag: '2 Years',
    title: 'Integrated Program for Class 11 & 12 Students',
    subtitle: 'Academic Excellence + Competitive Exam Preparation',
    duration: '2 Years',
    desc: 'A specially designed 2-Year Integrated Coaching Program for Class 11 & 12 students to build strong academic foundations along with early preparation for competitive exams.',
    highlights: [
      'Complete coverage of AHSEC/CBSE Board syllabus',
      'Integrated coaching for Arts, Science & Commerce streams',
      'Early foundation preparation for UPSC/APSC & other competitive exams',
      'Regular classes on Current Affairs, Aptitude & Reasoning',
      'Development of answer writing & analytical skills',
      'Mock tests, mentorship & performance evaluation',
      'Focus on personality development & communication skills',
      'Smart learning environment with experienced faculty guidance',
    ],
    idealFor: [
      'Class 11 & 12 students seeking academic + competitive edge',
      'Students wanting early preparation for UPSC/APSC',
      'Aspirants aiming for a competitive advantage by Class 12',
    ],
    goal: 'By the completion of Class 12, students become academically strong and gain a competitive edge for future examinations.',
  },
  {
    id: 'degree-plus-coaching',
    label: 'Degree Plus Coaching Programme',
    sublabel: '3 Years',
    tag: '3 Years',
    title: 'Degree Plus Coaching Programme',
    subtitle: 'Integrated Degree + Competitive Exam Preparation',
    duration: '3 Years',
    desc: 'A specially designed integrated program for students pursuing Graduation along with preparation for competitive examinations.',
    highlights: [
      'Degree syllabus (BBA/BCA/MBA) covered with academic guidance',
      'UPSC/APSC foundation built from the 1st year of graduation',
      'Answer-writing, communication & current affairs skills from early stage',
      'Dedicated preparation for CUET PG / SSC / Banking / CDS / CAPF',
      'Regular mock tests, mentorship & performance analysis',
      'Special emphasis on personality development & interview skills',
      'Integrated study plan to save time and stay ahead',
      'Experienced faculty for both university academics and competitive exams',
    ],
    idealFor: [
      'Students after Class 12',
      'Aspirants aiming for Civil Services / allied exams / SSC from an early stage',
      'Students wanting degree + competitive exam preparation together',
    ],
    goal: 'By completion of graduation, students become academically strong and competitively prepared with a clear career advantage.',
  },
  {
    id: 'one-year-foundation',
    label: 'One Year Foundation Course',
    sublabel: '1 Year',
    tag: '1 Year',
    title: 'One Year Foundation Course',
    subtitle: 'Complete Beginner to Advanced Foundation Programme',
    duration: '1 Year',
    desc: 'Complete GS Foundation coverage from beginner to advanced level with integrated Prelims + Mains approach.',
    highlights: [
      'Complete GS Foundation — Polity, History, Geography, Economy, Environment & Science',
      'Assam GK & Current Affairs special focus',
      'CSAT aptitude preparation',
      'Daily newspaper discussion',
      'Weekly mock tests & evaluation',
      'Prelims + Mains integrated approach',
      'Answer writing practice from basic level',
      'Doubt clearing, mentorship & revision strategy guidance',
    ],
    idealFor: [
      'Degree students',
      'Beginners in APSC/UPSC preparation',
      'Serious long-term aspirants',
      'Repeaters needing structured guidance',
    ],
    goal: null,
  },
  {
    id: 'pre-foundation',
    label: '6-Month Pre-Foundation Course',
    sublabel: '6 Months',
    tag: '6 Months',
    title: '6-Month Pre-Foundation Course',
    subtitle: 'Basic Preparation Programme for Beginners',
    duration: '6 Months',
    desc: 'Preparation from zero/basic level with NCERT-based concept building and introduction to competitive exam patterns.',
    highlights: [
      'Preparation from zero/basic level',
      'NCERT-based concept building',
      'Introduction to competitive exam pattern',
      'Basic Polity, History, Geography & Economy',
      'Assam GK foundation classes',
      'Current affairs habit-building sessions',
      'MCQ practice and concept tests',
      'Mentorship for career planning',
    ],
    idealFor: [
      'College students',
      'Beginners confused about preparation',
      'Rural & first-generation aspirants',
      'Students preparing alongside academics',
    ],
    goal: null,
  },
  {
    id: 'integrated-degree-competitive-coaching-programme',
    label: 'Integrated Degree + Competitive Coaching Programme',
    sublabel: '36 Months',
    tag: '3 Years',
    title: 'Integrated Degree + Competitive Coaching Programme',
    subtitle: 'Graduation with Integrated Competitive Exam Preparation',
    duration: '3 Years',
    desc: 'A specially designed integrated programme for students pursuing graduation along with preparation for UPSC/APSC, CUET PG, SSC, Banking, CDS, CAPF, and other competitive examinations.',
    highlights: [
      'Degree syllabus (BBA/BCA/MBA) with academic mentorship',
      'UPSC/APSC foundation from 1st year of graduation',
      'Answer-writing and analytical skill development',
      'Current affairs and communication skill training',
      'Preparation for CUET PG / SSC / Banking / CDS / CAPF',
      'Regular mock tests and performance analysis',
      'NCERT-based conceptual learning approach',
      'Personality development and interview guidance',
      'Integrated study plan for academic + competitive balance',
      'Experienced faculty support for academics and exams',
    ],
    idealFor: [
      'Students pursuing graduation',
      'UPSC/APSC aspirants',
      'Students preparing alongside degree studies',
      'Career-focused competitive exam aspirants',
    ],
    goal:
      'By completion of graduation, students become academically strong and competitively prepared with a clear career advantage.',
  },
  {
    id: 'crash-course',
    label: 'Crash Course',
    sublabel: 'Intensive Revision',
    tag: '3–4 Months',
    title: 'Crash Course Programme',
    subtitle: 'Exam-Specific Intensive Revision Programme',
    duration: '3–4 Months',
    desc: 'Fast-track exam-oriented preparation with high-probability topics, previous year analysis, and intensive revision.',
    highlights: [
      'Fast-track syllabus completion',
      'Exam-oriented preparation strategy',
      'High-probability topics coverage',
      'Daily MCQ practice & current affairs rapid revision',
      'Assam-specific important topics',
      'Previous Year Question analysis',
      'Mock tests & answer writing practice for Mains',
      'Shortcut techniques & smart preparation methods',
    ],
    idealFor: [
      'APSC CCE aspirants',
      'UPSC Prelims candidates',
      'SSC CGL / CHSL / Banking Exam aspirants',
      'ADRE & Assam Govt. Exam candidates',
      'CUET & other competitive exam aspirants',
    ],
    goal: null,
  },

];

export default function CoursesAll() {
  const location = useLocation();

  const initialId = location.state?.courseId
    ? COURSES.find(c => c.id === location.state.courseId)?.id || COURSES[0].id
    : COURSES[0].id;

  const [activeCourse, setActiveCourse] = useState(initialId);

  const course = COURSES.find(c => c.id === activeCourse);

  const handleCourseChange = (id) => setActiveCourse(id);

  return (
    <div className="courses-all-page">
      <SEO 
        title="All UPSC, APSC & Allied Courses"
        description="Browse our full directory of courses: Foundation program, NCERT basics, Test Series, and allied exams preparation coaching."
      />

      {/* Hero */}
      <section className="courses-all-hero">
        <div className="container courses-all-hero__content">
          <span className="section-label">Our Programs</span>
          <h1 className="courses-all-hero__title">
            Our <span className="text-gold">Courses</span>
          </h1>
          <p className="courses-all-hero__desc">
            Structured programs for every stage of your civil services journey - from foundation to final selection.
          </p>
          <div className="courses-all-hero__breadcrumb">
            <Link to="/" className="courses-all-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <span className="courses-all-hero__bc-current">Courses</span>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="section courses-all-main">
        <div className="container courses-all-layout">

          {/* LEFT — Course list */}
          <aside className="courses-all-sidebar">
            {COURSES.map(c => (
              <button
                key={c.id}
                className={`courses-all-tab${activeCourse === c.id ? ' courses-all-tab--active' : ''}`}
                onClick={() => handleCourseChange(c.id)}
              >
                <div className="courses-all-tab__text">
                  <span className="courses-all-tab__label">{c.label}</span>
                  <span className="courses-all-tab__sub">{c.sublabel}</span>
                </div>
                <svg className="courses-all-tab__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </aside>

          {/* RIGHT — Course detail */}
          <div className="courses-all-detail" key={activeCourse}>

            {/* Header */}
            <div className="courses-all-detail__header">
              <div className="courses-all-detail__meta">
                {/* <span className="courses-all-detail__tag">{course.tag}</span> */}
                <span className="courses-all-detail__duration">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Duration: {course.duration}
                </span>
              </div>
              <h2 className="courses-all-detail__title">{course.title}</h2>
              <p className="courses-all-detail__subtitle">{course.subtitle}</p>
              <p className="courses-all-detail__desc">{course.desc}</p>
            </div>

            {/* Programme Highlights */}
            <div className="courses-all-section">
              <h3 className="courses-all-section__title">Programme Highlights</h3>
              <ul className="courses-all-highlights">
                {course.highlights.map((h, i) => (
                  <li key={i}>
                    <span className="courses-all-check">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For */}
            <div className="courses-all-section">
              <h3 className="courses-all-section__title">Ideal For</h3>
              <ul className="courses-all-ideal">
                {course.idealFor.map((item, i) => (
                  <li key={i}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Goal */}
            {course.goal && (
              <div className="courses-all-goal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                </svg>
                <div>
                  <strong>Goal</strong>
                  <p>{course.goal}</p>
                </div>
              </div>
            )}

            {/* WhatsApp Contact */}
            <div className="courses-all-contact">
              <div className="courses-all-contact__text">
                <strong>Interested in this program?</strong>
                <span>Contact us on WhatsApp for details, fee structure, and enrollment.</span>
              </div>
              <a
                href="https://wa.me/918822823003"
                target="_blank"
                rel="noreferrer"
                className="courses-all-contact__btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                +91 88228 23003
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
