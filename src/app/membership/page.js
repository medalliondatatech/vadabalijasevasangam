'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const initial = { name: '', phone: '', email: '', city: '', occupation: '', ageGroup: '', address: '', password: '' };

export default function Membership() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ state: 'idle' });
  const router = useRouter();

  function update(key) {
    return (e) => setForm({ ...form, [key]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: 'busy' });
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus({ state: 'success' });
      setForm(initial);
      setTimeout(() => router.push('/login'), 1800);
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  }

  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>Membership Registration</h1>
          <p>Vadabalija Seva Sangam • Hyderabad</p>
        </div>
      </section>
      <main className="content">
        <div className="container">
          <div className="panel">
            <span className="eyebrow">BECOME A MEMBER</span>
            <h2>Membership registration</h2>
            <p className="muted">Register your details to participate in Vadabalija Seva Sangam activities. An admin will review and approve your membership before it appears in the member directory.</p>
            <form onSubmit={submit}>
              <div className="form-grid">
                <div className="field"><label>Full Name *</label><input required value={form.name} onChange={update('name')} placeholder="Enter full name" /></div>
                <div className="field"><label>Mobile Number *</label><input required value={form.phone} onChange={update('phone')} placeholder="10-digit mobile number" /></div>
                <div className="field"><label>Email</label><input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" /></div>
                <div className="field"><label>City / Area</label><input value={form.city} onChange={update('city')} placeholder="Hyderabad" /></div>
                <div className="field"><label>Occupation</label><input value={form.occupation} onChange={update('occupation')} placeholder="Profession / Business" /></div>
                <div className="field">
                  <label>Age Group</label>
                  <select value={form.ageGroup} onChange={update('ageGroup')}>
                    <option value="">Select</option>
                    <option>18–25</option>
                    <option>26–40</option>
                    <option>41–60</option>
                    <option>60+</option>
                  </select>
                </div>
                <div className="field"><label>Password *</label><input type="password" required minLength={6} value={form.password} onChange={update('password')} placeholder="At least 6 characters" /></div>
                <div className="field full"><label>Address</label><textarea value={form.address} onChange={update('address')} placeholder="Address" /></div>
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={status.state === 'busy'}>
                  {status.state === 'busy' ? 'Submitting…' : 'Submit Membership'}
                </button>
                {status.state === 'success' && <p className="form-success">Registration submitted. Redirecting to sign in…</p>}
                {status.state === 'error' && <p className="form-error">{status.message}</p>}
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
