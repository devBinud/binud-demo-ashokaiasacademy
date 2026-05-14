import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpeg';
import './Footer.css';

const EXAM_LINKS = ['UPSC', 'APSC', 'ADRE', 'SSC', 'Banking', 'NDA'];

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
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
            {/* <Link to="/" className="footer__logo">
              <img src={logo} alt="Ashoka IAS Academy" />
            </Link> */}
            <p className="footer__tagline">
              Empowering Aspirations. Shaping Leaders.
            </p>
            <p className="footer__desc">
              Premier UPSC &amp; APSC coaching in Assam and North-East India,
              dedicated to nurturing future civil servants.
            </p>
            <div className="footer__social">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer__social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer__social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer__social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram" className="footer__social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.498c-1.073.422-1.068 1.014-.196 1.276l4.232 1.323 1.64 5.013c.198.604.756.83 1.27.53l2.36-1.965 4.63 3.408c.853.47 1.467.228 1.68-.79l3.044-14.33c.31-1.24-.473-1.8-1.138-1.178z"/></svg>
              </a>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>
                  <strong style={{display:'block', color:'rgba(255,255,255,0.7)', marginBottom:'2px'}}>Guwahati</strong>
                  1st Floor, Nath Complex, Opp. Aruna Memorial Hospital, Rajgarh Road, Bhangagarh, Guwahati – 781005
                </span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>
                  <strong style={{display:'block', color:'rgba(255,255,255,0.7)', marginBottom:'2px'}}>Nagaon</strong>
                  Sankar Mission, Panigaon Chari Ali, Opp. Reliance Trends, Nagaon – 782001
                </span>
              </li>
              <li>
                <div className="footer__phone-list">
                  <div className="footer__phone-row">
                    <a href="https://wa.me/918822823003" target="_blank" rel="noreferrer" className="footer__phone-icon footer__phone-icon--wa" aria-label="WhatsApp">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                    </a>
                    <a href="https://wa.me/918822823003" target="_blank" rel="noreferrer" className="footer__contact-link">+91 88228 23003</a>
                  </div>
                  <div className="footer__phone-row">
                    <a href="tel:+919181411843" className="footer__phone-icon" aria-label="Call">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
                    </a>
                    <a href="tel:+919181411843" className="footer__contact-link">+91 91814 11843</a>
                  </div>
                </div>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
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
          <div className="footer__bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-use">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
