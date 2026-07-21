import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import ashokaLogo from '../../assets/images/logo.png';
import SEO from '../../components/common/SEO';
import CtaSection from '../Home/sections/CtaSection';
import './UPSCGuide.css';

const PHASES = [
  {
    phase: "PHASE 1",
    title: "Foundation Building Phase",
    subtitle: "(NCERT Beginner to Advanced Mastery)",
    objective: "Build a rock-solid conceptual foundation that supports both Prelims and Mains.",
    mechanics: "Complete multi-layered tracking of standard NCERTs and reference publications linked strictly with past UPSC Civil Services Examination (CSE) questions.",
    deliverables: [
      "Regular subject-specific descriptive diagnostics",
      "Multiple Choice Questions (MCQ) templates to evaluate primary reading retention"
    ]
  },
  {
    phase: "PHASE 2",
    title: "Mains Transformation Phase",
    subtitle: "(Syllabus Mastery to Rank-Oriented Answers)",
    objective: "Focuses on converting fundamental historical, geographical, economic, and political knowledge into highly structured, evaluative written sheets.",
    mechanics: "Full delivery of GS Papers I through IV alongside comprehensive Essay mentorship modules. The methodology links deep dynamic current items to standard textbook baselines.",
    deliverables: [
      "Daily structured answer writing drills",
      "Individual response sheet corrections",
      "Structural presentation training",
      "Direct mentor diagnostics"
    ]
  },
  {
    phase: "PHASE 3",
    title: "Prelims Mission Mode",
    subtitle: "(Accuracy • Speed • Selection)",
    objective: "Builds precise elimination techniques and objective reasoning patterns required to confidently cross competitive cutoffs.",
    mechanics: "High-intensity thematic revisions utilizing structured short notes, trend-mapping frameworks, and micro-analytics.",
    deliverables: [
      "Practice across an extensive databank of 10,000+ top-tier MCQs",
      "Regular simulated sectional tests",
      "National-level full-length mock examinations under strict timer limits"
    ]
  }
];

