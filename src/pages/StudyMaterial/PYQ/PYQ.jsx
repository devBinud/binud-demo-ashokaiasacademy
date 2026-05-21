import { Link } from 'react-router-dom';
import crossLine from '../../../assets/images/cross-line.png';
import '../StudyMaterial.css';

export default function PYQ() {
  return (
    <div className="study-material-page">
      <section className="sm-hero">
        <div className="sm-hero__pattern" style={{ backgroundImage: `url(${crossLine})` }} />
        <div className="container sm-hero__content">
          <span className="section-label">Free Study Material</span>
          <h1 className="sm-hero__title">PYQ <span className="text-gold">Previous Year Questions</span></h1>
          <div className="sm-hero__breadcrumb">
            <Link to="/" className="sm-hero__bc-link">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <Link to="/student-zone" className="sm-hero__bc-link">Student Zone</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="sm-hero__bc-current">PYQ</span>
          </div>
        </div>
      </section>
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
