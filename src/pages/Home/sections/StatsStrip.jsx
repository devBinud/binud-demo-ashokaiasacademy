import './StatsStrip.css';

const STATS = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '50+',  label: 'Selections' },
  { value: '15+',  label: 'Expert Faculty' },
  { value: '2021', label: 'Est. Year' },
];

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="stats-strip__scroll">
        {STATS.map((s, i) => (
          <div key={s.label} className="stats-strip__item">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
            {i < STATS.length - 1 && <div className="stats-strip__sep" />}
          </div>
        ))}
      </div>
    </div>
  );
}
