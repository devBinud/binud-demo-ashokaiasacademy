import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import CtaSection from '../Home/sections/CtaSection';
import './Contact.css';

const COURSES = [
  'Foundation Program — 1 Year',
  'Foundation Program — 2 Year',
  'NCERT Foundation Course',
  'Prelims Test Series',
  'Mains Test Series',
  'Answer Writing Program',
];

const QUICK_CONTACTS = [
  {
    icon: 'fa-solid fa-phone',
    label: 'Call us',
    value: '+91 91814 11843',
    href: 'tel:+919181411843',
  },
  {
    icon: 'fa-brands fa-whatsapp',
    label: 'WhatsApp',
    value: '+91 88228 23003',
    href: 'https://wa.me/918822823003',
    external: true,
  },
  {
    icon: 'fa-regular fa-envelope',
    label: 'Email',
    value: 'ashokaiasacademy123@gmail.com',
    href: 'mailto:ashokaiasacademy123@gmail.com',
  },
];

const CAMPUSES = [
  {
    name: 'Guwahati',
    address: '1st Floor, Nath Complex, Opp. Aruna Memorial Hospital, Rajgarh Road, Bhangagarh, Guwahati – 781005',
    hours: 'Mon – Sat · 10:00 AM – 6:00 PM',
  },
  {
    name: 'Nagaon',
    address: 'Sankar Mission, Panigaon Chari Ali, Opp. Reliance Trends, Nagaon – 782001',
    hours: 'Mon – Sat · 9:30 AM – 5:30 PM',
  },
];

const mapsUrl = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const EMPTY_FORM = { name: '', phone: '', email: '', course: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setForm((prev) => ({ ...prev, [name]: next }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.phone) e.phone = 'Phone number is required.';
    else if (form.phone.length !== 10) e.phone = 'Enter a valid 10-digit phone number.';
    if (!form.course) e.course = 'Please select a course.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...form,
        phone: '+91' + form.phone,
        status: 'new',
        createdAt: serverTimestamp(),
        source: 'contact-page',
      });
    } catch (err) {
      console.error('Error saving enquiry:', err);
    } finally {
      setForm(EMPTY_FORM);
      setErrors({});
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const fieldClass = (name) => `ct-input${errors[name] ? ' ct-input--invalid' : ''}`;

  return (
    <div className="ct-page">
      <SEO
        title="Admissions & Enquiries | Contact Us"
        description="Get in touch with Ashoka IAS Academy for admissions, course queries, and career counseling. Contact our Guwahati and Nagaon centers today."
      />

      <PageHeader
        title="Contact Us"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact Us' },
        ]}
      />

      {/* ── Quick contact ── */}
      <section className="ct-quick">
        <div className="container">
          <div className="ct-quick__head">
            <h2 className="ct-title">We&apos;re here to <span>help</span></h2>
            <p className="ct-lead">
              Reach out for admissions, course enquiries or anything else. Our team gets back to
              you within 24 hours.
            </p>
          </div>

          <div className="ct-quick__grid">
            {QUICK_CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="ct-quick__item"
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <i className={`${c.icon} ct-quick__icon`} aria-hidden="true" />
                <span className="ct-quick__text">
                  <span className="ct-quick__label">{c.label}</span>
                  <strong className="ct-quick__value">{c.value}</strong>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + campuses ── */}
      <section className="ct-main">
        <div className="container ct-main__grid">

          <div className="ct-form-col">
            <h2 className="ct-title ct-title--sm">Send us a <span>message</span></h2>
            <p className="ct-lead">Share your details and a counsellor will call you back.</p>

            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="name">Full name <span className="ct-req">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={fieldClass('name')}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="ct-error">{errors.name}</span>}
                </div>

                <div className="ct-field">
                  <label htmlFor="phone">Mobile number <span className="ct-req">*</span></label>
                  <div className={`ct-phone${errors.phone ? ' ct-input--invalid' : ''}`}>
                    <span className="ct-phone__code">+91</span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={10}
                      placeholder="10-digit mobile"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone && <span className="ct-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="email">Email <span className="ct-optional">(optional)</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="ct-input"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="course">Course <span className="ct-req">*</span></label>
                  <div className="ct-select">
                    <select
                      id="course"
                      name="course"
                      className={fieldClass('course')}
                      value={form.course}
                      onChange={handleChange}
                    >
                      <option value="">Select a course</option>
                      {COURSES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                  </div>
                  {errors.course && <span className="ct-error">{errors.course}</span>}
                </div>
              </div>

              <div className="ct-field">
                <label htmlFor="message">Message <span className="ct-optional">(optional)</span></label>
                <textarea
                  id="message"
                  name="message"
                  className="ct-input ct-textarea"
                  placeholder="Any questions or requirements…"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <div className="ct-form__foot">
                <button type="submit" className="ct-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="ct-spinner" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </>
                  )}
                </button>

                {submitted && (
                  <p className="ct-success" role="status">
                    <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    Thank you! We&apos;ll contact you within 24 hours.
                  </p>
                )}
              </div>
            </form>
          </div>

          <aside className="ct-campuses">
            <h3>Our campuses</h3>
            {CAMPUSES.map((c) => (
              <article key={c.name} className="ct-campus">
                <h4>
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                  {c.name}
                </h4>
                <p>{c.address}</p>
                <span className="ct-campus__hours">
                  <i className="fa-regular fa-clock" aria-hidden="true" />
                  {c.hours}
                </span>
                <a className="ct-campus__link" href={mapsUrl(c.address)} target="_blank" rel="noopener noreferrer">
                  Get directions <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </a>
              </article>
            ))}
          </aside>

        </div>
      </section>

      <CtaSection />
    </div>
  );
}
