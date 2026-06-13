import { Link } from 'react-router-dom';
import { Phone, Mail, Lock } from 'lucide-react';
import './Topbar.css';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">

        {/* Left — Phone and Email */}
        <div className="topbar__left">
          <a href="tel:+919181411843" className="topbar__item">
            <Phone size={13} className="topbar__icon" />
            <span className="topbar__text">+91 91814 11843</span>
          </a>
          <span className="topbar__separator topbar__left-separator">|</span>
          <a href="mailto:ashokaiasacademy123@gmail.com" className="topbar__item topbar__left-email">
            <Mail size={13} className="topbar__icon" />
            <span className="topbar__text">ashokaiasacademy123@gmail.com</span>
          </a>
        </div>

        {/* Right — Contact, Admin */}
        <div className="topbar__right">
          <Link to="/contact" className="topbar__item topbar__link topbar__right-contact">
            <Mail size={13} className="topbar__icon" />
            <span className="topbar__text">Contact</span>
          </Link>
          <span className="topbar__separator topbar__right-separator">|</span>
          <Link to="/admin" className="topbar__item topbar__link topbar__right-admin">
            <Lock size={13} className="topbar__icon" />
            <span className="topbar__text">Admin</span>
          </Link>
        </div>

      </div>
    </div>
  );
}


