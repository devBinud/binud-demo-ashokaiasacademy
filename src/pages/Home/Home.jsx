import SEO from '../../components/common/SEO';
import HeroSection from './sections/HeroSection';
import StatsStrip from './sections/StatsStrip';
import AboutNoticeSection from './sections/AboutNoticeSection';
import PopularCourses from './sections/PopularCourses';
import TestimonialsSection from './sections/TestimonialsSection';
import StandsOutSection from './sections/StandsOutSection';
import CtaSection from './sections/CtaSection';

export default function Home() {
  return (
    <>
      <SEO 
        title="Best UPSC & APSC Coaching Institute in Assam"
        description="Ashoka IAS Academy is Assam's premier civil services coaching institute. We offer top-tier UPSC and APSC coaching, experienced faculty, integrated test series, and comprehensive guidance in Guwahati and Nagaon."
      />
      <HeroSection />
      <StatsStrip />
      <AboutNoticeSection />
      <PopularCourses />
      <TestimonialsSection />
      <StandsOutSection />
      <CtaSection />
    </>
  );
}
