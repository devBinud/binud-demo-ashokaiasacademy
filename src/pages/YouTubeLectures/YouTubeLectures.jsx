import { useState, useEffect } from 'react';
import { Users, Building2, GraduationCap, ChevronRight } from 'lucide-react';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import CtaSection from '../Home/sections/CtaSection';
import ytImg from '../../assets/images/yt.jpg';
import './YouTubeLectures.css';

const LECTURE_SUBJECTS = [
  {
    id: 'society',
    title: 'Indian Society',
    bgColor: '#f1f5f9',
    iconColor: '#273c68',
    icon: Users,
    classes: [
      {
        id: 'soc-1',
        title: 'Indian Society | UPSC GS Paper 1 | By Akshay Kadam Sir',
        videoUrl: 'https://www.youtube.com/watch?v=ViAEsoaB3hk',
        embedUrl: 'https://www.youtube.com/embed/ViAEsoaB3hk?autoplay=1'
      }
    ]
  },
  {
    id: 'polity',
    title: 'Polity',
    bgColor: '#f1f5f9',
    iconColor: '#273c68',
    icon: Building2,
    classes: [
      {
        id: 'pol-1',
        title: 'Polity Orientation by Ramesh Sir',
        videoUrl: 'https://www.youtube.com/watch?v=ViAEsoaB3hk',
        embedUrl: 'https://www.youtube.com/embed/ViAEsoaB3hk?autoplay=1'
      }
    ]
  },
  {
    id: 'mentorship',
    title: 'Strategy & Mentorship Lectures',
    bgColor: '#f1f5f9',
    iconColor: '#273c68',
    icon: GraduationCap,
    classes: [
      {
        id: 'men-1',
        title: '3-Phase Strategy & Mentorship Orientation Class',
        videoUrl: 'https://www.youtube.com/watch?v=ViAEsoaB3hk',
        embedUrl: 'https://www.youtube.com/embed/ViAEsoaB3hk?autoplay=1'
      }
    ]
  }
];

export default function YouTubeLectures() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="yt-page">
      <SEO 
        title="Official YouTube Channel & Free Video Lectures | Ashoka IAS Academy"
        description="Explore Ashoka IAS Academy's official YouTube video lecture series, daily current affairs breakdowns, APSC answer writing sessions, and topper mentorship."
      />

      <PageHeader 
        title="YouTube Section"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
          { label: 'YouTube Section' }
        ]}
      />

      {/* ── Main Content Section ── */}
      <section className="section yt-content">
        <div className="container">
          <div className="yt-grid">
            
            {/* Left Column: Featured Image Card */}
            <div className="yt-side-card">
              <div className="yt-image-wrapper">
                <img src={ytImg} alt="Ashoka IAS Academy YouTube Channel" className="yt-side-banner-img" />
              </div>
            </div>

            {/* Right Column: Subject List / Classes */}
            <div className="yt-lectures-container">
              {selectedCategory === null ? (
                <>
                  <h4 className="yt-video-heading">Video</h4>

                  <div className="yt-subject-list">
                    {LECTURE_SUBJECTS.map((sub) => {
                      const IconComponent = sub.icon;
                      return (
                        <div 
                          key={sub.id} 
                          className="yt-subject-item"
                          onClick={() => setSelectedCategory(sub)}
                        >
                          <div className="yt-subject-item-left">
                            <div className="yt-subject-icon-box" style={{ backgroundColor: sub.bgColor, color: sub.iconColor }}>
                              <IconComponent size={20} />
                            </div>
                            <span className="yt-subject-item-title">{sub.title}</span>
                          </div>
                          <ChevronRight size={18} className="yt-subject-chevron-icon" />
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="yt-category-classes-wrapper">
                  {/* Category Breadcrumb */}
                  <div className="yt-category-breadcrumb-header">
                    <span 
                      className="yt-breadcrumb-back-btn" 
                      onClick={() => setSelectedCategory(null)}
                    >
                      Video
                    </span>
                    <ChevronRight size={14} className="yt-breadcrumb-sep-icon" />
                    <span className="yt-breadcrumb-category-title">{selectedCategory.title}</span>
                  </div>

                  {/* Classes List */}
                  <div className="yt-class-cards-list">
                    {selectedCategory.classes.map((cls) => (
                      <div key={cls.id} className="yt-class-card-item">
                        <div className="yt-class-card-left">
                          <div className="yt-class-thumbnail-logo">
                            <img src="/upsc_guide_logo.png" alt="UPSC GUIDE" className="yt-thumbnail-logo-img" />
                          </div>
                          <div className="yt-class-details">
                            <h5 className="yt-class-title">{cls.title}</h5>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setModalVideo(cls.embedUrl)} 
                          className="yt-class-watch-now-btn"
                        >
                          Watch Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      {modalVideo && (
        <div className="yt-video-modal-overlay" onClick={() => setModalVideo(null)}>
          <div className="yt-video-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="yt-video-modal-body">
              <iframe 
                src={modalVideo} 
                title="Lecture Video Player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                className="yt-video-modal-iframe"
              />
            </div>
            <div className="yt-video-modal-footer">
              <button 
                type="button" 
                className="yt-video-modal-close-btn"
                onClick={() => setModalVideo(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <CtaSection />
    </div>
  );
}
