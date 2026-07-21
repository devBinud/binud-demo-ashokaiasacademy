import { useEffect } from 'react';
import { PlayCircle, Bell, CheckCircle2 } from 'lucide-react';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import CtaSection from '../Home/sections/CtaSection';
import './YouTubeLectures.css';

export default function YouTubeLectures() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="yt-page">
      <SEO 
        title="Official YouTube Channel & Free Video Lectures | Ashoka IAS Academy"
        description="Explore Ashoka IAS Academy's upcoming official YouTube video lecture series, daily current affairs breakdowns, APSC answer writing sessions, and topper mentorship."
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
          
          {/* Hero Announcement Card */}
          <div className="yt-hero-card">
            <div className="yt-hero-content">
              <div className="yt-badge-tag">
                <span className="yt-pulse-dot" />
                <span>UPCOMING SOON • OFFICIAL YOUTUBE CHANNEL</span>
              </div>

              <h2 className="yt-hero-title">
                Free Video Lectures & Live Mentorship Sessions
              </h2>

              <p className="yt-hero-desc">
                We are launching our official YouTube channel dedicated to helping civil services aspirants across Assam and Northeast India. Access high-yield video lessons, editorial breakdowns, and expert strategy guides anytime, anywhere.
              </p>

              <div className="yt-hero-actions">
                <a 
                  href="https://www.youtube.com/@AshokaIASAcademy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-yt-subscribe"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Subscribe to Channel</span>
                </a>
                <span className="yt-notify-text">
                  <Bell size={15} />
                  <span>Turn on notifications for live stream alerts</span>
                </span>
              </div>
            </div>

            <div className="yt-hero-graphic">
              <div className="yt-play-circle-box">
                <PlayCircle size={64} className="yt-play-icon" />
                <span className="yt-graphic-text">Ashoka IAS Academy Studio</span>
              </div>
            </div>
          </div>



          {/* ── Why Subscribe Banner ── */}
          <div className="yt-features-card">
            <div className="yt-features-header">
              <h3>What to Expect from Our YouTube Channel?</h3>
            </div>
            
            <div className="yt-features-grid">
              <div className="yt-feature-item">
                <CheckCircle2 size={18} className="yt-check-icon" />
                <div>
                  <h4>100% Free High-Yield Content</h4>
                  <p>Quality civil service guidance tailored specifically for UPSC CSE and APSC CCE pattern requirements.</p>
                </div>
              </div>

              <div className="yt-feature-item">
                <CheckCircle2 size={18} className="yt-check-icon" />
                <div>
                  <h4>Interactive Live Doubts</h4>
                  <p>Engage directly with expert faculty and mentors during live streaming Q&A sessions.</p>
                </div>
              </div>

              <div className="yt-feature-item">
                <CheckCircle2 size={18} className="yt-check-icon" />
                <div>
                  <h4>Assam Special Regional GS</h4>
                  <p>Dedicated video modules on Assam History, Polity, Economy, and regional current events.</p>
                </div>
              </div>

              <div className="yt-feature-item">
                <CheckCircle2 size={18} className="yt-check-icon" />
                <div>
                  <h4>Model Answer Analyses</h4>
                  <p>Step-by-step video dissections of top scorer answer sheets and exam-standard answer frames.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <CtaSection />
    </div>
  );
}
