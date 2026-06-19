import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords }) {
  const { pathname } = useLocation();
  const baseTitle = "Ashoka IAS Academy";
  
  // Format title: use specific title with fallback to a global default SEO title
  const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} | Best UPSC & APSC Coaching Institute in Assam`;
  
  // Dynamic canonical URL based on routing path
  const canonicalUrl = `https://ashokaiasacademy.com${pathname === '/' ? '' : pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
}
