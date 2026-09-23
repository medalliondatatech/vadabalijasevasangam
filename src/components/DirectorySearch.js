'use client';

import { useEffect, useState, useCallback } from 'react';

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

export default function DirectorySearch() {
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async (query, cityFilter) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (cityFilter) params.set('city', cityFilter);
      const res = await fetch(`/api/members?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load members');
      setMembers(data.members);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load('', ''); }, [load]);

  function onSubmit(e) {
    e.preventDefault();
    load(q, city);
  }

  return (
    <div>
      <form className="search-bar" onSubmit={onSubmit}>
        <input placeholder="Search by name or occupation…" value={q} onChange={e => setQ(e.target.value)} />
        <input placeholder="City / area" value={city} onChange={e => setCity(e.target.value)} style={{ maxWidth: 220 }} />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      {error && <p className="form-error">{error}</p>}
      {loading ? (
        <p className="muted">Loading members…</p>
      ) : members.length === 0 ? (
        <p className="muted">No members found matching your search.</p>
      ) : (
        <div className="directory-grid">
          {members.map(m => (
            <article className="member" key={m.id}>
              <div className="avatar">{initials(m.name)}</div>
              <h3>{m.name}</h3>
              <p>{m.occupation || 'Community Member'}{m.city ? ` • ${m.city}` : ''}</p>
              {m.phone && <p>📞 {m.phone}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
