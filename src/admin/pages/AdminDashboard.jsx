import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Inbox, Bell, Star, MessageSquare } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, new: 0, testimonials: 0, queries: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [enqSnap, testSnap, querySnap] = await Promise.all([
          getDocs(collection(db, 'enquiries')),
          getDocs(collection(db, 'testimonials')),
          getDocs(collection(db, 'student_queries')),
        ]);

        const enqs = enqSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const newCount = enqs.filter((e) => e.status === 'new' || !e.status).length;

        const sorted = [...enqs].sort((a, b) => {
          const ta = a.createdAt?.seconds || 0;
          const tb = b.createdAt?.seconds || 0;
          return tb - ta;
        }).slice(0, 5);

        setStats({ total: enqs.length, new: newCount, testimonials: testSnap.size, queries: querySnap.size });
        setRecent(sorted);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader fullscreen text="Loading dashboard..." />;

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Welcome back Admin</p>
      </div>

      {/* Stat cards */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon" style={{ background: 'rgba(27,42,74,0.1)', color: 'var(--color-navy)' }}>
            <Inbox size={20} strokeWidth={1.8} />
          </div>
          <div>
            <span className="admin-stat-card__value">{stats.total}</span>
            <span className="admin-stat-card__label">Total Enquiries</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon" style={{ background: 'rgba(184,146,42,0.1)', color: 'var(--color-gold)' }}>
            <Bell size={20} strokeWidth={1.8} />
          </div>
          <div>
            <span className="admin-stat-card__value">{stats.new}</span>
            <span className="admin-stat-card__label">New / Unread</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon" style={{ background: 'rgba(45,122,79,0.1)', color: '#2D7A4F' }}>
            <Star size={20} strokeWidth={1.8} />
          </div>
          <div>
            <span className="admin-stat-card__value">{stats.testimonials}</span>
            <span className="admin-stat-card__label">Testimonials</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon" style={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5' }}>
            <MessageSquare size={20} strokeWidth={1.8} />
          </div>
          <div>
            <span className="admin-stat-card__value">{stats.queries}</span>
            <span className="admin-stat-card__label">Student Queries</span>
          </div>
        </div>
      </div>

      {/* Recent enquiries */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h2>Recent Enquiries</h2>
        </div>
        {recent.length === 0 ? (
          <div className="admin-empty">No enquiries yet.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>{e.course || '—'}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${e.status || 'new'}`}>
                        {e.status || 'New'}
                      </span>
                    </td>
                    <td>{e.createdAt ? new Date(e.createdAt.seconds * 1000).toLocaleDateString('en-IN') : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
