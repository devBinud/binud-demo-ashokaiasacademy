import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  BookOpenCheck,
  AlertCircle
} from 'lucide-react';
import crossLine from '../../assets/images/cross-line.png';
import SEO from '../../components/common/SEO';
import './ScholarshipTest.css';
import CtaSection from '../Home/sections/CtaSection';

const TEST_DETAILS = {
  advanced: {
    title: "Advanced Scholarship Test",
    subtitle: "UPSC & APSC Integrated Standards",
    icon: <GraduationCap size={40} className="card-icon-main" />,
    target: "UPSC, APSC Aspirants",
    shortDesc: "Designed for civil services candidates seeking premium GS foundation programs and expert mentoring.",
    duration: "120 Minutes",
    questions: "100 Multiple Choice Questions (MCQs)",
    marks: "200 Marks",
    negativeMark: "0.25 per wrong answer",
    syllabus: [
      { subject: "General Studies I", details: "Indian History, Art & Culture, Physical & Human Geography, Indian Polity & Constitution, Economy, Science & Technology." },
      { subject: "Assam Special GS", details: "History of Assam, Ahom Kingdom, Socio-economic indicators, Geography and rivers, State policies, Art & Folk culture." },
      { subject: "Aptitude & CSAT", details: "Logical Reasoning, Analytical Ability, Basic Numeracy (Class X standard), Reading Comprehension." },
      { subject: "Current Affairs", details: "National events, International relations, Science updates, and regional current events of Northeast India (12 months)." }
    ],
    rewards: [
      "100% Tuition Fee Waiver for Top 5 Performers",
      "50% Scholarship for ranks 6 to 25",
      "Free access to standard UPSC/APSC printed study materials",
      "One-on-one personal mentoring sessions with retired civil servants"
    ]
  },
  basic: {
    title: "Basic Scholarship Test",
    subtitle: "ADRE, SSC & State Government Recruits",
    icon: <BookOpenCheck size={40} className="card-icon-main" />,
    target: "ADRE, SSC & State Exam Aspirants",
    shortDesc: "Designed for aspirants targeting Assam Direct Recruitment Exams (ADRE), Staff Selection Commission (SSC), and other state-level competitive exams.",
    duration: "90 Minutes",
    questions: "100 Multiple Choice Questions (MCQs)",
    marks: "150 Marks",
    negativeMark: "No negative marking",
    syllabus: [
      { subject: "General English", details: "Synonyms & Antonyms, Sentence Correction, Vocabulary, Spelling test, Basic Grammar, Idioms and Phrases." },
      { subject: "General Knowledge (GK)", details: "Static GK, Indian History & Geography, Assam GK, Basic General Science, Sports, Awards, and Important Dates." },
      { subject: "Quantitative Aptitude", details: "Number System, Percentage, Profit & Loss, Simple & Compound Interest, Ratio & Proportion, Time and Work." },
      { subject: "Logical Reasoning", details: "Coding-Decoding, Blood Relations, Number Series, Syllogism, Direction Sense, Visual Reasoning." }
    ],
    rewards: [
      "100% Free Coaching for Top 10 Performers",
      "30% to 50% Scholarships for ranks 11 to 50",
      "Free ADRE & SSC specialized test series package",
      "Weekly guidance and doubt clearing sessions with top faculties"
    ]
  }
};

