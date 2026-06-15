import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import './AdminLogin.css';
import logo from '../../assets/images/logo.png';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email.trim(), form.password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err.code, err.message);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later or reset your password.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMsg('');
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());
      setResetMsg('Password reset email sent! Check your inbox.');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setResetMsg('❌ No account found with this email.');
      } else {
        setResetMsg(`❌ ${err.message}`);
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__blob" aria-hidden="true" />
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <img src={logo} alt="Ashoka IAS Academy" />
        </div>
        <h1 className="admin-login__title">Admin Portal</h1>
        <p className="admin-login__sub">Sign in to manage your academy</p>

        {/* ── Login Form ── */}
        {!showForgot ? (
          <>
            {error && <div className="admin-login__error">{error}</div>}

            <form onSubmit={handleSubmit} className="admin-login__form">
              <div className="admin-login__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email" name="email" type="email"
                  placeholder="admin@ashokaias.com"
                  value={form.email} onChange={handleChange}
                  required autoFocus
                />
              </div>

              <div className="admin-login__field">
                <div className="admin-login__label-row">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="admin-login__input-wrap">
                  <input
                    id="password" name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password} onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="admin-login__eye"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="admin-login__forgot-link"
                onClick={() => { setShowForgot(true); setResetEmail(form.email); setError(''); }}
              >
                Forgot password?
              </button>

              <button type="submit" className="admin-login__btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </>
        ) : (
          /* ── Forgot Password Form ── */
          <>
            <p className="admin-login__forgot-desc">
              Enter your admin email and we'll send you a password reset link.
            </p>

            {resetMsg && (
              <div className={`admin-login__reset-msg${resetMsg.startsWith('✅') ? ' success' : ' error'}`}>
                {resetMsg}
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="admin-login__form">
              <div className="admin-login__field">
                <label htmlFor="reset-email">Email</label>
                <input
                  id="reset-email" type="email"
                  placeholder="admin@ashokaias.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required autoFocus
                />
              </div>

              <button type="submit" className="admin-login__btn" disabled={resetLoading}>
                {resetLoading ? 'Sending...' : 'Send Reset Email'}
              </button>

              <button
                type="button"
                className="admin-login__back-link"
                onClick={() => { setShowForgot(false); setResetMsg(''); }}
              >
                ← Back to Sign In
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
