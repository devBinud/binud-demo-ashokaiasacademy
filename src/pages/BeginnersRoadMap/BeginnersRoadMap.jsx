import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  Clock, 
  BookOpenCheck, 
  CheckCircle2 
} from 'lucide-react';
import crossLine from '../../assets/images/cross-line.png';
import './BeginnersRoadMap.css';
import CtaSection from '../Home/sections/CtaSection';

const NCERT_BOOKS = [
  { subject: 'History', class: 'Class 6 to 8', title: 'Our Pasts (Parts I, II, III)' },
  { subject: 'History', class: 'Class 9 & 10', title: 'India and the Contemporary World' },
  { subject: 'History', class: 'Class 12', title: 'Themes in Indian History (Parts I, II, III)' },
  { subject: 'Polity', class: 'Class 9 & 10', title: 'Democratic Politics (Parts I & II)' },
  { subject: 'Polity', class: 'Class 11', title: 'Indian Constitution at Work' },
  { subject: 'Geography', class: 'Class 6 to 8', title: 'The Earth Our Habitat, Our Environment, Resources' },
  { subject: 'Geography', class: 'Class 11', title: 'Fundamentals of Physical Geography' },
  { subject: 'Economics', class: 'Class 9 & 10', title: 'Understanding Economic Development' },
  { subject: 'Economics', class: 'Class 11', title: 'Indian Economic Development' }
];

const STRATEGY_STEPS = [
  {
    phase: "Phase 1: Foundation Building (Months 1-3)",
    title: "Understanding Syllabus & NCERT Bases",
    desc: "Focus on comprehending the detailed syllabus topics and building structural concept foundations.",
    tasks: [
      "Analyze previous 5 years' question papers to grasp the focus of actual exams.",
      "Thoroughly study core NCERT textbooks (Class 6th to 12th) for basic subjects.",
      "Cultivate the daily habit of reading a national daily newspaper."
    ]
  },
  {
    phase: "Phase 2: Core Mastery (Months 4-8)",
    title: "Syllabus Completion & Reference Books",
    desc: "Shift your focus to standard reference textbooks to complete the core General Studies subjects.",
    tasks: [
      "Master Indian Polity (M. Laxmikanth) and Modern History (Spectrum).",
      "Study core fundamentals of Indian Economy and physical geography.",
      "Dedicate specific time blocks to Assam History & Geography for APSC."
    ]
  },
  {
    phase: "Phase 3: Revision & Practice (Months 9-12)",
    title: "Consolidation, Mains Writing & Test Series",
    desc: "Begin consolidating notes and training your brain to draft logical answers.",
    tasks: [
      "Begin daily mains answer writing challenges (1 to 2 questions daily).",
      "Join a dedicated Mock Test Series to build exam-day accuracy.",
      "Solve full-length prelims simulated papers under absolute exam conditions."
    ]
  }
];

const ROUTINES = {
  weekday: [
    { time: "06:00 AM - 08:00 AM", focus: "Newspaper & Current Affairs", details: "Read editorial analysis of national daily newspapers." },
    { time: "09:00 AM - 12:00 PM", focus: "Core GS Subject Study", details: "Focus on primary high-weightage subjects like Indian Polity or Modern History." },
    { time: "02:00 PM - 04:30 PM", focus: "Assam Special GS / Optionals", details: "Study Assam regional topics or elective optionals." },
    { time: "05:30 PM - 07:00 PM", focus: "Daily Answer Writing Practice", details: "Pick one GS Mains question. Write an essay frame in 15 minutes." }
  ],
  weekend: [
    { time: "08:00 AM - 10:30 AM", focus: "Weekly Current Affairs Revision", details: "Consolidate the entire week's newspaper clippings and revisions." },
    { time: "11:30 AM - 02:30 PM", focus: "Simulated Mock Test", details: "Take one full-length GS Mock Exam under strict timer constraints." },
    { time: "04:00 PM - 06:00 PM", focus: "Test Performance Review", details: "Carefully analyze incorrect responses and record weak concepts." }
  ]
};

