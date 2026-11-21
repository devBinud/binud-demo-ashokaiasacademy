import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

/* Friendly messages for Firebase auth error codes */
const authMessage = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try logging in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection.';
    case 'auth/operation-not-allowed':
      return 'Email sign-up is not enabled yet. Please contact the academy.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

const PERKS = [
  { icon: 'fa-solid fa-book-open', text: 'Free notes, PYQs & current affairs in one place' },
  { icon: 'fa-solid fa-bell', text: 'Be the first to hear about new batches & scholarship tests' },
  { icon: 'fa-solid fa-user-graduate', text: 'Guidance from mentors who have cleared UPSC & APSC' },
];

function PasswordInput({ id, value, onChange, placeholder, autoComplete, invalid }) {
  const [show, setShow] = useState(false);
  return (
    <div className={`auth-input auth-input--password${invalid ? ' auth-input--invalid' : ''}`}>
      <i className="fa-solid fa-lock auth-input__icon" aria-hidden="true" />
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="auth-input__toggle"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        <i className={`fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true" />
      </button>
    </div>
  );
}

function Field({ label, htmlFor, error, children }) {
  return (
    <div className="auth-field">
      <label htmlFor={htmlFor} className="auth-field__label">{label}</label>
      {children}
      {error && <span className="auth-field__error">{error}</span>}
    </div>
  );
}

/* ── Login form ── */
function LoginForm({ onDone, onSwitch }) {
  const { login, resetPassword } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Enter a valid email address';
    if (!forgot && !form.password) errs.password = 'Enter your password';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setStatus({ type: '', msg: '' });
    try {
      if (forgot) {
        await resetPassword(form.email.trim());
        setStatus({ type: 'success', msg: 'Password reset link sent. Please check your inbox (and spam folder).' });
      } else {
        await login(form.email.trim(), form.password);
        onDone();
      }
    } catch (err) {
      setStatus({ type: 'error', msg: authMessage(err.code) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <div className="auth-form__head">
        <h2>{forgot ? 'Reset your password' : 'Welcome back'}</h2>
        <p>
          {forgot
            ? "Enter your registered email and we'll send you a reset link."
            : 'Student login: continue your preparation journey.'}
        </p>
      </div>

      {status.msg && <div className={`auth-alert auth-alert--${status.type}`}>{status.msg}</div>}

      <Field label="Email address" htmlFor="login-email" error={errors.email}>
        <div className={`auth-input${errors.email ? ' auth-input--invalid' : ''}`}>
          <i className="fa-solid fa-envelope auth-input__icon" aria-hidden="true" />
          <input id="login-email" type="email" value={form.email} onChange={set('email')} placeholder="name@example.com" autoComplete="email" />
        </div>
      </Field>

      {!forgot && (
        <Field label="Password" htmlFor="login-password" error={errors.password}>
          <PasswordInput id="login-password" value={form.password} onChange={set('password')} placeholder="Enter your password" autoComplete="current-password" invalid={!!errors.password} />
        </Field>
      )}

      <div className="auth-form__row">
        <button
          type="button"
          className="auth-link"
          onClick={() => { setForgot((v) => !v); setStatus({ type: '', msg: '' }); setErrors({}); }}
        >
          {forgot ? '← Back to login' : 'Forgot password?'}
        </button>
      </div>

      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? <span className="auth-spinner" aria-hidden="true" /> : null}
        {forgot ? 'Send Reset Link' : 'Log In'}
      </button>

      <p className="auth-form__switch">
        Don't have an account?{' '}
        <button type="button" className="auth-link" onClick={onSwitch}>Sign up as Student</button>
      </p>
    </form>
  );
}

/* ── Sign-up form ── */
function SignupForm({ onDone, onSwitch }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', agree: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => {
    let v = k === 'agree' ? e.target.checked : e.target.value;
    if (k === 'phone') v = v.replace(/\D/g, '').slice(0, 10);
    setForm((f) => ({ ...f, [k]: v }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Enter your full name';
    if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Enter a valid email address';
    if (!PHONE_RE.test(form.phone)) errs.phone = 'Enter a valid 10-digit mobile number';
    if (form.password.length < 6) errs.password = 'Use at least 6 characters';
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match';
    if (!form.agree) errs.agree = 'Please accept the terms to continue';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setStatus('');
    try {
      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone,
        password: form.password,
      });
      onDone();
    } catch (err) {
      setStatus(authMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <div className="auth-form__head">
        <h2>Sign up as Student</h2>
        <p>Create your free student account. It only takes a minute.</p>
      </div>

      {status && <div className="auth-alert auth-alert--error">{status}</div>}

      <Field label="Full name" htmlFor="su-name" error={errors.name}>
        <div className={`auth-input${errors.name ? ' auth-input--invalid' : ''}`}>
          <i className="fa-solid fa-user auth-input__icon" aria-hidden="true" />
          <input id="su-name" type="text" value={form.name} onChange={set('name')} placeholder="Enter your full name" autoComplete="name" />
        </div>
      </Field>

      <div className="auth-form__grid">
        <Field label="Email address" htmlFor="su-email" error={errors.email}>
          <div className={`auth-input${errors.email ? ' auth-input--invalid' : ''}`}>
            <i className="fa-solid fa-envelope auth-input__icon" aria-hidden="true" />
            <input id="su-email" type="email" value={form.email} onChange={set('email')} placeholder="name@example.com" autoComplete="email" />
          </div>
        </Field>

        <Field label="Mobile number" htmlFor="su-phone" error={errors.phone}>
          <div className={`auth-input auth-input--phone${errors.phone ? ' auth-input--invalid' : ''}`}>
            <span className="auth-input__prefix">+91</span>
            <input id="su-phone" type="tel" inputMode="numeric" value={form.phone} onChange={set('phone')} placeholder="10-digit mobile" autoComplete="tel-national" />
          </div>
        </Field>
      </div>

      <div className="auth-form__grid">
        <Field label="Password" htmlFor="su-password" error={errors.password}>
          <PasswordInput id="su-password" value={form.password} onChange={set('password')} placeholder="Min. 6 characters" autoComplete="new-password" invalid={!!errors.password} />
        </Field>

        <Field label="Confirm password" htmlFor="su-confirm" error={errors.confirm}>
          <PasswordInput id="su-confirm" value={form.confirm} onChange={set('confirm')} placeholder="Re-enter password" autoComplete="new-password" invalid={!!errors.confirm} />
        </Field>
      </div>

      <label className={`auth-check${errors.agree ? ' auth-check--invalid' : ''}`}>
        <input type="checkbox" checked={form.agree} onChange={set('agree')} />
        <span>
          I agree to the <Link to="/terms-of-use">Terms of Use</Link> and{' '}
          <Link to="/privacy-policy">Privacy Policy</Link>
        </span>
      </label>
      {errors.agree && <span className="auth-field__error auth-field__error--check">{errors.agree}</span>}

      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? <span className="auth-spinner" aria-hidden="true" /> : null}
        Create Account
      </button>

      <p className="auth-form__switch">
        Already have an account?{' '}
        <button type="button" className="auth-link" onClick={onSwitch}>Login now</button>
      </p>
    </form>
  );
}

/* ── "Login as Admin" option under both forms ── */
function AdminOption() {
  return (
    <>
      <div className="auth-divider"><span>or</span></div>
      <Link to="/admin/login" className="auth-ghost auth-admin">
        <i className="fa-solid fa-user-shield" aria-hidden="true" />
        Login as Admin
      </Link>
    </>
  );
}

/* ── Slim notice when someone is already signed in ── */
function SignedInNotice() {
  const { user, isAdmin, logout } = useAuth();
  return (
    <div className="auth-notice">
      <i className="fa-solid fa-circle-check" aria-hidden="true" />
      <span>
        Signed in as <strong>{user.email}</strong>
      </span>
      {isAdmin && <Link to="/admin/dashboard" className="auth-link">Admin Panel</Link>}
      <button type="button" className="auth-link auth-link--danger" onClick={logout}>Log out</button>
    </div>
  );
}

export default function Auth({ initialMode = 'signup' }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState(initialMode);

  // Keep the tab in sync with /login vs /signup
  useEffect(() => { setMode(initialMode); }, [initialMode]);

  const switchTo = (m) => {
    setMode(m);
    navigate(m === 'login' ? '/login' : '/signup', { replace: true, state: location.state });
  };

  // After login/sign-up: go back where the student came from, else Home
  const onDone = () => navigate(location.state?.from || '/', { replace: true });

  return (
    <section className="auth">
      <SEO
        title={mode === 'login' ? 'Student Login' : 'Student Sign Up'}
        description="Log in or create your Ashoka IAS Academy student account for UPSC & APSC preparation resources and updates."
      />

      <div className="container">
        <div className="auth__card">
          {/* Left — brand panel */}
          <aside className="auth__panel">
            <span className="auth__kicker">Student Portal</span>
            <h1 className="auth__title">
              Your UPSC &amp; APSC journey <span>starts here.</span>
            </h1>
            <p className="auth__lead">
              One account for everything you need from Ashoka IAS Academy, Assam's trusted
              civil services coaching institute.
            </p>
            <ul className="auth__perks">
              {PERKS.map((p) => (
                <li key={p.text}>
                  <span className="auth__perk-icon"><i className={p.icon} aria-hidden="true" /></span>
                  {p.text}
                </li>
              ))}
            </ul>
            <a href="tel:+919181411843" className="auth__help">
              <i className="fa-solid fa-headset" aria-hidden="true" />
              <span>
                Need help? <strong>+91 91814 11843</strong>
              </span>
            </a>
          </aside>

          {/* Right — forms */}
          <div className="auth__body">
            {user && <SignedInNotice />}

            <div className="auth-tabs" role="tablist" data-mode={mode}>
              <span className="auth-tabs__pill" aria-hidden="true" />
              <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'is-active' : ''} onClick={() => switchTo('signup')}>
                Student Sign Up
              </button>
              <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'is-active' : ''} onClick={() => switchTo('login')}>
                Login
              </button>
            </div>

            {mode === 'login' ? (
              <LoginForm key="login" onDone={onDone} onSwitch={() => switchTo('signup')} />
            ) : (
              <SignupForm key="signup" onDone={onDone} onSwitch={() => switchTo('login')} />
            )}

            <AdminOption />
          </div>
        </div>
      </div>
    </section>
  );
}
