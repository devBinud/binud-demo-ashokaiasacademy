import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import CustomSelect from '../../components/ui/CustomSelect';
import { MapPin, Clock, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import './Contact.css';
import CtaSection from '../Home/sections/CtaSection';

const COURSES = [
  'Foundation Program — 1 Year',
  'Foundation Program — 2 Year',
  'NCERT Foundation Course',
  'Prelims Test Series',
  'Mains Test Series',
  'Answer Writing Program',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setForm((prev) => ({ ...prev, phone: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error on change
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
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
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
      setForm({ name: '', phone: '', email: '', course: '', message: '' });
      setErrors({});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1 className="page-hero__title">
            Contact <span className="text-gold">Us</span>
          </h1>
          <div className="divider-gold" />
          <p className="page-hero__desc">
            Have questions about our courses? Ready to apply? We're here to help you
            take the next step in your civil services journey.
          </p>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container contact-main__grid">

          {/* ── LEFT INFO ── */}
          <div className="contact-info">
            <h2 className="contact-info__title">
              We're Here to <span className="text-gold">Help</span>
            </h2>
            <div className="divider-gold" />
            <p className="contact-info__desc">
              Reach out to us for admissions, course enquiries, or any other information.
              Our team will get back to you within 24 hours.
            </p>

            <div className="contact-info__items">

              {/* Guwahati Branch */}
              <div className="contact-info__branch-label">
                <MapPin size={19} strokeWidth={2} />   Guwahati Branch
              </div>
              <div className="contact-info__item">
                <div className="contact-info__icon"><MapPin size={18} strokeWidth={1.8} /></div>
                <div>
                  <strong>Address</strong>
                  <span>1st Floor, Nath Complex, Opp. Aruna Memorial Hospital, Rajgarh Road, Bhangagarh, Guwahati – 781005</span>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="contact-info__icon"><Clock size={18} strokeWidth={1.8} /></div>
                <div>
                  <strong>Office Hours</strong>
                  <span>Mon – Sat: 10:00 AM – 6:00 PM</span>
                </div>
              </div>

              {/* Nagaon Branch */}
              <div className="contact-info__branch-label" style={{ marginTop: 'var(--space-2)' }}>
                <MapPin size={18} strokeWidth={2} /> Nagaon Branch
              </div>
              <div className="contact-info__item">
                <div className="contact-info__icon"><MapPin size={18} strokeWidth={1.8} /></div>
                <div>
                  <strong>Address</strong>
                  <span>Sankar Mission, Panigaon Chari Ali, Opp. Reliance Trends, Nagaon – 782001</span>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="contact-info__icon"><Clock size={18} strokeWidth={1.8} /></div>
                <div>
                  <strong>Office Hours</strong>
                  <span>Mon – Sat: 9:30 AM – 5:30 PM</span>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-info__item">
                <div className="contact-info__icon"><Phone size={18} strokeWidth={1.8} /></div>
                <div>
                  <strong>Phone</strong>
                  <div className="contact-phone-list">
                    <div className="contact-phone-row">
                      <a href="https://wa.me/918822823003" target="_blank" rel="noreferrer"
                        className="contact-phone-icon contact-phone-icon--wa" aria-label="WhatsApp">
                        <MessageCircle size={14} strokeWidth={2} />
                      </a>
                      <a href="https://wa.me/918822823003" target="_blank" rel="noreferrer"
                        className="contact-phone-num">+91 88228 23003</a>
                    </div>
                    <div className="contact-phone-row">
                      <a href="tel:+919181411843" className="contact-phone-icon" aria-label="Call">
                        <Phone size={14} strokeWidth={2} />
                      </a>
                      <a href="tel:+919181411843" className="contact-phone-num">+91 91814 11843</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="contact-info__item">
                <div className="contact-info__icon"><Mail size={18} strokeWidth={1.8} /></div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:ashokaiasacademy123@gmail.com">ashokaiasacademy123@gmail.com</a>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT FORM ── */}
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__header">
                <h2>Apply Now</h2>
                <p>Fill in your details and we'll get back to you shortly.</p>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="name">Full Name *</label>
                  <input id="name" name="name" type="text" className={`input${errors.name ? ' input--error' : ''}`}
                    placeholder="Enter your full name" value={form.name}
                    onChange={handleChange} />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="contact-form__field">
                  <label htmlFor="phone">Phone Number </label>
                  <div className={`contact-phone-input-wrap${errors.phone ? ' input-wrap--error' : ''}`}>
                    <div className="contact-phone-prefix">
                      <Phone size={13} strokeWidth={2} />
                      <span>+91</span>
                    </div>
                    <input id="phone" name="phone" type="tel" inputMode="numeric"
                      className="input" placeholder="XXXXX XXXXX"
                      value={form.phone} onChange={handleChange} maxLength={10} />
                  </div>
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="contact-form__field">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" className="input"
                  placeholder="your@email.com" value={form.email} onChange={handleChange} />
              </div>

              <div className="contact-form__field">
                <label htmlFor="course">Select Course <span style={{color:'red'}}>*</span> </label>
                <CustomSelect id="course" name="course" value={form.course}
                  onChange={handleChange} options={COURSES} placeholder="— Select a Course —" />
                {errors.course && <span className="form-error">{errors.course}</span>}
              </div>

              <div className="contact-form__field">
                <label htmlFor="message">Message (Optional)</label>
                <textarea id="message" name="message" className="input contact-form__textarea"
                  placeholder="Any specific questions or requirements..."
                  value={form.message} onChange={handleChange} rows={4} />
              </div>

              {submitted && (
                <div className="contact-success-banner">
                  <CheckCircle size={16} strokeWidth={2} />
                  <span>Application submitted! We'll contact you within 24 hours.</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary contact-form__submit">
                Submit Application →
              </button>
            </form>
          </div>

        </div>
      </section>
      <CtaSection/>
    </div>
  );
}
