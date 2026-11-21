import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toppersImg from '../../../assets/images/hero/1.jpeg';
import collabImg from '../../../assets/images/hero/3.png';
import kaushikImg from '../../../assets/images/hero/toppers/kaushik-kalita.png';
import asimImg from '../../../assets/images/hero/toppers/asim-kr-mandol.png';
import './HeroSection.css';

/* ============================================================
   SLIDES — edit text / links here
   type 'duo'     → two people on the sides, headline in the middle
   type 'feature' → headline on the left, image card on the right
   ============================================================ */
const SLIDES = [
  {
    id: 'determination',
    type: 'duo',
    kicker: 'Our Achievers',
    titleTop: 'Where Determination',
    titleBottom: 'Meets',
    titleHighlight: 'Success',
    sub: 'Structured guidance · Expert mentorship · Proven results',
    cta: { label: 'Start Your Journey With Us', to: '/online-application' },
    people: [
      { name: 'Kaushik Kalita', role: 'APS', rank: 'Rank 3', image: kaushikImg },
      { name: 'Asim Kr Mandol', role: 'Sub Registrar', rank: 'Rank 23', image: asimImg },
    ],
  },
  {
    id: 'results',
    type: 'feature',
    kicker: 'UPSC · APSC · Allied Exams',
    titleTop: 'Our Toppers,',
    titleHighlight: 'Our Pride',
    sub: 'Trusted by 500+ aspirants across Assam and North-East India.',
    cta: { label: 'View Our Results', to: '/results' },
    image: toppersImg,
    imageAlt: 'Ashoka IAS Academy toppers and rank holders',
  },
  {
    id: 'collaboration',
    type: 'feature',
    kicker: 'In Collaboration With',
    titleTop: 'UPSC Guide ×',
    titleHighlight: 'Ashoka IAS',
    sub: 'By the Achievers, for the Aspirants.',
    cta: { label: 'Explore UPSC Guide', to: '/upsc-guide' },
    image: collabImg,
    imageAlt: 'UPSC Guide and Ashoka IAS Academy collaboration',
  },
];

const SLIDE_DURATION = 5000;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function SlideCta({ cta }) {
  return (
    <Link to={cta.to} className="hs__cta">
      <span>{cta.label}</span>
      <Arrow />
    </Link>
  );
}

function Person({ person, side }) {
  return (
    <figure className={`hs__person hs__person--${side}`}>
      <div className="hs__photo-ring">
        <img src={person.image} alt={person.name} className="hs__photo" />
        <span className="hs__rank">{person.rank}</span>
      </div>
      <figcaption className="hs__caption">
        <strong>{person.name}</strong>
        <span>{person.role}</span>
      </figcaption>
    </figure>
  );
}

function Slide({ slide, index }) {
  const eager = index === 0;
  return (
    <div className={`hs__slide hs__slide--${slide.type}`}>
      {slide.type === 'duo' ? (
        <>
          <Person person={slide.people[0]} side="left" />
          <div className="hs__center">
            <span className="hs__kicker">{slide.kicker}</span>
            <h2 className="hs__title">
              {slide.titleTop}
              <br />
              {slide.titleBottom} <span className="hs__hl">{slide.titleHighlight}</span>
            </h2>
            <p className="hs__sub">{slide.sub}</p>
          </div>
          <Person person={slide.people[1]} side="right" />
          <div className="hs__cta-row">
            <SlideCta cta={slide.cta} />
          </div>
        </>
      ) : (
        <>
          <div className="hs__text">
            <span className="hs__kicker">{slide.kicker}</span>
            <h2 className="hs__title">
              {slide.titleTop}
              <br />
              <span className="hs__hl">{slide.titleHighlight}</span>
            </h2>
            <span className="hs__rule" aria-hidden="true" />
            <p className="hs__sub">{slide.sub}</p>
          </div>
          <div className="hs__media">
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading={eager ? 'eager' : 'lazy'}
            />
          </div>
          <div className="hs__cta-row">
            <SlideCta cta={slide.cta} />
          </div>
        </>
      )}
    </div>
  );
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = SLIDES.length;

  const goTo = useCallback((i) => setCurrent(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* Autoplay — restarts after every slide change, pauses on hover/focus */
  useEffect(() => {
    if (paused) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const t = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [current, paused, next]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <>
      {/* ── Full-width banner slider ── */}
      <section
        className="hs"
        aria-roledescription="carousel"
        aria-label="Highlights"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
      >
        <div className="hs__viewport">
          <div className="hs__track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {SLIDES.map((slide, i) => (
              <div
                key={slide.id}
                className="hs__frame"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== current}
                inert={i !== current}
              >
                <Slide slide={slide} index={i} />
              </div>
            ))}
          </div>

          <button type="button" className="hs__arrow hs__arrow--prev" onClick={prev} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" className="hs__arrow hs__arrow--next" onClick={next} aria-label="Next slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          <div className="hs__dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`hs__dot${i === current ? ' hs__dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro card overlapping the slider ── */}
      <section className="hero-intro">
        <div className="container">
          <div className="hero-intro__card">
            <div className="hero-intro__content">
              <h1 className="hero-intro__title">
                Premier Coaching for UPSC, <span>APSC &amp; Allied Exams.</span>
              </h1>
              <p className="hero-intro__desc">
                Join Ashoka IAS Academy, a trusted institution nurturing future civil servants
                across Assam and North-East India through structured programmes, expert
                mentorship and result-oriented preparation for UPSC, APSC, SSC, Banking,
                NDA &amp; CDS.
              </p>
              <div className="hero-intro__actions">
                <Link to="/online-application" className="hero-intro__btn hero-intro__btn--primary">
                  Apply Now <Arrow />
                </Link>
                <Link to="/courses-all" className="hero-intro__btn hero-intro__btn--ghost">
                  Explore Courses
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
