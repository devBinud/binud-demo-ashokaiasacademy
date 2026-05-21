import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Courses from '../pages/Courses/Courses';
import Contact from '../pages/Contact/Contact';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from '../pages/TermsOfUse/TermsOfUse';
import Results from '../pages/Results/Results';
import NotFound from '../pages/NotFound/NotFound';
import AdminLogin from '../admin/pages/AdminLogin';
import AdminLayout from '../admin/components/AdminLayout';
import AdminDashboard from '../admin/pages/AdminDashboard';
import AdminEnquiries from '../admin/pages/AdminEnquiries';
import AdminTestimonials from '../admin/pages/AdminTestimonials';
import AdminQueries from '../admin/pages/AdminQueries';
import AdminGuard from '../admin/guards/AdminGuard';
import FoundationOne from '../pages/Courses/FoundationOne/FoundationOne';
import FoundationTwo from '../pages/Courses/FoundationTwo/FoundationTwo';
import ConceptBuilding from '../pages/Courses/ConceptBuilding/ConceptBuilding';
import PrelimsTestSeries from '../pages/Courses/PrelimsTestSeries/PrelimsTestSeries';
import MainsTestSeries from '../pages/Courses/MainsTestSeries/MainsTestSeries';
import AnswerWriting from '../pages/Courses/AnswerWriting/AnswerWriting';
import FAQ from '../pages/FAQ/FAQ';
import AssamSection from '../pages/AssamSection/AssamSection';
import Gallery from '../pages/Gallery/Gallery';
import CoursesAll from '../pages/CoursesAll/CoursesAll';
import ScholarshipTest from '../pages/ScholarshipTest/ScholarshipTest';
import BeginnersRoadMap from '../pages/BeginnersRoadMap/BeginnersRoadMap';
import OnlineAdmission from '../pages/OnlineAdmission/OnlineAdmission';
import OfflineAdmission from '../pages/OfflineAdmission/OfflineAdmission';
import PYQ from '../pages/StudyMaterial/PYQ/PYQ';
import DailyCurrentAffairs from '../pages/StudyMaterial/DailyCurrentAffairs/DailyCurrentAffairs';
import PrelimsNotes from '../pages/StudyMaterial/PrelimsNotes/PrelimsNotes';
import MainsNotes from '../pages/StudyMaterial/MainsNotes/MainsNotes';
import OnlineNotes from '../pages/StudyMaterial/OnlineNotes/OnlineNotes';
import DailyPracticePaper from '../pages/StudyMaterial/DailyPracticePaper/DailyPracticePaper';
import APSCTestSeries from '../pages/StudyMaterial/APSCTestSeries/APSCTestSeries';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'courses', element: <Courses /> },
      { path: 'foundation-1-year', element: <FoundationOne /> },
      { path: 'foundation-2-year', element: <FoundationTwo /> },
      { path: 'concept-building', element: <ConceptBuilding /> },
      { path: 'prelims-test-series', element: <PrelimsTestSeries /> },
      { path: 'mains-test-series', element: <MainsTestSeries /> },
      { path: 'answer-writing', element: <AnswerWriting /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms-of-use', element: <TermsOfUse /> },
      { path: 'results', element: <Results /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'assam-section', element: <AssamSection /> },
      { path: 'scholarship-test', element: <ScholarshipTest /> },
      { path: 'scholarship-test/:testType', element: <ScholarshipTest /> },
      { path: 'beginners-road-map', element: <BeginnersRoadMap /> },
      { path: 'online-application', element: <OnlineAdmission /> },
      { path: 'offline-admission', element: <OfflineAdmission /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'courses-all', element: <CoursesAll /> },
      { path: 'pyq', element: <PYQ /> },
      { path: 'daily-current-affairs-analysis', element: <DailyCurrentAffairs /> },
      { path: 'prelims-notes', element: <PrelimsNotes /> },
      { path: 'mains-notes', element: <MainsNotes /> },
      { path: 'online-notes', element: <OnlineNotes /> },
      { path: 'beginner', element: <DailyPracticePaper /> },
      { path: 'intermediate', element: <APSCTestSeries /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminGuard><AdminLayout /></AdminGuard>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'dashboard',    element: <AdminDashboard /> },
      { path: 'enquiries',    element: <AdminEnquiries /> },
      { path: 'queries',      element: <AdminQueries /> },
      { path: 'testimonials', element: <AdminTestimonials /> },
    ],
  },
]);

export default router;
