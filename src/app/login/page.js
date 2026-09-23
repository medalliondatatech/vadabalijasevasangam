'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await signIn('credentials', {
      email: identifier,
      password,
      redirect: false,
    });
    setBusy(false);
    if (res?.error) {
      setError('Incorrect email/mobile or password.');
      return;
    }
    router.push('/directory');
    router.refresh();
  }

  return (
    <>
      <Header />
      <div className="login-wrap">
        <div className="login-box">
          <div className="brand-mini">
            <img src="/assets/vbss-logo.png" alt="Logo" />
            <div><strong>Vadabalija Seva Sangam</strong><div className="muted">Member Portal</div></div>
          </div>
          <h1>Member Login</h1>
          <p className="muted">Sign in to access your community profile.</p>
          <form onSubmit={submit}>
            <div className="field">
              <label>Email or Mobile Number</label>
              <input required value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Enter email or mobile" />
            </div>
            <div className="field" style={{ marginTop: 14 }}>
              <label>Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
            </div>
            {error && <p className="form-error">{error}</p>}
            <button className="btn btn-primary" style={{ width: '100%', border: 0, marginTop: 18 }} type="submit" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 22 }}>
            New member? <a href="/membership" style={{ color: 'var(--green)', fontWeight: 700 }}>Create Membership</a>
          </p>
          <p style={{ textAlign: 'center' }}><a href="/" className="muted">← Back to website</a></p>
        </div>
      </div>
      <Footer />
    </>
  );
}
