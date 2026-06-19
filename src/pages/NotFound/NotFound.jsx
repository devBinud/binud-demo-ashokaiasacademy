import SEO from '../../components/common/SEO';
import './NotFound.css';
import CtaSection from '../Home/sections/CtaSection';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The requested page could not be found. Return to the Ashoka IAS Academy homepage to explore our UPSC and APSC courses."
      />
      <section className="notfound">
        <div className="container notfound__inner">

          <div className="notfound__badge">
            🚧 Under Construction
          </div>

          <h1 className="notfound__title">
            This Page is Coming Soon
          </h1>

          <p className="notfound__desc">
            This page is currently under development. Please check back soon.
          </p>

        </div>
      </section>
      <CtaSection />
    </>
  );
}