import { useEffect } from 'react';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import founderImg from '../../assets/images/founder.png';
import CtaSection from '../Home/sections/CtaSection';
import './FoundersVision.css';

export default function FoundersVision() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="founders-vision-page">
      <SEO 
        title="Founder's Desk | Ashoka IAS Academy"
        description="Read the Founder's message and vision for Ashoka IAS Academy. Empowering UPSC and APSC civil services aspirants with top-tier mentorship and structured guidance."
      />

      <PageHeader 
        title="Founder's Desk"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
          { label: "Founder's Desk" }
        ]}
      />

      {/* ── Main Content Section ── */}
      <section className="section fv-content">
        <div className="container fv-grid">
          
          {/* Left Column: Founder Photo Card */}
          <div className="fv-image-col">
            <div className="fv-image-card">
              <div className="fv-img-container">
                {/* Background Blobs & Ambient Lighting for transparent image */}
                <div className="fv-bg-blob fv-bg-blob-1" />
                <div className="fv-bg-blob fv-bg-blob-2" />
                <div className="fv-bg-blob fv-bg-blob-3" />
                
                <img 
                  src={founderImg} 
                  alt="Honey Bhuyan - Founder & Director, Ashoka IAS Academy" 
                  className="fv-founder-img" 
                />
              </div>
              <div className="fv-image-caption">
                <h3 className="fv-founder-name">Honey Bhuyan</h3>
                <p className="fv-founder-subtitle">
                  <span className="fv-founder-title">Founder & Director</span>
                  <span className="fv-founder-sep">, </span>
                  <span className="fv-founder-org">Ashoka IAS Academy</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Leadership Message Card */}
          <div className="fv-text-card">
            <span className="fv-sublabel">LEADERSHIP MESSAGE</span>
            <h2 className="fv-heading">From The Founder's Desk</h2>
            <div className="fv-accent-line" />

            <div className="fv-quote-box">
              <p>
                "At Ashoka IAS Academy, we are deeply committed to the achievement and maintenance of excellence in civil service preparation for the benefit of aspirants across the region. Our mission is to deliver world-class, structured, and compassionate mentorship using the latest learning methodologies, while nurturing a culture of discipline, clarity, and continuous improvement."
              </p>
            </div>

            <div className="fv-paragraphs">
              <p>
                Ashoka IAS Academy was born from a simple yet powerful vision to bridge the gap between aspiration and opportunity for students, especially from regions where access to quality guidance has traditionally been limited.
              </p>
              <p>
                Having closely observed the struggles of civil service aspirants, including lack of directional clarity, inconsistency in answer writing, and limited personalized mentorship, the academy was established to offer a clear, structured, and student-centric preparation ecosystem.
              </p>
              <p>
                Starting with a dedicated core team and a vision for educational empowerment, Ashoka IAS Academy has achieved outstanding success since its inception in 2021, producing top rankers in APSC and UPSC including <strong>ACS Rank 9, APS Rank 3, ACS Rank 24, Rank 54</strong>, and over <strong>120+ officers</strong> across various services.
              </p>
              <p>
                At Ashoka IAS Academy, learning goes beyond conventional textbook coaching. We focus on building strong conceptual foundations, daily answer-writing practice, thorough current affairs analysis, and personality development to ensure every student is fully prepared for all three stages of competitive examinations.
              </p>
              <p>
                Our vision for the future is clear: To continually expand our learning ecosystem, integrate innovative test series and mentorship modules, and empower every aspirant to transform their civil service dreams into reality while contributing to nation-building.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Common CTA Section ── */}
      <CtaSection />
    </div>
  );
}
