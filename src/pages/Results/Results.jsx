import SEO from '../../components/common/SEO';
import './Results.css';

const RESULTS = [
  { name: 'Rahul Sharma', rank: 'AIR 142', exam: 'UPSC CSE 2024', batch: 'Foundation 2022' },
  { name: 'Priya Gogoi', rank: 'AIR 38', exam: 'APSC CCE 2024', batch: 'Foundation 2022' },
  { name: 'Amit Borah', rank: 'AIR 215', exam: 'UPSC CSE 2023', batch: 'Foundation 2021' },
  { name: 'Sneha Das', rank: 'AIR 67', exam: 'APSC CCE 2023', batch: 'Foundation 2021' },
  { name: 'Rohan Kalita', rank: 'AIR 189', exam: 'UPSC CSE 2023', batch: 'Foundation 2021' },
  { name: 'Ankita Saikia', rank: 'AIR 12', exam: 'APSC CCE 2022', batch: 'Foundation 2020' },
];

export default function Results() {
  return (
    <div className="results-page">
      <SEO 
        title="Selections & Exam Results"
        description="Meet our successful candidates who cleared the UPSC and APSC civil services exams. View our outstanding achievements and topper testimonials."
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Our Achievements</span>
          <h1 className="page-hero__title">
            Our <span className="text-gold">Results</span>
          </h1>
          <div className="divider-gold" />
          <p className="page-hero__desc">
            Proud of every aspirant who turned their dream into reality with Ashoka IAS Academy.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section results-stats">
        <div className="container results-stats__grid">
          {[
            { value: '500+', label: 'Students Enrolled' },
            { value: '50+', label: 'Selections' },
            { value: '15+', label: 'Expert Faculty' },
            { value: '2021', label: 'Est. Year' },
          ].map((s) => (
            <div key={s.label} className="results-stat">
              <span className="results-stat__value">{s.value}</span>
              <span className="results-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Results Grid */}
      <section className="section results-grid-section">
        <div className="container">
          <div className="results-grid">
            {RESULTS.map((r) => (
              <div key={r.name} className="result-card">
                <div className="result-card__avatar">
                  {r.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="result-card__info">
                  <strong className="result-card__name">{r.name}</strong>
                  <span className="result-card__rank">{r.rank}</span>
                  <span className="result-card__exam">{r.exam}</span>
                  <span className="result-card__batch">{r.batch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
