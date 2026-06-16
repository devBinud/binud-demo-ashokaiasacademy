import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { MapPin, Clock, Phone, Mail, FileText, Download, CheckCircle } from 'lucide-react';
import './OfflineAdmission.css';
import offlineBrochurePdf from '../../assets/images/offline_admission_brochure.pdf';
import admissionBg from '../../assets/images/4.jpg'; // high-quality classroom context image
import CtaSection from '../Home/sections/CtaSection';


export default function OfflineAdmission() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Auto-scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
    if (error) setError('');
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    // Indian 10-digit phone validation
    if (!phone) {
      setError('Phone number is required before downloading.');
      return;
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Log the lead in Firebase DB for administrators
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

      // 2. Programmatically trigger the PDF download
      const link = document.createElement('a');
      link.href = offlineBrochurePdf;
      link.setAttribute('download', 'Ashoka_IAS_Academy_Offline_Admission_Brochure.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setPhone('');

      // Auto-clear success banner after a few seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 8000);

    } catch (err) {
      console.error('Error logging download lead:', err);
      // Still allow the download even if Firebase logs fail
      const link = document.createElement('a');
      link.href = offlineBrochurePdf;
      link.setAttribute('download', 'Ashoka_IAS_Academy_Offline_Admission_Brochure.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setPhone('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="offline-admission-page">
      {/* Premium Breadcrumbs Navigation Strip */}
      <div className="admission-breadcrumbs">
        <div className="breadcrumbs-inner">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item-parent">Admissions</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Offline Admission</span>
        </div>
      </div>

      <div className="offline-container">

        {/* LEFT COLUMN: Clean Brand Banner Image (Flawless split panel) */}
        <div className="offline-banner" style={{ backgroundImage: `url(${admissionBg})` }} />

        {/* RIGHT COLUMN: Interactive Brochure Form & Campus Guide */}
        <div className="offline-content-wrapper">
          <div className="offline-content__card">

            <div className="offline-content__header">
              <h2 className="offline-content__title">Offline Admission</h2>
              <p className="offline-content__subtitle">
                Download the offline enrollment brochure & registration form, or explore direct walk-in guidelines.
              </p>
            </div>

            {/* BROCHURE DOWNLOAD FORM SECTION (Takes ONLY phone number) */}
            <div className="brochure-download-box">
              <div className="download-box-header">
                <FileText className="download-box-icon" size={20} />
                <span>Brochure & Registration Form Download</span>
              </div>

              <form className="download-phone-form" onSubmit={handleDownload} noValidate>
                <p className="download-instruction">
                  Enter your mobile number to unlock and immediately download the printable PDF admission package.
                </p>

                <div className="download-input-group">
                  <div className={`offline-phone-wrapper ${error ? 'offline-phone-wrapper--invalid' : ''}`}>
                    <span className="offline-prefix">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="22" height="15" style={{borderRadius:'2px', boxShadow:'0 1px 3px rgba(0,0,0,0.18)', flexShrink:0}}>
                        <rect width="900" height="200" fill="#FF9933"/>
                        <rect y="200" width="900" height="200" fill="#FFFFFF"/>
                        <rect y="400" width="900" height="200" fill="#138808"/>
                        <circle cx="450" cy="300" r="90" fill="none" stroke="#000080" strokeWidth="9"/>
                        {[...Array(24)].map((_,i)=>{
                          const a=(i/24)*2*Math.PI;
                          return <line key={i} x1={450+70*Math.cos(a)} y1={300+70*Math.sin(a)} x2={450+90*Math.cos(a)} y2={300+90*Math.sin(a)} stroke="#000080" strokeWidth="4"/>;
                        })}
                        <circle cx="450" cy="300" r="18" fill="#000080"/>
                      </svg>
                      <span className="offline-prefix__divider">|</span>
                      <span className="offline-prefix__code">+91</span>
                    </span>
                    <input
                      type="tel"
                      maxLength="10"
                      className="offline-phone-input"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={handlePhoneChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`btn-download-brochure ${isSubmitting ? 'btn-download-brochure--loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="download-spinner" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Download PDF
                        <Download size={16} style={{ marginLeft: '8px' }} />
                      </>
                    )}
                  </button>
                </div>

                {error && <span className="offline-form__error">{error}</span>}
              </form>

              {downloadSuccess && (
                <div className="download-success-banner">
                  <CheckCircle size={18} className="text-success-icon" style={{ marginRight: '10px', flexShrink: 0 }} />
                  <div>
                    <strong>Download Triggered Successfully!</strong>
                    <p>Your brochure PDF is downloading. Please print the enclosed admission form to register offline.</p>
                  </div>
                </div>
              )}
            </div>

            {/* DIRECT WALK-IN REGISTRATION TIMELINE */}
            <div className="walkin-guide-section">
              <h3 className="section-title">
                Offline Admission Walk-in Steps
              </h3>

              <div className="walkin-timeline">

                <div className="timeline-item">
                  <div className="timeline-badge">1</div>
                  <div className="timeline-content">
                    <h4>Print & Complete the Form</h4>
                    <p>Print the downloaded application form and fill in details such as candidate name, course program, and guardian contact details.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-badge">2</div>
                  <div className="timeline-content">
                    <h4>Gather Necessary Documents</h4>
                    <p>Prepare 2 passport-size photographs, a copy of the candidate's Aadhaar card, and copies of previous academic marksheets.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-badge">3</div>
                  <div className="timeline-content">
                    <h4>Visit a Regional Branch Campus</h4>
                    <p>Walk into our Guwahati or Nagaon centers for counseling, face-to-face seat allocations, and physical registration.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* BRANCH SPECIFICATIONS */}
            <div className="branches-grid">

              <div className="branch-card">
                <div className="branch-card__header">
                  <MapPin size={16} className="branch-icon" style={{ flexShrink: 0 }} />
                  <h4>Guwahati Campus</h4>
                </div>
                <p className="branch-detail">1st Floor, Nath Complex, Opp. Aruna Memorial Hospital, Rajgarh Road, Bhangagarh, Guwahati – 781005</p>
                <div className="branch-hours">
                  <Clock size={12} style={{ marginRight: '6px', flexShrink: 0 }} />
                  <span>Mon – Sat: 10:00 AM – 6:00 PM</span>
                </div>
              </div>

              <div className="branch-card">
                <div className="branch-card__header">
                  <MapPin size={16} className="branch-icon" style={{ flexShrink: 0 }} />
                  <h4>Nagaon Campus</h4>
                </div>
                <p className="branch-detail">Sankar Mission, Panigaon Chari Ali, Opp. Reliance Trends, Nagaon – 782001</p>
                <div className="branch-hours">
                  <Clock size={12} style={{ marginRight: '6px', flexShrink: 0 }} />
                  <span>Mon – Sat: 9:30 AM – 5:30 PM</span>
                </div>
              </div>

            </div>

            {/* HELP LINES AND SUPPORT info */}
            <div className="offline-help-banner">
              <div className="help-column">
                <div className="help-icon-container">
                  <Phone size={16} />
                </div>
                <div>
                  <span>Contact Helpline</span>
                  <strong>+91 91814 11843</strong>
                </div>
              </div>
              <div className="help-divider" />
              <div className="help-column">
                <div className="help-icon-container">
                  <Mail size={16} />
                </div>
                <div>
                  <span>Official Email</span>
                  <strong>ashokaiasacademy123@gmail.com</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <CtaSection />
    </div>
  );
}