export default function BeginnersRoadMap() {
  const [activeTab, setActiveTab] = useState('strategy');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="roadmap-page">
      {/* Hero */}
      <section className="roadmap-hero">
        <div className="roadmap-hero__pattern" style={{ backgroundImage: `url(${crossLine})` }} />
        <div className="container roadmap-hero__content">
          <span className="section-label">Aspirant Resource Center</span>
          <h1 className="roadmap-hero__title">
            Beginners <span className="text-gold">Road Map</span>
          </h1>
          <p className="roadmap-hero__desc">
            A comprehensive, step-by-step master plan tailored for UPSC, APSC, and state exam aspirants to navigate their preparation journey confidently.
          </p>
          <div className="roadmap-hero__breadcrumb">
            <Link to="/" className="roadmap-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="roadmap-hero__bc-current">Beginners Road Map</span>
          </div>
        </div>
      </section>

      {/* Main Roadmap Content Container */}
      <div className="roadmap-article-container">
        
        {/* Intro Prose */}
        <section className="roadmap-section roadmap-intro">
          <div className="tab-intro-card">
            <div className="intro-badge">Syllabus & Guidance</div>
            <h2>Structured Preparation Plan</h2>
            <p>
              Success in civil services exams demands consistency, smart study techniques, and structured execution. Use the tabs below to explore our streamlined preparation strategies, essential NCERT textbooks, and balanced study routines.
            </p>
          </div>
        </section>

        {/* Tab Selection Buttons */}
        <div className="roadmap-tabs-container">
          <button 
            className={`roadmap-tab-btn ${activeTab === 'strategy' ? 'active' : ''}`}
            onClick={() => setActiveTab('strategy')}
            id="tab-btn-strategy"
          >
            <Award size={18} />
            <span>Strategy Booklet</span>
          </button>
          
          <button 
            className={`roadmap-tab-btn ${activeTab === 'ncert' ? 'active' : ''}`}
            onClick={() => setActiveTab('ncert')}
            id="tab-btn-ncert"
          >
            <BookOpenCheck size={18} />
            <span>NCERT Booklist</span>
          </button>
          
          <button 
            className={`roadmap-tab-btn ${activeTab === 'timetable' ? 'active' : ''}`}
            onClick={() => setActiveTab('timetable')}
            id="tab-btn-timetable"
          >
            <Calendar size={18} />
            <span>Study Time Table</span>
          </button>
        </div>

        {/* Dynamic Tab Content rendering */}
        <div className="roadmap-tab-content">
          
          {/* TAB 1: STRATEGY BOOKLET */}
          {activeTab === 'strategy' && (
            <div className="tab-pane animate-fade-in">
              <div className="section-title-wrapper">
                <Award size={22} className="text-gold" />
                <h3>Exam Strategy Booklet</h3>
              </div>
              <p className="section-prose">
                A structured preparation framework divided into clear, chronological phases to guarantee thorough coverage of both UPSC and APSC syllabi.
              </p>

              <div className="roadmap-phases-grid">
                {STRATEGY_STEPS.map((step, idx) => (
                  <div key={idx} className="phase-card">
                    <div className="phase-card__header">
                      <div className="phase-badge">{idx + 1}</div>
                      <div className="phase-title-group">
                        <span className="phase-duration">{step.phase}</span>
                        <h4>{step.title}</h4>
                      </div>
                    </div>
                    <p className="phase-desc">{step.desc}</p>
                    <ul className="phase-tasks">
                      {step.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="phase-task-item">
                          <CheckCircle2 size={15} className="task-check" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: NCERT BOOKLIST */}
          {activeTab === 'ncert' && (
            <div className="tab-pane animate-fade-in">
              <div className="section-title-wrapper">
                <BookOpenCheck size={22} className="text-gold" />
                <h3>Essential NCERT Reference Booklist</h3>
              </div>
              <p className="section-prose">
                NCERT textbooks build the foundation for General Studies papers. Review this high-yield textbook list to launch your static concepts successfully.
              </p>

              <div className="ncert-static-grid">
                {['History', 'Polity', 'Geography', 'Economics'].map((sub) => {
                  const books = NCERT_BOOKS.filter(b => b.subject === sub);
                  return (
                    <div key={sub} className="ncert-sub-list">
                      <h4>{sub} Foundation</h4>
                      <div className="ncert-books-container">
                        {books.map((book, bIdx) => (
                          <div key={bIdx} className="ncert-book-row">
                            <BookOpen size={14} className="text-gold" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div className="book-row-details">
                              <span className="book-row-class">{book.class}</span>
                              <span className="book-row-title">{book.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: STUDY TIME TABLE */}
          {activeTab === 'timetable' && (
            <div className="tab-pane animate-fade-in">
              <div className="section-title-wrapper">
                <Calendar size={22} className="text-gold" />
                <h3>Daily Preparation Study Timetables</h3>
              </div>
              <p className="section-prose">
                Balanced preparation requires strict discipline. Follow our realistic timetables tailored for core subject study, revision cycles, and mock assessments.
              </p>

              <div className="routines-grid">
                <div className="routine-column">
                  <div className="routine-header">
                    <Clock size={18} className="text-gold" />
                    <h4>Weekday Study Schedule</h4>
                  </div>
                  <div className="routine-timeline">
                    {ROUTINES.weekday.map((item, idx) => (
                      <div key={idx} className="routine-item">
                        <div className="routine-item-time">
                          <Clock size={12} />
                          <span>{item.time}</span>
                        </div>
                        <h5>{item.focus}</h5>
                        <p>{item.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="routine-column">
                  <div className="routine-header">
                    <Calendar size={18} className="text-gold" />
                    <h4>Weekend Assessment Schedule</h4>
                  </div>
                  <div className="routine-timeline">
                    {ROUTINES.weekend.map((item, idx) => (
                      <div key={idx} className="routine-item">
                        <div className="routine-item-time">
                          <Clock size={12} />
                          <span>{item.time}</span>
                        </div>
                        <h5>{item.focus}</h5>
                        <p>{item.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Section 4: Success rules */}
        <section className="roadmap-section">
          <div className="tab-intro-card tips-banner">
            <h3 className="tips-banner-title">Golden Rules for Success</h3>
            <div className="tips-list">
              <div className="tip-row">
                <span className="tip-index">1</span>
                <div>
                  <h4>Daily Newspaper Habit is Mandatory</h4>
                  <p>Never skip current events analysis. Focus heavily on contextual understanding and socio-economic reasoning.</p>
                </div>
              </div>
              <div className="tip-row">
                <span className="tip-index">2</span>
                <div>
                  <h4>Active Revision Blocks</h4>
                  <p>Dedicate the last 30 minutes of every study block to quickly review the facts, timelines, or maps you just read.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <CtaSection />
    </div>
  );
}
