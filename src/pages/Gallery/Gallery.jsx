import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import crossLine from '../../assets/images/cross-line.png';
import './Gallery.css';
import CtaSection from '../Home/sections/CtaSection';

// ── Gallery data ──
// Replace src values with your actual image paths as you add photos.
// Categories: 'classroom' | 'news' | 'achievements'
const GALLERY_ITEMS = [
  { id: 1,  src: '/gallery/classroom/4.jpg',   category: 'classroom',},
  { id: 2,  src: '/gallery/classroom/2.jpeg',   category: 'classroom',},
  { id: 3,  src: '/gallery/classroom/3.jpeg',   category: 'classroom', },
  { id: 4,  src: '/gallery/classroom/1.jpeg',   category: 'classroom', },
  { id: 5,  src: '/gallery/newsandmedia/1.jpeg', category: 'news', },
  { id: 6,  src: '/gallery/newsandmedia/2.jpeg', category: 'news',  },
  { id: 7,  src: '/gallery/newsandmedia/3.jpeg', category: 'news', },
  { id: 8, src: '/gallery/newsandmedia/4.jpeg', category: 'news',  },
  { id: 9, src: '/gallery/events/1.jpeg',  category: 'events', },
  { id: 10, src: '/gallery/events/2.jpeg',  category: 'events',},
  { id: 11, src: '/gallery/events/3.jpeg',  category: 'events', },
  { id: 12, src: '/gallery/events/4.jpeg',  category: 'events', },
  { id: 13, src: '/gallery/events/5.jpeg',  category: 'events',},
  { id: 14, src: '/gallery/events/6.jpeg',  category: 'events', },
  { id: 15, src: '/gallery/events/7.jpeg',  category: 'events',  },
  { id: 16, src: '/gallery/events/8.jpeg',  category: 'events', },
  { id: 17, src: '/gallery/events/9.jpeg',  category: 'events',  },
  { id: 18, src: '/gallery/events/10.jpeg',  category: 'events', },
  { id: 20, src: '/gallery/events/12.jpeg',  category: 'events', },
  { id: 21, src: '/gallery/events/13.jpeg',  category: 'events', },
  { id: 22, src: '/gallery/events/14.jpeg',  category: 'events', },
  { id: 23, src: '/gallery/events/15.jpeg',  category: 'events', },
  { id: 24, src: '/gallery/events/16.jpeg',  category: 'events', },
  { id: 25, src: '/gallery/events/17.jpeg',  category: 'events', },
  { id: 26, src: '/gallery/events/18.jpeg',  category: 'events', },
  { id: 27, src: '/gallery/events/19.jpeg',  category: 'events', },
  { id: 28, src: '/gallery/events/20.jpeg',  category: 'events', },
  { id: 29, src: '/gallery/events/21.jpeg',  category: 'events', },
  { id: 30, src: '/gallery/events/22.jpeg',  category: 'events', },

  { id: 31, src: '/gallery/achievements/1.jpeg',  category: 'achievements', },
  { id: 32, src: '/gallery/achievements/2.jpeg',  category: 'achievements', },
  { id: 33, src: '/gallery/achievements/3.jpeg',  category: 'achievements', },
  { id: 34, src: '/gallery/achievements/4.jpeg',  category: 'achievements', },
  { id: 35, src: '/gallery/achievements/5.jpeg',  category: 'achievements', },
  { id: 36, src: '/gallery/achievements/6.jpeg',  category: 'achievements', },
  { id: 37, src: '/gallery/achievements/7.jpeg',  category: 'achievements', },
  { id: 38, src: '/gallery/achievements/8.jpeg',  category: 'achievements', },
  { id: 39, src: '/gallery/achievements/9.jpeg',  category: 'achievements', },
  { id: 40, src: '/gallery/achievements/10.jpeg',  category: 'achievements',},
  { id: 41, src: '/gallery/achievements/11.jpeg',  category: 'achievements',},
  { id: 42, src: '/gallery/achievements/12.jpeg',  category: 'achievements',},
  { id: 43, src: '/gallery/achievements/13.jpeg',  category: 'achievements',},
  { id: 44, src: '/gallery/achievements/14.jpeg',  category: 'achievements',},
  { id: 45, src: '/gallery/achievements/15.jpeg',  category: 'achievements',},
  { id: 46, src: '/gallery/achievements/16.jpeg',  category: 'achievements',},
  { id: 47, src: '/gallery/achievements/17.jpeg',  category: 'achievements',},
  { id: 48, src: '/gallery/achievements/18.jpeg',  category: 'achievements',},
  { id: 49, src: '/gallery/achievements/19.jpeg',  category: 'achievements',},
  { id: 50, src: '/gallery/achievements/20.jpeg',  category: 'achievements',},
  { id: 51, src: '/gallery/achievements/21.jpeg',  category: 'achievements',},
  { id: 52, src: '/gallery/achievements/22.jpeg',  category: 'achievements',},
];

