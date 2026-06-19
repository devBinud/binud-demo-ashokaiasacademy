import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import crossLine from '../../assets/images/cross-line.png';
import SEO from '../../components/common/SEO';
import './Gallery.css';
import CtaSection from '../Home/sections/CtaSection';

// ── Gallery image data ──
const GALLERY_ITEMS = [
  { id: 1,   src: '/gallery/classroom/4.jpg',         category: 'classroom' },
  { id: 2,   src: '/gallery/classroom/2.jpeg',        category: 'classroom' },
  { id: 3,   src: '/gallery/classroom/3.jpeg',        category: 'classroom' },
  { id: 4,   src: '/gallery/classroom/1.jpeg',        category: 'classroom' },
  { id: 444, src: '/gallery/classroom/444.jpeg',      category: 'classroom' },
  { id: 445, src: '/gallery/classroom/445.jpeg',      category: 'classroom' },
  { id: 446, src: '/gallery/classroom/446.jpeg',      category: 'classroom' },
  { id: 447, src: '/gallery/classroom/447.jpeg',      category: 'classroom' },
  { id: 448, src: '/gallery/classroom/448.jpeg',      category: 'classroom' },
  { id: 5,   src: '/gallery/newsandmedia/1.jpeg',     category: 'news' },
  { id: 6,   src: '/gallery/newsandmedia/2.jpeg',     category: 'news' },
  { id: 8,   src: '/gallery/newsandmedia/4.jpeg',     category: 'news' },
  { id: 10,  src: '/gallery/events/2.jpeg',           category: 'events' },
  { id: 12,  src: '/gallery/events/4.jpeg',           category: 'events' },
  { id: 17,  src: '/gallery/events/9.jpeg',           category: 'events' },
  { id: 20,  src: '/gallery/events/12.jpeg',          category: 'events' },
  { id: 21,  src: '/gallery/events/13.jpeg',          category: 'events' },
  { id: 22,  src: '/gallery/events/14.jpeg',          category: 'events' },
  { id: 23,  src: '/gallery/events/15.jpeg',          category: 'events' },
  { id: 25,  src: '/gallery/events/17.jpeg',          category: 'events' },
  { id: 26,  src: '/gallery/events/18.jpeg',          category: 'events' },
  { id: 27,  src: '/gallery/events/19.jpeg',          category: 'events' },
  { id: 28,  src: '/gallery/events/20.jpeg',          category: 'events' },
  { id: 29,  src: '/gallery/events/21.jpeg',          category: 'events' },
  { id: 30,  src: '/gallery/events/22.jpeg',          category: 'events' },
  { id: 100, src: '/gallery/events/100.jpeg',         category: 'events' },
  { id: 102, src: '/gallery/events/102.jpeg',         category: 'events' },
  { id: 103, src: '/gallery/events/103.jpeg',         category: 'events' },
  { id: 104, src: '/gallery/events/104.jpeg',         category: 'events' },
  { id: 106, src: '/gallery/events/106.jpeg',         category: 'events' },
  { id: 107, src: '/gallery/events/107.jpeg',         category: 'events' },
  { id: 109, src: '/gallery/events/109.jpeg',         category: 'events' },
  { id: 110, src: '/gallery/events/110.jpeg',         category: 'events' },
  { id: 31,  src: '/gallery/achievements/1.jpeg',     category: 'achievements' },
  { id: 32,  src: '/gallery/achievements/2.jpeg',     category: 'achievements' },
  { id: 33,  src: '/gallery/achievements/3.jpeg',     category: 'achievements' },
  { id: 34,  src: '/gallery/achievements/4.jpeg',     category: 'achievements' },
  { id: 35,  src: '/gallery/achievements/5.jpeg',     category: 'achievements' },
  { id: 36,  src: '/gallery/achievements/6.jpeg',     category: 'achievements' },
  { id: 37,  src: '/gallery/achievements/7.jpeg',     category: 'achievements' },
  { id: 38,  src: '/gallery/achievements/8.jpeg',     category: 'achievements' },
  { id: 39,  src: '/gallery/achievements/9.jpeg',     category: 'achievements' },
  { id: 40,  src: '/gallery/achievements/10.jpeg',    category: 'achievements' },
  { id: 41,  src: '/gallery/achievements/11.jpeg',    category: 'achievements' },
  { id: 42,  src: '/gallery/achievements/12.jpeg',    category: 'achievements' },
  { id: 44,  src: '/gallery/achievements/14.jpeg',    category: 'achievements' },
  { id: 45,  src: '/gallery/achievements/15.jpeg',    category: 'achievements' },
  { id: 47,  src: '/gallery/achievements/17.jpeg',    category: 'achievements' },
  { id: 49,  src: '/gallery/achievements/19.jpeg',    category: 'achievements' },
  { id: 50,  src: '/gallery/achievements/20.jpeg',    category: 'achievements' },
  { id: 51,  src: '/gallery/achievements/21.jpeg',    category: 'achievements' },
  { id: 52,  src: '/gallery/achievements/22.jpeg',    category: 'achievements' },
];

