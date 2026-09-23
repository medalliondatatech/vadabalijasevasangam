import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'About Us | Vadabalija Seva Sangam' };

export default function About() {
  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Vadabalija Seva Sangam • Hyderabad</p>
        </div>
      </section>
      <main className="content">
        <div className="container">
          <div className="panel">
            <span className="eyebrow">ABOUT VADABALIJA SEVA SANGAM</span>
            <h2>Our vision</h2>
            <p>To create a connected, supportive and progressive Vadabalija community where members can participate in service, education, employment, welfare and cultural activities.</p>
            <h2>Our priorities</h2>
            <div className="cards four">
              <article className="feature-card"><h3>Unity</h3><p>Connect families, members, professionals, youth and elders.</p></article>
              <article className="feature-card"><h3>Service</h3><p>Encourage meaningful seva and welfare programmes.</p></article>
              <article className="feature-card"><h3>Education</h3><p>Promote learning, scholarships, mentoring and career guidance.</p></article>
              <article className="feature-card"><h3>Development</h3><p>Create opportunities for skills, employment and entrepreneurship.</p></article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
