import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { Search, Lock, X, Eye, FileText } from 'lucide-react';
import Loader from '../../../components/ui/Loader';
import logo from '../../../assets/images/logo.png';
import crossLine from '../../../assets/images/cross-line.png';

// Local PDF imports
import pdf08May from '../../../assets/pdf/dpp/08_may_DPP.pdf';
import pdf09May from '../../../assets/pdf/dpp/09_may_DPP.pdf';
import pdf11May from '../../../assets/pdf/dpp/11_may_DPP.pdf';
import pdf12May from '../../../assets/pdf/dpp/12_may_DPP.pdf';
import pdf13May from '../../../assets/pdf/dpp/13_may_DPP.pdf';
import pdf14May from '../../../assets/pdf/dpp/14_may_DPP.pdf';
import pdf15May from '../../../assets/pdf/dpp/15_may_DPP.pdf';

import './DailyPracticePaper.css';
import '../StudyMaterial.css';

const LOCAL_DPPS = [
  { id: 'dpp_15_may', title: 'Daily Practice Paper - 15th May 2026', date: '2026-05-15', subject: 'Current Affairs', size: '139 KB', pdfUrl: pdf15May },
  { id: 'dpp_14_may', title: 'Daily Practice Paper - 14th May 2026', date: '2026-05-14', subject: 'History', size: '168 KB', pdfUrl: pdf14May },
  { id: 'dpp_13_may', title: 'Daily Practice Paper - 13th May 2026', date: '2026-05-13', subject: 'Geography', size: '76 KB', pdfUrl: pdf13May },
  { id: 'dpp_12_may', title: 'Daily Practice Paper - 12th May 2026', date: '2026-05-12', subject: 'Polity', size: '183 KB', pdfUrl: pdf12May },
  { id: 'dpp_11_may', title: 'Daily Practice Paper - 11th May 2026', date: '2026-05-11', subject: 'Economy', size: '185 KB', pdfUrl: pdf11May },
  { id: 'dpp_09_may', title: 'Daily Practice Paper - 09th May 2026', date: '2026-05-09', subject: 'Science & Tech', size: '181 KB', pdfUrl: pdf09May },
  { id: 'dpp_08_may', title: 'Daily Practice Paper - 08th May 2026', date: '2026-05-08', subject: 'General Studies', size: '149 KB', pdfUrl: pdf08May },
];

