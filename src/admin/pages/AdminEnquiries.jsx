import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Eye, MessageCircle, Trash2, Phone, Mail, GraduationCap, Calendar, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import './AdminEnquiries.css';

const STATUS_OPTIONS = ['new', 'contacted', 'enrolled', 'closed'];
const PAGE_SIZE = 10;

const SOURCE_LABEL = {
  'hero-form':    { label: 'Homepage',     color: '#2D3748', bg: 'rgba(45,55,72,0.08)' },
  'contact-page': { label: 'Contact Page', color: '#B8922A', bg: 'rgba(184,146,42,0.1)' },
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [search, setSearch]             = useState('');
  const [page, setPage]                 = useState(1);
  const [viewItem, setViewItem]         = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, 'enquiries'), orderBy('createdAt', 'desc')));
      setEnquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, 'enquiries'));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setEnquiries(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, 'enquiries', id), { status });
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status } : e));
    if (viewItem?.id === id) setViewItem((v) => ({ ...v, status }));
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    await deleteDoc(doc(db, 'enquiries', id));
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    if (viewItem?.id === id) setViewItem(null);
  };

  const filtered = enquiries.filter((e) => {
    const matchStatus = filter === 'all' || (e.status || 'new') === filter;
    const matchSource = sourceFilter === 'all' || e.source === sourceFilter;
    const matchSearch = !search ||
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.phone?.includes(search) ||
      e.course?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSource && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [filter, sourceFilter, search]);

  return (
    <div className="admin-enquiries">
      <div className="admin-page-header">
        <div>
          <h1>Enquiries</h1>
          <p>All form submissions from the website</p>
        </div>
        <div className="admin-enquiries__count">
          <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <input type="text" className="admin-search"
          placeholder="Search by name, phone or course..."
          value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="admin-filter-tabs">
          {[
            { key: 'all',          label: 'All Sources' },
            { key: 'hero-form',    label: 'Homepage' },
            { key: 'contact-page', label: 'Contact Page' },
          ].map((s) => (
            <button key={s.key}
              className={`admin-filter-tab${sourceFilter === s.key ? ' active' : ''}`}
              onClick={() => setSourceFilter(s.key)}>{s.label}
            </button>
          ))}
        </div>

        <div className="admin-filter-tabs">
          {['all', ...STATUS_OPTIONS].map((s) => (
            <button key={s}
              className={`admin-filter-tab${filter === s ? ' active' : ''}`}
              onClick={() => setFilter(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-card">
        {loading ? (
          <Loader text="Loading enquiries..." />
        ) : filtered.length === 0 ? (
          <div className="admin-empty">No enquiries found.</div>
        ) : (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Source</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((e, i) => {
                    const src = SOURCE_LABEL[e.source] || { label: e.source || 'Unknown', color: '#666', bg: '#f0f0f0' };
                    return (
                      <tr key={e.id}>
                        <td className="admin-table__num">{(page - 1) * PAGE_SIZE + i + 1}</td>
                        <td>
                          <span className="admin-source-badge" style={{ color: src.color, background: src.bg }}>
                            {src.label}
                          </span>
                        </td>
                        <td><strong>{e.name}</strong></td>
                        <td><a href={`tel:${e.phone}`} className="admin-link">{e.phone}</a></td>
                        <td>{e.course || '—'}</td>
                        <td>
                          <select
                            className={`admin-status-select admin-status-select--${e.status || 'new'}`}
                            value={e.status || 'new'}
                            onChange={(ev) => updateStatus(e.id, ev.target.value)}>
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                        </td>
                        <td className="admin-table__date">
                          {e.createdAt
                            ? new Date(e.createdAt.seconds * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                            : '—'}
                        </td>
                        <td>
                          <div className="admin-table__actions">
                            <button className="admin-action-btn admin-action-btn--view"
                              onClick={() => setViewItem(e)} title="View Details">
                              <Eye size={14} strokeWidth={2} />
                            </button>
                            <a href={`https://wa.me/${e.phone?.replace(/\D/g, '')}`}
                              target="_blank" rel="noreferrer"
                              className="admin-action-btn admin-action-btn--wa" title="WhatsApp">
                              <MessageCircle size={14} strokeWidth={2} />
                            </a>
                            <button className="admin-action-btn admin-action-btn--delete"
                              onClick={() => deleteEnquiry(e.id)} title="Delete">
                              <Trash2 size={14} strokeWidth={2} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="admin-pagination">
                <span className="admin-pagination__info">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </span>
                <div className="admin-pagination__controls">
                  <button className="admin-pagination__btn" onClick={() => setPage(1)} disabled={page === 1}><ChevronsLeft size={14} strokeWidth={2} /></button>
                  <button className="admin-pagination__btn" onClick={() => setPage((p) => p - 1)} disabled={page === 1}><ChevronLeft size={14} strokeWidth={2} /></button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .reduce((acc, p, idx, arr) => {
                      if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, idx) =>
                      p === '...'
                        ? <span key={`d${idx}`} className="admin-pagination__dots">…</span>
                        : <button key={p} className={`admin-pagination__btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                    )}
                  <button className="admin-pagination__btn" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}><ChevronRight size={14} strokeWidth={2} /></button>
                  <button className="admin-pagination__btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}><ChevronsRight size={14} strokeWidth={2} /></button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* View Modal */}
      {viewItem && (
        <div className="enq-modal-overlay" onClick={() => setViewItem(null)}>
          <div className="enq-modal" onClick={(ev) => ev.stopPropagation()}>
            <div className="enq-modal__header">
              <div>
                <h2>{viewItem.name}</h2>
                <span className="admin-source-badge"
                  style={{
                    color: (SOURCE_LABEL[viewItem.source] || {}).color || '#666',
                    background: (SOURCE_LABEL[viewItem.source] || {}).bg || '#f0f0f0',
                  }}>
                  {(SOURCE_LABEL[viewItem.source] || { label: viewItem.source || 'Unknown' }).label}
                </span>
              </div>
              <button className="enq-modal__close" onClick={() => setViewItem(null)}>
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="enq-modal__body">
              <div className="enq-modal__grid">
                <div className="enq-modal__field">
                  <span className="enq-modal__label"><Phone size={13} strokeWidth={2} /> Phone</span>
                  <a href={`tel:${viewItem.phone}`} className="admin-link enq-modal__value">{viewItem.phone}</a>
                </div>
                <div className="enq-modal__field">
                  <span className="enq-modal__label"><Mail size={13} strokeWidth={2} /> Email</span>
                  <span className="enq-modal__value">{viewItem.email || '—'}</span>
                </div>
                <div className="enq-modal__field">
                  <span className="enq-modal__label"><GraduationCap size={13} strokeWidth={2} /> Course</span>
                  <span className="enq-modal__value">{viewItem.course || '—'}</span>
                </div>
                <div className="enq-modal__field">
                  <span className="enq-modal__label"><Calendar size={13} strokeWidth={2} /> Date</span>
                  <span className="enq-modal__value">
                    {viewItem.createdAt
                      ? new Date(viewItem.createdAt.seconds * 1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                      : '—'}
                  </span>
                </div>
              </div>

              <div className="enq-modal__message">
                <span className="enq-modal__label"><MessageCircle size={13} strokeWidth={2} /> Message</span>
                <p>{viewItem.message || 'No message provided.'}</p>
              </div>

              <div className="enq-modal__status-row">
                <span className="enq-modal__label">Update Status</span>
                <div className="enq-modal__status-btns">
                  {STATUS_OPTIONS.map((s) => (
                    <button key={s}
                      className={`enq-modal__status-btn enq-modal__status-btn--${s}${(viewItem.status || 'new') === s ? ' active' : ''}`}
                      onClick={() => updateStatus(viewItem.id, s)}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="enq-modal__footer">
              <a href={`https://wa.me/${viewItem.phone?.replace(/\D/g, '')}`}
                target="_blank" rel="noreferrer" className="admin-btn-primary">
                <MessageCircle size={15} strokeWidth={2} /> WhatsApp
              </a>
              <a href={`tel:${viewItem.phone}`} className="admin-btn-secondary">
                <Phone size={15} strokeWidth={2} /> Call
              </a>
              <button className="admin-btn-secondary"
                style={{ marginLeft: 'auto', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
                onClick={() => deleteEnquiry(viewItem.id)}>
                <Trash2 size={15} strokeWidth={2} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
