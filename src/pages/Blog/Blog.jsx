import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import { getSortedPosts, formatDate, BLOG_LIVE } from './blogPosts';
import './Blog.css';

function UnderConstruction() {
  return (
    <section className="blog-soon">
      <p className="blog-soon__line">This page is under construction.</p>
    </section>
  );
}

export default function Blog() {
  const posts = useMemo(getSortedPosts, []);
  const categories = useMemo(() => ['All', ...new Set(posts.map((p) => p.category))], [posts]);
  const [active, setActive] = useState('All');

  const shown = active === 'All' ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <SEO
        title="Blog"
        description="UPSC & APSC preparation tips, strategy and current affairs guidance from Ashoka IAS Academy."
      />
      <PageHeader title="Blog" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />

      {!BLOG_LIVE ? <UnderConstruction /> : (
      <section className="blog">
        <div className="container">
          <div className="blog__head">
            <div>
              <span className="blog__kicker">From Our Mentors</span>
              <h2 className="blog__title">Preparation tips &amp; insights</h2>
            </div>

            <div className="blog__filters" role="tablist" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active === c}
                  className={`blog__filter${active === c ? ' is-active' : ''}`}
                  onClick={() => setActive(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="blog__grid">
            {shown.map((post) => (
              <article key={post.slug} className="blog-card">
                <Link to={`/blog/${post.slug}`} className="blog-card__link">
                  <span className="blog-card__cat">{post.category}</span>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <div className="blog-card__meta">
                    <span><i className="fa-regular fa-calendar" aria-hidden="true" /> {formatDate(post.date)}</span>
                    <span><i className="fa-regular fa-clock" aria-hidden="true" /> {post.readTime}</span>
                  </div>
                  <span className="blog-card__more">
                    Read article <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
