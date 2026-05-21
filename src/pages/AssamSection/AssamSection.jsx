import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Clock, 
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';
import crossLine from '../../assets/images/cross-line.png';
import logoImg from '../../assets/images/logo.jpeg';
import './AssamSection.css';
import CtaSection from '../Home/sections/CtaSection';

const PRELIMS_TABS = [
  {
    id: 'history',
    label: 'History of Assam',
    sublabel: 'Ancient to Modern Era',
    heading: 'History of Assam',
    subheading: 'Ancient to Modern Era — High Yield Facts',
    image: logoImg,
    points: [
      { title: 'Ancient Period', desc: 'Assam, known as Pragjyotisha and later Kamarupa, has a recorded history dating back to the 4th century. The Varman dynasty established the first historical kingdom.' },
      { title: 'Ahom Kingdom', desc: 'The Ahom dynasty ruled Assam for nearly 600 years (1228–1826), successfully resisting Mughal invasions 17 times. Their administrative system called "Paik" was unique.' },
      { title: 'British Period', desc: 'After the Treaty of Yandabo (1826), Assam came under British rule. It became a separate province in 1874 and was a major center for tea and oil production.' },
      { title: 'Post-Independence', desc: 'Assam became a state of independent India in 1947. Several northeastern states were carved out of Assam — Nagaland (1963), Meghalaya, Manipur, Tripura (1972), Mizoram, Arunachal Pradesh (1987).' },
      { title: 'UPSC Relevance', desc: 'Questions on Ahom administration, Anglo-Burmese War, Treaty of Yandabo, and the reorganization of northeastern states frequently appear in UPSC and APSC exams.' },
    ],
    facts: [
      { label: 'Ancient Name', value: 'Pragjyotisha / Kamarupa' },
      { label: 'Ahom Rule', value: '1228 – 1826 AD' },
      { label: 'British Treaty', value: 'Treaty of Yandabo, 1826' },
      { label: 'Statehood', value: '26 January 1950' },
    ],
    mcq: {
      question: "Which of the following treaties was signed in 1826, marking the beginning of British rule in Assam?",
      options: [
        "Treaty of Purandar",
        "Treaty of Yandabo",
        "Treaty of Sagauli",
        "Treaty of Badarpur"
      ],
      correctIndex: 1,
      explanation: "The Treaty of Yandabo was signed on 24 February 1826 between the East India Company and the King of Ava (Burma), ending the First Anglo-Burmese War and bringing Assam under British control."
    }
  },
  {
    id: 'polity',
    label: 'Polity of Assam',
    sublabel: 'Governance & Constitution',
    heading: 'Polity of Assam',
    subheading: 'Governance & Constitutional Framework',
    image: logoImg,
    points: [
      { title: 'State Legislature', desc: 'Assam has a unicameral legislature — the Assam Legislative Assembly (Vidhan Sabha) with 126 seats. The state sends 14 members to Lok Sabha and 7 to Rajya Sabha.' },
      { title: 'Sixth Schedule', desc: 'Assam has Autonomous District Councils under the Sixth Schedule — Bodoland Territorial Council (BTC), Karbi Anglong Autonomous Council, and Dima Hasao Autonomous Council.' },
      { title: 'Bodoland Territorial Region', desc: 'The Bodoland Territorial Region (BTR) was created under the Sixth Schedule. It comprises four districts: Kokrajhar, Chirang, Baksa, and Udalguri.' },
      { title: 'Inner Line Permit', desc: 'Some districts of Assam require Inner Line Permit (ILP) for non-residents. This is governed under the Bengal Eastern Frontier Regulation, 1873.' },
      { title: 'APSC & Governance', desc: 'The Assam Public Service Commission (APSC) conducts the Combined Competitive Examination (CCE) for recruitment to state civil services.' },
    ],
    facts: [
      { label: 'Legislature', value: 'Unicameral (126 seats)' },
      { label: 'Lok Sabha Seats', value: '14' },
      { label: 'Rajya Sabha Seats', value: '7' },
      { label: 'High Court', value: 'Gauhati High Court' },
    ],
    mcq: {
      question: "How many districts currently comprise the Bodoland Territorial Region (BTR) in Assam under the Sixth Schedule?",
      options: [
        "Three districts",
        "Four districts",
        "Five districts",
        "Six districts"
      ],
      correctIndex: 1,
      explanation: "The Bodoland Territorial Region (BTR) comprises four districts: Kokrajhar, Chirang, Baksa, and Udalguri, established under the Sixth Schedule of the Indian Constitution."
    }
  },
  {
    id: 'economics',
    label: 'Economy of Assam',
    sublabel: 'Agriculture & Industry',
    heading: 'Economy of Assam',
    subheading: 'Agriculture, Industry & Development',
    image: logoImg,
    points: [
      { title: 'Agriculture', desc: 'Agriculture is the backbone of Assam\'s economy. Major crops include rice (staple), tea, jute, sugarcane, and mustard. Assam produces about 50% of India\'s total tea output.' },
      { title: 'Tea Industry', desc: 'Assam is the world\'s largest tea-growing region. The Brahmaputra Valley and Barak Valley are major tea-producing areas. Assam tea is known for its strong, malty flavor.' },
      { title: 'Petroleum & Natural Gas', desc: 'Assam has one of India\'s oldest oil fields. Digboi (1889) is Asia\'s oldest oil refinery. Oil India Limited (OIL) and ONGC operate in the state.' },
      { title: 'Silk Industry', desc: 'Assam is famous for Muga (golden silk, GI tagged), Eri, and Pat silk. Muga silk is unique to Assam and used in traditional Mekhela Chador.' },
      { title: 'Infrastructure', desc: 'The Bogibeel Bridge (2018) is India\'s longest rail-road bridge. The state is developing industrial corridors and special economic zones.' },
    ],
    facts: [
      { label: 'Tea Production', value: '~50% of India\'s total' },
      { label: 'Oldest Oil Refinery', value: 'Digboi (1889)' },
      { label: 'GI Tagged Silk', value: 'Muga Silk' },
      { label: 'Longest Bridge', value: 'Bogibeel Bridge' },
    ],
    mcq: {
      question: "Which town in Assam is famous as the oldest operating oil refinery in Asia?",
      options: [
        "Bongaigaon",
        "Numaligarh",
        "Digboi",
        "Guwahati"
      ],
      correctIndex: 2,
      explanation: "Digboi in Tinsukia district is the oldest operating oil refinery in Asia, with oil discovery dating back to 1889 and the refinery commissioned in 1901."
    }
  },
  {
    id: 'geography',
    label: 'Geography of Assam',
    sublabel: 'Physical Features',
    heading: 'Geography of Assam',
    subheading: 'Physical Features & Natural Resources',
    image: logoImg,
    points: [
      { title: 'Location & Boundaries', desc: 'Assam is located in Northeast India between 24°N–28°N latitude and 89°E–96°E longitude. It shares borders with Bhutan, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Meghalaya, Tripura, and Bangladesh.' },
      { title: 'Brahmaputra Valley', desc: 'The Brahmaputra River (called Luit in Assamese) flows through the heart of Assam. The valley is one of the most fertile plains in India, prone to annual floods.' },
      { title: 'Barak Valley', desc: 'The Barak Valley in southern Assam is drained by the Barak River. It comprises Cachar, Hailakandi, and Karimganj districts and has a distinct cultural identity.' },
      { title: 'National Parks & Wildlife', desc: 'Assam has 7 national parks — Kaziranga (UNESCO World Heritage, home to one-horned rhino), Manas (UNESCO World Heritage), Dibru-Saikhowa, Nameri, Orang, Raimona, and Dihing Patkai.' },
      { title: 'Climate & Rainfall', desc: 'Assam has a humid subtropical climate with heavy monsoon rainfall (1,500–3,000 mm annually). The state is highly prone to floods and earthquakes (seismic zone V).' },
    ],
    facts: [
      { label: 'Area', value: '78,438 sq km' },
      { label: 'Districts', value: '35' },
      { label: 'Major River', value: 'Brahmaputra (Luit)' },
      { label: 'UNESCO Sites', value: 'Kaziranga & Manas' },
    ],
    mcq: {
      question: "Which of the following is the newest National Park declared in Assam?",
      options: [
        "Raimona National Park",
        "Dihing Patkai National Park",
        "Orang National Park",
        "Dibru-Saikhowa National Park"
      ],
      correctIndex: 1,
      explanation: "Dihing Patkai was notified as the 7th National Park of Assam in June 2021, shortly after Raimona was declared as the 6th."
    }
  },
];