const TABS = [
  { id: 'all',          label: 'All' },
  { id: 'classroom',    label: 'Classroom Photos' },
  { id: 'news',         label: 'News & Media' },
  { id: 'events',       label: 'Events' },
  { id: 'achievements', label: 'Achievements' },
];

// ── Lazy image with skeleton + fade-in ──
function GalleryImage({ src, caption, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);
  const imgRef              = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = src;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div className={`gallery-item${loaded ? ' gallery-item--loaded' : ''}`} onClick={onClick}>
      {/* Skeleton */}
      {!loaded && !error && <div className="gallery-item__skeleton" />}

      {/* Image */}
      <img
        ref={imgRef}
        alt={caption}
        className="gallery-item__img"
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
      />

      {/* Error fallback */}
      {error && (
        <div className="gallery-item__fallback">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>Photo coming soon</span>
        </div>
      )}

      {/* Caption overlay */}
      <div className="gallery-item__overlay">
        <p className="gallery-item__caption">{caption}</p>
      </div>
    </div>
  );
}

// ── Lightbox ──
function Lightbox({ item, items, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.caption} className="lightbox__img" />
        <p className="lightbox__caption">{item.caption}</p>
      </div>

      <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  );
}

export default function Gallery() {
  const [activeTab, setActiveTab]     = useState('all');
  const [lightbox, setLightbox]       = useState(null);

  const filtered = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === activeTab);

  const openLightbox = useCallback((item) => setLightbox(item), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevItem = useCallback(() => {
    if (!lightbox) return;
    const idx = filtered.findIndex(i => i.id === lightbox.id);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  }, [lightbox, filtered]);

  const nextItem = useCallback(() => {
    if (!lightbox) return;
    const idx = filtered.findIndex(i => i.id === lightbox.id);
    setLightbox(filtered[(idx + 1) % filtered.length]);
  }, [lightbox, filtered]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]); 

  return (
    <div className="gallery-page">

      {/* Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero__pattern" style={{ backgroundImage: `url(${crossLine})` }} />
        <div className="container gallery-hero__content">
          <span className="section-label">Our Gallery</span>
          <h1 className="gallery-hero__title">
            Photo <span className="text-gold">Gallery</span>
          </h1>
          <p className="gallery-hero__desc">
            Moments from our classrooms, achievements, events, and media coverage.
          </p>
          <div className="gallery-hero__breadcrumb">
            <Link to="/" className="gallery-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="gallery-hero__bc-current">Gallery</span>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section gallery-main">
        <div className="container">

          {/* Tabs */}
          <div className="gallery-tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`gallery-tab${activeTab === tab.id ? ' gallery-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="gallery-tab__count">
                  {tab.id === 'all' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter(i => i.category === tab.id).length}
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {filtered.map(item => (
              <GalleryImage
                key={item.id}
                src={item.src}
                caption={item.caption}
                onClick={() => openLightbox(item)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="gallery-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p>No photos in this category yet.</p>
            </div>
          )}

        </div>
      </section>
       <CtaSection />

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          item={lightbox}
          items={filtered}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

    </div>
    
  );
}
