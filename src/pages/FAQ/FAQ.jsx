import { useState } from 'react';
import { Link } from 'react-router-dom';
import crossLine from '../../assets/images/cross-line.png';
import './FAQ.css';
import CtaSection from '../Home/sections/CtaSection';

const FAQ_CATEGORIES = [
  {
    category: 'General Questions',
    items: [
      {
        q: 'What courses do you offer at the institute?',
        a: 'We offer coaching programs for competitive exams, academic subjects, skill development, and career-oriented training designed to help students achieve their goals.',
      },
      {
        q: 'Who can enroll in your coaching programs?',
        a: 'Students from different academic levels and backgrounds can enroll based on the course requirements and eligibility criteria.',
      },
      {
        q: 'Are classes available online or offline?',
        a: 'Yes, we provide both online and offline learning options to give students flexibility and convenience.',
      },
      {
        q: 'How can I register for a course?',
        a: 'You can register by filling out the admission form on our website or visiting our institute directly for assistance.',
      },
      {
        q: 'What is the duration of the courses?',
        a: 'Course duration varies depending on the program. Some courses run for a few weeks, while others may continue for several months.',
      },
      {
        q: 'Do you provide study materials and notes?',
        a: 'Yes, we provide well-structured study materials, notes, practice papers, and other learning resources to support students.',
      },
      {
        q: 'Are demo classes available before admission?',
        a: 'Yes, we offer demo classes so students can understand our teaching style and course structure before enrolling.',
      },
      {
        q: 'Do you conduct regular tests and assessments?',
        a: 'Yes, we conduct regular mock tests, assignments, and performance evaluations to track student progress and improve preparation.',
      },
      {
        q: 'Do you offer doubt-clearing sessions?',
        a: 'Yes, dedicated doubt-clearing sessions are conducted regularly to help students better understand difficult topics.',
      },
      {
        q: 'What makes your coaching institute different from others?',
        a: 'Our institute focuses on experienced faculty, personalized attention, regular assessments, quality study materials, and student success-oriented teaching methods.',
      },
      {
        q: 'Do you provide career guidance and counseling?',
        a: 'Yes, we offer career guidance sessions to help students choose the right academic and professional path.',
      },
    ],
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const toggle = (key) => setOpenItem(openItem === key ? null : key);

  return (
    <div className="faq-page">

      {/* Hero */}
      <section className="faq-hero">
        {/* Cross-line pattern overlay */}
        <div className="faq-hero__pattern" style={{ backgroundImage: `url(${crossLine})` }} />
        <div className="container faq-hero__content">
          <span className="section-label">Help Center</span>
          <h1 className="faq-hero__title">
            Frequently Asked <span className="text-gold">Questions</span>
          </h1>
          <p className="faq-hero__desc">
            Everything you need to know about Ashoka IAS Academy, our courses, and the admission process.
          </p>
          {/* Breadcrumb */}
          <div className="faq-hero__breadcrumb">
            <Link to="/" className="faq-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="faq-hero__bc-current">FAQs</span>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section faq-content">
        <div className="container faq-content__inner">

          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.category} className="faq-category">
              <h2 className="faq-category__title">{cat.category}</h2>

              <div className="faq-list">
                {cat.items.map((item, idx) => {
                  const key = `${cat.category}-${idx}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={key} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                      <button
                        className="faq-item__question"
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                      >
                        <span>{item.q}</span>
                        <div className={`faq-item__icon${isOpen ? ' faq-item__icon--open' : ''}`}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </div>
                      </button>
                      <div className="faq-item__answer">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaSection/>
    </div>
  );
}