export default function ScholarshipTest() {
  const { testType } = useParams();
  const navigate = useNavigate();

  // Validate or identify the current testType
  const selectedTest = (testType === 'advanced' || testType === 'basic') ? testType : null;
  
  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    testMode: 'online',
    preferredBatch: 'weekend'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Sync test selection / clear form on testType changes
  useEffect(() => {
    setIsRegistered(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      testMode: 'online',
      preferredBatch: 'weekend'
    });
    window.scrollTo(0, 0);
  }, [testType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API registration call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
    }, 1200);
  };

  const handleResetRegistration = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      testMode: 'online',
      preferredBatch: 'weekend'
    });
    setIsRegistered(false);
  };

  const activeTest = selectedTest ? TEST_DETAILS[selectedTest] : null;

  return (
    <div className="scholarship-page">
      <SEO 
        title="Scholarship Admission Test"
        description="Register for the Ashoka IAS Academy Scholarship Test. Secure up to 100% tuition fee waivers for our UPSC & APSC coaching batches."
      />
      {/* Hero */}
      <section className="scholarship-hero">
        <div className="scholarship-hero__pattern" style={{ backgroundImage: `url(${crossLine})` }} />
        <div className="container scholarship-hero__content">
          <span className="section-label">Aspirant Support Program</span>
          <h1 className="scholarship-hero__title">
            Scholarship <span className="text-gold">Tests</span>
          </h1>
          <p className="scholarship-hero__desc">
            Identify your strengths, unlock financial assistance, and kickstart your dream career with Ashoka IAS Academy's comprehensive test modules.
          </p>
          <div className="scholarship-hero__breadcrumb">
            <Link to="/" className="scholarship-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="scholarship-hero__bc-current">Scholarship Test</span>
          </div>
        </div>
      </section>

      {/* Cards Selection Section */}
      {!selectedTest && (
        <section className="section scholarship-cards-section">
          <div className="container">
            <div className="scholarship-section-header">
              <h2 className="scholarship-section-title">Select Your Scholarship Pathway</h2>
              <p className="scholarship-section-subtitle">
                We offer two tailored scholarship evaluations. Click on a card below to view the syllabus, structure, and register online.
              </p>
            </div>

            <div className="scholarship-cards-grid">
              {/* Advanced Scholarship Card */}
              <div 
                className="scholarship-card advanced"
                onClick={() => {
                  navigate('/scholarship-test/advanced');
                }}
              >
                <div className="card-selection-indicator" />
                <div className="card-top">
                  <div className="card-badge advanced-badge">UPSC / APSC Standards</div>
                  {TEST_DETAILS.advanced.icon}
                </div>
                <h3 className="card-title">{TEST_DETAILS.advanced.title}</h3>
                <p className="card-target">{TEST_DETAILS.advanced.target}</p>
                <p className="card-desc">{TEST_DETAILS.advanced.shortDesc}</p>
                <div className="card-footer">
                  <span className="card-action-text">
                    View Details & Register &rarr;
                  </span>
                </div>
              </div>

              {/* Basic Scholarship Card */}
              <div 
                className="scholarship-card basic"
                onClick={() => {
                  navigate('/scholarship-test/basic');
                }}
              >
                <div className="card-selection-indicator" />
                <div className="card-top">
                  <div className="card-badge basic-badge">ADRE / SSC Standards</div>
                  {TEST_DETAILS.basic.icon}
                </div>
                <h3 className="card-title">{TEST_DETAILS.basic.title}</h3>
                <p className="card-target">{TEST_DETAILS.basic.target}</p>
                <p className="card-desc">{TEST_DETAILS.basic.shortDesc}</p>
                <div className="card-footer">
                  <span className="card-action-text">
                    View Details & Register &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Details and Registration Panel */}
      {selectedTest && activeTest && (
        <section className="section scholarship-details-section" id="registration-panel">
          <div className="container">
            <div className="back-navigation-row">
              <Link to="/scholarship-test" className="btn-back-link">
                &larr; Back to All Scholarship Tests
              </Link>
            </div>
            
            <div className="scholarship-details-layout">
              
              {/* LEFT Column: Syllabus & Details */}
              <div className="details-card-spec">
                <div className="spec-header">
                  <Sparkles size={18} className="text-gold" />
                  <h3>{activeTest.title} Specifications</h3>
                </div>
                
                {/* Highlights Table */}
                <div className="exam-highlights-grid">
                  <div className="highlight-item">
                    <span className="hl-label">Duration</span>
                    <strong className="hl-value">{activeTest.duration}</strong>
                  </div>
                  <div className="highlight-item">
                    <span className="hl-label">Question Count</span>
                    <strong className="hl-value">{activeTest.questions}</strong>
                  </div>
                  <div className="highlight-item">
                    <span className="hl-label">Maximum Marks</span>
                    <strong className="hl-value">{activeTest.marks}</strong>
                  </div>
                  <div className="highlight-item">
                    <span className="hl-label">Negative Marking</span>
                    <strong className="hl-value">{activeTest.negativeMark}</strong>
                  </div>
                </div>

                {/* Rewards List */}
                <div className="spec-rewards-section">
                  <h4 className="section-subheading">Scholarship Benefits</h4>
                  <ul className="rewards-list">
                    {activeTest.rewards.map((reward, idx) => (
                      <li key={idx} className="reward-item">
                        <CheckCircle2 size={16} className="reward-icon" />
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Syllabus List */}
                <div className="spec-syllabus-section">
                  <h4 className="section-subheading">Test Syllabus</h4>
                  <div className="syllabus-accordion">
                    {activeTest.syllabus.map((item, idx) => (
                      <div key={idx} className="syllabus-item">
                        <div className="syllabus-item-header">
                          <span className="syllabus-num">{idx + 1}</span>
                          <h5>{item.subject}</h5>
                        </div>
                        <p className="syllabus-item-desc">{item.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT Column: Registration Form */}
              <div className="registration-card-form">
                {!isRegistered ? (
                  <>
                    <div className="form-header">
                      <FileText size={22} className="text-gold" />
                      <div>
                        <h3>Online Registration</h3>
                        <span>Reserve your seat for the {selectedTest === 'advanced' ? 'Advanced' : 'Basic'} Test</span>
                      </div>
                    </div>

                    <form className="scholarship-form" onSubmit={handleSubmit}>
                      
                      {/* Name */}
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name <span className="text-danger">*</span></label>
                        <div className="input-with-icon">
                          <User size={16} className="input-icon" />
                          <input 
                            type="text" 
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name" 
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="form-group">
                        <label htmlFor="email">Email Address <span className="text-danger">*</span></label>
                        <div className="input-with-icon">
                          <Mail size={16} className="input-icon" />
                          <input 
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="Enter your email address" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number <span className="text-danger">*</span></label>
                        <div className="input-with-icon">
                          <Phone size={16} className="input-icon" />
                          <input 
                            type="tel" 
                            id="phone"
                            name="phone"
                            placeholder="Enter 10-digit mobile number" 
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Mode Choice */}
                      <div className="form-group">
                        <label>Preferred Test Mode</label>
                        <div className="form-radio-grid">
                          <label className={`radio-label-wrapper ${formData.testMode === 'online' ? 'selected' : ''}`}>
                            <input 
                              type="radio" 
                              name="testMode" 
                              value="online" 
                              checked={formData.testMode === 'online'} 
                              onChange={handleInputChange} 
                            />
                            <span>Online Exam</span>
                          </label>
                          <label className={`radio-label-wrapper ${formData.testMode === 'offline' ? 'selected' : ''}`}>
                            <input 
                              type="radio" 
                              name="testMode" 
                              value="offline" 
                              checked={formData.testMode === 'offline'} 
                              onChange={handleInputChange} 
                            />
                            <span>Offline at Center</span>
                          </label>
                        </div>
                      </div>

                      {/* Batch Choice */}
                      <div className="form-group">
                        <label htmlFor="preferredBatch">Interested Coaching Batch</label>
                        <select 
                          id="preferredBatch" 
                          name="preferredBatch" 
                          value={formData.preferredBatch}
                          onChange={handleInputChange}
                        >
                          <option value="weekday">Regular Weekday Batch (Mon - Fri)</option>
                          <option value="weekend">Weekend Batch (Saturday & Sunday)</option>
                          <option value="online-only">Online Integrated Live Classes</option>
                        </select>
                      </div>

                      {formData.testMode === 'offline' && (
                        <div className="offline-alert-box">
                          <MapPin size={16} className="alert-icon" />
                          <div className="alert-text">
                            <strong>Offline Test Location:</strong>
                            <span>Ashoka IAS Academy campus, Zoo Road, Guwahati, Assam.</span>
                          </div>
                        </div>
                      )}

                      <button 
                        type="submit" 
                        className="btn btn-primary btn-submit-registration"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing Application..." : "Complete Registration →"}
                      </button>
                      
                      <span className="form-footer-note">
                        <AlertCircle size={12} />
                        We do not share your private data with third parties.
                      </span>

                    </form>
                  </>
                ) : (
                  // Success State View
                  <div className="registration-success-view">
                    <div className="success-anim-icon">
                      <CheckCircle2 size={54} />
                    </div>
                    <h3>Registration Completed!</h3>
                    <p className="success-congrats">
                      Congratulations <strong>{formData.fullName}</strong>, your seat for the <strong>{activeTest.title}</strong> has been successfully reserved.
                    </p>

                    <div className="success-details-card">
                      <div className="success-details-row">
                        <span>Test Category</span>
                        <strong>{activeTest.title}</strong>
                      </div>
                      <div className="success-details-row">
                        <span>Selected Mode</span>
                        <strong>{formData.testMode === 'online' ? 'Online Examination' : 'Offline (Guwahati Center)'}</strong>
                      </div>
                      <div className="success-details-row">
                        <span>Assigned Batch</span>
                        <strong>
                          {formData.preferredBatch === 'weekday' && 'Regular Weekday'}
                          {formData.preferredBatch === 'weekend' && 'Weekend Special'}
                          {formData.preferredBatch === 'online-only' && 'Online Live'}
                        </strong>
                      </div>
                    </div>

                    <div className="success-next-steps">
                      <h4>What happens next?</h4>
                      <ul>
                        <li>We have sent a confirmation email to <strong>{formData.email}</strong>.</li>
                        <li>An SMS containing test guidelines and credential links has been dispatched to <strong>{formData.phone}</strong>.</li>
                        <li>The mock/demo exam guidelines will be unlocked 24 hours prior to the test.</li>
                      </ul>
                    </div>

                    <div className="success-action-row">
                      <button 
                        className="btn btn-primary"
                        onClick={() => window.print()}
                      >
                        Print Receipt
                      </button>
                      <button 
                        className="btn btn-outline"
                        onClick={handleResetRegistration}
                      >
                        Register Another Student
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </div>
  );
}
