import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">COMMUNITY • SERVICE • WELFARE</span>
            <h1>Vadabalija Seva <span>Sangam</span></h1>
            <p>A connected, supportive and progressive Vadabalija community in Hyderabad — bringing members together for service, education, employment, welfare and cultural activities.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/membership">Become a Member</a>
              <a className="btn btn-light" href="/directory">Member Directory</a>
            </div>
          </div>
          <div className="hero-card">
            <h3>Member Login</h3>
            <p className="muted">Already registered? Sign in to search the member directory and stay connected with the community.</p>
            <hr />
            <a href="/login">Sign in to your account →</a>
          </div>
        </div>
      </section>

      <div className="notice">
        <div className="container notice-inner">
          <strong>Notice:</strong>
          <span>Membership registration is open for the Vadabalija community in Hyderabad.</span>
          <a href="/membership">Register now</a>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>What we do</h2>
            <p>Our Sangam works across four priorities to strengthen the community.</p>
          </div>
          <div className="cards four">
            <article className="feature-card">
              <div className="icon">🤝</div>
              <h3>Unity</h3>
              <p>Connect families, members, professionals, youth and elders across Hyderabad and beyond.</p>
              <a href="/about">Learn more →</a>
            </article>
            <article className="feature-card">
              <div className="icon">🙏</div>
              <h3>Service</h3>
              <p>Encourage meaningful seva and welfare programmes for those who need support.</p>
              <a href="/welfare">Learn more →</a>
            </article>
            <article className="feature-card">
              <div className="icon">🎓</div>
              <h3>Education</h3>
              <p>Promote learning, scholarships, mentoring and career guidance for students.</p>
              <a href="/jobs">Learn more →</a>
            </article>
            <article className="feature-card">
              <div className="icon">📈</div>
              <h3>Development</h3>
              <p>Create opportunities for skills, employment and entrepreneurship.</p>
              <a href="/jobs">Learn more →</a>
            </article>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container split">
          <div className="image-panel">
            <img src="/assets/vbss-header.png" alt="Vadabalija Seva Sangam community" />
          </div>
          <div>
            <span className="eyebrow">WHY JOIN</span>
            <h2>A community that looks out for its own</h2>
            <ul className="check-list">
              <li>Searchable member directory to find and reconnect with community members</li>
              <li>Welfare support for education, medical and emergency needs</li>
              <li>Job postings and skill-development programmes</li>
              <li>Community events, meetings and cultural activities</li>
            </ul>
            <a className="btn btn-dark" href="/membership">Register as a Member</a>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow">JOIN TODAY</span>
            <h2>Become part of the Sangam</h2>
            <p>Registration is quick — an admin will review and approve your membership.</p>
          </div>
          <a className="btn btn-primary" href="/membership">Register Now</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
