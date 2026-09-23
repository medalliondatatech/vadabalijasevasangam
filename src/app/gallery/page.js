import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Photo Gallery | Vadabalija Seva Sangam' };

export default function Gallery() {
  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>Photo Gallery</h1>
          <p>Vadabalija Seva Sangam • Hyderabad</p>
        </div>
      </section>
      <main className="content">
        <div className="container">
          <div className="panel">
            <span className="eyebrow">COMMUNITY MOMENTS</span>
            <h2>Photo gallery</h2>
            <div className="cards four">
              <article className="feature-card"><img src="/assets/vbss-header.png" style={{ width: '100%', borderRadius: 8 }} alt="Sangam" /></article>
              <article className="feature-card"><img src="/assets/vbss-logo.png" style={{ width: '100%', height: 180, objectFit: 'contain' }} alt="Sangam logo" /></article>
              <article className="feature-card"><h3>Community Events</h3><p>Add event photographs here.</p></article>
              <article className="feature-card"><h3>Seva Activities</h3><p>Add service programme photographs here.</p></article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
