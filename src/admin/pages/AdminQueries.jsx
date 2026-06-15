import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Eye, Trash2, Phone, Mail, MessageSquare, Calendar, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import './AdminEnquiries.css'; // reuse same styles

const STATUS_OPTIONS = ['new', 'reviewed', 'answered', 'closed'];
const PAGE_SIZE = 10;

export default function AdminQueries() {
  const [queries,   setQueries]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState('all');
  const [search,    setSearch]    = useState('');
  const [page,      setPage]      = useState(1);
  const [viewItem,  setViewItem]  = useState(null);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, 'student_queries'), orderBy('createdAt', 'desc')));
      setQueries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, 'student_queries'));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setQueries(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQueries(); }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, 'student_queries', id), { status });
    setQueries((prev) => prev.map((q) => q.id === id ? { ...q, status } : q));
    if (viewItem?.id === id) setViewItem((v) => ({ ...v, status }));
  };

  const deleteQuery = async (id) => {
    if (!window.confirm('Delete this query?')) return;
    await deleteDoc(doc(db, 'student_queries', id));
    setQueries((prev) => prev.filter((q) => q.id !== id));
    if (viewItem?.id === id) setViewItem(null);
  };

  const filtered = queries.filter((q) => {
    const matchStatus = filter === 'all' || (q.status || 'new') === filter;
    const matchSearch = !search ||
      q.name?.toLowerCase().includes(search.toLowerCase()) ||
      q.phone?.includes(search) ||
      q.question?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [filter, search]);

  const formatDate = (ts) =>
    ts ? new Date(ts.seconds * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  const formatDateTime = (ts) =>
    ts ? new Date(ts.seconds * 1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

  return (
    <div className="admin-enquiries">
      <div className="admin-page-header">
        <div>
          <h1>Student Queries</h1>
          <p>Questions submitted by students from the FAQ page</p>
        </div>
        <div className="admin-enquiries__count">
          <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <input
          type="text"
          className="admin-search"
          placeholder="Search by name, phone or question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="admin-filter-tabs">
          {['all', ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              className={`admin-filter-tab${filter === s ? ' active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-card">
        {loading ? (
          <Loader text="Loading queries..." />
        ) : filtered.length === 0 ? (
          <div className="admin-empty">No queries found.</div>
        ) : (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Question</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((q, i) => (
                    <tr key={q.id}>
                      <td className="admin-table__num">{(page - 1) * PAGE_SIZE + i + 1}</td>
                      <td><strong>{q.name}</strong></td>
                      <td>
                        <a href={`tel:${q.phone}`} className="admin-link">{q.phone}</a>
                      </td>
                      <td className="admin-table__truncate" title={q.question}>
                        {q.question?.length > 60 ? q.question.slice(0, 60) + '…' : q.question}
                      </td>
                      <td>
                        <select
                          className={`admin-status-select admin-status-select--${q.status || 'new'}`}
                          value={q.status || 'new'}
                          onChange={(ev) => updateStatus(q.id, ev.target.value)}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                      <td className="admin-table__date">{formatDate(q.createdAt)}</td>
                      <td>
                        <div className="admin-table__actions">
                          <button
                            className="admin-action-btn admin-action-btn--view"
                            onClick={() => setViewItem(q)}
                            title="View"
                          >
                            <Eye size={14} strokeWidth={2} />
                          </button>
                          <button
                            className="admin-action-btn admin-action-btn--delete"
                            onClick={() => deleteQuery(q.id)}
                            title="Delete"
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
                <span className="admin-source-badge" style={{ color: '#2D3748', background: 'rgba(45,55,72,0.08)' }}>
                  Student Query
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
                <div className="enq-modal__field" style={{ gridColumn: '1 / -1' }}>
                  <span className="enq-modal__label"><Calendar size={13} strokeWidth={2} /> Submitted On</span>
                  <span className="enq-modal__value">{formatDateTime(viewItem.createdAt)}</span>
                </div>
              </div>

              <div className="enq-modal__message">
                <span className="enq-modal__label"><MessageSquare size={13} strokeWidth={2} /> Question</span>
                <p>{viewItem.question}</p>
              </div>

              <div className="enq-modal__status-row">
                <span className="enq-modal__label">Update Status</span>
                <div className="enq-modal__status-btns">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      className={`enq-modal__status-btn enq-modal__status-btn--${s}${(viewItem.status || 'new') === s ? ' active' : ''}`}
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
                target="_blank" rel="noreferrer"
                className="admin-btn-primary"
              >
                <Phone size={15} strokeWidth={2} /> WhatsApp
              </a>
              <a href={`tel:${viewItem.phone}`} className="admin-btn-secondary">
                <Phone size={15} strokeWidth={2} /> Call
              </a>
              <button
                className="admin-btn-secondary"
                style={{ marginLeft: 'auto', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
                onClick={() => deleteQuery(viewItem.id)}
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
