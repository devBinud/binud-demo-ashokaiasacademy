import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../../../assets/images/hero-section-image-bg.png';
import heroImage1 from '../../../assets/images/hero/1.jpeg';
import heroImage2 from '../../../assets/images/hero/2.jpg';
import './HeroSection.css';

const heroSlides = [
  { id: 1, image: heroImage1, alt: 'Ashoka IAS Academy - Toppers' },
  { id: 2, image: heroImage2, alt: 'Ashoka IAS Academy - Results' },
];

const SLIDE_DURATION = 4000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const intervalRef = useRef(null);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      navigate('next');
    }, SLIDE_DURATION);
  };

  const navigate = (dir, targetIndex = null) => {
    setDirection(dir);
    setPrev(current);
    if (targetIndex !== null) {
      setCurrent(targetIndex);
    } else if (dir === 'next') {
      setCurrent((c) => (c + 1) % heroSlides.length);
    } else {
      setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
    }
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const handleDot = (index) => {
    if (index === current) return;
    navigate(index > current ? 'next' : 'prev', index);
  };

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container hero__inner">

        {/* LEFT */}
        <div className="hero__content">
          <span className="hero__tag">
            <span className="hero__tag-dot" />
            Assam and North-East's Premier IAS Academy
          </span>

          <h1 className="hero__title">
            Premier Coaching for<br />
            <span className="hero__title-gold">UPSC, APSC</span><br />
            other Allied Exams(SSC, Banking, NDA & CDS)
          </h1>

          <p className="hero__desc">
            Join Ashoka IAS Academy - a trusted coaching institution dedicated to nurturing
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
              <strong>24×7</strong>
              <span>Support</span>
            </div>
          </div>

          <Link to="/contact" className="hero__cta-btn">
            Apply Now
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* RIGHT — Basic Clean Slider with Dot Indicators */}
        <div className="hero__slider-container">
          <div className="hero__slider">

            {/* Slides */}
            <div className="hero__slides-track">
              {heroSlides.map((slide, index) => {
                let cls = 'hero__slide';
                if (index === current) cls += ' hero__slide--active';
                else if (index === prev) cls += direction === 'next' ? ' hero__slide--exit-left' : ' hero__slide--exit-right';
                return (
                  <div key={slide.id} className={cls}>
                    <img src={slide.image} alt={slide.alt} className="hero__image" />
                  </div>
                );
              })}
            </div>

          </div>

          {/* Two Rounded indicators at the bottom outside */}
          <div className="hero__dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero__dot ${index === current ? 'hero__dot--active' : ''}`}
                onClick={() => handleDot(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
