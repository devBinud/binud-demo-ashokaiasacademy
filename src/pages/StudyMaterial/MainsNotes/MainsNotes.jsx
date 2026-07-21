import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO';
import PageHeader from '../../../components/common/PageHeader';
import '../StudyMaterial.css';

export default function MainsNotes() {
  return (
    <div className="study-material-page">
      <SEO 
        title="APSC & UPSC Mains Study Material"
        description="Access structured study materials, value-added topics, and answer templates for General Studies and optional papers in Civil Services Mains."
      />
      <PageHeader 
        title="Mains Notes & Resources"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Student Zone' },
          { label: 'Mains Notes' }
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
          <p>Mains Notes will be available here shortly. Check back soon!</p>
          <Link to="/" className="sm-back-btn">← Back to Home</Link>
        </div>
      </section>
    </div>
  );
}
