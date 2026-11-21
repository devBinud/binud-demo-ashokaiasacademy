import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: null,
    dropdown: [
      { label: 'About Academy', to: '/about' },
      { label: "Founder's Desk", to: '/founders-vision' },
      { label: 'YouTube Section', to: '/youtube-lectures' },
    ],
  },
  {
    label: 'Courses',
    to: null,
    dropdown: [
      {
        label: 'Ongoing Batch',
        to: null,
        children: [
          { label: 'Integrated Program - Class 11 & 12', to: '/courses-all', state: { courseId: 'integrated-class-11-12' } },
          { label: 'One Year Foundation Course', to: '/courses-all', state: { courseId: 'one-year-foundation' } },
          { label: '6-Month Pre-Foundation Course', to: '/courses-all', state: { courseId: 'pre-foundation' } },
          { label: 'Crash Course Programme', to: '/courses-all', state: { courseId: 'crash-course' } },
          { label: 'Integrated Degree + Competitive Exam Coaching Programme', to: '/courses-all', state: { courseId: 'integrated-degree-Competitive-coaching-programme' } },
          { label: 'UPSC Guide', to: '/upsc-guide' },
        ],
      },
      {
        label: 'Upcoming Batch',
        to: null,
        children: [
          { label: 'Foundation', to: '/courses-all', state: { courseId: 'one-year-foundation' } },
          { label: 'Crash Course', to: '/courses-all', state: { courseId: 'crash-course' } },
        ],
      },
    ],
  },
  { label: 'Current Affairs', to: '/daily-current-affairs-analysis', bold: true },
  {
    label: 'Student Zone',
    to: null,
    dropdown: [
      {
        label: 'Free Study Material',
        to: null,
        children: [
          { label: 'PYQ (Previous Year Questions)', to: '/pyq' },
          { label: 'Daily Current Affairs Analysis', to: '/daily-current-affairs-analysis' },
          { label: 'Prelims Notes', to: '/prelims-notes' },
          { label: 'Mains Notes', to: '/mains-notes' },
          { label: 'Online Notes', to: '/online-notes' },
        ],
      },
      {
        label: 'Test Series',
        to: null,
        children: [
          { label: 'Daily Practice Paper (DPP)', to: '/beginner' },
          { label: 'APSC Test Series', to: '/apsc-test-series', badge: 'New' },
        ],
      },
      { label: 'Assam Section', to: '/assam-section' },
      { label: 'Scholarship Test', to: '/scholarship-test' },
      { label: 'Beginners Road Map', to: '/beginners-road-map' },
    ],
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  {
    label: 'Admissions',
    to: null,
    dropdown: [
      {
        label: 'Offline Admissions',
        to: '/offline-admission',
      },
      { label: 'Online Admission', to: '/online-application' },
    ],
  },



  { label: 'Contact Us', to: '/contact', bold: true },
];

const CHEVRON_DOWN = (
  <svg className="navbar__chevron" width="12" height="12" viewBox="0 0 320 512" fill="currentColor" aria-hidden="true">
    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
  </svg>
);

