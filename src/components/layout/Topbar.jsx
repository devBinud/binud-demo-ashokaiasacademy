import { Link } from 'react-router-dom';
import './Topbar.css';

/* ── Edit the announcement here ── */
const ANNOUNCEMENT = {
  highlight: 'Admissions Open:',
  text: 'UPSC & APSC Foundation Batch',
  cta: 'Enroll Now',
  to: '/online-application',
};

const SOCIALS = [
  { label: 'YouTube', href: 'https://youtube.com', icon: 'fa-brands fa-youtube' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'fa-brands fa-instagram' },
  { label: 'WhatsApp', href: 'https://wa.me/918822823003', icon: 'fa-brands fa-whatsapp' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'fa-brands fa-facebook-f' },
  { label: 'Telegram', href: 'https://t.me', icon: 'fa-brands fa-telegram' },
];

export default function Topbar() {
  return (
    <div className="topbar">
      {/* ── Announcement bar ── */}
      <div className="topbar__announce">
        <div className="topbar__announce-inner">
          <span className="topbar__announce-text">
            <i className="topbar__pulse" aria-hidden="true" />
            <b>{ANNOUNCEMENT.highlight} </b>
            {ANNOUNCEMENT.text}
          </span>
          <Link to={ANNOUNCEMENT.to} className="topbar__enroll">
            {ANNOUNCEMENT.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Contact / social strip ── */}
      <div className="topbar__strip">
        <div className="container topbar__strip-inner">
          <div className="topbar__contact">
            <a href="tel:+919181411843" className="topbar__contact-item">
              <i className="fa-solid fa-phone" aria-hidden="true" />
              <span>+91 91814 11843</span>
            </a>
            <a href="mailto:ashokaiasacademy123@gmail.com" className="topbar__contact-item topbar__contact-item--email">
              <i className="fa-solid fa-envelope" aria-hidden="true" />
              <span>ashokaiasacademy123@gmail.com</span>
            </a>
          </div>

          <div className="topbar__right">
            <div className="topbar__socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="topbar__social">
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
            <Link to="/signup" className="topbar__login">Login/Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
