import { Link } from 'react-router-dom';
import './Footer.css';
import SOCIAL_LINKS from './socialLinks';

const EXAM_LINKS = ['UPSC', 'APSC', 'ADRE', 'SSC', 'Banking', 'NDA'];

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: "Founder's Desk", to: '/founders-vision' },
  { label: 'YouTube Section', to: '/youtube-lectures' },
  { label: 'Courses', to: '/courses' },
  { label: 'Contact', to: '/contact' },
];

const COURSE_LINKS = [
  { label: 'Foundation Programs', to: '/courses' },
  { label: 'Concept-Building Courses', to: '/courses' },
  { label: 'Test Series', to: '/courses' },
  { label: 'Mains Answer Writing', to: '/courses' },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Exam Tags Bar */}
      <div className="footer__exam-bar">
        <div className="container footer__exam-bar-inner">
          {EXAM_LINKS.map((exam) => (
            <span key={exam} className="footer__exam-tag">
              {exam}
            </span>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <p className="footer__tagline">
              Transforming your dreams into reality
            </p>
            <p className="footer__desc">
              Premier UPSC &amp; APSC coaching in Assam and North-East India,
              dedicated to nurturing future civil servants.
            </p>
            <div className="footer__social">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="footer__social-link">
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__list">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="footer__list-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="footer__col">
            <h4 className="footer__col-title">Our Courses</h4>
            <ul className="footer__list">
              {COURSE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="footer__list-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <ul className="footer__contact-list">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>
                  <strong style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>Guwahati</strong>
                  1st Floor, Nath Complex, Opp. Aruna Memorial Hospital, Rajgarh Road, Bhangagarh, Guwahati – 781005
                </span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>
                  <strong style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>Nagaon</strong>
                  Sankar Mission, Panigaon Chari Ali, Opp. Reliance Trends, Nagaon – 782001
                </span>
              </li>
              <li>
                <div className="footer__phone-list">
                  <div className="footer__phone-row">
                    <a href="https://wa.me/918822823003" target="_blank" rel="noreferrer" className="footer__phone-icon footer__phone-icon--wa" aria-label="WhatsApp">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                    </a>
                    <a href="https://wa.me/918822823003" target="_blank" rel="noreferrer" className="footer__contact-link">+91 88228 23003</a>
                  </div>
                  <div className="footer__phone-row">
                    <a href="tel:+919181411843" className="footer__phone-icon" aria-label="Call">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg>
                    </a>
                    <a href="tel:+919181411843" className="footer__contact-link">+91 91814 11843</a>
                  </div>
                </div>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <a href="mailto:ashokaiasacademy123@gmail.com" className="footer__contact-link">ashokaiasacademy123@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Ashoka IAS Academy. All rights reserved.</p>
          <p className="footer__developer">
            Developed & Maintained by <a href="https://binudsoftwaresolutions.in" target="_blank" rel="noopener noreferrer">Binud Software Solutions</a>
          </p>
          <div className="footer__bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-use">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