// ── Video data ──
// ── Video data ──
// Place your video files in: public/gallery/videos/
// Supported formats: mp4, webm
// 'poster' is optional — place a thumbnail image in public/gallery/videos/ too
const VIDEO_ITEMS = [
  {
    id: 'v1',
    src: '/gallery/videos/1.mp4', // ← rename to match your actual filename
    poster: '/gallery/videos/1.png', // ← optional thumbnail image
    title: 'Achievers Interview',
    label: 'Achievers',
  },
  {
    id: 'v2',
    src: '/gallery/videos/2.mp4',  // ← rename to match your actual filename
    poster: '/gallery/videos/2.jpeg', // ← optional thumbnail image
    title: 'Achievers Interview',
    label: 'Achievers Talk',
  },
];

// SVG icons for each tab
const TAB_ICONS = {
  all: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  classroom: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20v14H2z"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  news: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
    </svg>
  ),
  events: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  achievements: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  videos: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>
    </svg>
  ),
};

const TABS = [
  { id: 'all',          label: 'All'          },
  { id: 'classroom',    label: 'Classroom'    },
  { id: 'news',         label: 'News & Media' },
  { id: 'events',       label: 'Events'       },
  { id: 'achievements', label: 'Achievements' },
  { id: 'videos',       label: 'Videos'       },
];

// ── Lazy image with skeleton + fade-in ──
function GalleryImage({ src, caption, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);
  const imgRef = useRef(null);

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
      {!loaded && !error && <div className="gallery-item__skeleton" />}
      <img
        ref={imgRef}
        alt={caption}
        className="gallery-item__img"
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
      />
      {error && (
        <div className="gallery-item__fallback">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Photo coming soon</span>
        </div>
      )}
      <div className="gallery-item__overlay">
        <p className="gallery-item__caption">{caption}</p>
      </div>
    </div>
  );
}

// ── Video Card ──
function VideoCard({ video, onClick }) {
  return (
    <div className="video-card" onClick={() => onClick(video)}>
      {/* Thumbnail / video preview */}
      <div className="video-card__thumb">
        <video
          className="video-card__img"
          src={video.src}
          poster={video.poster || undefined}
          muted
          playsInline
          preload="metadata"
        />
        {/* Play button */}
        <div className="video-card__play">
          <div className="video-card__play-ring" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
        {/* Label pill */}
        {video.label && (
          <span className="video-card__label">{video.label}</span>
        )}
      </div>
      {/* Info */}
      <div className="video-card__info">
        <p className="video-card__title">{video.title}</p>
      </div>
    </div>
  );
}

// ── Image Lightbox ──
function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
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
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.caption} className="lightbox__img" />
        {item.caption && <p className="lightbox__caption">{item.caption}</p>}
      </div>
      <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

