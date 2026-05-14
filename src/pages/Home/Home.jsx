import HeroSection from './sections/HeroSection';
import StatsStrip from './sections/StatsStrip';
import AboutNoticeSection from './sections/AboutNoticeSection';
import PopularCourses from './sections/PopularCourses';
import TestimonialsSection from './sections/TestimonialsSection';
import CtaSection from './sections/CtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <AboutNoticeSection />
      <PopularCourses />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
