import { useState, useRef, useEffect, useCallback } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { MessageSquare } from 'lucide-react';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [active, setActive]             = useState(0);
  const trackRef  = useRef(null);
  const autoRef   = useRef(null);
  const pausedRef = useRef(false);

  // Fetch from Firestore
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(query(collection(db, 'testimonials'), orderBy('createdAt', 'desc')));
        setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        // If no index yet, fetch without order
        try {
          const snap = await getDocs(collection(db, 'testimonials'));
          setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch (e) {
          console.error('Failed to load testimonials:', e);
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const scrollToCard = useCallback((index) => {
    const track = trackRef.current;
    if (!track || !track.children[index]) return;
    const card = track.children[index];
    track.scrollTo({
      left: card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    });
  }, []);

  const goTo = useCallback((index) => {
    if (testimonials.length === 0) return;
    const next = (index + testimonials.length) % testimonials.length;
    setActive(next);
    scrollToCard(next);
  }, [testimonials.length, scrollToCard]);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    if (testimonials.length <= 1) return;
    autoRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => {
          const next = (prev + 1) % testimonials.length;
          scrollToCard(next);
          return next;
        });
      }
    }, 3500);
  }, [testimonials.length, scrollToCard]);

  useEffect(() => {
    if (testimonials.length > 0) startAuto();
    return () => clearInterval(autoRef.current);
  }, [testimonials.length, startAuto]);

  const pause  = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  return (
    <section className="testimonials section">
      {/* Premium glow blobs */}
      <div className="testimonials__glow-left" />
      <div className="testimonials__glow-right" />

      <div className="container">

        {/* Header */}
        <div className="testimonials__header">
          <span className="section-label">Student Stories</span>
          <h2 className="testimonials__title">
            What Our <span className="text-gold">Students Say</span>
          </h2>
          <div className="divider-gold" />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="testimonials__loader">
            <div className="testimonials__spinner" />
            <span>Loading testimonials...</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && testimonials.length === 0 && (
          <div className="testimonials__empty">
            <MessageSquare size={40} strokeWidth={1.2} />
            <p>No testimonials yet. Check back soon!</p>
          </div>
        )}

        {/* Carousel */}
        {!loading && testimonials.length > 0 && (
          <div className="testimonials__carousel"
            onMouseEnter={pause} onMouseLeave={resume}
            onTouchStart={pause} onTouchEnd={resume}>

            <div className="testimonials__track" ref={trackRef}>
              {testimonials.map((t, i) => (
                <div key={t.id}
                  className={`testimonial-card${active === i ? ' testimonial-card--active' : ''}`}
                  onClick={() => setActive(i)}>
                  
                  {/* Card Header: Rating & Quote Icon */}
                  <div className="testimonial-card__top">
                    <div className="testimonial-card__rating">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <div className="testimonial-card__quote">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                  </div>

                  <p className="testimonial-card__text">"{t.text}"</p>

                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">{t.initials}</div>
                    <div className="testimonial-card__author-info">
                      <strong className="testimonial-card__name">{t.name}</strong>
                      <span className="testimonial-card__role">{t.role}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="testimonials__controls">
              <button className="testimonials__arrow"
                onClick={() => { goTo(active - 1); startAuto(); }} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <div className="testimonials__dots">
                {testimonials.map((_, i) => (
                  <button key={i}
                    className={`testimonials__dot${active === i ? ' testimonials__dot--active' : ''}`}
                    onClick={() => { goTo(i); startAuto(); }}
                    aria-label={`Testimonial ${i + 1}`} />
                ))}
              </div>
              <button className="testimonials__arrow"
                onClick={() => { goTo(active + 1); startAuto(); }} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
