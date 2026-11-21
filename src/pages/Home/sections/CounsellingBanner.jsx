import { Link } from 'react-router-dom';
import './CounsellingBanner.css';

/* Flat illustration: a student at a laptop with idea / book / target bubbles */
function StudentArt() {
  return (
    <svg className="cb-art" viewBox="0 0 240 170" fill="none" aria-hidden="true">
      {/* chair */}
      <rect x="22" y="92" width="16" height="64" rx="6" fill="#c9a227" />
      {/* body */}
      <path d="M44 166c0-34 12-58 34-58s34 24 34 58z" fill="#a9c4ea" />
      <path d="M70 110l8 12 8-12" fill="#fff" />
      {/* arm to laptop */}
      <path d="M100 132c14 4 30 6 46 4" stroke="#a9c4ea" strokeWidth="12" strokeLinecap="round" />
      {/* neck + head */}
      <rect x="72" y="96" width="12" height="14" rx="4" fill="#f2c7a5" />
      <circle cx="78" cy="84" r="16" fill="#f2c7a5" />
      <path d="M61 82c0-13 8-21 18-21 11 0 18 7 18 16-7-1-14-5-18-11-4 7-10 13-18 16z" fill="#1b2a4a" />
      <circle cx="72" cy="86" r="1.6" fill="#1b2a4a" />
      <circle cx="84" cy="86" r="1.6" fill="#1b2a4a" />
      <path d="M74 93c2.5 2 5.5 2 8 0" stroke="#b5694a" strokeWidth="1.6" strokeLinecap="round" />
      {/* laptop */}
      <rect x="138" y="104" width="62" height="40" rx="4" fill="#f4f6fa" />
      <circle cx="169" cy="124" r="2.4" fill="#c5d0e3" />
      <rect x="128" y="144" width="92" height="7" rx="3.5" fill="#dfe5ef" />

      {/* bubble: chat lines */}
      <rect x="4" y="44" width="46" height="34" rx="7" fill="#f5c542" />
      <path d="M38 78l4 10 6-10z" fill="#f5c542" />
      <rect x="11" y="52" width="28" height="4" rx="2" fill="#fff" />
      <rect x="11" y="59" width="32" height="4" rx="2" fill="#fff" />
      <rect x="11" y="66" width="20" height="4" rx="2" fill="#fff" />

      {/* bubble: graduation cap */}
      <circle cx="104" cy="22" r="20" fill="#f5c542" />
      <path d="M96 40l-4 10 12-7z" fill="#f5c542" />
      <path d="M104 13l14 6-14 6-14-6z" fill="#fff" />
      <path d="M96 22v6c0 2 4 4 8 4s8-2 8-4v-6l-8 3z" fill="#fff" />

      {/* bubble: book */}
      <circle cx="152" cy="66" r="18" fill="#f5c542" />
      <path d="M140 80l-6 8 12-3z" fill="#f5c542" />
      <path d="M142 59c4-2 7-2 10 1v13c-3-3-6-3-10-1zM162 59c-4-2-7-2-10 1v13c3-3 6-3 10-1z" fill="#fff" />
    </svg>
  );
}

export default function CounsellingBanner() {
  return (
    <section className="cb">
      <div className="container cb__inner">
        <StudentArt />

        <h2 className="cb__title">
          Not sure where to <span>start?</span>
        </h2>

        <Link to="/contact" className="cb__btn">
          Book free counselling <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
