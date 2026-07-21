import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO';
import PageHeader from '../../../components/common/PageHeader';
import '../StudyMaterial.css';

export default function PYQ() {
  return (
    <div className="study-material-page">
      <SEO 
        title="UPSC & APSC Previous Year Questions"
        description="Download official UPSC and APSC Prelims and Mains previous years' question papers with answer keys and solution analyses."
      />
      <PageHeader 
        title="Previous Year Questions (PYQ)"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Student Zone' },
          { label: 'PYQ' }
        ]}
      />
      <section className="sm-coming-soon">
        <div className="container sm-coming-soon__inner">
          <div className="sm-coming-soon__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h2>Coming Soon</h2>
          <p>Previous Year Questions will be available here shortly. Check back soon!</p>
          <Link to="/" className="sm-back-btn">← Back to Home</Link>
        </div>
      </section>
    </div>
  );
}
