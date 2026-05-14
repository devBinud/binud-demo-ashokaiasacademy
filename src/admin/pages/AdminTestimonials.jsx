import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import './AdminTestimonials.css';

const EMPTY = { name: '', role: '', text: '', initials: '' };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchTestimonials = async () => {
    const snap = await getDocs(collection(db, 'testimonials'));
    setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: value,
      // Auto-generate initials from name
      ...(name === 'name' ? {
        initials: value.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
      } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await updateDoc(doc(db, 'testimonials', editId), form);
        setTestimonials((prev) => prev.map((t) => t.id === editId ? { ...t, ...form } : t));
      } else {
        const ref = await addDoc(collection(db, 'testimonials'), {
          ...form,
          createdAt: serverTimestamp(),
        });
        setTestimonials((prev) => [...prev, { id: ref.id, ...form }]);
      }
      setForm(EMPTY);
      setEditId(null);
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (t) => {
    setForm({ name: t.name, role: t.role, text: t.text, initials: t.initials });
    setEditId(t.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    await deleteDoc(doc(db, 'testimonials', id));
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCancel = () => {
    setForm(EMPTY);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="admin-testimonials">
      <div className="admin-page-header">
        <div>
          <h1>Testimonials</h1>
          <p>Manage student testimonials shown on the website</p>
        </div>
        <button className="admin-btn-primary" onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}>
          <Plus size={15} strokeWidth={2} /> Add Testimonial
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="admin-card admin-testimonials__form-card">
          <h3>{editId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
          <form onSubmit={handleSubmit} className="admin-testimonials__form">
            <div className="admin-form-row">
              <div className="admin-form-field">
                <label>Student Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="e.g. Priya Sharma" required />
              </div>
              <div className="admin-form-field">
                <label>Role / Achievement *</label>
                <input name="role" value={form.role} onChange={handleChange}
                  placeholder="e.g. APSC Selected, 2023" required />
              </div>
            </div>
            <div className="admin-form-field">
              <label>Testimonial Text *</label>
              <textarea name="text" value={form.text} onChange={handleChange}
                placeholder="Write the student's testimonial..." rows={4} required />
            </div>
            <div className="admin-form-field" style={{ maxWidth: '160px' }}>
              <label>Initials (auto)</label>
              <input name="initials" value={form.initials} onChange={handleChange}
                placeholder="PS" maxLength={2} />
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-primary" disabled={saving}>
                {saving ? 'Saving...' : editId ? 'Update' : 'Add Testimonial'}
              </button>
              <button type="button" className="admin-btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="admin-testimonials__grid">
        {loading ? (
          <Loader text="Loading testimonials..." />
        ) : testimonials.length === 0 ? (
          <div className="admin-empty">No testimonials yet. Add your first one!</div>
        ) : (
          testimonials.map((t) => (
            <div key={t.id} className="admin-testimonial-card">
              <div className="admin-testimonial-card__avatar">{t.initials}</div>
              <div className="admin-testimonial-card__body">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
                <p>"{t.text}"</p>
              </div>
              <div className="admin-testimonial-card__actions">
                <button className="admin-action-btn" onClick={() => handleEdit(t)} title="Edit">
                  <Pencil size={14} strokeWidth={2} />
                </button>
                <button className="admin-action-btn admin-action-btn--delete" onClick={() => handleDelete(t.id)} title="Delete">
                  <Trash2 size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
