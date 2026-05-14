import { Link } from 'react-router-dom';
import './NotFound.css';
import CtaSection from '../Home/sections/CtaSection';

export default function NotFound() {
  return (
    <>
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