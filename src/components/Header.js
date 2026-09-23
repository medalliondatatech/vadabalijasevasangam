'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Vadabalija Seva Sangam • Hyderabad</span>
          <div>
            <a href="tel:+919000000000">+91 90000 00000</a>
            <a href="mailto:info@vadabalijasevasangam.org">info@vadabalijasevasangam.org</a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Link className="brand" href="/">
            <img src="/assets/vbss-logo.png" alt="Vadabalija Seva Sangam logo" />
            <div>
              <div className="brand-title">వాడబలిజ సేవా సంఘం</div>
              <div className="brand-subtitle">VADABALIJA SEVA SANGAM • HYDERABAD</div>
            </div>
          </Link>
          <button className="menu-toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">☰</button>
          <nav className={`nav ${open ? 'open' : ''}`}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/membership">Membership</Link>
            <Link href="/directory">Members</Link>
            <Link href="/welfare">Welfare</Link>
            <Link href="/events">Events</Link>
            <Link href="/jobs">Jobs</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
            {status === 'authenticated' && session.user.role === 'ADMIN' && (
              <Link href="/admin">Admin</Link>
            )}
            {status === 'authenticated' ? (
              <a className="login-btn" href="#" onClick={(e) => { e.preventDefault(); signOut({ callbackUrl: '/' }); }}>
                Sign Out
              </a>
            ) : (
              <Link className="login-btn" href="/login">Member Login</Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
