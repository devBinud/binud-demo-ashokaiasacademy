import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import './OnlineAdmission.css';
import admissionBg from '../../assets/images/4.jpg';
import CtaSection from '../Home/sections/CtaSection';


export default function OnlineAdmission() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    parentSignature: null,
    parentSignatureName: '',
    declaration: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Auto-scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          parentSignature: 'File size must be under 2MB',
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        parentSignature: file,
        parentSignatureName: file.name,
      }));

      // Clear error
      if (errors.parentSignature) {
        setErrors((prev) => ({ ...prev, parentSignature: '' }));
      }
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      parentSignature: null,
      parentSignatureName: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone Validation (Indian 10-digit format)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact Number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.course) newErrors.course = 'Please select a course program';
    if (!formData.parentSignature) newErrors.parentSignature = "Parent's signature file upload is required";
    if (!formData.declaration) newErrors.declaration = 'You must accept the admission terms and declaration';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const errorField = document.querySelector('.admission-form__error');
      if (errorField) {
        errorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API registration call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedReceiptId = `AS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setReceiptData({
        ...formData,
        receiptId: generatedReceiptId,
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

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      course: '',
      parentSignature: null,
      parentSignatureName: '',
      declaration: false,
    });
    setErrors({});
    setIsSubmitted(false);
    setReceiptData(null);
  };

  if (isSubmitted && receiptData) {
    return (
      <div className="admission-success container">
        <div className="admission-success__card">
          <div className="admission-success__header">
            <div className="admission-success__badge">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="admission-success__title">Admission Registered!</h2>
            <p className="admission-success__subtitle">
              Your simplified enrollment application has been logged successfully.
            </p>
          </div>

          {/* Printable Ticket Receipt */}
          <div className="admission-receipt" id="printable-admission-receipt">
            <div className="admission-receipt__header">
              <div className="admission-receipt__brand">
                <span className="receipt-brand-text">ASHOKA IAS ACADEMY</span>
                <span className="receipt-brand-tag">PROVISIONAL ADMISSION RECEIPT</span>
              </div>
              <div className="admission-receipt__id">
                <span className="receipt-id-label">Receipt ID</span>
                <strong className="receipt-id-val">{receiptData.receiptId}</strong>
              </div>
            </div>

            <div className="admission-receipt__grid">
              <div className="receipt-info-item receipt-info-item--full">
                <span className="receipt-info-label">Candidate Name</span>
                <span className="receipt-info-value">{receiptData.fullName}</span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-info-label">Contact Number</span>
                <span className="receipt-info-value">+91 {receiptData.phone}</span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-info-label">Registered Email</span>
                <span className="receipt-info-value">{receiptData.email}</span>
              </div>
              <div className="receipt-info-item receipt-info-item--full">
                <span className="receipt-info-label">Program Course</span>
                <span className="receipt-info-value">
                  {receiptData.course === 'one-year-foundation' && 'One Year Foundation Course (UPSC/APSC)'}
                  {receiptData.course === 'two-year-integrated' && 'Integrated Program - Class 11 & 12 (UPSC/APSC)'}
                  {receiptData.course === 'pre-foundation' && '6-Month Pre-Foundation Course'}
                  {receiptData.course === 'degree-coaching' && 'Integrated Degree + Coaching Programme'}
                  {receiptData.course === 'crash-course' && 'Crash Course Program (UPSC/APSC)'}
                </span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-info-label">Parent Signature Document</span>
                <span className="receipt-info-value" style={{ color: '#22C55E' }}>
                  ✓ Uploaded ({receiptData.parentSignatureName})
                </span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-info-label">Registration Timestamp</span>
                <span className="receipt-info-value">{receiptData.submissionDate}</span>
              </div>
            </div>

            <div className="admission-receipt__footer">
              <div className="receipt-stamp">PROVISIONALLY VERIFIED</div>
              <p className="receipt-note">
                <strong>Important Policy:</strong> Admission fee is strictly non-refundable and non-transferable under any circumstances after batch commencement. Seat is subject to final document verification.
              </p>
            </div>
          </div>

          <div className="admission-success__actions">
            <button className="btn-print" onClick={handlePrint}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px' }}>
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print Receipt
            </button>

            <button className="btn-new-admission" onClick={resetForm}>
              Enroll Another Student
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="online-admission-page">
      <SEO 
        title="Online Admission Form"
        description="Reserve your seat in our upcoming batches online. Fill out the provisional admission form for UPSC and APSC coaching programs."
      />
      {/* Premium Breadcrumbs Navigation Strip */}
      <div className="admission-breadcrumbs">
        <div className="breadcrumbs-inner">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item-parent">Admissions</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Online Admission</span>
        </div>
      </div>

      <div className="admission-container">

        {/* LEFT COLUMN: Clean Brand Banner Image (No Overlay Text) */}
        <div className="admission-banner" style={{ backgroundImage: `url(${admissionBg})` }} />

        {/* RIGHT COLUMN: Online Admission Enrollment Form */}
        <div className="admission-form-wrapper">
          <div className="admission-form__card">

            <div className="admission-form__header">
              <h1 className="admission-form__title">Online Admission</h1>
              <p className="admission-form__subtitle">
                Complete our simplified form below to reserve your coaching seat.
              </p>
            </div>

            <form className="admission-form" onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className="admission-form__group">
                <label className="admission-form__label" htmlFor="fullName">Full Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`admission-form__input ${errors.fullName ? 'admission-form__input--invalid' : ''}`}
                  placeholder="Enter candidate's full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="admission-form__error">{errors.fullName}</span>}
              </div>

              {/* Contact Details Row */}
              <div className="admission-form__row">
                <div className="admission-form__group">
                  <label className="admission-form__label" htmlFor="email">Email Address <span className="text-danger">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`admission-form__input ${errors.email ? 'admission-form__input--invalid' : ''}`}
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="admission-form__error">{errors.email}</span>}
                </div>

                <div className="admission-form__group">
                  <label className="admission-form__label" htmlFor="phone">Contact Number <span className="text-danger">*</span></label>
                  <div className="admission-form__phone-wrapper">
                    <span className="phone-prefix">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="22" height="15" style={{ borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.18)', flexShrink: 0 }}>
                        <rect width="900" height="200" fill="#FF9933" />
                        <rect y="200" width="900" height="200" fill="#FFFFFF" />
                        <rect y="400" width="900" height="200" fill="#138808" />
                        <circle cx="450" cy="300" r="90" fill="none" stroke="#000080" strokeWidth="9" />
                        {[...Array(24)].map((_, i) => {
                          const a = (i / 24) * 2 * Math.PI;
                          return <line key={i} x1={450 + 70 * Math.cos(a)} y1={300 + 70 * Math.sin(a)} x2={450 + 90 * Math.cos(a)} y2={300 + 90 * Math.sin(a)} stroke="#000080" strokeWidth="4" />;
                        })}
                        <circle cx="450" cy="300" r="18" fill="#000080" />
                      </svg>
                      <span className="phone-prefix__divider">|</span>
                      <span className="phone-prefix__code">+91</span>
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      maxLength="10"
                      className={`admission-form__input admission-form__input--phone ${errors.phone ? 'admission-form__input--invalid' : ''}`}
                      placeholder="10-digit mobile"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone && <span className="admission-form__error">{errors.phone}</span>}
                </div>
              </div>

              {/* Course Program Selection */}
              <div className="admission-form__group">
                <label className="admission-form__label" htmlFor="course">Select Course Program <span className="text-danger">*</span></label>
                <div className="select-container">
                  <select
                    id="course"
                    name="course"
                    className={`admission-form__select ${errors.course ? 'admission-form__select--invalid' : ''}`}
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">Select a coaching program</option>
                    <option value="one-year-foundation">One Year Foundation Course (UPSC/APSC)</option>
                    <option value="two-year-integrated">Integrated Program - Class 11 & 12 (UPSC/APSC)</option>
                    <option value="pre-foundation">6-Month Pre-Foundation Course</option>
                    <option value="degree-coaching">Integrated Degree + Competitive Exam Coaching Programme</option>
                    <option value="crash-course">Crash Course Programme (APSC CCE / ADRE)</option>
                  </select>
                  <div className="select-arrow">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                {errors.course && <span className="admission-form__error">{errors.course}</span>}
              </div>

              {/* Parent's Signature Upload Box */}
              <div className="admission-form__group">
                <label className="admission-form__label">Upload Parent's Signature <span className="text-danger">*</span></label>
                <div className={`admission-upload-zone ${errors.parentSignature ? 'admission-upload-zone--invalid' : ''}`}>
                  {!formData.parentSignature ? (
                    <label className="upload-label">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="upload-input-hidden"
                      />
                      <div className="upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <span className="upload-text">Click to choose image or PDF</span>
                      <span className="upload-limits">JPG, PNG or PDF (Max 2MB)</span>
                    </label>
                  ) : (
                    <div className="uploaded-file-capsule">
                      <div className="uploaded-file-details">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success-icon" style={{ marginRight: '8px' }}>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                        <span className="uploaded-file-name" title={formData.parentSignatureName}>
                          {formData.parentSignatureName}
                        </span>
                      </div>
                      <button type="button" className="btn-remove-file" onClick={removeFile} aria-label="Remove uploaded file">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                {errors.parentSignature && <span className="admission-form__error">{errors.parentSignature}</span>}
              </div>

              {/* CRITICAL FEE POLICY WARNING BOX */}
              <div className="admission-policy-alert">
                <div className="policy-alert-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="policy-alert-content">
                  <strong>Strict Refund Policy Warning</strong>
                  <p>THE ADMISSION FEE ONCE PAID IS STRICTLY NON-REFUNDABLE AND NON-TRANSFERABLE UNDER ANY CIRCUMSTANCES AFTER BATCH COMMENCEMENT.</p>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="admission-form__checkbox-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    id="declaration"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleChange}
                  />
                  <span className="checkmark" />
                  <span className="checkbox-label">
                    I agree to the non-refundable fee guidelines, and I declare that the details provided are accurate and the signature uploaded is verified. <span className="text-danger">*</span>
                  </span>
                </label>
                {errors.declaration && <span className="admission-form__error" style={{ display: 'block', marginTop: '6px' }}>{errors.declaration}</span>}
              </div>

              {/* Submit Admission Button */}
              <button
                type="submit"
                className={`btn-submit-admission ${isSubmitting ? 'btn-submit-admission--loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Admission Application, Adde
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '8px' }}>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>

      {/* Common CTA Section  */}
      <CtaSection />

    </div>
  );
}
