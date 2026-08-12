import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { MessageCircle, Phone, Trash2 } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import './AdminDPP.css';

export default function AdminStudyMaterialLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchPrelimsLeads = async () => {
    try {
      setLoading(true);
      let snap;
      try {
        snap = await getDocs(query(collection(db, 'study_material_leads'), orderBy('createdAt', 'desc')));
      } catch {
        snap = await getDocs(collection(db, 'study_material_leads'));
      }

      const data = snap.docs.map((d) => {
        const item = d.data();
        return {
          id: d.id,
          name: item.name || '—',
          phone: item.phone || '—',
          email: item.email || '—',
          city: item.city || '—',
          docTitle: item.docTitle || item.folder || 'Prelims Notes',
          docYear: item.docYear || '',
          docCategory: item.docCategory || '',
          createdAt: item.createdAt,
        };
      });

      data.sort((a, b) => {
        const ta = a.createdAt?.seconds || 0;
        const tb = b.createdAt?.seconds || 0;
        return tb - ta;
      });

      setLeads(data);
    } catch (err) {
      console.error('Error fetching Prelims Notes leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrelimsLeads();
  }, []);

  const handleDelete = async (lead) => {
    if (!window.confirm(`Delete access record for ${lead.name}?`)) return;
    try {
      await deleteDoc(doc(db, 'study_material_leads', lead.id));
      setLeads((prev) => prev.filter((item) => item.id !== lead.id));
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Failed to delete lead.');
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.phone.includes(q) ||
      lead.city.toLowerCase().includes(q) ||
      lead.docTitle.toLowerCase().includes(q) ||
      lead.docYear.toLowerCase().includes(q)
    );
  });

  return (
    <div className="admin-dpp-page">
      <div className="admin-page-header">
        <div>
          <h1>Prelims Notes Leads</h1>
          <p>Students who filled the form to unlock &amp; download Prelims Notes &amp; Current Affairs PDFs</p>
        </div>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          className="admin-search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Student Leads Table */}
      <div className="admin-card">
        {loading ? (
          <Loader text="Loading Prelims Notes access leads..." />
        ) : filteredLeads.length === 0 ? (
          <div className="admin-empty">No Prelims Notes access records found.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Timestamp</th>
                  <th>Student Name</th>
                  <th>Phone</th>
                  <th>City / Location</th>
                  <th>PDF / Module Accessed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, idx) => (
                  <tr key={lead.id || idx}>
                    <td className="admin-table__num">{idx + 1}</td>
                    <td className="timestamp-cell">
                      {lead.createdAt?.seconds
                        ? new Date(lead.createdAt.seconds * 1000).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '—'}
                    </td>
                    <td>{lead.name}</td>
                    <td>
                      <a href={`tel:${lead.phone}`} className="admin-link">
                        {lead.phone}
                      </a>
                    </td>
                    <td>{lead.city || '—'}</td>
                    <td>
                      <span style={{ fontSize: '12px', color: '#1e293b' }}>
                        {lead.docTitle}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <a
                          href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-action-btn admin-action-btn--wa"
                          title="WhatsApp"
                        >
                          <MessageCircle size={14} strokeWidth={2} />
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="admin-action-btn"
                          title="Call Student"
                        >
                          <Phone size={14} strokeWidth={2} />
                        </a>
                        <button
                          className="admin-action-btn admin-action-btn--delete"
                          onClick={() => handleDelete(lead)}
                          title="Delete Access Record"
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
    </div>
  );
}
