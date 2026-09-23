'use client';

import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [tab, setTab] = useState('pending');
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadAll() {
    setLoading(true);
    setError('');
    try {
      const [mRes, msgRes] = await Promise.all([
        fetch('/api/admin/members'),
        fetch('/api/admin/messages'),
      ]);
      const mData = await mRes.json();
      const msgData = await msgRes.json();
      if (!mRes.ok) throw new Error(mData.error || 'Could not load members');
      setMembers(mData.members);
      setMessages(msgData.messages || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, []);

  async function setStatus(id, status) {
    try {
      const res = await fetch(`/api/admin/members/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not update member');
      setMembers(prev => prev.map(m => (m.id === id ? { ...m, status } : m)));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div className="panel"><p className="muted">Loading admin data…</p></div>;

  const pending = members.filter(m => m.status === 'PENDING');
  const approved = members.filter(m => m.status === 'APPROVED');

  return (
    <div className="panel">
      <div className="stat-row">
        <div className="stat-card"><strong>{members.length}</strong>Total members</div>
        <div className="stat-card"><strong>{pending.length}</strong>Pending approval</div>
        <div className="stat-card"><strong>{approved.length}</strong>Approved</div>
        <div className="stat-card"><strong>{messages.length}</strong>Contact messages</div>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="tabs">
        <button className={tab === 'pending' ? 'active' : ''} onClick={() => setTab('pending')}>Pending Approvals ({pending.length})</button>
        <button className={tab === 'all' ? 'active' : ''} onClick={() => setTab('all')}>All Members ({members.length})</button>
        <button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}>Messages ({messages.length})</button>
      </div>

      {(tab === 'pending' || tab === 'all') && (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th><th>Contact</th><th>City</th><th>Occupation</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(tab === 'pending' ? pending : members).map(m => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.phone}<br /><span className="muted">{m.email}</span></td>
                  <td>{m.city || '—'}</td>
                  <td>{m.occupation || '—'}</td>
                  <td><span className={`badge ${m.status.toLowerCase()}`}>{m.status}</span></td>
                  <td>
                    <div className="row-actions">
                      {m.status !== 'APPROVED' && <button className="approve" onClick={() => setStatus(m.id, 'APPROVED')}>Approve</button>}
                      {m.status !== 'REJECTED' && <button className="reject" onClick={() => setStatus(m.id, 'REJECTED')}>Reject</button>}
                    </div>
                  </td>
                </tr>
              ))}
              {(tab === 'pending' ? pending : members).length === 0 && (
                <tr><td colSpan={6} className="muted">No members here.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'messages' && (
        <div className="table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Received</th></tr></thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td>{new Date(msg.createdAt).toLocaleString('en-IN')}</td>
                </tr>
              ))}
              {messages.length === 0 && <tr><td colSpan={4} className="muted">No messages yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