export default function UPSCGuide() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSidebarCard = () => (
    <div className="course-sidebar__card">
      
      {/* Collaborative Logo Graphic Banner */}
      <div className="sidebar-banner">
        {/* Sansad Bhavan (Parliament) Background Watermark */}
        <svg className="sidebar-banner__parliament-watermark" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M 5,45 L 95,45 M 10,45 L 10,35 L 90,35 L 90,45" />
          <path d="M 15,35 L 15,45 M 20,35 L 20,45 M 25,35 L 25,45 M 30,35 L 30,45 M 35,35 L 35,45 M 40,35 L 40,45 M 45,35 L 45,45 M 50,35 L 50,45 M 55,35 L 55,45 M 60,35 L 60,45 M 65,35 L 65,45 M 70,35 L 70,45 M 75,35 L 75,45 M 80,35 L 80,45 M 85,35 L 85,45" />
          <path d="M 35,35 Q 50,15 65,35 Z" />
          <path d="M 45,26 L 45,35 M 50,23 L 50,35 M 55,26 L 55,35" />
          <path d="M 50,23 L 50,18 M 48,18 L 52,18" />
        </svg>
        <div className="sidebar-banner__logos">
          <img src={ashokaLogo} alt="Ashoka IAS Academy" className="sidebar-banner__logo ashoka" />
          <img src="/networking.png" alt="Collaboration" className="sidebar-banner__collab-img" />
          <img src="/upsc_guide_logo.png" alt="UPSC GUIDE" className="sidebar-banner__logo upsc" />
        </div>
        <div className="sidebar-banner__content">
          <span className="sidebar-banner__tagline">UPSC GS PRELIMS CUM</span>
          <h3 className="sidebar-banner__title">Mains Foundation Batch 2027</h3>
        </div>
      </div>

      {/* Sidebar Body */}
      <div className="sidebar-body">
        <div className="sidebar-upcoming-tag">
          <span className="pulse-dot" /> UPCOMING SOON
        </div>
        <h4 className="sidebar-body__title">UPSC GS Prelims cum Mains Foundation Batch 2027</h4>
        <p className="sidebar-body__author">By UPSC GUIDE | Institute for IAS Exam</p>


        <div className="sidebar-body__validity">
          <Calendar size={16} />
          <span>Validity 450 Days</span>
        </div>

        <Link to="/contact" state={{ course: 'UPSC GS Foundation Batch 2027 (Guwahati Center)' }} className="sidebar-body__btn">
          Enroll Now
        </Link>
      </div>

    </div>
  );

  return (
    <div className="upsc-guide-page">
      <SEO 
        title="UPSC GS Foundation Batch 2027 - UPSC Guide Collaboration"
        description="Join the UPSC GS Prelims cum Mains Foundation Batch 2027 in Guwahati. In partnership with UPSC GUIDE, featuring a 3-Phase preparation roadmap and 1-on-1 mentorship."
      />

      {/* Main Grid Content */}
      <section className="upsc-guide-section">
        <div className="container upsc-guide-grid">
          
          {/* Left Column: Course Details */}
          <div className="upsc-guide-main">
            
            {/* Breadcrumb */}
            <div className="upsc-guide-breadcrumb">
              <Link to="/" className="breadcrumb-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Home
              </Link>
              <span className="breadcrumb-sep"><ChevronRight size={12} /></span>
              <span className="breadcrumb-current">UPSC Guide</span>
            </div>

            {/* Upcoming Soon Badge Highlight */}
            <div className="upcoming-soon-badge">
              <span className="pulse-dot" />
              <span>UPCOMING BATCH • ADMISSIONS OPENING SOON</span>
            </div>

            {/* Course H1 Title */}
            <h1 className="upsc-guide-title">
              UPSC GS Prelims cum Mains Foundation Batch 2027
            </h1>


            {/* Introduction & Partnership Details */}
            <div className="overview-intro-block">
              <p>
                Prepare for the Civil Services Examination 2027 with a phase-wise, mentor-driven, integrated preparation program designed to take you from NCERT fundamentals to Prelims & Mains excellence. This course is ideal for beginners, college students, and serious repeaters who want a single, well-structured roadmap instead of fragmented coaching.
              </p>
              
              {/* Mobile Collaboration Card Wrapper */}
              <div className="sidebar-mobile-wrapper">
                {renderSidebarCard()}
              </div>

              <h3 className="sub-section-title">About the Strategic Collaboration</h3>
              <p>
                <strong>Ashoka IAS Academy</strong> has officially partnered with <strong>UPSC GUIDE</strong>, one of India's leading civil services coaching ecosystems, to establish a state-of-the-art hybrid regional center in Guwahati. Since UPSC GUIDE showcases Ashoka IAS Academy on their platform, this page serves to highlight their exceptional credentials and bring their highly structured prep ecosystem directly to Northeast India.
              </p>
              <p>
                UPSC GUIDE is built on data-driven learning and has supported over <strong>11 Lakh+ students</strong> across the country, generating more than 3.5 Crore+ minutes of educational consumption and facilitating 1.2 Crore+ question attempts. By combining Ashoka's deep localized classroom infrastructure and expert regional mentorship with UPSC GUIDE's famous 3-phase model, we guarantee unmatched preparation quality.
              </p>
              
              <h3 className="sub-section-title">Why Choose UPSC GUIDE's GS Prelims cum Mains Foundation Program?</h3>
              <p>
                UPSC GUIDE follows a scientifically designed three-phase preparation model that mirrors the actual demands of the UPSC examination. The focus is on concept clarity, answer writing skills, exam temperament, and consistent mentorship.
              </p>

              <ul className="info-bullets-list">
                <li><strong>Batch Starts Date:</strong> 13th July, 2026</li>
                <li><strong>Time:</strong> 04:00 PM - 06:00 PM (Daily Mon-Fri Architecture)</li>
                <li><strong>Medium:</strong> English (with printed resources available in dual language pathways)</li>
              </ul>
            </div>

            {/* Phases Section (Sequential, No Tabs) */}
            <div className="phases-list-section">
              <h3 className="sub-section-title">The 3-Phase Preparation Model</h3>
              <div className="divider-gold"></div>

              {PHASES.map((p, idx) => (
                <div key={idx} className="phase-detail-block">
                  <div className="phase-detail-header">
                    <span className="phase-label">{p.phase}</span>
                    <h4 className="phase-title">{p.title} <span className="phase-subtitle">{p.subtitle}</span></h4>
                  </div>
                  <div className="phase-detail-content">
                    <div className="detail-row">
                      <strong>Objective:</strong> {p.objective}
                    </div>
                    <div className="detail-row">
                      <strong>Mechanics:</strong> {p.mechanics}
                    </div>
                    <div className="detail-row deliverables-row">
                      <strong>Key Deliverables:</strong>
                      <ul className="deliverables-bullets">
                        {p.deliverables.map((d, dIdx) => (
                          <li key={dIdx}>
                            <CheckCircle2 size={14} className="bullet-check" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mentorship Section */}
            <div className="mentorship-details-section">
              <h3 className="sub-section-title">The Personal Mentorship Ecosystem</h3>
              <div className="divider-gold"></div>
              <p className="section-intro-desc">
                A distinguishing feature of the framework is its strict rejection of large-scale, unmonitored mass-batch paradigms. Instead, the curriculum embeds an individual-centric tracking matrix:
              </p>

              <div className="mentorship-features">
                <div className="mentor-feature-item">
                  <h4>Continuity</h4>
                  <p>One dedicated personal mentor is permanently assigned to an aspirant for the entirety of their 450-day learning calendar.</p>
                </div>
                <div className="mentor-feature-item">
                  <h4>Bureaucratic Validation</h4>
                  <p>Complemented by active masterclasses and strategic checks overseen by verified administrative officers and toppers (e.g., Dr. Kiran Bedi, IPS; Srushti Deshmukh, IAS; Mudit Jain, IRS).</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sidebar Card */}
          <aside className="upsc-guide-sidebar">
            {renderSidebarCard()}
          </aside>

        </div>
      </section>

      <CtaSection />
    </div>
  );
}
