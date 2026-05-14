import './StatsSection.css';

const STATS = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '50+', label: 'Selections' },
  { value: '15+', label: 'Expert Faculty' },
  { value: '2021', label: 'Est. Year' },
];

export default function StatsSection() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="stats__item">
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