/* True when the current route lives inside this top-level dropdown */
const isGroupActive = (link, pathname) =>
  !!link.dropdown &&
  link.dropdown.some((item) =>
    item.to === pathname || (item.children || []).some((c) => c.to === pathname)
  );

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  // Desktop dropdown that was just used — kept closed until the mouse leaves it
  const [closedItem, setClosedItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeAll = () => { setMenuOpen(false); setMobileOpen(null); };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeAll}>
          <img src={logo} alt="Ashoka IAS Academy" />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className={`navbar__item${closedItem === link.label ? ' navbar__item--closed' : ''}`}
              onMouseLeave={() => closedItem === link.label && setClosedItem(null)}
              onClick={(e) => {
                const a = e.target.closest('.navbar__dropdown a');
                if (a) {
                  a.blur(); // drop focus so :focus-within doesn't keep it open
                  setClosedItem(link.label);
                }
              }}
            >

              {/* Trigger */}
              {link.to ? (
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `navbar__link${link.bold ? ' navbar__link--bold' : ''}${isActive ? ' navbar__link--active' : ''}`
                  }
                >
                  <span className="navbar__label">{link.label}</span>
                  {link.dropdown && CHEVRON_DOWN}
                </NavLink>
              ) : (
                <button
                  type="button"
                  className={`navbar__link navbar__link--btn${isGroupActive(link, location.pathname) ? ' navbar__link--active' : ''}`}
                >
                  <span className="navbar__label">{link.label}</span>
                  {link.dropdown && CHEVRON_DOWN}
                </button>
              )}

              {/* Dropdown — shown via CSS :hover on .navbar__item */}
              {link.dropdown && (
                <div className="navbar__dropdown">
                  {link.dropdown.map((item) =>
                    item.children ? (
                      <div key={item.label} className="navbar__dropdown-group">
                        <div className="navbar__dropdown-item navbar__dropdown-item--parent">
                          {item.label}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                        <div className="navbar__dropdown-children">
                          {item.children.map((child) => (
                            <Link key={child.label} to={child.to} state={child.state || null} className="navbar__dropdown-item navbar__dropdown-item--child" onClick={closeAll}>
                              {child.label}
                              {child.badge && (
                                <span className="nav-badge">{child.badge}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link key={item.label} to={item.to} state={item.state || null} className="navbar__dropdown-item" onClick={closeAll}>
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── FULLSCREEN OVERLAY MENU ── */}
      <div className={`fs-menu${menuOpen ? ' fs-menu--open' : ''}`}>
        <div className="fs-menu__topbar container">
          <Link to="/" className="fs-menu__logo" onClick={closeAll}>
            <img src={logo} alt="Ashoka IAS Academy" />
          </Link>
          <button className="fs-menu__close" onClick={closeAll} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="fs-menu__nav container">
          {NAV_LINKS.map((link, idx) => (
            <div key={link.label} className="fs-menu__item" style={{ animationDelay: `${idx * 0.04}s` }}>
              {link.dropdown ? (
                <>
                  <button
                    className={`fs-menu__link fs-menu__toggle${mobileOpen === link.label ? ' open' : ''}`}
                    onClick={() => setMobileOpen(mobileOpen === link.label ? null : link.label)}
                  >
                    <span>{link.label}</span>
                    <svg className={`fs-menu__chevron${mobileOpen === link.label ? ' open' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className={`fs-menu__sub${mobileOpen === link.label ? ' fs-menu__sub--open' : ''}`}>
                    {link.dropdown.map((item) =>
                      item.children ? (
                        <div key={item.label} className="fs-menu__sub-group">
                          <div className="fs-menu__sub-link fs-menu__sub-link--group">
                            {item.label}
                          </div>
                          {item.children.map((child) => (
                            <NavLink
                              key={child.label}
                              to={child.to}
                              state={child.state || null}
                              className={({ isActive }) => `fs-menu__sub-link fs-menu__sub-link--child${isActive ? ' fs-menu__sub-link--active' : ''}`}
                              onClick={closeAll}
                            >
                              <span>{child.label}</span>
                              {child.badge && (
                                <span className="nav-badge">{child.badge}</span>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      ) : (
                        <NavLink
                          key={item.label}
                          to={item.to}
                          className={({ isActive }) => `fs-menu__sub-link${isActive ? ' fs-menu__sub-link--active' : ''}`}
                          onClick={closeAll}
                        >
                          <span>{item.label}</span>
                        </NavLink>
                      )
                    )}
                  </div>
                </>
              ) : (
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `fs-menu__link${link.bold ? ' fs-menu__link--bold' : ''}${isActive ? ' fs-menu__link--active' : ''}`}
                  onClick={closeAll}
                >
                  <span>{link.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
