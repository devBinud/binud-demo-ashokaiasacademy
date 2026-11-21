import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import SEO from '../../../components/common/SEO';
import PageHeader from '../../../components/common/PageHeader';
import posterImg from '../../../assets/images/courses/apsc_forest_ranger.jpeg';
import './APSCTestSeries.css';

const COURSE_NAME = 'APSC Forest Ranger Prelims Test Series 2026';

const WHATSAPP_URL =
  'https://wa.me/918822823003?text=Hi%2C%20I%20am%20interested%20in%20APSC%20Forest%20Ranger%20Prelims%20Test%20Series%202026';

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  optionals: 'Forestry & Environment',
  branch: 'Guwahati',
};

export default function APSCTestSeries() {
  const [showEnrolModal, setShowEnrolModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Close the modal with Escape and lock page scroll while it is open
  useEffect(() => {
    if (!showEnrolModal) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setShowEnrolModal(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [showEnrolModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const next = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setForm((prev) => ({ ...prev, [name]: next }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.phone) errs.phone = 'Phone number is required.';
    else if (form.phone.length !== 10) errs.phone = 'Enter a valid 10-digit phone number.';
    return errs;
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'enquiries'), {
        name: form.name,
        phone: '+91' + form.phone,
        email: form.email,
        course: COURSE_NAME,
        optionals: form.optionals,
        preferredBranch: form.branch,
        message: '',
        status: 'new',
        createdAt: serverTimestamp(),
        source: 'apsc-forest-ranger-test-series',
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowEnrolModal(false);
        setForm(EMPTY_FORM);
      }, 3000);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ts-page">
      <SEO
        title="APSC Forest Ranger Prelims Test Series 2026 | Ashoka IAS Academy"
        description="Prepare with confidence for the APSC Forest Ranger Preliminary Examination through our comprehensive Test Series."
      />

      <PageHeader
        title="APSC Test Series"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Student Zone' },
          { label: 'APSC Test Series' },
        ]}
      />

      <section className="ts-main">
        <div className="container ts-grid">

          {/* ── Summary + enrol ── */}
          <div className="ts-content">
            <span className="ts-status">
              <span className="ts-status__dot" aria-hidden="true" /> Launching soon
            </span>
            <h2 className="ts-title">
              APSC Forest Ranger <span>Prelims Test Series 2026</span>
            </h2>
            <p className="ts-lead">
              15 tests on the latest exam pattern - General Studies, General English and any two
              optionals.
            </p>

            <div className="ts-price">
              <strong>₹499</strong>
              <s>₹1,499</s>
              <span className="ts-price__off">Limited period offer</span>
            </div>

            <div className="ts-actions">
              <button type="button" className="ts-btn ts-btn--primary" onClick={() => setShowEnrolModal(true)}>
                Enrol now
              </button>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="ts-btn ts-btn--soft">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>

          {/* ── Poster ── */}
          <a href={posterImg} target="_blank" rel="noopener noreferrer" className="ts-poster" title="Open full poster">
            <img src={posterImg} alt={`${COURSE_NAME} poster`} />
            <span className="ts-poster__zoom"><i className="fa-solid fa-expand" aria-hidden="true" /> View poster</span>
          </a>

        </div>
      </section>

      {/* ── Enrolment modal ── */}
      {showEnrolModal && (
        <div className="ts-modal" onClick={() => setShowEnrolModal(false)}>
          <div
            className="ts-modal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ts-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="ts-modal__close" onClick={() => setShowEnrolModal(false)} aria-label="Close">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>

            <h3 id="ts-modal-title" className="ts-modal__title">Enrol / Enquire</h3>
            <p className="ts-modal__sub">{COURSE_NAME}</p>

            {submitted ? (
              <div className="ts-modal__done" role="status">
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
                <h4>Enquiry submitted</h4>
                <p>We will contact you shortly with admission details.</p>
              </div>
            ) : (
              <form className="ts-form" onSubmit={handleSubmitEnquiry} noValidate>
                <div className="ts-field">
                  <label htmlFor="ts-name">Full name <span className="ts-req">*</span></label>
                  <input
                    id="ts-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={`ts-input${errors.name ? ' ts-input--invalid' : ''}`}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="ts-error">{errors.name}</span>}
                </div>

                <div className="ts-field">
                  <label htmlFor="ts-phone">Mobile number <span className="ts-req">*</span></label>
                  <div className={`ts-phone${errors.phone ? ' ts-input--invalid' : ''}`}>
                    <span>+91</span>
                    <input
                      id="ts-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={10}
                      placeholder="10-digit mobile"
                      value={form.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.phone && <span className="ts-error">{errors.phone}</span>}
                </div>

                <div className="ts-field">
                  <label htmlFor="ts-email">Email <span className="ts-optional">(optional)</span></label>
                  <input
                    id="ts-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="ts-input"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="ts-row">
                  <div className="ts-field">
                    <label htmlFor="ts-optionals">Optional subjects</label>
                    <input
                      id="ts-optionals"
                      name="optionals"
                      type="text"
                      className="ts-input"
                      placeholder="e.g. Forestry & Environment"
                      value={form.optionals}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="ts-field">
                    <label htmlFor="ts-branch">Branch</label>
                    <div className="ts-select">
                      <select id="ts-branch" name="branch" className="ts-input" value={form.branch} onChange={handleInputChange}>
                        <option value="Guwahati">Guwahati (Bhangagarh)</option>
                        <option value="Nagaon">Nagaon (Panigaon)</option>
                        <option value="Online">Online</option>
                      </select>
                      <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="ts-btn ts-btn--primary" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
