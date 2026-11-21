import React from 'react';
import { Link } from 'react-router-dom';
import bannerBg from '../../assets/images/gallery/classroom/1.jpeg';
import './PageHeader.css';

/* Splits the title so the last word can be highlighted, e.g. "About <Us>".
   Pass `highlight` to choose the highlighted part yourself. */
function splitTitle(title, highlight) {
  if (typeof title !== 'string') return [title, null];
  if (highlight && title.endsWith(highlight)) {
    return [title.slice(0, -highlight.length).trimEnd(), highlight];
  }
  const i = title.trim().lastIndexOf(' ');
  if (i === -1) return [null, title];
  return [title.slice(0, i), title.slice(i + 1)];
}

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M12 3.2 2.5 11.1a1 1 0 0 0 1.3 1.5L5 11.6V20a1 1 0 0 0 1 1h4.5v-5.5h3V21H18a1 1 0 0 0 1-1v-8.4l1.2 1a1 1 0 1 0 1.3-1.5z" />
  </svg>
);

export default function PageHeader({ title, highlight, breadcrumbs = [] }) {
  const [lead, accent] = splitTitle(title, highlight);

  return (
    <section className="page-banner" style={{ '--page-banner-bg': `url(${bannerBg})` }}>
      <div className="container page-banner__inner">
        <h1 className="page-banner__title">
          {lead}
          {lead && accent && ' '}
          {accent && <span>{accent}</span>}
        </h1>

        {breadcrumbs.length > 0 && (
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <ol>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={index}>
                    {index > 0 && <span className="page-breadcrumb__sep" aria-hidden="true">»</span>}
                    {crumb.to && !isLast ? (
                      <Link to={crumb.to} className="page-breadcrumb__link">
                        {index === 0 && <HomeIcon />}
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="page-breadcrumb__current" aria-current={isLast ? 'page' : undefined}>
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
