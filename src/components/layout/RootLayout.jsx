import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from '../ui/FloatingButtons';
import WelcomePopup from '../ui/WelcomePopup';
import './RootLayout.css';

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="root-layout">
      <Topbar />
      <Navbar />
      <main className="root-layout__main">
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
      <WelcomePopup />
    </div>
  );
}
