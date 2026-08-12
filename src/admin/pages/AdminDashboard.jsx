import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Inbox, Bell, Star, MessageSquare, Pencil, Trash2, MessageCircle, Phone, Mail, GraduationCap, Calendar, X } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import './AdminDashboard.css';
import './AdminEnquiries.css';

const STATUS_OPTIONS = ['new', 'contacted', 'enrolled', 'closed'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, new: 0, testimonials: 0, queries: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  const fetchDashboardData = async () => {
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
      }).slice(0, 8);

      setStats({ total: enqs.length, new: newCount, testimonials: testSnap.size, queries: querySnap.size });
      setRecent(sorted);
    } catch (e) {
      console.error('Error loading dashboard stats:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'enquiries', id), { status });
      setRecent((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      if (viewItem?.id === id) setViewItem((v) => ({ ...v, status }));
      // Update new count if needed
      setStats((prev) => {
        const updatedNew = status === 'new' ? prev.new + 1 : Math.max(0, prev.new - 1);
        return { ...prev, new: updatedNew };
      });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await deleteDoc(doc(db, 'enquiries', id));
      setRecent((prev) => prev.filter((e) => e.id !== id));
      setStats((prev) => ({
        ...prev,
        total: Math.max(0, prev.total - 1),
      }));
      if (viewItem?.id === id) setViewItem(null);
    } catch (err) {
      console.error('Error deleting enquiry:', err);
      alert('Failed to delete enquiry.');
    }
  };

  if (loading) return <Loader fullscreen text="Loading dashboard..." />;

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back Admin</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">
            <Inbox size={20} strokeWidth={1.8} />
          </div>
          <div>
            <span className="admin-stat-card__value">{stats.total}</span>
            <span className="admin-stat-card__label">Total Enquiries</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">
            <Bell size={20} strokeWidth={1.8} />
          </div>
          <div>
            <span className="admin-stat-card__value">{stats.new}</span>
            <span className="admin-stat-card__label">New / Unread</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">
            <Star size={20} strokeWidth={1.8} />
          </div>
          <div>
            <span className="admin-stat-card__value">{stats.testimonials}</span>
            <span className="admin-stat-card__label">Testimonials</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon">
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
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e, idx) => (
                  <tr key={e.id}>
                    <td className="admin-table__num">{idx + 1}</td>
                    <td>{e.name}</td>
                    <td>
                      <a href={`tel:${e.phone}`} className="admin-link">
                        {e.phone}
                      </a>
                    </td>
                    <td>{e.course || '—'}</td>
                    <td>
                      <select
                        className={`admin-status-select admin-status-select--${e.status || 'new'}`}
                        value={e.status || 'new'}
                        onChange={(ev) => updateStatus(e.id, ev.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="admin-table__date">
                      {e.createdAt?.seconds
                        ? new Date(e.createdAt.seconds * 1000).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                        : '—'}
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button
                          className="admin-action-btn"
                          onClick={() => setViewItem(e)}
                          title="Edit / View Details"
                        >
                          <Pencil size={14} strokeWidth={2} />
                        </button>
                        <a
                          href={`https://wa.me/${e.phone?.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-action-btn admin-action-btn--wa"
                          title="WhatsApp"
                        >
                          <MessageCircle size={14} strokeWidth={2} />
                        </a>
                        <button
                          className="admin-action-btn admin-action-btn--delete"
                          onClick={() => deleteEnquiry(e.id)}
                          title="Delete Enquiry"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / View Modal */}
      {viewItem && (
        <div className="enq-modal-overlay" onClick={() => setViewItem(null)}>
          <div className="enq-modal" onClick={(ev) => ev.stopPropagation()}>
            <div className="enq-modal__header">
              <div>
                <h2>{viewItem.name}</h2>
                <span className="admin-table__date">
                  Course: {viewItem.course || 'General Enquiry'}
                </span>
              </div>
              <button className="enq-modal__close" onClick={() => setViewItem(null)}>
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="enq-modal__body">
              <div className="enq-modal__grid">
                <div className="enq-modal__field">
                  <span className="enq-modal__label">
                    <Phone size={13} strokeWidth={2} /> Phone
                  </span>
                  <a href={`tel:${viewItem.phone}`} className="admin-link enq-modal__value">
                    {viewItem.phone}
                  </a>
                </div>
                <div className="enq-modal__field">
                  <span className="enq-modal__label">
                    <Mail size={13} strokeWidth={2} /> Email
                  </span>
                  <span className="enq-modal__value">{viewItem.email || '—'}</span>
                </div>
                <div className="enq-modal__field">
                  <span className="enq-modal__label">
                    <GraduationCap size={13} strokeWidth={2} /> Course
                  </span>
                  <span className="enq-modal__value">{viewItem.course || '—'}</span>
                </div>
                <div className="enq-modal__field">
                  <span className="enq-modal__label">
                    <Calendar size={13} strokeWidth={2} /> Date
                  </span>
                  <span className="enq-modal__value">
                    {viewItem.createdAt?.seconds
                      ? new Date(viewItem.createdAt.seconds * 1000).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                      : '—'}
                  </span>
                </div>
              </div>

              <div className="enq-modal__message">
                <span className="enq-modal__label">
                  <MessageCircle size={13} strokeWidth={2} /> Message / Note
                </span>
                <p>{viewItem.message || 'No additional message provided.'}</p>
              </div>

              <div className="enq-modal__status-row">
                <span className="enq-modal__label">Update Status</span>
                <div className="enq-modal__status-btns">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      className={`enq-modal__status-btn enq-modal__status-btn--${s}${(viewItem.status || 'new') === s ? ' active' : ''
                        }`}
                      onClick={() => updateStatus(viewItem.id, s)}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="enq-modal__footer">
              <a
                href={`https://wa.me/${viewItem.phone?.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="admin-btn-primary"
              >
                <MessageCircle size={15} strokeWidth={2} /> WhatsApp
              </a>
              <a href={`tel:${viewItem.phone}`} className="admin-btn-secondary">
                <Phone size={15} strokeWidth={2} /> Call
              </a>
              <button
                className="admin-btn-secondary"
                style={{ marginLeft: 'auto', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
                onClick={() => deleteEnquiry(viewItem.id)}
              >
                <Trash2 size={15} strokeWidth={2} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
