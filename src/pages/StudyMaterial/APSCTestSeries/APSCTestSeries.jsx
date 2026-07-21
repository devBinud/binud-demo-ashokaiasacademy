import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO';
import PageHeader from '../../../components/common/PageHeader';
import '../StudyMaterial.css';

export default function APSCTestSeries() {
  return (
    <div className="study-material-page">
      <SEO 
        title="APSC CCE Mock Test Series"
        description="Dedicated APSC CCE Prelims and Mains mock test program aligned with the latest Assam Public Service Commission exam trends."
      />
      <PageHeader 
        title="APSC Test Series"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Student Zone' },
          { label: 'APSC Test Series' }
        ]}
      />

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
