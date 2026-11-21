import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import CtaSection from '../Home/sections/CtaSection';
import offlineBrochurePdf from '../../assets/images/offline_admission_brochure.pdf';
import './OfflineAdmission.css';

const STEPS = [
  {
    title: 'Print & fill the form',
    text: 'Fill in the candidate name, course and guardian contact details on the downloaded form.',
  },
  {
    title: 'Keep your documents ready',
    text: "2 passport-size photos, a copy of the candidate's Aadhaar card and previous marksheets.",
  },
  {
    title: 'Visit a campus',
    text: 'Walk into our Guwahati or Nagaon centre for counselling, seat allocation and registration.',
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

function triggerBrochureDownload() {
  const link = document.createElement('a');
  link.href = offlineBrochurePdf;
  link.setAttribute('download', 'Ashoka_IAS_Academy_Offline_Admission_Brochure.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function OfflineAdmission() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
    if (error) setError('');
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!phone) {
      setError('Please enter your mobile number to download.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Log the lead for administrators
      await addDoc(collection(db, 'enquiries'), {
        phone: '+91' + phone,
        name: 'Offline Brochure Lead',
        email: 'N/A',
        course: 'Offline Admission Brochure Download',
        message: 'Downloaded the offline admission brochure & enrollment form.',
        status: 'new',
        createdAt: serverTimestamp(),
        source: 'offline-brochure',
      });
    } catch (err) {
      // Still allow the download even if logging fails
      console.error('Error logging download lead:', err);
    } finally {
      triggerBrochureDownload();
      setDownloadSuccess(true);
      setPhone('');
      setIsSubmitting(false);
      setTimeout(() => setDownloadSuccess(false), 8000);
    }
  };

  return (
    <div className="offline-page">
      <SEO
        title="Offline Admission & Brochure"
        description="Download the offline enrollment package, application form, and brochure, or find guidelines for direct walk-in admission at our campuses."
      />
      <PageHeader
        title="Offline Admission & Brochure"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Admissions', to: '/online-application' },
          { label: 'Offline Admission' },
        ]}
      />

      {/* ── Brochure + steps ── */}
      <section className="offline-main">
        <div className="container offline-main__grid">

          <div className="offline-brochure">
            <h2 className="offline-title">
              Get the admission <span>brochure</span>
            </h2>
            <p className="offline-lead">
              Enter your mobile number to download the brochure and registration form as a
              printable PDF.
            </p>

            <form className="offline-form" onSubmit={handleDownload} noValidate>
              <label htmlFor="offline-phone" className="sr-only">Mobile number</label>
              <div className={`offline-field${error ? ' offline-field--error' : ''}`}>
                <span className="offline-field__code">+91</span>
                <input
                  id="offline-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength="10"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'offline-phone-error' : undefined}
                />
                <button type="submit" className="offline-field__btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="offline-spinner" aria-hidden="true" />
                      Preparing…
                    </>
                  ) : (
                    <>
                      Download PDF
                      <i className="fa-solid fa-arrow-down" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p id="offline-phone-error" className="offline-form__error" role="alert">{error}</p>
              )}

              {downloadSuccess && (
                <p className="offline-form__success" role="status">
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                  Your brochure is downloading. Print the form inside to register offline.
                </p>
              )}
            </form>

            <ul className="offline-includes">
              <li><i className="fa-solid fa-check" aria-hidden="true" />Admission brochure</li>
              <li><i className="fa-solid fa-check" aria-hidden="true" />Printable registration form</li>
            </ul>
          </div>

          <div className="offline-steps">
            <h3 className="offline-steps__title">How to apply offline</h3>
            <ol>
              {STEPS.map((s, i) => (
                <li key={s.title} className="offline-step">
                  <span className="offline-step__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </section>

      {/* ── Campuses ── */}
      <section className="offline-campuses">
        <div className="container">
          <div className="offline-campuses__head">
            <h2 className="offline-title">Visit a <span>campus</span></h2>
          </div>

          <div className="offline-campuses__grid">
            {CAMPUSES.map((c) => (
              <article key={c.name} className="campus">
                <i className="fa-solid fa-location-dot campus__icon" aria-hidden="true" />
                <div className="campus__body">
                  <h3>{c.name}</h3>
                  <p>{c.address}</p>
                  <span className="campus__hours">
                    <i className="fa-regular fa-clock" aria-hidden="true" />
                    {c.hours}
                  </span>
                  <a className="campus__link" href={mapsUrl(c.address)} target="_blank" rel="noopener noreferrer">
                    Get directions <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
