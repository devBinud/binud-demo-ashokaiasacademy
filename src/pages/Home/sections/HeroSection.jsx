import { Link } from 'react-router-dom';
import heroImage from '../../../assets/images/3.jpeg';
import heroBg from '../../../assets/images/hero-section-image-bg.png';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container hero__inner">

        {/* LEFT */}
        <div className="hero__content">

          <span className="hero__tag">Assam and North-East's Premier IAS Academy</span>

          <h1 className="hero__title">
            Premier Coaching for<br />
            <span className="hero__title-gold">UPSC, APSC</span><br />
            and Civil Services
          </h1>

          <p className="hero__desc">
            Join Ashoka IAS Academy — a trusted coaching institution dedicated to nurturing
            future civil servants through structured programs, expert mentorship, and
            result-oriented preparation.
          </p>

          <p className="hero__trust">
            <strong>Trusted by 500+ aspirants across Assam and North-East India</strong>
          </p>

          {/* Stat boxes */}
          <div className="hero__stats">
            <div className="hero__stat">
              <strong>500+</strong>
              <span>Students Enrolled</span>
            </div>
            <div className="hero__stat">
              <strong>50+</strong>
              <span>Selections</span>
            </div>
            <div className="hero__stat">
              <strong>24x7</strong>
              <span>Support</span>
            </div>
          </div>

          <Link to="/contact" className="hero__cta-btn">
            Apply Now &rarr;
          </Link>

        </div>

        {/* RIGHT */}
        <div className="hero__image-wrap">
          <img src={heroImage} alt="Ashoka IAS Academy" className="hero__image" />
        </div>

      </div>
    </section>
  );
}
