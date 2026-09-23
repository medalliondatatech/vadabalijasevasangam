'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle' });

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: 'busy' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus({ state: 'success' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  }

  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Vadabalija Seva Sangam • Hyderabad</p>
        </div>
      </section>
      <main className="content">
        <div className="container">
          <div className="panel">
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>Contact Vadabalija Seva Sangam</h2>
            <div className="form-grid">
              <div>
                <h3>Office</h3>
                <p>Hyderabad, Telangana, India</p>
                <p>Phone: +91 90000 00000</p>
                <p>Email: info@vadabalijasevasangam.org</p>
              </div>
              <form onSubmit={submit}>
                <div className="field">
                  <label>Name</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field" style={{ marginTop: 14 }}>
                  <label>Email</label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="field full" style={{ marginTop: 14 }}>
                  <label>Message</label>
                  <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit" disabled={status.state === 'busy'}>
                  {status.state === 'busy' ? 'Sending…' : 'Send Message'}
                </button>
                {status.state === 'success' && <p className="form-success">Your message has been sent. Thank you.</p>}
                {status.state === 'error' && <p className="form-error">{status.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
