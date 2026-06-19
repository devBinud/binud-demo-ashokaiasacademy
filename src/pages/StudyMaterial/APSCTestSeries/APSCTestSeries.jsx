import { Link } from 'react-router-dom';
import crossLine from '../../../assets/images/cross-line.png';
import SEO from '../../../components/common/SEO';
import '../StudyMaterial.css';

export default function APSCTestSeries() {
  return (
    <div className="study-material-page">
      <SEO 
        title="APSC CCE Mock Test Series"
        description="Dedicated APSC CCE Prelims and Mains mock test program aligned with the latest Assam Public Service Commission exam trends."
      />
      <section className="sm-hero">
        <div className="sm-hero__pattern" style={{ backgroundImage: `url(${crossLine})` }} />
        <div className="container sm-hero__content">
          <span className="section-label">Test Series</span>
          <h1 className="sm-hero__title">APSC <span className="text-gold">Test Series</span></h1>
          <div className="sm-hero__breadcrumb">
            <Link to="/" className="sm-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <Link to="/" className="sm-hero__bc-link">Student Zone</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="sm-hero__bc-current">APSC Test Series</span>
          </div>
        </div>
      </section>

      <section className="sm-coming-soon">
        <div className="container sm-coming-soon__inner">
          <div className="sm-coming-soon__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4l3 3"/>
            </svg>
          </div>
          <span className="sm-coming-soon__badge">Upcoming</span>
          <h2>We're Working on It</h2>
          <p>We will be updating this page as soon as possible. Stay tuned!</p>
          <Link to="/" className="sm-back-btn">← Back to Home</Link>
        </div>
      </section>
    </div>
  );
}
