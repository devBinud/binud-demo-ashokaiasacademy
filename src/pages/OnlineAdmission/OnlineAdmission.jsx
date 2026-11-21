import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import CtaSection from '../Home/sections/CtaSection';
import './OnlineAdmission.css';

const COURSES = [
  { value: 'one-year-foundation', label: 'One Year Foundation Course (UPSC/APSC)' },
  { value: 'two-year-integrated', label: 'Integrated Program - Class 11 & 12 (UPSC/APSC)' },
  { value: 'pre-foundation', label: '6-Month Pre-Foundation Course' },
  { value: 'degree-coaching', label: 'Integrated Degree + Competitive Exam Coaching Programme' },
  { value: 'crash-course', label: 'Crash Course Programme (APSC CCE / ADRE)' },
];

const courseLabel = (value) => COURSES.find((c) => c.value === value)?.label || value;

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  course: '',
  parentSignature: null,
  parentSignatureName: '',
  declaration: false,
};

export default function OnlineAdmission() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : next }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, parentSignature: 'File size must be under 2MB' }));
      return;
    }
    setFormData((prev) => ({ ...prev, parentSignature: file, parentSignatureName: file.name }));
    if (errors.parentSignature) setErrors((prev) => ({ ...prev, parentSignature: '' }));
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, parentSignature: null, parentSignatureName: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.course) newErrors.course = 'Please select a course programme';
    if (!formData.parentSignature) newErrors.parentSignature = "Please upload the parent's signature";
    if (!formData.declaration) newErrors.declaration = 'Please accept the declaration to continue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Wait for the error messages to render, then bring the first one into view
      requestAnimationFrame(() => {
        document.querySelector('.oa-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    setIsSubmitting(true);

    // Simulated registration call (no backend yet)
    setTimeout(() => {
      setIsSubmitting(false);
      setReceiptData({
        ...formData,
        receiptId: `AS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        submissionDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setReceiptData(null);
  };

  const fieldClass = (name) => `oa-input${errors[name] ? ' oa-input--invalid' : ''}`;

  return (
    <div className="oa-page">
      <SEO
        title="Online Admission Form"
        description="Reserve your seat in our upcoming batches online. Fill out the provisional admission form for UPSC and APSC coaching programs."
      />
      <PageHeader
        title="Online Admission"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Admissions', to: '/offline-admission' },
          { label: 'Online Admission' },
        ]}
      />

      {receiptData ? (
        /* ── Success + receipt ── */
        <section className="oa-success">
          <div className="container">
            <div className="oa-success__head">
              <span className="oa-success__icon"><i className="fa-solid fa-circle-check" aria-hidden="true" /></span>
              <h2 className="oa-title">Application <span>received</span></h2>
              <p className="oa-lead">Your provisional admission has been registered. Keep this receipt for your records.</p>
            </div>

            <div className="oa-receipt" id="printable-admission-receipt">
              <div className="oa-receipt__top">
                <div>
                  <strong className="oa-receipt__brand">Ashoka IAS Academy</strong>
                  <span className="oa-receipt__kind">Provisional Admission Receipt</span>
                </div>
                <div className="oa-receipt__id">
                  <span>Receipt ID</span>
                  <strong>{receiptData.receiptId}</strong>
                </div>
              </div>

              <dl className="oa-receipt__grid">
                <div className="oa-receipt__item oa-receipt__item--full">
                  <dt>Candidate name</dt>
                  <dd>{receiptData.fullName}</dd>
                </div>
                <div className="oa-receipt__item">
                  <dt>Contact number</dt>
                  <dd>+91 {receiptData.phone}</dd>
                </div>
                <div className="oa-receipt__item">
                  <dt>Email</dt>
                  <dd>{receiptData.email}</dd>
                </div>
                <div className="oa-receipt__item oa-receipt__item--full">
                  <dt>Programme</dt>
                  <dd>{courseLabel(receiptData.course)}</dd>
                </div>
                <div className="oa-receipt__item">
                  <dt>Parent signature</dt>
                  <dd><i className="fa-solid fa-check" aria-hidden="true" /> Uploaded ({receiptData.parentSignatureName})</dd>
                </div>
                <div className="oa-receipt__item">
                  <dt>Registered on</dt>
                  <dd>{receiptData.submissionDate}</dd>
                </div>
              </dl>

              <p className="oa-receipt__note">
                <strong>Note:</strong> The admission fee is non-refundable and non-transferable after
                batch commencement. Your seat is subject to final document verification.
              </p>
            </div>

            <div className="oa-success__actions">
              <button type="button" className="oa-btn oa-btn--primary" onClick={() => window.print()}>
                <i className="fa-solid fa-print" aria-hidden="true" /> Print receipt
              </button>
              <button type="button" className="oa-btn oa-btn--ghost" onClick={resetForm}>
                Enrol another student
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* ── Form ── */
        <section className="oa-main">
          <div className="container oa-main__grid">

            <div className="oa-form-col">
              <h2 className="oa-title">Reserve your seat <span>online</span></h2>
              <p className="oa-lead">Fill in a few details to register your provisional admission. It takes about two minutes.</p>

              <form className="oa-form" onSubmit={handleSubmit} noValidate>
                <div className="oa-field">
                  <label htmlFor="fullName">Full name <span className="oa-req">*</span></label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    className={fieldClass('fullName')}
                    placeholder="Candidate's full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <span className="oa-error">{errors.fullName}</span>}
                </div>

                <div className="oa-row">
                  <div className="oa-field">
                    <label htmlFor="email">Email address <span className="oa-req">*</span></label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={fieldClass('email')}
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="oa-error">{errors.email}</span>}
                  </div>

                  <div className="oa-field">
                    <label htmlFor="phone">Mobile number <span className="oa-req">*</span></label>
                    <div className={`oa-phone${errors.phone ? ' oa-input--invalid' : ''}`}>
                      <span className="oa-phone__code">+91</span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        maxLength="10"
                        placeholder="10-digit mobile"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.phone && <span className="oa-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="oa-field">
                  <label htmlFor="course">Course programme <span className="oa-req">*</span></label>
                  <div className="oa-select">
                    <select
                      id="course"
                      name="course"
                      className={fieldClass('course')}
                      value={formData.course}
                      onChange={handleChange}
                    >
                      <option value="">Select a coaching programme</option>
                      {COURSES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                    <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                  </div>
                  {errors.course && <span className="oa-error">{errors.course}</span>}
                </div>

                <div className="oa-field">
                  <span className="oa-label">Parent&apos;s signature <span className="oa-req">*</span></span>
                  {!formData.parentSignature ? (
                    <label className={`oa-upload${errors.parentSignature ? ' oa-input--invalid' : ''}`}>
                      <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
                      <i className="fa-solid fa-cloud-arrow-up oa-upload__icon" aria-hidden="true" />
                      <span className="oa-upload__text">
                        <strong>Click to upload</strong>
                        <span>JPG, PNG or PDF · max 2MB</span>
                      </span>
                    </label>
                  ) : (
                    <div className="oa-file">
                      <i className="fa-regular fa-file-lines" aria-hidden="true" />
                      <span className="oa-file__name" title={formData.parentSignatureName}>{formData.parentSignatureName}</span>
                      <button type="button" className="oa-file__remove" onClick={removeFile} aria-label="Remove uploaded file">
                        <i className="fa-solid fa-xmark" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  {errors.parentSignature && <span className="oa-error">{errors.parentSignature}</span>}
                </div>

                <div className="oa-note">
                  <i className="fa-solid fa-circle-info" aria-hidden="true" />
                  <p>The admission fee once paid is non-refundable and non-transferable after batch commencement.</p>
                </div>

                <div className="oa-field">
                  <label className="oa-check">
                    <input
                      type="checkbox"
                      id="declaration"
                      name="declaration"
                      checked={formData.declaration}
                      onChange={handleChange}
                    />
                    <span className="oa-check__box" aria-hidden="true"><i className="fa-solid fa-check" /></span>
                    <span>
                      I agree to the fee guidelines and declare that the details provided are accurate
                      and the uploaded signature is genuine.
                    </span>
                  </label>
                  {errors.declaration && <span className="oa-error">{errors.declaration}</span>}
                </div>

                <button type="submit" className="oa-btn oa-btn--primary oa-btn--submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="oa-spinner" aria-hidden="true" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit application
                      <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <aside className="oa-aside">
              <div className="oa-aside__card">
                <h3>Before you start</h3>
                <ul className="oa-aside__list">
                  <li><i className="fa-solid fa-check" aria-hidden="true" />A valid mobile number and email</li>
                  <li><i className="fa-solid fa-check" aria-hidden="true" />Parent&apos;s signature as an image or PDF</li>
                  <li><i className="fa-solid fa-check" aria-hidden="true" />The programme you want to join</li>
                </ul>
              </div>

              <div className="oa-aside__card oa-aside__card--navy">
                <h3>Need help choosing?</h3>
                <p>Talk to a counsellor about the right programme for you.</p>
                <a href="tel:+919181411843" className="oa-aside__call">
                  <i className="fa-solid fa-phone" aria-hidden="true" /> +91 91814 11843
                </a>
                <Link to="/offline-admission" className="oa-aside__link">
                  Prefer to apply in person? <span>Offline admission <i className="fa-solid fa-arrow-right" aria-hidden="true" /></span>
                </Link>
              </div>
            </aside>

          </div>
        </section>
      )}

      <CtaSection />
    </div>
  );
}
