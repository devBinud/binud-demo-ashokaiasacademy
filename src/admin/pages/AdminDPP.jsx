import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Plus, Pencil, Trash2, Search, FileText, Users, Calendar } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import './AdminDPP.css';

const EMPTY_DPP = { title: '', date: new Date().toISOString().split('T')[0], subject: 'General', pdfUrl: '' };

const SUBJECT_OPTIONS = ['Polity', 'History', 'Geography', 'Economy', 'Science & Tech', 'Current Affairs', 'General'];

export default function AdminDPP() {
  const [activeTab, setActiveTab] = useState('dpps'); // 'dpps' or 'leads'
  const [dpps, setDpps] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loadingDpps, setLoadingDpps] = useState(true);
  const [loadingLeads, setLoadingLeads] = useState(true);

  // Form states
  const [form, setForm] = useState(EMPTY_DPP);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Search/Filter states
  const [dppSearch, setDppSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');

  const fetchDpps = async () => {
    try {
      setLoadingDpps(true);
      const q = query(collection(db, 'dpps'), orderBy('date', 'desc'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setDpps(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching DPPs:', err);
    } finally {
      setLoadingDpps(false);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoadingLeads(true);
      const q = query(collection(db, 'dpp_enquiries'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchDpps();
    fetchLeads();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await updateDoc(doc(db, 'dpps', editId), form);
        setDpps((prev) => prev.map((item) => item.id === editId ? { ...item, ...form } : item));
      } else {
        const ref = await addDoc(collection(db, 'dpps'), {
          ...form,
          createdAt: serverTimestamp(),
        });
        setDpps((prev) => [{ id: ref.id, ...form }, ...prev]);
      }
      setForm({ ...EMPTY_DPP, date: new Date().toISOString().split('T')[0] });
      setEditId(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error saving DPP:', err);
      alert('Failed to save DPP. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (dpp) => {
    setForm({ title: dpp.title, date: dpp.date, subject: dpp.subject, pdfUrl: dpp.pdfUrl });
    setEditId(dpp.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Daily Practice Paper?')) return;
    try {
      await deleteDoc(doc(db, 'dpps', id));
      setDpps((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting DPP:', err);
      alert('Failed to delete DPP.');
    }
  };

  const handleCancel = () => {
    setForm({ ...EMPTY_DPP, date: new Date().toISOString().split('T')[0] });
    setEditId(null);
    setShowForm(false);
  };

  // Filtering lists
  const filteredDpps = dpps.filter((dpp) => 
    dpp.title.toLowerCase().includes(dppSearch.toLowerCase()) ||
    dpp.subject.toLowerCase().includes(dppSearch.toLowerCase()) ||
    dpp.date.includes(dppSearch)
  );

  const filteredLeads = leads.filter((lead) => 
    lead.name?.toLowerCase().includes(leadSearch.toLowerCase()) ||
    lead.phone?.includes(leadSearch) ||
    lead.email?.toLowerCase().includes(leadSearch.toLowerCase()) ||
    lead.city?.toLowerCase().includes(leadSearch.toLowerCase()) ||
    lead.dppTitle?.toLowerCase().includes(leadSearch.toLowerCase())
  );

  return (
    <div className="admin-dpp-page">
      <div className="admin-page-header">
        <div>
          <h1>Daily Practice Paper (DPP)</h1>
          <p>Upload worksheets, manage dates, and view lead enquiries</p>
        </div>
        {activeTab === 'dpps' && (
          <button className="admin-btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_DPP); }}>
            <Plus size={15} strokeWidth={2} /> Add DPP Paper
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="admin-dpp-tabs">
        <button 
          className={`admin-dpp-tab ${activeTab === 'dpps' ? 'active' : ''}`}
          onClick={() => setActiveTab('dpps')}
        >
          <FileText size={16} />
          <span>Manage DPPs ({dpps.length})</span>
        </button>
        <button 
          className={`admin-dpp-tab ${activeTab === 'leads' ? 'active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          <Users size={16} />
          <span>Student Leads ({leads.length})</span>
        </button>
      </div>

      {/* Form Section */}
      {showForm && activeTab === 'dpps' && (
        <div className="admin-card admin-dpp-form-card">
          <h3>{editId ? 'Edit DPP Paper' : 'Add New DPP Paper'}</h3>
          <form onSubmit={handleFormSubmit} className="admin-dpp-form">
            <div className="admin-form-row">
              <div className="admin-form-field">
                <label>DPP Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  value={form.title} 
                  onChange={handleFormChange}
                  placeholder="e.g. Daily Practice Paper - Indian Polity" 
                  required 
                />
              </div>
              <div className="admin-form-field">
                <label>Subject / Category *</label>
                <select name="subject" value={form.subject} onChange={handleFormChange} required>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-field">
                <label>Date *</label>
                <input 
                  type="date" 
                  name="date" 
                  value={form.date} 
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <div className="admin-form-field">
                <label>PDF URL * (Shareable link from Drive, Dropbox, or public bucket)</label>
                <input 
                  type="url" 
                  name="pdfUrl" 
                  value={form.pdfUrl} 
                  onChange={handleFormChange}
                  placeholder="https://example.com/document.pdf" 
                  required 
                />
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-primary" disabled={saving}>
                {saving ? 'Saving...' : editId ? 'Update Paper' : 'Add Paper'}
              </button>
              <button type="button" className="admin-btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Contents */}
      {activeTab === 'dpps' ? (
        <div className="admin-card">
          <div className="admin-card__header dpp-search-header">
            <h2>Worksheets & Papers</h2>
            <div className="search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search by title, subject or date..." 
                value={dppSearch} 
                onChange={(e) => setDppSearch(e.target.value)} 
              />
            </div>
          </div>

          {loadingDpps ? (
            <Loader text="Loading DPP list..." />
          ) : filteredDpps.length === 0 ? (
            <div className="admin-empty">No DPP papers found. Click Add to create one!</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Title</th>
                    <th>PDF URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDpps.map((item) => (
                    <tr key={item.id}>
                      <td className="dpp-date-cell">
                        <Calendar size={14} />
                        <span>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </td>
                      <td>
                        <span className={`subject-badge subject-${item.subject.toLowerCase().replace(/[^a-z]/g, '')}`}>
                          {item.subject}
                        </span>
                      </td>
                      <td className="dpp-title-cell">
                        <strong>{item.title}</strong>
                      </td>
                      <td className="dpp-link-cell">
                        <a href={item.pdfUrl} target="_blank" rel="noreferrer" className="pdf-link">
                          View PDF Link
                        </a>
                      </td>
                      <td>
                        <div className="admin-actions-cell">
                          <button className="admin-action-btn" onClick={() => handleEdit(item)} title="Edit">
                            <Pencil size={14} />
                          </button>
                          <button className="admin-action-btn admin-action-btn--delete" onClick={() => handleDelete(item.id)} title="Delete">
                            <Trash2 size={14} />
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
      ) : (
        <div className="admin-card">
          <div className="admin-card__header dpp-search-header">
            <h2>Student Access Log & Leads</h2>
            <div className="search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search leads by name, email, phone..." 
                value={leadSearch} 
                onChange={(e) => setLeadSearch(e.target.value)} 
              />
            </div>
          </div>

          {loadingLeads ? (
            <Loader text="Loading student leads..." />
          ) : filteredLeads.length === 0 ? (
            <div className="admin-empty">No student leads recorded yet.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Student Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>City / Location</th>
                    <th>DPP Viewed</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="timestamp-cell">
                        {lead.createdAt ? new Date(lead.createdAt.seconds * 1000).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '—'}
                      </td>
                      <td>
                        <strong>{lead.name}</strong>
                      </td>
                      <td>{lead.phone}</td>
                      <td>{lead.email}</td>
                      <td>{lead.city || '—'}</td>
                      <td className="dpp-title-cell">
                        <span>{lead.dppTitle || 'Unknown DPP'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
