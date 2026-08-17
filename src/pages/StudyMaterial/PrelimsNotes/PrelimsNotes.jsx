import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import SEO from '../../../components/common/SEO';
import PageHeader from '../../../components/common/PageHeader';
import PdfViewerModal from '../../../components/common/PdfViewerModal';
import logo from '../../../assets/images/logo.png';
import {
  Lock,
  Eye,
  FileText,
  X,
  MapPin,
  Globe,
  Newspaper,
} from 'lucide-react';

// ── 2026 PDF Imports (Whole Compilation) ──
import pdf2026AssamWhole from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/current_affairs2026(inawhole)/assam_current_affirs_2026_50_shot_comp(jan_july_FINAL.pdf';

// ── 2025 National & International PDF Imports (10 Modules) ──
import pdfNatArtCulture2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/ARTandCULTURE_CA_2025_50_SHOT.pdf';
import pdfNatEconomy2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/ECONOMY_CA2025_50_SHOTS.pdf';
import pdfNatEnvGeo2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/ENVIRONMENTandGEO_CA2025_50_SHOT.pdf';
import pdfNatIR2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/IR_CA_Compilation_2025.pdf';
import pdfNatSchemes2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/NATIONAL_SCHEME_CA_COMPILATION.pdf';
import pdfNatPersonalities2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/personalities_INDIA_CA_50_SHOT_2025.pdf';
import pdfNatPolity2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/POLITY_CA_COMPILATION2025.pdf';
import pdfNatSciTech2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/SCIENCEandTECH_CA_2025_50_SHOT.pdf';
import pdfNatSecurity2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/SECURITY_CURRENT_AFFAIRS_2025_50_SHOT.pdf';
import pdfNatSocialIssues2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/cuurent_affairs(nationalandinternational)/Social_issue_2025_CA50_SHOTS_Compilations.pdf';

// ── 2025 Assam Special PDF Imports (7 Modules) ──
import pdfAssamArtCulture2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/current_affairs2025/ASSAM_ARTandCULTURE_COMP2025.pdf';
import pdfAssamAwards2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/current_affairs2025/ASSAM_AWARDS_COMP2025.pdf';
import pdfAssamEnv2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/current_affairs2025/ASSAM_ENVIRONMENT_COMP2025.pdf';
import pdfAssamHistory2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/current_affairs2025/ASSSAM_HISTORY_COMP2025.pdf';
import pdfAssamPolity2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/current_affairs2025/ASSAM_POLITY_COMP_2025.pdf';
import pdfAssamSchemes2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/current_affairs2025/ASSAM_SCHEME_COMP_2025.pdf';
import pdfAssamSciTech2025 from '../../../assets/pdf/free_study_materials/prelims_notes/current_affairs/current_affairs2025/ASSAM_SCIandTECH_COMP2025.pdf';

import '../DailyPracticePaper/DailyPracticePaper.css';
import './PrelimsNotes.css';

// ── 3 MAIN FOLDER DEFINITIONS ──
const FOLDERS = [
  {
    id: 'current_affairs2026(inawhole)',
    slug: 'current-affairs-2026',
    folderName: 'current_affairs2026(inawhole)',
    categoryKey: 'whole_2026',
    year: '2026',
    title: 'Current Affairs 2026 (Whole Compilation)',
    subtitle: 'Jan – July 2026 Full Edition • 50-Shots Point-to-Point Series',
    description: 'Master all state & national current events from January to July 2026 with 50 high-yield point-to-point notes for quick Prelims revision.',
    badge: '2026 Complete Edition',
    moduleCount: '1 Full Module',
    tag: 'Latest 2026',
    icon: Newspaper,
    themeClass: 'folder-amber',
  },
  {
    id: 'cuurent_affairs(nationalandinternational)',
    slug: 'national-international',
    folderName: 'cuurent_affairs(nationalandinternational)',
    categoryKey: 'national_international',
    year: '2025',
    title: 'Current Affairs (National & International)',
    subtitle: '10 Subject-wise 50-Shots Modules for UPSC & APSC Prelims',
    description: 'Complete subject-wise compilations: Polity, Economy, Environment & Geo, IR, Govt Schemes, Personalities, Sci-Tech, Security, and Social Issues.',
    badge: '10 Specialized Modules',
    moduleCount: '10 Modules',
    tag: 'National & Global',
    icon: Globe,
    themeClass: 'folder-blue',
  },
  {
    id: 'current_affairs2025',
    slug: 'assam-2025',
    folderName: 'current_affairs2025',
    categoryKey: 'assam_special',
    year: '2025',
    title: 'Current Affairs 2025 (Assam State Special)',
    subtitle: '7 Topic-wise Modules Dedicated to Assam State Section',
    description: 'Dedicated Assam Prelims focus: Art & Culture, State Awards & Personalities, Environment & Wildlife, State History, Polity & Governance, State Schemes, and Science & Tech.',
    badge: '7 Assam Modules',
    moduleCount: '7 Modules',
    tag: 'Assam State Special',
    icon: MapPin,
    themeClass: 'folder-emerald',
  },
];

// ── DATA SOURCES ──
const PRELIMS_DOCUMENTS = [
  // 1) 2026 Whole Compilation
  {
    id: 'ca_2026_whole_assam',
    year: '2026',
    category: 'whole_2026',
    scope: 'Assam & National Special',
    title: 'Assam Current Affairs 2026 (Jan-July Complete 50-Shot Compilation)',
    subtitle: 'Comprehensive 50-Shot Compilation - Full Edition for UPSC & APSC Prelims 2026',
    subject: 'Assam & National CA',
    subjectKey: 'assam',
    size: '2.3 MB',
    badge: '2026 Complete Edition',
    description: 'Master all state & national current events from January to July 2026 with 50 high-yield point-to-point notes for quick Prelims revision.',
    pdfUrl: pdf2026AssamWhole
  },

  // 2) 2025 National & International (10 Modules)
  {
    id: 'ca_2025_nat_art_culture',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'Art & Culture - 50 Shots CA Compilation 2025',
    subject: 'Art & Culture',
    subjectKey: 'artculture',
    size: '821 KB',
    badge: '50 Shots Series',
    description: 'Classical arts, architecture, heritage monuments, UNESCO inclusions, GI tags, and festive traditions.',
    pdfUrl: pdfNatArtCulture2025
  },
  {
    id: 'ca_2025_nat_economy',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'Indian Economy & Banking - 50 Shots Compilation 2025',
    subject: 'Economy',
    subjectKey: 'economy',
    size: '2.1 MB',
    badge: '50 Shots Series',
    description: 'Union budget highlights, RBI monetary policies, banking sector reforms, inflation, forex, and economic surveys.',
    pdfUrl: pdfNatEconomy2025
  },
  {
    id: 'ca_2025_nat_env_geo',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'Environment, Ecology & Geography - 50 Shots 2025',
    subject: 'Environment & Geo',
    subjectKey: 'environment',
    size: '1.2 MB',
    badge: '50 Shots Series',
    description: 'Climate change summits, COP resolutions, national parks, Ramsar wetlands, IUCN list, and disaster management.',
    pdfUrl: pdfNatEnvGeo2025
  },
  {
    id: 'ca_2025_nat_ir',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'International Relations & Global Affairs Compilation 2025',
    subject: 'International Relations',
    subjectKey: 'ir',
    size: '3.2 MB',
    badge: 'Complete CA',
    description: 'Bilateral summits, UN & multilateral treaties, G20/BRICS/SCO developments, and key geopolitical shifts.',
    pdfUrl: pdfNatIR2025
  },
  {
    id: 'ca_2025_nat_schemes',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'National Schemes, Policies & Flagship Programs 2025',
    subject: 'Govt Schemes',
    subjectKey: 'schemes',
    size: '1.0 MB',
    badge: 'Govt Schemes',
    description: 'Central government schemes, nodal ministries, beneficiary criteria, budget allocations, and key milestones.',
    pdfUrl: pdfNatSchemes2025
  },
  {
    id: 'ca_2025_nat_personalities',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'Important Personalities & Appointments of India 2025',
    subject: 'Personalities',
    subjectKey: 'personalities',
    size: '390 KB',
    badge: '50 Shots Series',
    description: 'Key constitutional appointments, heads of commissions, obituary notices, and prominent national achievers.',
    pdfUrl: pdfNatPersonalities2025
  },
  {
    id: 'ca_2025_nat_polity',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'Polity, Governance & Constitutional Developments 2025',
    subject: 'Polity & Governance',
    subjectKey: 'polity',
    size: '976 KB',
    badge: '50 Shots Series',
    description: 'Supreme Court landmark verdicts, constitutional amendments, bills passed in Parliament, and statutory bodies.',
    pdfUrl: pdfNatPolity2025
  },
  {
    id: 'ca_2025_nat_sci_tech',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'Science, Technology & Space Missions - 50 Shots 2025',
    subject: 'Science & Tech',
    subjectKey: 'sciencetech',
    size: '788 KB',
    badge: '50 Shots Series',
    description: 'ISRO satellite missions, defense technology, biotechnology, AI developments, and healthcare innovations.',
    pdfUrl: pdfNatSciTech2025
  },
  {
    id: 'ca_2025_nat_security',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'Internal Security & Defense Developments - 50 Shots 2025',
    subject: 'Internal Security',
    subjectKey: 'security',
    size: '1.1 MB',
    badge: '50 Shots Series',
    description: 'Joint defense exercises, border security infrastructure, cyber defense initiatives, and indigenization programs.',
    pdfUrl: pdfNatSecurity2025
  },
  {
    id: 'ca_2025_nat_social_issues',
    year: '2025',
    category: 'national_international',
    scope: 'National & International',
    title: 'Social Issues, Health & Human Development - 50 Shots 2025',
    subject: 'Social Issues',
    subjectKey: 'social',
    size: '1.3 MB',
    badge: '50 Shots Series',
    description: 'National health indices, educational policy reforms, gender justice, welfare for vulnerable sections, and SDG goals.',
    pdfUrl: pdfNatSocialIssues2025
  },

  // 3) 2025 Assam Special (7 Topic-wise Modules)
  {
    id: 'ca_2025_assam_art_culture',
    year: '2025',
    category: 'assam_special',
    scope: 'Assam State Special',
    title: 'Assam Art, Culture & Heritage Compilation 2025',
    subject: 'Assam Art & Culture',
    subjectKey: 'assam',
    size: '1.3 MB',
    badge: 'Assam Special',
    description: 'Assam folk culture, sattras, traditional festivals, archaeological excavations, and Charaideo Moidams recognition.',
    pdfUrl: pdfAssamArtCulture2025
  },
  {
    id: 'ca_2025_assam_awards',
    year: '2025',
    category: 'assam_special',
    scope: 'Assam State Special',
    title: 'Assam State Awards, Honours & Personalities 2025',
    subject: 'Assam Awards',
    subjectKey: 'assam',
    size: '434 KB',
    badge: 'Assam Special',
    description: 'Assam Baibhav, Assam Saurav & Assam Gaurav awardees, Sahitya Akademi winners, and state sports achievers.',
    pdfUrl: pdfAssamAwards2025
  },
  {
    id: 'ca_2025_assam_env',
    year: '2025',
    category: 'assam_special',
    scope: 'Assam State Special',
    title: 'Assam Environment, Wildlife & Biodiversity 2025',
    subject: 'Assam Environment',
    subjectKey: 'assam',
    size: '1.4 MB',
    badge: 'Assam Special',
    description: 'Kaziranga & Manas wildlife updates, rhino conservation milestones, wetlands, eco-sensitive zones, and Brahmaputra basin ecology.',
    pdfUrl: pdfAssamEnv2025
  },
  {
    id: 'ca_2025_assam_history',
    year: '2025',
    category: 'assam_special',
    scope: 'Assam State Special',
    title: 'Assam History & Historical Milestones Compilation 2025',
    subject: 'Assam History',
    subjectKey: 'assam',
    size: '519 KB',
    badge: 'Assam Special',
    description: 'Ahom dynasty historical events, colonial resistance in Assam, freedom movement leaders, and historical treaties.',
    pdfUrl: pdfAssamHistory2025
  },
  {
    id: 'ca_2025_assam_polity',
    year: '2025',
    category: 'assam_special',
    scope: 'Assam State Special',
    title: 'Assam Polity, Administration & Governance 2025',
    subject: 'Assam Polity',
    subjectKey: 'assam',
    size: '1.05 MB',
    badge: 'Assam Special',
    description: 'Assam Assembly enactments, Autonomous Council governance (BTC, KAAC, NCHAC), delimitation developments, and administrative reforms.',
    pdfUrl: pdfAssamPolity2025
  },
  {
    id: 'ca_2025_assam_schemes',
    year: '2025',
    category: 'assam_special',
    scope: 'Assam State Special',
    title: 'Assam State Government Schemes & Welfare Initiatives 2025',
    subject: 'Assam Schemes',
    subjectKey: 'assam',
    size: '687 KB',
    badge: 'Assam Special',
    description: 'Orunodoi 3.0, Nijut Moina, MM Atmanirbhar Asom Abhiyan, Pragyan Bharati, and flagship state welfare programs.',
    pdfUrl: pdfAssamSchemes2025
  },
  {
    id: 'ca_2025_assam_sci_tech',
    year: '2025',
    category: 'assam_special',
    scope: 'Assam State Special',
    title: 'Assam Science, Technology & Innovation 2025',
    subject: 'Assam Science & Tech',
    subjectKey: 'assam',
    size: '501 KB',
    badge: 'Assam Special',
    description: 'Tata semiconductor facility in Jagiroad, green hydrogen pilots, IIT Guwahati research innovations, and Digital Assam initiatives.',
    pdfUrl: pdfAssamSciTech2025
  },
];

export default function PrelimsNotes() {
  const { slug } = useParams();

  // Active folder object derived from clean URL slug
  const activeFolder = useMemo(() => {
    if (!slug) return null;
    return FOLDERS.find((f) => f.slug === slug) || null;
  }, [slug]);

  // Search query within the selected folder
  const [searchQuery, setSearchQuery] = useState('');

  // Reactive state to check if user has unlocked the materials
  const [isUnlocked, setIsUnlocked] = useState(
    !!localStorage.getItem('ashoka_dpp_verified_student') || !!localStorage.getItem('ashoka_prelims_verified')
  );

  // Modal and lead capture states
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', city: '' });
  const [submittingLead, setSubmittingLead] = useState(false);

  // Fullscreen Viewer state
  const [viewerUrl, setViewerUrl] = useState('');
  const [viewerTitle, setViewerTitle] = useState('');

  // Lock background scroll when modal or viewer is open
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

  // Block print / save shortcuts while viewing protected document
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewerUrl) {
        if ((e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) || e.key === 'F12') {
          e.preventDefault();
          alert('Downloading and printing are disabled for protected study materials.');
        }
      }
      if (e.key === 'Escape') {
        if (viewerUrl) {
          setViewerUrl('');
          setViewerTitle('');
        }
        if (showModal) {
          setShowModal(false);
          setSelectedDoc(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerUrl, showModal]);

  const navigate = useNavigate();

  // Select folder handler — navigate to clean slug route
  const handleSelectFolder = (folder) => {
    setSearchQuery('');
    navigate(`/prelims-notes/${folder.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle PDF view click
  const handleViewDoc = (doc) => {
    const cachedUser =
      localStorage.getItem('ashoka_dpp_verified_student') || localStorage.getItem('ashoka_prelims_verified');
    if (cachedUser) {
      openPdfViewer(doc);
      try {
        logLeadView(JSON.parse(cachedUser), doc);
      } catch (e) {
        // Safe JSON parsing fallback
      }
    } else {
      setSelectedDoc(doc);
      setShowModal(true);
    }
  };

  const openPdfViewer = (doc) => {
    let finalUrl = doc.pdfUrl;
    if (finalUrl.includes('drive.google.com/file/d/')) {
      finalUrl = finalUrl.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    } else if (finalUrl.endsWith('.pdf') || finalUrl.includes('/assets/pdf/')) {
      finalUrl = `${finalUrl}#toolbar=0&navpanes=0`;
    }
    setViewerUrl(finalUrl);
    setViewerTitle(doc.title);
  };

  // Log lead view event
  const logLeadView = async (userData, doc) => {
    try {
      await addDoc(collection(db, 'study_material_leads'), {
        ...userData,
        docId: doc.id,
        docTitle: doc.title,
        docYear: doc.year,
        docCategory: doc.category,
        page: 'Prelims Notes',
        folder: activeFolder ? activeFolder.folderName : 'all',
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error logging lead event:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setLeadForm((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setLeadForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!leadForm.name || !leadForm.phone || !leadForm.city) {
      alert('Please fill out all fields.');
      return;
    }

    if (!/^\d{10}$/.test(leadForm.phone)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmittingLead(true);
    try {
      localStorage.setItem('ashoka_dpp_verified_student', JSON.stringify(leadForm));
      localStorage.setItem('ashoka_prelims_verified', JSON.stringify(leadForm));
      setIsUnlocked(true);

      await logLeadView(leadForm, selectedDoc);

      openPdfViewer(selectedDoc);
      setShowModal(false);
      setSelectedDoc(null);
    } catch (err) {
      console.error('Error submitting lead form:', err);
      alert('Something went wrong. Please check your internet connection and try again.');
    } finally {
      setSubmittingLead(false);
    }
  };

  const handleCloseViewer = () => {
    setViewerUrl('');
    setViewerTitle('');
  };

  // Filter documents in active folder
  const filteredDocs = useMemo(() => {
    if (!activeFolder) return [];
    return PRELIMS_DOCUMENTS.filter((doc) => {
      if (doc.category !== activeFolder.categoryKey) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesSubject = doc.subject.toLowerCase().includes(q);
        const matchesDesc = doc.description.toLowerCase().includes(q);
        const matchesYear = doc.year.includes(q);
        const matchesScope = doc.scope.toLowerCase().includes(q);
        return matchesTitle || matchesSubject || matchesDesc || matchesYear || matchesScope;
      }
      return true;
    });
  }, [activeFolder, searchQuery]);

  return (
    <div className="study-material-page prelims-page">
      <SEO
        title={
          activeFolder
            ? `${activeFolder.title} | Ashoka IAS Academy`
            : "UPSC & APSC Prelims Notes & Current Affairs Magazine | Ashoka IAS Academy"
        }
        description="Download curated Current Affairs 2026 Whole Compilations, 2025 National & International 50-Shots, and Assam State Special Prelims study materials."
      />

      {/* Page Header */}
      <PageHeader
        title="Prelims Notes & Study Material"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Free Study Material', to: '/courses-all' },
          ...(activeFolder
            ? [
              { label: 'Prelims Notes', to: '/prelims-notes' },
              { label: activeFolder.title }
            ]
            : [{ label: 'Prelims Notes' }]),
        ]}
      />

      <div className="prelims-main">
        <div className="container">

          {/* ========================================================
              VIEW 1: INITIAL 3 FOLDERS CARDS VIEW (When no folder open)
              ======================================================== */}
          {!activeFolder ? (
            <div className="prelims-folders-hub">
              {/* The 3 Main Folder Cards */}
              <div className="prelims-folders-grid">
                {FOLDERS.map((folder, index) => {
                  const IconComp = folder.icon;

                  return (
                    <div
                      key={folder.id}
                      className={`prelims-hub-folder-card ${folder.themeClass}`}
                      onClick={() => handleSelectFolder(folder)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectFolder(folder);
                        }
                      }}
                    >
                      <div className="folder-card-inner">
                        {/* Top Bar: Icon + Year Tag */}
                        <div className="folder-card-top">
                          <div className="folder-icon-circle">
                            <IconComp size={24} />
                          </div>
                          <span className="folder-pill-tag">{folder.tag}</span>
                        </div>

                        {/* Card Title & Subtitle */}
                        <h3 className="folder-card-title">{folder.title}</h3>
                        <p className="folder-card-subtitle">{folder.subtitle}</p>

                        {/* Description */}
                        <p className="folder-card-desc">{folder.description}</p>

                        {/* Meta info row */}
                        <div className="folder-meta-row">
                          <span className="folder-meta-label">Included Modules</span>
                          <span className="folder-meta-val">{folder.moduleCount}</span>
                        </div>

                        {/* Full Width VIEW DETAILS Button */}
                        <div className="folder-card-footer">
                          <div className="folder-card-btn">VIEW DETAILS</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ========================================================
               VIEW 2: DEDICATED FOLDER VIEW (Matching DPP UI)
               ======================================================== */
            <div className="prelims-dedicated-view">
              {/* Header */}
              <div className="dpp-header-bar prelims-dpp-header">
                <div className="dpp-header-title">
                  <h2>{activeFolder.title}</h2>
                  <p>{activeFolder.subtitle}</p>
                </div>
              </div>

              {/* Document List Table */}
              {filteredDocs.length === 0 ? (
                <div className="dpp-empty-state">
                  <FileText size={48} strokeWidth={1.5} />
                  <h3>No documents found</h3>
                  <p>We couldn't find any PDF modules matching your search query. Please try searching with a different term.</p>
                  <button
                    className="prelims-reset-btn"
                    onClick={() => setSearchQuery('')}
                    style={{ marginTop: 14 }}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="dpp-table-card">
                  <div className="dpp-table-wrap">
                    <table className="dpp-table">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Subject</th>
                          <th>Module Title</th>
                          <th style={{ textAlign: 'center' }}>Format</th>
                          <th style={{ textAlign: 'right' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocs.map((doc) => {
                          const subjectClass = `subject-${doc.subjectKey || doc.subject.toLowerCase().replace(/[^a-z]/g, '')}`;

                          return (
                            <tr key={doc.id} className="dpp-table-row">
                              <td className="dpp-table-date">
                                <span className="dpp-date-text">{doc.year}</span>
                              </td>
                              <td className="dpp-table-subject">
                                <span className={`dpp-table-badge ${subjectClass}`}>
                                  {doc.subject}
                                </span>
                              </td>
                              <td className="dpp-table-title">
                                <div className="dpp-title-text">{doc.title}</div>
                                <div className="dpp-meta-text">Size: {doc.size || '1.5 MB'} • {doc.badge || 'High-Yield Notes'}</div>
                              </td>
                              <td className="dpp-table-format" style={{ textAlign: 'center' }}>
                                <span className="dpp-format-badge">PDF</span>
                              </td>
                              <td className="dpp-table-action" style={{ textAlign: 'right' }}>
                                <button
                                  className={`dpp-action-btn-modern ${!isUnlocked ? 'dpp-btn-locked' : 'dpp-btn-unlocked'}`}
                                  onClick={() => handleViewDoc(doc)}
                                >
                                  {!isUnlocked ? (
                                    <>
                                      <Lock size={12} />
                                      <span>View</span>
                                    </>
                                  ) : (
                                    <>
                                      <Eye size={12} />
                                      <span>View</span>
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
          )}
        </div>
      </div>

      {/* ── Lead Capture Modal ── */}
      {showModal && (
        <div className="dpp-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="dpp-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="dpp-modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
            <div className="dpp-modal-banner">
              <img src={logo} alt="Ashoka IAS Academy" />
              <h3>Unlock Prelims Study Material</h3>
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
                    placeholder=""
                    required
                  />
                </div>

                <div className="dpp-modal-field">
                  <label>Mobile Number *</label>
                  <div className="dpp-phone-input-wrapper">
                    <div className="dpp-phone-prefix">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 3 2"
                        width="16"
                        height="11"
                        style={{
                          borderRadius: '1px',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
                          flexShrink: 0,
                        }}
                      >
                        <rect width="3" height="0.667" fill="#FF9933" />
                        <rect y="0.667" width="3" height="0.667" fill="#ffffff" />
                        <rect y="1.333" width="3" height="0.667" fill="#138808" />
                        <circle cx="1.5" cy="1" r="0.2" fill="#000080" />
                        <circle cx="1.5" cy="1" r="0.15" fill="#ffffff" />
                        <circle cx="1.5" cy="1" r="0.05" fill="#000080" />
                      </svg>
                      <span className="dpp-phone-country-code">+91</span>
                      <span className="dpp-phone-divider">|</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={leadForm.phone}
                      onChange={handleInputChange}
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                <div className="dpp-modal-field">
                  <label>City / Town in Assam / India *</label>
                  <input
                    type="text"
                    name="city"
                    value={leadForm.city}
                    onChange={handleInputChange}
                    placeholder=""
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="dpp-submit-btn"
                  disabled={submittingLead}
                >
                  {submittingLead ? 'Unlocking Access...' : 'Unlock & Read Notes Now →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Universal High-Performance PDF Viewer Modal (Mobile, Tablet & Desktop) ── */}
      <PdfViewerModal
        isOpen={!!viewerUrl}
        pdfUrl={viewerUrl}
        title={viewerTitle}
        onClose={handleCloseViewer}
      />
    </div>
  );
}

