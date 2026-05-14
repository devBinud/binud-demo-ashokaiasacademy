import './WhyUsSection.css';

const FEATURES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Expert Mentorship',
    desc: 'Learn from experienced faculty with deep knowledge of UPSC & APSC patterns and requirements.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: 'Result Focused',
    desc: 'Our structured approach and rigorous practice sessions are designed to maximize your selection chances.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Ethical Foundation',
    desc: 'Inspired by Emperor Ashoka\'s legacy — we instill integrity, discipline, and service to the nation.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: 'Holistic Development',
    desc: 'Beyond academics — personality development, interview preparation, and current affairs coverage.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Smart Strategy',
    desc: 'Customized study plans and smart preparation strategies tailored to each student\'s strengths.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'North-East Focus',
    desc: 'Specialized guidance for Assam & North-East aspirants with APSC-specific content and mentoring.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="whyus section">
      <div className="container">
        <div className="whyus__header">
          <span className="section-label">Why Choose Us</span>
          <h2 className="whyus__title">
            The Ashoka <span className="text-gold">Advantage</span>
          </h2>
          <div className="divider-gold" />
          <p className="whyus__subtitle">
            Founded in 2021 with the vision of combining academic excellence,
            ethical leadership, and disciplined preparation.
          </p>
        </div>

        <div className="whyus__grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="whyus__card">
              <div className="whyus__card-icon">{f.icon}</div>
              <h3 className="whyus__card-title">{f.title}</h3>
              <p className="whyus__card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
