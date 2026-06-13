import logo from '../../../assets/images/logo-small.png';
import './CtaSection.css';

export default function CtaSection() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner">

        {/* Left — Logo */}
        <div className="cta-banner__logo">
          <img src={logo} alt="Ashoka IAS Academy" />
        </div>

        {/* Center — Text */}
        <div className="cta-banner__text">
          <h2 className="cta-banner__title">
            JOIN ASHOKA IAS ACADEMY TODAY
          </h2>
          <p className="cta-banner__sub">
            Get in touch with our counselling experts for a free career consultation.
          </p>
        </div>

        {/* Right — Phone */}
        <div className="cta-banner__action">
          <a href="tel:+919181411843" className="cta-banner__btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span style={{ margin: '0px 10px' }}>Call Now</span> +91 91814 11843
          </a>
        </div>

      </div>
    </section>
  );
}
