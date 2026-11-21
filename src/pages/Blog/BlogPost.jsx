import { Link, Navigate, useParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import PageHeader from '../../components/common/PageHeader';
import NotFound from '../NotFound/NotFound';
import { getPostBySlug, getSortedPosts, formatDate, BLOG_LIVE } from './blogPosts';
import './Blog.css';

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="post__h2">{block.text}</h2>;
    case 'ul':
      return (
        <ul className="post__list">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case 'quote':
      return <blockquote className="post__quote">{block.text}</blockquote>;
    default:
      return <p className="post__p">{block.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!BLOG_LIVE) return <Navigate to="/blog" replace />;
  if (!post) return <NotFound />;

  const more = getSortedPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <PageHeader
        title="Blog"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.category }]}
      />

      <section className="post">
        <div className="container">
          <article className="post__card">
            <Link to="/blog" className="post__back">
              <i className="fa-solid fa-arrow-left" aria-hidden="true" /> All articles
            </Link>

            <span className="blog-card__cat">{post.category}</span>
            <h1 className="post__title">{post.title}</h1>

            <div className="post__meta">
              <span><i className="fa-regular fa-user" aria-hidden="true" /> {post.author}</span>
              <span><i className="fa-regular fa-calendar" aria-hidden="true" /> {formatDate(post.date)}</span>
              <span><i className="fa-regular fa-clock" aria-hidden="true" /> {post.readTime}</span>
            </div>

            <div className="post__body">
              {post.content.map((block, i) => <Block key={i} block={block} />)}
            </div>

            <div className="post__cta">
              <div>
                <strong>Preparing for UPSC or APSC?</strong>
                <span>Talk to our counsellors about the right batch for you.</span>
              </div>
              <Link to="/contact" className="post__cta-btn">Contact Us</Link>
            </div>
          </article>

          {more.length > 0 && (
            <div className="post__more">
              <h2 className="post__more-title">More articles</h2>
              <div className="blog__grid blog__grid--two">
                {more.map((p) => (
                  <article key={p.slug} className="blog-card">
                    <Link to={`/blog/${p.slug}`} className="blog-card__link">
                      <span className="blog-card__cat">{p.category}</span>
                      <h3 className="blog-card__title">{p.title}</h3>
                      <div className="blog-card__meta">
                        <span><i className="fa-regular fa-calendar" aria-hidden="true" /> {formatDate(p.date)}</span>
                        <span><i className="fa-regular fa-clock" aria-hidden="true" /> {p.readTime}</span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