const MAINS_TABS = [
  {
    id: 'history',
    label: 'History & Culture',
    sublabel: 'Mains Focus & Articles',
    heading: 'Assam History & Culture',
    subheading: 'APSC GS 5 Paper — Analytical Essays',
    article: {
      title: "Ahom Administration and its Strength in Resisting Mughal Expansion",
      syllabusTag: "APSC GS 5: Assam History, Art & Culture",
      readTime: "12 min read",
      difficulty: "Advanced",
      introduction: "The Ahom dynasty's nearly 600-year uninterrupted rule (1228–1826 AD) represents one of the most resilient kingdoms in medieval Indian history. Central to their longevity was a brilliant fusion of socio-military organization, decentralised governance, and tactical warfare that successfully resisted seventeen Mughal onslaughts.",
      sections: [
        {
          title: "1. The Paik System: A Decentralized Socio-Economic Engine",
          content: "Unlike the feudal armies of contemporary India, the Ahom administration relied on the Paik System—a system of compulsory state service. Every male citizen (Paik) aged 15 to 50 had to render military or civil services in rotation. This structure eliminated the need for a massive, expensive standing army during peacetime, while providing an instantly mobilizable citizen militia during crises.",
          highlight: "The Paik system made every ordinary citizen a defender of the state, ensuring high morale and deeply ingrained combat readiness."
        },
        {
          title: "2. Strategic Naval Superiority & Riverine Guerrilla Tactics",
          content: "The Brahmaputra Valley's unique topography, dominated by rivers and dense hills, was utilized masterfully by Ahom generals. Rather than engaging in open-field cavalry battles where the Mughals excelled, the Ahoms employed 'Guerrilla Warfare' (Daga-Yuddha) and built strong fortifications along narrow river bottlenecks. The Battle of Saraighat (1671) remains a textbook example of naval tactics, where Lachit Borphukan outmaneuvered the Mughal fleet through coordinated amphibious ambushes.",
          highlight: "Topographical mastery combined with superior lightweight boat designs gave the Ahom navy critical mobility over heavy Mughal warships."
        }
      ],
      practiceQuestion: "Examine the administrative and military factors that enabled the Ahom Kingdom to successfully resist Mughal expansionism in the Brahmaputra Valley.",
      answerGuide: [
        "Introduction: Outline the temporal span of Ahom rule and state their historical significance in halting Mughal imperial expansion.",
        "Core Administrative Pillar (Paik System): Detail the structure of 'Gots', the rotational service model, and how it sustained both agrarian productivity and sudden military mobilization.",
        "Tactical & Military Strategy: Discuss the concept of 'Daga-Yuddha' (guerrilla tactics), utilization of high mud-walls (Garhs), and naval superiority in riverine war zones.",
        "Leadership & Diplomacy: Highlight the role of Lachit Borphukan's strategic leadership and alliances with neighboring hill tribes.",
        "Conclusion: Summarize how this integrated social, political, and physical strategy preserved Assam's sovereign identity."
      ]
    }
  },
  {
    id: 'polity',
    label: 'Polity & Governance',
    sublabel: 'Mains Focus & Articles',
    heading: 'Assam Polity & Governance',
    subheading: 'Constitutional Protections & Local Bodies',
    article: {
      title: "Sixth Schedule & Autonomous District Councils: Tribal Autonomy in Assam",
      syllabusTag: "APSC GS 5: Polity and Constitution of Assam",
      readTime: "10 min read",
      difficulty: "Intermediate",
      introduction: "The Sixth Schedule of the Indian Constitution offers a robust framework for tribal self-governance in Northeast India. In Assam, Autonomous District Councils (ADCs) provide legislative, executive, and judicial powers to protect indigenous tribal identities and accelerate socioeconomic growth.",
      sections: [
        {
          title: "1. Constitutional Mandate & Administrative Set-up",
          content: "Assam has three major Sixth Schedule Councils: the Bodoland Territorial Council (BTC), the Karbi Anglong Autonomous Council (KAAC), and the Dima Hasao Autonomous Council (DHAC). Unlike panchayats, these councils enjoy extensive legislative powers over subjects like land, forestry, agriculture, and local customs, coupled with judicial powers to adjudicate disputes under customary laws.",
          highlight: "Sixth Schedule Councils act as mini-legislatures within the state, protecting tribal culture and customary land rights."
        },
        {
          title: "2. Challenges in Decentralized Autonomy",
          content: "Despite their constitutionally secure nature, Sixth Schedule Councils face structural and operational hurdles. Chief among these are dependencies on state government grants, delays in holding regular local elections, administrative overlapping with state agencies, and debates around the rights of non-tribal residents within council jurisdictions.",
          highlight: "Financial autonomy remains the critical bottleneck, as councils rely heavily on discretionary state transfers."
        }
      ],
      practiceQuestion: "Analyze the role of the Sixth Schedule of the Indian Constitution in addressing ethnic aspirations in Assam. To what extent have Autonomous District Councils succeeded in local governance?",
      answerGuide: [
        "Introduction: Define the Sixth Schedule, its historical origin (Bardoloi Committee), and list the three Councils currently functional in Assam.",
        "Successes: Outline successes in preserving customary laws, control over local resources, forest protection, and curbing major ethnic conflicts by offering political representation.",
        "Limitations & Failures: Discuss the lack of separate financial cadres, administrative overlap with state bureaucrats, and conflicts regarding non-tribal minorities (particularly in BTR).",
        "Recommendations: Suggest pathways such as direct funding (pursuant to the 125th Amendment Bill recommendations) and training local councilors.",
        "Conclusion: Reiterate that while ADCs have democratized power, institutional reforms are necessary to fulfill their potential."
      ]
    }
  },
  {
    id: 'economics',
    label: 'Economy & Development',
    sublabel: 'Mains Focus & Articles',
    heading: 'Assam Economy & Development',
    subheading: 'Agro-industry & Economic Modernization',
    article: {
      title: "Assam's Tea & Silk Industries: Opportunities in the Global Value Chain",
      syllabusTag: "APSC GS 5: Economy of Assam & Agri-Industries",
      readTime: "14 min read",
      difficulty: "Advanced",
      introduction: "Assam is a global brand in tea and a heritage center for unique varieties of wild silk like Muga and Eri. However, both sectors are operating below capacity, facing dual challenges of climate change, archaic infrastructure, and low returns to grassroot producers.",
      sections: [
        {
          title: "1. The Crisis and Revitalization of the Tea Sector",
          content: "Producing nearly 50% of India's tea, Assam's tea estates are critical economic engines. Today, the sector is buffeted by rising production costs, sluggish global prices, and climate-induced unpredictable monsoons. Revitalizing the sector requires a shift towards high-value organic specialty teas, modernization of factory equipment, and ensuring robust living wages and social security for the vast plantation workforce.",
          highlight: "Moving up the value chain from commodity-grade CTC tea to organic and orthodox varieties is vital for survival."
        },
        {
          title: "2. Muga & Eri Silk: Geographical Indication (GI) and Rural Livelihoods",
          content: "Assam's Muga Silk (the golden silk) has a Geographical Indication (GI) status and is unique to the region due to the specific climate required by the Antheraea assamensis silkworm. Eri silk, known as the 'peace silk' because it is harvested without killing the pupa, has massive potential in sustainable vegan fashion. Modernizing reel technologies, expanding cocoon farms, and linking weavers directly with global e-commerce portals are essential steps.",
          highlight: "Traditional weaving clusters require micro-finance, technology integration, and brand promotion to thrive globally."
        }
      ],
      practiceQuestion: "The tea industry of Assam is facing dual challenges of climate change and structural inefficiencies. Suggest measures to revitalize this sector while securing the livelihoods of plantation workers.",
      answerGuide: [
        "Introduction: Mention the volume and export share of Assam tea, highlighting its role in state employment and GSDP.",
        "Identify Key Issues: Explain challenges like rising wages vs stagnant auction prices, climate disruptions (pest attacks, rain patterns), and age-old tea bushes.",
        "Revitalization Measures: Highlight solutions like value addition (orthodox and green teas), direct-to-consumer digital channels, setting up tea-tourism packages, and cooperative models.",
        "Worker Livelihoods: Address implementation of the Occupational Safety, Health and Working Conditions Code, and provision of health and primary education.",
        "Conclusion: Conclude with a vision of sustainable agro-industry that balances commercial viability with social justice."
      ]
    }
  },
  {
    id: 'geography',
    label: 'Geography & Environment',
    sublabel: 'Mains Focus & Articles',
    heading: 'Assam Geography & Environment',
    subheading: 'Disaster Management & Physical Landscape',
    article: {
      title: "Brahmaputra Floods: Moving from Yearly Disaster to River Basin Management",
      syllabusTag: "APSC GS 5: Geography, Environment & Disasters in Assam",
      readTime: "11 min read",
      difficulty: "Advanced",
      introduction: "Annual flooding in the Brahmaputra and Barak basins is one of Assam's most severe developmental bottlenecks. Rather than treating floods as isolated yearly disasters, experts advocate for a transition toward an integrated, holistic River Basin Management strategy.",
      sections: [
        {
          title: "1. The Complex Etiology of Assam's Floods",
          content: "The flooding is not simply caused by excessive rainfall. The Brahmaputra is a highly braided, high-sediment river flowing through an active seismic zone (Zone V). Landslides in upstream Tibet and Arunachal Pradesh dump enormous volumes of silt into the riverbed, raising its level and causing severe riverbank erosion during monsoons. Anthropogenic factors, such as wetland destruction, deforestation, and poorly designed embankments, exacerbate the vulnerability.",
          highlight: "Siltation, high seismicity, and embankment failures create a complex, multi-dimensional flood ecosystem."
        },
        {
          title: "2. The Paradigm Shift: Integrated Water Resources Management (IWRM)",
          content: "Traditional structural measures, such as building earthen embankments, have offered temporary relief but often failed catastrophically. A sustainable approach must focus on non-structural measures: advanced satellite-based early warning networks, restoration of natural wetlands (Beels) to act as sponge basins, catchment area afforestation, and construction of multi-purpose reservoirs. Cooperating with upstream states and nations is critical.",
          highlight: "Living with the river entails adapting agricultural calendars (e.g. promoting 'Boro' winter paddy) and designing flood-resilient villages."
        }
      ],
      practiceQuestion: "Brahmaputra floods are an annual recurring disaster in Assam. Discuss the ecological and anthropological factors causing this, and propose a comprehensive flood mitigation strategy.",
      answerGuide: [
        "Introduction: State the magnitude of Brahmaputra flood damages and their impact on lives, agriculture, and Kaziranga wildlife.",
        "Ecological Factors: Detail the young Himalayan geology, extreme rainfall patterns, heavy silt load, and high seismic activity changing river courses.",
        "Anthropological Factors: Discuss encroachment of floodplains and wetlands, deforestation in hills, and structural failures of aging embankments.",
        "Mitigation Strategy (Structural + Non-Structural): Outline dredging of channels, reservoir control, swamp restoration, flood zoning laws, and flood-resistant crop varieties.",
        "Conclusion: Advocate for a river-basin authority combining science, community wisdom, and interstate coordination."
      ]
    }
  }
];