// ── Video Lightbox ──
function VideoLightbox({ video, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!video) return null;

  return (
    <div className="lightbox video-lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="video-lightbox__content" onClick={(e) => e.stopPropagation()}>
        <div className="video-lightbox__frame-wrap">
          <video
            className="video-lightbox__player"
            src={video.src}
            poster={video.poster || undefined}
            controls
            autoPlay
            playsInline
          />
        </div>
        <p className="video-lightbox__title">{video.title}</p>
      </div>
    </div>
  );
}

// ── Main Gallery Page ──
export default function Gallery() {
  const [activeTab,    setActiveTab]    = useState('all');
  const [lightbox,     setLightbox]     = useState(null);
  const [videoModal,   setVideoModal]   = useState(null);

  const isVideoTab = activeTab === 'videos';

  const filtered = useMemo(() =>
    activeTab === 'all'
      ? GALLERY_ITEMS
      : isVideoTab
        ? []
        : GALLERY_ITEMS.filter(i => i.category === activeTab),
    [activeTab, isVideoTab]
  );

  const openLightbox  = useCallback((item)  => setLightbox(item),  []);
  const closeLightbox = useCallback(()      => setLightbox(null),  []);
  const openVideo     = useCallback((video) => setVideoModal(video), []);
  const closeVideo    = useCallback(()      => setVideoModal(null), []);

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

  // Lock body scroll when any modal is open
  useEffect(() => {
    document.body.style.overflow = (lightbox || videoModal) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox, videoModal]);

  // Tab count helper
  const getCount = (tabId) => {
    if (tabId === 'all')    return GALLERY_ITEMS.length;
    if (tabId === 'videos') return VIDEO_ITEMS.length;
    return GALLERY_ITEMS.filter(i => i.category === tabId).length;
  };

  return (
    <div className="gallery-page">
      <SEO 
        title="Photo & Event Gallery"
        description="View photos of our classroom sessions, seminars, topper talk events, scholarship distributions, and academy highlights."
      />

      {/* ── Hero ── */}
      <section className="gallery-hero">
        <div className="gallery-hero__pattern" style={{ backgroundImage: `url(${crossLine})` }} />
        <div className="container gallery-hero__content">
          <span className="section-label">Our Gallery</span>
          <h1 className="gallery-hero__title">
            Photo &amp; Video <span className="text-gold">Gallery</span>
          </h1>
          <p className="gallery-hero__desc">
            Moments from our classrooms, achievements, events, media coverage, and video sessions.
          </p>
          <div className="gallery-hero__breadcrumb">
            <Link to="/" className="gallery-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="gallery-hero__bc-current">Gallery</span>
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section className="section gallery-main">
        <div className="container">

          {/* Tabs */}
          <div className="gallery-tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`gallery-tab${activeTab === tab.id ? ' gallery-tab--active' : ''}${tab.id === 'videos' ? ' gallery-tab--video' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="gallery-tab__icon">{TAB_ICONS[tab.id]}</span>
                {tab.label}
                <span className="gallery-tab__count">{getCount(tab.id)}</span>
              </button>
            ))}
          </div>

          {/* ── Image Grid ── */}
          {!isVideoTab && (
            <>
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
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p>No photos in this category yet.</p>
                </div>
              )}
            </>
          )}

          {/* ── Video Grid ── */}
          {isVideoTab && (
            <div className="video-grid">
              {VIDEO_ITEMS.map(video => (
                <VideoCard key={video.id} video={video} onClick={openVideo} />
              ))}
            </div>
          )}

        </div>
      </section>

      <CtaSection />

      {/* Image Lightbox */}
      {lightbox && (
        <Lightbox
          item={lightbox}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

      {/* Video Modal */}
      {videoModal && (
        <VideoLightbox video={videoModal} onClose={closeVideo} />
      )}

    </div>
  );
}
