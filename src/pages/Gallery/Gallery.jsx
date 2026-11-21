import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
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

const TABS = [
  { id: 'all',          label: 'All',          icon: 'fa-solid fa-border-all' },
  { id: 'classroom',    label: 'Classroom',    icon: 'fa-solid fa-chalkboard-user' },
  { id: 'news',         label: 'News & Media', icon: 'fa-solid fa-newspaper' },
  { id: 'events',       label: 'Events',       icon: 'fa-solid fa-calendar-check' },
  { id: 'achievements', label: 'Achievements', icon: 'fa-solid fa-trophy' },
  { id: 'videos',       label: 'Videos',       icon: 'fa-solid fa-circle-play' },
];

const CATEGORY_LABEL = Object.fromEntries(TABS.map((t) => [t.id, t.label]));

const PAGE_SIZE = 16;

/* Repeating bento pattern — some tiles are bigger so the grid feels editorial.
   Every 16 tiles fill exactly 6 rows of a 4-column grid (no holes):
   big tile on the left, then a big tile on the right, each with a wide tile. */
function tileClass(index) {
  const n = index % 16;
  if (n === 0 || n === 10) return ' gallery-item--feature';
  if (n === 5 || n === 15) return ' gallery-item--wide';
  return '';
}

// ── Lazy image with skeleton + fade-in ──
function GalleryImage({ item, index, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);
  const imgRef = useRef(null);
  const label = CATEGORY_LABEL[item.category];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = item.src;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [item.src]);

  return (
    <button
      type="button"
      className={`gallery-item${tileClass(index)}${loaded ? ' gallery-item--loaded' : ''}`}
      style={{ animationDelay: `${Math.min(index % PAGE_SIZE, 12) * 40}ms` }}
      onClick={onClick}
      aria-label={`Open ${label} photo`}
    >
      {!loaded && !error && <span className="gallery-item__skeleton" />}
      <img
        ref={imgRef}
        alt={item.caption || `${label} at Ashoka IAS Academy`}
        className="gallery-item__img"
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
      />
      {error && (
        <span className="gallery-item__fallback">
          <i className="fa-regular fa-image" aria-hidden="true" />
          <span>Photo coming soon</span>
        </span>
      )}
      <span className="gallery-item__overlay">
        <span className="gallery-item__tag">{label}</span>
        <span className="gallery-item__zoom"><i className="fa-solid fa-expand" aria-hidden="true" /></span>
      </span>
    </button>
  );
}

// ── Video Card ──
function VideoCard({ video, onClick }) {
  return (
    <button type="button" className="video-card" onClick={() => onClick(video)}>
      <span className="video-card__thumb">
        <video
          className="video-card__img"
          src={video.src}
          poster={video.poster || undefined}
          muted
          playsInline
          preload="metadata"
        />
        <span className="video-card__shade" />
        <span className="video-card__play">
          <i className="fa-solid fa-play" aria-hidden="true" />
        </span>
        {video.label && <span className="video-card__label">{video.label}</span>}
        <span className="video-card__title">{video.title}</span>
      </span>
    </button>
  );
}

// ── Image Lightbox ──
function Lightbox({ item, index, total, onClose, onPrev, onNext }) {
  const touchX = useRef(null);

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

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? onNext : onPrev)();
    touchX.current = null;
  };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox__meta">
          <span className="lightbox__tag">{CATEGORY_LABEL[item.category]}</span>
          <span className="lightbox__count">{index + 1} / {total}</span>
        </span>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      </div>

      <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous photo">
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
      </button>

      <figure className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <img key={item.id} src={item.src} alt={item.caption || CATEGORY_LABEL[item.category]} className="lightbox__img" />
        {item.caption && <figcaption className="lightbox__caption">{item.caption}</figcaption>}
      </figure>

      <button type="button" className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next photo">
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
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
    <div className="lightbox video-lightbox" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox__meta">
          <span className="lightbox__tag">Video</span>
          <span className="lightbox__count">{video.title}</span>
        </span>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      </div>
      <div className="video-lightbox__content" onClick={(e) => e.stopPropagation()}>
        <video
          className="video-lightbox__player"
          src={video.src}
          poster={video.poster || undefined}
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}

// ── Main Gallery Page ──
export default function Gallery() {
  const [activeTab,  setActiveTab]  = useState('all');
  const [visible,    setVisible]    = useState(PAGE_SIZE);
  const [lightboxId, setLightboxId] = useState(null);
  const [videoModal, setVideoModal] = useState(null);

  const isVideoTab = activeTab === 'videos';

  const filtered = useMemo(() =>
    activeTab === 'all'
      ? GALLERY_ITEMS
      : isVideoTab
        ? []
        : GALLERY_ITEMS.filter(i => i.category === activeTab),
    [activeTab, isVideoTab]
  );

  const shown = filtered.slice(0, visible);
  const lightboxIndex = lightboxId === null ? -1 : filtered.findIndex(i => i.id === lightboxId);
  const lightboxItem = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;

  const changeTab = (id) => {
    setActiveTab(id);
    setVisible(PAGE_SIZE);
  };

  const closeLightbox = useCallback(() => setLightboxId(null), []);
  const openVideo     = useCallback((video) => setVideoModal(video), []);
  const closeVideo    = useCallback(() => setVideoModal(null), []);

  const prevItem = useCallback(() => {
    if (lightboxIndex < 0) return;
    setLightboxId(filtered[(lightboxIndex - 1 + filtered.length) % filtered.length].id);
  }, [lightboxIndex, filtered]);

  const nextItem = useCallback(() => {
    if (lightboxIndex < 0) return;
    setLightboxId(filtered[(lightboxIndex + 1) % filtered.length].id);
  }, [lightboxIndex, filtered]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    document.body.style.overflow = (lightboxItem || videoModal) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxItem, videoModal]);

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

      <PageHeader
        title="Photo & Video Gallery"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Gallery' }
        ]}
      />

      <section className="gallery-main">
        <div className="container">

          <div className="gallery-head">
            <div>
              <h2 className="gallery-title">Life at the <span>Academy</span></h2>
            </div>
            <p className="gallery-intro">
              Classroom sessions, seminars, topper talks and celebrations from our journey
              since 2021.
            </p>
          </div>

          {/* Tabs */}
          <div className="gallery-tabs" role="tablist" aria-label="Gallery categories">
            {TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`gallery-tab${activeTab === tab.id ? ' gallery-tab--active' : ''}`}
                onClick={() => changeTab(tab.id)}
              >
                <i className={tab.icon} aria-hidden="true" />
                {tab.label}
                <span className="gallery-tab__count">{getCount(tab.id)}</span>
              </button>
            ))}
          </div>

          {/* ── Image Grid ── */}
          {!isVideoTab && (
            <>
              <div className="gallery-grid" key={activeTab}>
                {shown.map((item, i) => (
                  <GalleryImage
                    key={item.id}
                    item={item}
                    index={i}
                    onClick={() => setLightboxId(item.id)}
                  />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="gallery-empty">
                  <i className="fa-regular fa-images" aria-hidden="true" />
                  <p>No photos in this category yet.</p>
                </div>
              )}

              {filtered.length > visible && (
                <div className="gallery-more">
                  <button type="button" className="gallery-more__btn" onClick={() => setVisible(v => v + PAGE_SIZE)}>
                    Load more photos
                    <span>{filtered.length - visible} more</span>
                  </button>
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

      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          index={lightboxIndex}
          total={filtered.length}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

      {videoModal && (
        <VideoLightbox video={videoModal} onClose={closeVideo} />
      )}
    </div>
  );
}
