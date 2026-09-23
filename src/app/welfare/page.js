import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Welfare & Seva | Vadabalija Seva Sangam' };

export default function Welfare() {
  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>Welfare & Seva</h1>
          <p>Vadabalija Seva Sangam • Hyderabad</p>
        </div>
      </section>
      <main className="content">
        <div className="container">
          <div className="panel">
            <span className="eyebrow">SEVA • WELFARE</span>
            <h2>Community welfare initiatives</h2>
            <p>Verified welfare programmes, assistance requests, donation drives and completed seva activities are published here.</p>
            <div className="cards four">
              <article className="feature-card"><h3>Education Support</h3><p>Student scholarships, study materials and mentoring programmes.</p></article>
              <article className="feature-card"><h3>Medical Support</h3><p>Community assistance and health-focused service activities.</p></article>
              <article className="feature-card"><h3>Emergency Help</h3><p>Coordinated support for families facing urgent difficulties.</p></article>
              <article className="feature-card"><h3>Annadanam & Seva</h3><p>Community food distribution and volunteer-driven service.</p></article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
