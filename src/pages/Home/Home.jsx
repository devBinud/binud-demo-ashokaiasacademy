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
