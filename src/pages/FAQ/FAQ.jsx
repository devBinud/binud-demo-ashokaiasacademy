import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import faqBg from '../../assets/images/faq_bg.jpg';
import './FAQ.css';
import CtaSection from '../Home/sections/CtaSection';

const FAQ_ITEMS = [
  {
    q: 'What courses do you offer at the institute?',
    a: 'We offer coaching programs for UPSC, APSC, and other civil services exams, along with skill development and career-oriented training designed to help students achieve their goals.',
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
  {
    q: 'Is there any scholarship or fee concession available?',
    a: 'Yes, we offer merit-based scholarships and fee concessions for deserving students. Contact our admission office for more details.',
  },
];

const EMPTY = { name: '', email: '', phone: '', question: '' };

function AskForm() {
  const [form, setForm]       = useState(EMPTY);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name     = 'Name is required';
    if (!form.phone.trim())    e.phone    = 'Phone is required';
    if (!form.question.trim()) e.question = 'Please write your question';
    return e;
  };

  const handleChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setStatus('loading');
    try {
      await addDoc(collection(db, 'student_queries'), {
        name:      form.name.trim(),
        email:     form.email.trim() || null,
        phone:     form.phone.trim(),
        question:  form.question.trim(),
        status:    'new',
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      console.error('FAQ query submit error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="faq-ask__success">
        <div className="faq-ask__success-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3>Question Submitted!</h3>
        <p>Thank you, <strong>{form.name || 'there'}</strong>. We'll get back to you shortly.</p>
        <button className="faq-ask__reset" onClick={() => setStatus('idle')}>Ask Another Question</button>
      </div>
    );
  }

  return (
    <form className="faq-ask__form" onSubmit={handleSubmit} noValidate>
      <div className="faq-ask__row">
        {/* Name */}
        <div className={`faq-ask__field${errors.name ? ' faq-ask__field--error' : ''}`}>
          <label className="faq-ask__label">
            Full Name <span className="faq-ask__required">*</span>
          </label>
          <input
            type="text"
            className="faq-ask__input"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange('name')}
          />
          {errors.name && <span className="faq-ask__error">{errors.name}</span>}
        </div>

        {/* Phone */}
        <div className={`faq-ask__field${errors.phone ? ' faq-ask__field--error' : ''}`}>
          <label className="faq-ask__label">
            Phone Number <span className="faq-ask__required">*</span>
          </label>
          <input
            type="tel"
            className="faq-ask__input"
            placeholder="Your phone number"
            value={form.phone}
            onChange={handleChange('phone')}
          />
          {errors.phone && <span className="faq-ask__error">{errors.phone}</span>}
        </div>
      </div>

      {/* Email */}
      <div className="faq-ask__field">
        <label className="faq-ask__label">Email Address <span className="faq-ask__optional">(optional)</span></label>
        <input
          type="email"
          className="faq-ask__input"
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange('email')}
        />
      </div>

      {/* Question */}
      <div className={`faq-ask__field${errors.question ? ' faq-ask__field--error' : ''}`}>
        <label className="faq-ask__label">
          Your Question <span className="faq-ask__required">*</span>
        </label>
        <textarea
          className="faq-ask__textarea"
          placeholder="Type your question in detail..."
          rows={4}
          value={form.question}
          onChange={handleChange('question')}
        />
        {errors.question && <span className="faq-ask__error">{errors.question}</span>}
      </div>

      {status === 'error' && (
        <p className="faq-ask__submit-error">Something went wrong. Please try again.</p>
      )}

      <button type="submit" className="faq-ask__submit" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <span className="faq-ask__spinner" />
            Submitting...
          </>
        ) : (
          <>
            Submit Question
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

export default function FAQ() {
  return (
    <div className="faq-page">

      {/* ── Hero ── */}
      <section className="faq-hero" style={{ backgroundImage: `url(${faqBg})` }}>
        <div className="container faq-hero__content">
          <span className="section-label">Help Center</span>
          <h1 className="faq-hero__title">
            Frequently Asked <span className="text-gold">Questions</span>
          </h1>
          <p className="faq-hero__desc">
            Everything you need to know about Ashoka IAS Academy, our courses, and the admission process.
          </p>
          <div className="faq-hero__breadcrumb">
            <Link to="/" className="faq-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="faq-hero__bc-current">FAQs</span>
          </div>
        </div>
      </section>

      {/* ── FAQ 2-Column Grid ── */}
      <section className="section faq-content">
        <div className="container">
          <div className="faq-section-header">
            <h2 className="faq-section-title">General Queries</h2>
            <p className="faq-section-sub">Can't find your answer? <Link to="/contact" className="faq-contact-link">Contact us</Link></p>
          </div>

          <div className="faq-grid">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="faq-card">
                <div className="faq-card__header">
                  <span className="faq-card__badge faq-card__badge--q">Q</span>
                  <h3 className="faq-card__question">{item.q}</h3>
                </div>
                <div className="faq-card__body">
                  <span className="faq-card__badge faq-card__badge--a">A</span>
                  <p className="faq-card__answer">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ask a Question ── */}
      <section className="section faq-ask-section">
        <div className="container">
          <div className="faq-ask-wrap">

            {/* Left info */}
            <div className="faq-ask__info">
              <span className="section-label">Still have doubts?</span>
              <h2 className="faq-ask__title">Ask Your <span className="text-gold">Question</span></h2>
              <p className="faq-ask__desc">
                Didn't find what you were looking for? Submit your question and our team will get back to you personally.
              </p>
              <ul className="faq-ask__points">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Quick response within 24 hours
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Answered by our expert faculty
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  No question is too small
                </li>
              </ul>
            </div>

            {/* Right form */}
            <div className="faq-ask__form-wrap">
              <AskForm />
            </div>

          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
