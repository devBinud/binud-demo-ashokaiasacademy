import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Inbox, Star, CircleUser, LogOut, Menu, MessageSquare } from 'lucide-react';
import logo from '../../assets/images/logo.jpeg';
import './AdminLayout.css';

const NAV = [
  { to: '/admin/dashboard', icon: <LayoutDashboard size={18} strokeWidth={1.8} />, label: 'Dashboard' },
  { to: '/admin/enquiries', icon: <Inbox size={18} strokeWidth={1.8} />, label: 'Enquiries' },
  { to: '/admin/queries',   icon: <MessageSquare size={18} strokeWidth={1.8} />, label: 'Student Queries' },
  { to: '/admin/testimonials', icon: <Star size={18} strokeWidth={1.8} />, label: 'Testimonials' },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__logo">
          <img src={logo} alt="Ashoka IAS" />
          <span>Admin Panel</span>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <CircleUser size={18} strokeWidth={1.8} />
            <span>{user?.email}</span>
          </div>
          <button className="admin-sidebar__logout" onClick={handleLogout}>
            <LogOut size={16} strokeWidth={1.8} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <button
            className="admin-topbar__menu"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
          <span className="admin-topbar__title">Ashoka IAS Academy</span>
        </header>

        {/* Page content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