export default function DailyPracticePaper() {
  const [dpps, setDpps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Reactive state to check if user has unlocked the papers
  const [isUnlocked, setIsUnlocked] = useState(!!localStorage.getItem('ashoka_dpp_verified_student'));

  // Modal and lead capture states
  const [showModal, setShowModal] = useState(false);
  const [selectedDpp, setSelectedDpp] = useState(null);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', city: '' });
  const [submittingLead, setSubmittingLead] = useState(false);

  // Fullscreen Viewer state
  const [viewerUrl, setViewerUrl] = useState('');
  const [viewerTitle, setViewerTitle] = useState('');

  // Fetch DPPs from Firestore and merge with local static files
  useEffect(() => {
    const fetchDpps = async () => {
      try {
        const q = query(collection(db, 'dpps'), orderBy('date', 'desc'));
        const snap = await getDocs(q);
        const dbItems = snap.docs.map((d) => ({ id: d.id, ...d.data(), size: '150 KB' })); // Add default size if missing

        // Merge keeping DB items and adding missing dates from local
        const combined = [...dbItems];
        LOCAL_DPPS.forEach((localItem) => {
          if (!combined.some((dbItem) => dbItem.date === localItem.date)) {
            combined.push(localItem);
          }
        });

        // Sort descending by date
        combined.sort((a, b) => new Date(b.date) - new Date(a.date));
        setDpps(combined);
      } catch (err) {
        console.error('Error fetching DPPs, falling back to local files:', err);
        setDpps(LOCAL_DPPS);
      } finally {
        setLoading(false);
      }
    };
    fetchDpps();
  }, []);
  // Block print / save shortcuts while viewing protected document
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewerUrl) {
        // Block Ctrl+S, Ctrl+P, Ctrl+U, F12
        if ((e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) || e.key === 'F12') {
          e.preventDefault();
          alert('Downloading, printing, and source inspection are disabled for protected study materials.');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerUrl]);

  // Lock background scroll when modal or viewer is open to ensure stability
  useEffect(() => {
    if (showModal || viewerUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal, viewerUrl]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false);
        setSelectedDpp(null);
      }
    };
    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  // Handle PDF view click
  const handleViewDpp = (dpp) => {
    const cachedUser = localStorage.getItem('ashoka_dpp_verified_student');
    if (cachedUser) {
      openPdfViewer(dpp);
      logLeadView(JSON.parse(cachedUser), dpp);
    } else {
      setSelectedDpp(dpp);
      setShowModal(true);
    }
  };

  const openPdfViewer = (dpp) => {
    let finalUrl = dpp.pdfUrl;

    // Auto-convert Google Drive viewing links to embeddable preview links
    if (finalUrl.includes('drive.google.com/file/d/')) {
      finalUrl = finalUrl.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    } else if (finalUrl.endsWith('.pdf') || finalUrl.includes('/assets/pdf/')) {
      // Append PDF display parameters to disable browser toolbar (Download & Print buttons)
      finalUrl = `${finalUrl}#toolbar=0&navpanes=0`;
    }

    setViewerUrl(finalUrl);
    setViewerTitle(dpp.title);
  };

  // Log lead view event
  const logLeadView = async (userData, dpp) => {
    try {
      await addDoc(collection(db, 'dpp_enquiries'), {
        ...userData,
        dppId: dpp.id,
        dppTitle: dpp.title,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error logging lead event:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Allow only numbers and limit to 10 digits
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setLeadForm((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setLeadForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!leadForm.name || !leadForm.phone || !leadForm.email || !leadForm.city) {
      alert('Please fill out all fields.');
      return;
    }

    if (!/^\d{10}$/.test(leadForm.phone)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmittingLead(true);
    try {
      // Save details to localStorage
      localStorage.setItem('ashoka_dpp_verified_student', JSON.stringify(leadForm));
      setIsUnlocked(true); // Update reactive locked state

      // Save details to Firestore
      await logLeadView(leadForm, selectedDpp);

      // Open PDF in viewer
      openPdfViewer(selectedDpp);

      // Close modal
      setShowModal(false);
      setSelectedDpp(null);
    } catch (err) {
      console.error('Error submitting lead form:', err);
      alert('Something went wrong. Please check your internet connection and try again.');
    } finally {
      setSubmittingLead(false);
    }
  };

  // Close viewer
  const handleCloseViewer = () => {
    setViewerUrl('');
    setViewerTitle('');
  };

  // Filter DPP list based on search bar
  const filteredDpps = useMemo(() => {
    return dpps.filter((dpp) => {
      return dpp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dpp.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dpp.date.includes(searchQuery);
    });
  }, [dpps, searchQuery]);

  return (
    <div className="study-material-page">
      {/* Hero Header */}
      <section className="sm-hero">
        <div className="sm-hero__pattern" style={{ backgroundImage: `url(${crossLine})` }} />
        <div className="container sm-hero__content">
          <span className="section-label">Test Series</span>
          <h1 className="sm-hero__title">Daily Practice <span className="text-gold">Paper (DPP)</span></h1>
          <div className="sm-hero__breadcrumb">
            <Link to="/" className="sm-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <Link to="/" className="sm-hero__bc-link">Student Zone</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <span className="sm-hero__bc-current">Daily Practice Paper</span>
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="dpp-container">
        <div className="container">

          {/* Header & Search Bar (No tags as requested) */}
          <div className="dpp-header-bar">
            <div className="dpp-header-title">
              <h2>Weekly & Daily Worksheets</h2>
              <p>Prepare systematically with our date-wise worksheets</p>
            </div>
            <div className="dpp-search-wrap">
              <input
                type="text"
                placeholder="Search worksheets by date, topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} />
            </div>
          </div>

          {/* List Content */}
          {loading ? (
            <Loader text="Loading worksheets..." />
          ) : filteredDpps.length === 0 ? (
            <div className="dpp-empty-state">
              <FileText size={48} strokeWidth={1.5} />
              <h3>No papers available</h3>
              <p>We couldn't find any Daily Practice Papers matching your search query. Please try searching something else!</p>
            </div>
          ) : (
            <div className="dpp-table-card">
              <div className="dpp-table-wrap">
                <table className="dpp-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Subject</th>
                      <th>Worksheet Title</th>
                      <th style={{ textAlign: 'center' }}>Format</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDpps.map((item) => {
                      const itemDate = new Date(item.date);
                      const formattedDate = isNaN(itemDate.getTime())
                        ? 'Worksheet'
                        : itemDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

                      return (
                        <tr key={item.id} className="dpp-table-row">
                          <td className="dpp-table-date">
                            <span className="dpp-date-text">{formattedDate}</span>
                          </td>
                          <td className="dpp-table-subject">
                            <span className={`dpp-table-badge subject-${item.subject.toLowerCase().replace(/[^a-z]/g, '')}`}>
                              {item.subject}
                            </span>
                          </td>
                          <td className="dpp-table-title">
                            <div className="dpp-title-text">{item.title}</div>
                            <div className="dpp-meta-text">Size: {item.size || '150 KB'}</div>
                          </td>
                          <td className="dpp-table-format" style={{ textAlign: 'center' }}>
                            <span className="dpp-format-badge">PDF</span>
                          </td>
                          <td className="dpp-table-action" style={{ textAlign: 'right' }}>
                            <button
                              className={`dpp-action-btn-modern ${!isUnlocked ? 'dpp-btn-locked' : 'dpp-btn-unlocked'}`}
                              onClick={() => handleViewDpp(item)}
                            >
                              {!isUnlocked ? (
                                <>
                                  <Lock size={12} />
                                  <span>Click here to view</span>
                                </>
                              ) : (
                                <>
                                  <Eye size={12} />
                                  <span>Click here to view</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Lead Capture Modal ── */}
      {showModal && (
        <div className="dpp-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="dpp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="dpp-modal-close" onClick={() => setShowModal(false)} aria-label="Close">
              <X size={16} strokeWidth={2.5} />
            </button>
            <div className="dpp-modal-banner">
              <img src={logo} alt="Ashoka IAS Academy" />
              <h3>Unlock Study Material</h3>
              <p>Please provide your basic details to gain immediate free access to all Daily Practice Papers (DPPs) & Answer Keys.</p>
            </div>
            <div className="dpp-modal-body">
              <form onSubmit={handleLeadSubmit} className="dpp-modal-form">
                <div className="dpp-modal-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={leadForm.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Priyanuj Baruah"
                    required
                  />
                </div>

                <div className="dpp-modal-field">
                  <label>Mobile Number *</label>
                  <div className="dpp-phone-input-wrapper">
                    <div className="dpp-phone-prefix">
                      <svg width="16" height="12" viewBox="0 0 3 2" className="dpp-flag-icon">
                        <rect width="3" height="2" fill="#008A00" />
                        <rect width="3" height="1.333" fill="#FFF" />
                        <rect width="3" height="0.667" fill="#FF9933" />
                        <circle cx="1.5" cy="1" r="0.18" fill="#000080" />
                      </svg>
                      <span className="dpp-phone-country-code">+91</span>
                      <span className="dpp-phone-divider">|</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={leadForm.phone}
                      onChange={handleInputChange}
                      placeholder="98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="dpp-modal-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={leadForm.email}
                    onChange={handleInputChange}
                    placeholder="e.g. name@domain.com"
                    required
                  />
                </div>

                <div className="dpp-modal-field">
                  <label>City / Location *</label>
                  <input
                    type="text"
                    name="city"
                    value={leadForm.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Guwahati"
                    required
                  />
                </div>

                <button type="submit" className="dpp-submit-btn" disabled={submittingLead}>
                  {submittingLead ? 'Unlocking...' : 'Unlock & View PDF'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Fullscreen PDF Viewer Overlay ── */}
      {viewerUrl && (
        <div className="dpp-viewer-overlay" onContextMenu={(e) => e.preventDefault()}>
          <div className="dpp-viewer-header">
            <h3>{viewerTitle} <span className="dpp-viewer-badge" style={{ display: 'inline-block' }}>Protected View</span></h3>
            <button className="dpp-viewer-close" onClick={handleCloseViewer}>
              <X size={14} />
              <span>Close Document</span>
            </button>
          </div>
          <div className="dpp-viewer-body">
            <iframe
              src={viewerUrl}
              title={viewerTitle}
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </div>
  );
}