export default function AssamSection() {
  const [activeSection, setActiveSection] = useState('prelims'); // 'prelims' or 'mains'
  const [activeTab, setActiveTab] = useState('history'); // 'history', 'polity', 'economics', 'geography'
  
  // MCQ state
  const [selectedOption, setSelectedOption] = useState(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  
  // Mains state
  const [showAnswerGuide, setShowAnswerGuide] = useState(false);

  // Reset interactive states when changing tabs or sections
  useEffect(() => {
    setSelectedOption(null);
    setMcqSubmitted(false);
    setShowAnswerGuide(false);
  }, [activeSection, activeTab]);

  const currentTabs = activeSection === 'prelims' ? PRELIMS_TABS : MAINS_TABS;
  const active = currentTabs.find(t => t.id === activeTab) || currentTabs[0];

  const handleOptionClick = (idx) => {
    if (mcqSubmitted) return;
    setSelectedOption(idx);
  };

  const handleMcqSubmit = () => {
    if (selectedOption === null) return;
    setMcqSubmitted(true);
  };

  const handleMcqReset = () => {
    setSelectedOption(null);
    setMcqSubmitted(false);
  };

  return (
    <div className="assam-page">
      {/* Hero */}
      <section className="assam-hero">
        <div className="assam-hero__pattern" style={{ backgroundImage: `url(${crossLine})` }} />
        <div className="container assam-hero__content">
          <span className="section-label">Study Material</span>
          <h1 className="assam-hero__title">
            Assam <span className="text-gold">Section</span>
          </h1>
          <p className="assam-hero__desc">
            Comprehensive study material on Assam for UPSC, APSC and other competitive examinations.
          </p>
          <div className="assam-hero__breadcrumb">
            <Link to="/" className="assam-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="assam-hero__bc-current">Assam Section</span>
          </div>
        </div>
      </section>

      {/* Section Selector Tab Bar */}
      <div className="assam-section-selector-container">
        <div className="container">
          <div className="assam-section-selector">
            <button 
              className={`assam-section-btn ${activeSection === 'prelims' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('prelims');
                setActiveTab('history');
              }}
            >
              <Award className="btn-icon" size={18} />
              <div className="btn-text">
                <strong>Prelims Focus</strong>
                <span>Factual Notes & MCQs</span>
              </div>
            </button>
            <button 
              className={`assam-section-btn ${activeSection === 'mains' ? 'active' : ''}`}
              onClick={() => {
                setActiveSection('mains');
                setActiveTab('history');
              }}
            >
              <FileSpreadsheet className="btn-icon" size={18} />
              <div className="btn-text">
                <strong>Mains Articles</strong>
                <span>Analytical Studies & Essays</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="section assam-main">
        <div className="container assam-layout">

          {/* LEFT — Sidebar Sub-Tabs */}
          <aside className="assam-sidebar">
            {currentTabs.map(tab => (
              <button
                key={tab.id}
                className={`assam-tab${activeTab === tab.id ? ' assam-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="assam-tab__text">
                  <span className="assam-tab__label">{tab.label}</span>
                  <span className="assam-tab__sub">{tab.sublabel}</span>
                </div>
                <svg className="assam-tab__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </aside>

          {/* RIGHT — Content Display */}
          <div className="assam-detail" key={`${activeSection}-${activeTab}`}>
            
            {activeSection === 'prelims' ? (
              // PRELIMS VIEW
              <div className="prelims-content-flow">
                {/* Header */}
                <div className="assam-detail__header">
                  <h2 className="assam-detail__title">{active.heading}</h2>
                  <p className="assam-detail__sub">{active.subheading}</p>
                </div>

                {/* Quick Facts */}
                <div className="assam-facts-section">
                  <h3 className="assam-section-title">Quick Facts</h3>
                  <div className="assam-facts">
                    {active.facts.map(f => (
                      <div key={f.label} className="assam-fact">
                        <span className="assam-fact__label">{f.label}</span>
                        <span className="assam-fact__value">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Topics */}
                <div className="assam-points-section">
                  <h3 className="assam-section-title">Key Core Topics</h3>
                  <div className="assam-points">
                    {active.points.map((p, i) => (
                      <div key={i} className="assam-point">
                        <div className="assam-point__num">{i + 1}</div>
                        <div className="assam-point__body">
                          <strong>{p.title}</strong>
                          <p>{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Prelims MCQ Card */}
                {active.mcq && (
                  <div className="mcq-practice-card">
                    <div className="mcq-card-header">
                      <HelpCircle className="mcq-header-icon" size={20} />
                      <span className="mcq-header-tag">Prelims Practice Challenge</span>
                    </div>
                    <div className="mcq-card-body">
                      <p className="mcq-question-text">{active.mcq.question}</p>
                      
                      <div className="mcq-options-list">
                        {active.mcq.options.map((option, idx) => {
                          let optionClass = "";
                          if (selectedOption === idx) {
                            optionClass = "selected";
                          }
                          if (mcqSubmitted) {
                            if (idx === active.mcq.correctIndex) {
                              optionClass = "correct";
                            } else if (selectedOption === idx) {
                              optionClass = "incorrect";
                            } else {
                              optionClass = "disabled";
                            }
                          }
                          
                          return (
                            <button
                              key={idx}
                              className={`mcq-option-btn ${optionClass}`}
                              onClick={() => handleOptionClick(idx)}
                              disabled={mcqSubmitted}
                            >
                              <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                              <span className="option-text">{option}</span>
                              {mcqSubmitted && idx === active.mcq.correctIndex && (
                                <CheckCircle2 className="feedback-icon correct" size={16} />
                              )}
                              {mcqSubmitted && selectedOption === idx && idx !== active.mcq.correctIndex && (
                                <XCircle className="feedback-icon incorrect" size={16} />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mcq-action-row">
                        {!mcqSubmitted ? (
                          <button 
                            className="btn btn-primary mcq-submit-btn" 
                            disabled={selectedOption === null}
                            onClick={handleMcqSubmit}
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <button 
                            className="btn btn-outline mcq-reset-btn" 
                            onClick={handleMcqReset}
                          >
                            Try Again
                          </button>
                        )}
                      </div>

                      {mcqSubmitted && (
                        <div className={`mcq-explanation-panel ${selectedOption === active.mcq.correctIndex ? 'success' : 'fail'}`}>
                          <div className="explanation-title-row">
                            <Sparkles size={16} className="explanation-sparkle" />
                            <strong>
                              {selectedOption === active.mcq.correctIndex ? 'Correct! Excellent explanation:' : 'Incorrect. Study the explanation below:'}
                            </strong>
                          </div>
                          <p className="explanation-paragraph">{active.mcq.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // MAINS ARTICLE VIEW
              <div className="mains-content-flow">
                {/* Article Header Details */}
                <div className="mains-article-metadata">
                  <div className="meta-badge">{active.article.syllabusTag}</div>
                  <div className="meta-stats">
                    <span className="meta-stat">
                      <Clock size={13} />
                      {active.article.readTime}
                    </span>
                    <span className="meta-stat">
                      <Award size={13} />
                      Difficulty: {active.article.difficulty}
                    </span>
                  </div>
                </div>

                <h2 className="mains-article-title">{active.article.title}</h2>
                <div className="mains-article-divider" />
                
                <p className="mains-article-intro">{active.article.introduction}</p>

                {/* Article Sections */}
                <div className="mains-article-sections">
                  {active.article.sections.map((section, idx) => (
                    <div key={idx} className="mains-article-section">
                      <h3 className="mains-section-subtitle">{section.title}</h3>
                      <p className="mains-section-text">{section.content}</p>
                      {section.highlight && (
                        <blockquote className="mains-section-quote">
                          <div className="quote-accent" />
                          <p>{section.highlight}</p>
                        </blockquote>
                      )}
                    </div>
                  ))}
                </div>

                {/* Practice Mains Question Section */}
                <div className="mains-question-card">
                  <div className="question-card-header">
                    <span className="question-badge">APSC / UPSC Mains Question</span>
                  </div>
                  <div className="question-card-body">
                    <p className="mains-question-prompt">"{active.article.practiceQuestion}"</p>
                    
                    {/* Toggle Guideline Button */}
                    <button 
                      className={`btn-toggle-guidelines ${showAnswerGuide ? 'active' : ''}`}
                      onClick={() => setShowAnswerGuide(!showAnswerGuide)}
                    >
                      <span>{showAnswerGuide ? 'Hide Model Answer Structure' : 'View Model Answer Structure & Hints'}</span>
                      {showAnswerGuide ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {showAnswerGuide && (
                      <div className="answer-guidelines-box">
                        <h4 className="guidelines-title">Syllabus-Aligned Answer Framework</h4>
                        <ol className="guideline-steps">
                          {active.article.answerGuide.map((step, sIdx) => {
                            const [heading, ...rest] = step.split(':');
                            return (
                              <li key={sIdx} className="guideline-step-item">
                                <span className="step-badge">{heading}</span>
                                <span className="step-desc">{rest.join(':').trim()}</span>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp Contact */}
            <div className="assam-contact">
              <div className="assam-contact__text">
                <strong>Have questions about this topic?</strong>
                <span>Chat with our experts on WhatsApp for guidance.</span>
              </div>
              <a
                href="https://wa.me/918822823003"
                target="_blank"
                rel="noreferrer"
                className="assam-contact__btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                +91 88228 23003
              </a>
            </div>

          </div>

        </div>
      </section>
      <CtaSection/>
    </div>
  );
}
