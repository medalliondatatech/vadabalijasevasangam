import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src="/assets/vbss-logo.png" alt="" />
          <h3>Vadabalija Seva Sangam</h3>
          <p>Community • Service • Welfare • Development</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/membership">Membership</Link>
          <Link href="/directory">Members</Link>
        </div>
        <div>
          <h4>Services</h4>
          <Link href="/welfare">Welfare</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/gallery">Gallery</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Hyderabad, Telangana, India</p>
          <p>+91 90000 00000</p>
          <p>info@vadabalijasevasangam.org</p>
        </div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} Vadabalija Seva Sangam, Hyderabad. All Rights Reserved.</div>
    </footer>
  );
}
