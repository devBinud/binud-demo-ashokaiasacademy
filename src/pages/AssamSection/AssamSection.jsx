import { useState } from 'react';
import { Link } from 'react-router-dom';
import crossLine from '../../assets/images/cross-line.png';
import logoImg from '../../assets/images/logo.jpeg';
import './AssamSection.css';
import CtaSection from '../Home/sections/CtaSection';

const TABS = [
  {
    id: 'history',
    label: 'History of Assam',
    sublabel: 'Ancient to Modern Era',
    heading: 'History of Assam',
    subheading: 'Ancient to Modern Era',
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
      { title: 'National Parks & Wildlife', desc: 'Assam has 5 national parks — Kaziranga (UNESCO World Heritage, home to one-horned rhino), Manas (UNESCO World Heritage), Dibru-Saikhowa, Nameri, and Orang.' },
      { title: 'Climate & Rainfall', desc: 'Assam has a humid subtropical climate with heavy monsoon rainfall (1,500–3,000 mm annually). The state is highly prone to floods and earthquakes (seismic zone V).' },
    ],
    facts: [
      { label: 'Area', value: '78,438 sq km' },
      { label: 'Districts', value: '35' },
      { label: 'Major River', value: 'Brahmaputra (Luit)' },
      { label: 'UNESCO Sites', value: 'Kaziranga & Manas' },
    ],
  },
];

export default function AssamSection() {
  const [activeTab, setActiveTab] = useState('history');
  const active = TABS.find(t => t.id === activeTab);

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

      {/* Main */}
      <section className="section assam-main">
        <div className="container assam-layout">

          {/* LEFT — Sidebar tabs */}
          <aside className="assam-sidebar">
            {TABS.map(tab => (
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

          {/* RIGHT — Content */}
          <div className="assam-detail" key={activeTab}>

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

            {/* Key Points */}
            <div className="assam-points-section">
              <h3 className="assam-section-title">Key Topics</h3>
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

            {/* CTA */}
            {/* <div className="assam-detail__cta">
              <Link to="/contact" className="btn btn-primary">Enquire About Courses →</Link>
            </div> */}

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
