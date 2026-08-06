import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import SEO from '../../../components/common/SEO';
import PageHeader from '../../../components/common/PageHeader';
import apscForestRangerImg from '../../../assets/images/courses/apsc_forest_ranger.jpeg';
import {
  MessageCircle,
  Phone,
  CheckCircle,
  CheckCircle2,
  X,
  Send,
  TreePine,
  FileCheck,
  BookOpen,
  PhoneCall,
  GraduationCap,
  AlertCircle
} from 'lucide-react';
import '../StudyMaterial.css';
import './APSCTestSeries.css';

export default function APSCTestSeries() {
  const [showEnrolModal, setShowEnrolModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    optionals: 'Forestry & Environment',
    branch: 'Guwahati',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setForm((prev) => ({ ...prev, phone: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
        course: 'APSC Forest Ranger Prelims Test Series 2026',
        optionals: form.optionals,
        preferredBranch: form.branch,
        message: form.message,
        status: 'new',
        createdAt: serverTimestamp(),
        source: 'apsc-forest-ranger-test-series',
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowEnrolModal(false);
        setForm({
          name: '',
          phone: '',
          email: '',
          optionals: 'Forestry & Environment',
          branch: 'Guwahati',
          message: '',
        });
      }, 3000);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="study-material-page apsc-page-container">
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

      <section className="apsc-content-section">
        <div className="container">
          <div className="apsc-layout-wrap">
            <div className="apsc-post-card">
              {/* ── Top/Left Poster Image ── */}
              <div className="apsc-image-wrapper">
                <img
                  src={apscForestRangerImg}
                  alt="APSC Forest Ranger Prelims Test Series 2026"
                  className="apsc-poster-image"
                />
              </div>

              {/* ── Right Text Body ── */}
              <div className="apsc-text-body">
                <div className="apsc-badge">
                  <TreePine size={14} /> Launching Soon
                </div>

                <h2 className="apsc-headline">
                  APSC Forest Ranger Prelims Test Series 2026
                </h2>

                <p className="apsc-greeting">Dear Aspirants,</p>

                <p className="apsc-intro">
                  Prepare with confidence for the <strong>APSC Forest Ranger Preliminary Examination</strong> through our <strong>comprehensive Test Series</strong>, designed as per the latest exam pattern.
                </p>

                <div className="apsc-details-section">
                  <div className="apsc-total-tests">
                    <FileCheck className="apsc-info-icon" size={18} />
                    <span><strong>Total Tests:</strong> 15</span>
                  </div>

                  <p className="apsc-includes-heading">
                    <BookOpen className="apsc-info-icon" size={16} />
                    <span>Test Series Includes:</span>
                  </p>

                  <ul className="apsc-check-list">
                    <li>
                      <CheckCircle2 className="check-icon" size={16} />
                      <span>3 General Studies Tests (Objective)</span>
                    </li>
                    <li>
                      <CheckCircle2 className="check-icon" size={16} />
                      <span>2 General English Tests (Descriptive)</span>
                    </li>
                    <li>
                      <CheckCircle2 className="check-icon" size={16} />
                      <span>5 Tests in Optional Subject I (Objective)</span>
                    </li>
                    <li>
                      <CheckCircle2 className="check-icon" size={16} />
                      <span>5 Tests in Optional Subject II (Objective)</span>
                    </li>
                  </ul>
                </div>

                <div className="apsc-full-divider" />

                <div className="apsc-contact-section">
                  <p className="apsc-contact-heading">
                    <PhoneCall className="apsc-info-icon" size={16} />
                    <span>For Admission & Enquiries:</span>
                  </p>
                  <div className="apsc-contact-numbers">
                    <span>Contact: </span>
                    <a href="tel:+918822823003" className="phone-link">8822823003</a>
                    <span className="divider">|</span>
                    <a href="tel:+919181411843" className="phone-link">9181411843</a>
                  </div>
                  <p className="apsc-academy-name">
                    <GraduationCap className="apsc-info-icon" size={16} />
                    <span>Ashoka IAS Academy</span>
                  </p>
                </div>

                <div className="apsc-footer-alert">
                  <AlertCircle size={15} className="alert-icon" />
                  <span>Seats are limited. Enrol now and begin your preparation with confidence!</span>
                </div>

                {/* ── Action Buttons ── */}
                <div className="apsc-action-row">
                  <button
                    className="apsc-btn-primary"
                    onClick={() => setShowEnrolModal(true)}
                  >
                    <Send size={15} /> Enrol Now
                  </button>
                  <a
                    href="https://wa.me/918822823003?text=Hi%2C%20I%20am%20interested%20in%20APSC%20Forest%20Ranger%20Prelims%20Test%20Series%202026"
                    target="_blank"
                    rel="noreferrer"
                    className="apsc-btn-whatsapp"
                  >
                    <MessageCircle size={16} /> WhatsApp Enquiry
                  </a>
                  <a href="tel:+918822823003" className="apsc-btn-phone">
                    <Phone size={15} /> Call 8822823003
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Enrolment Modal ── */}
      {showEnrolModal && (
        <div className="apsc-modal-overlay" onClick={() => setShowEnrolModal(false)}>
          <div className="apsc-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="apsc-modal-close"
              onClick={() => setShowEnrolModal(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="apsc-modal-header">
              <h3>Enrolment & Admission Enquiry</h3>
              <p>APSC Forest Ranger Prelims Test Series 2026</p>
            </div>

            {submitted ? (
              <div className="apsc-success-box">
                <CheckCircle size={40} color="#166534" />
                <h4>Enquiry Submitted!</h4>
                <p>We will contact you shortly regarding admission details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry}>
                <div className="apsc-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="apsc-form-input"
                  />
                  {errors.name && <span className="apsc-field-error">{errors.name}</span>}
                </div>

                <div className="apsc-form-group">
                  <label>Phone Number *</label>
                  <div className="apsc-phone-input-wrap">
                    <span className="prefix">+91</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="apsc-form-input"
                    />
                  </div>
                  {errors.phone && <span className="apsc-field-error">{errors.phone}</span>}
                </div>

                <div className="apsc-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="apsc-form-input"
                  />
                </div>

                <div className="apsc-form-group">
                  <label>Selected Optional Subjects</label>
                  <input
                    type="text"
                    name="optionals"
                    value={form.optionals}
                    onChange={handleInputChange}
                    placeholder="e.g. Forestry, Environment, Agriculture"
                    className="apsc-form-input"
                  />
                </div>

                <div className="apsc-form-group">
                  <label>Branch Preference</label>
                  <select
                    name="branch"
                    value={form.branch}
                    onChange={handleInputChange}
                    className="apsc-form-select"
                  >
                    <option value="Guwahati">Guwahati Center (Bhangagarh)</option>
                    <option value="Nagaon">Nagaon Center (Panigaon)</option>
                    <option value="Online">Online Access</option>
                  </select>
                </div>

                <button type="submit" disabled={submitting} className="apsc-form-submit-btn">
                  {submitting ? 'Submitting...' : 'Submit Enquiry →'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
