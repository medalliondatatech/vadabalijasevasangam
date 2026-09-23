import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Jobs & Careers | Vadabalija Seva Sangam' };

export default function Jobs() {
  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>Jobs & Careers</h1>
          <p>Vadabalija Seva Sangam • Hyderabad</p>
        </div>
      </section>
      <main className="content">
        <div className="container">
          <div className="panel">
            <span className="eyebrow">CAREERS & SKILLS</span>
            <h2>Jobs & opportunities</h2>
            <p>Community job openings, internships, skill-development programmes and professional networking opportunities.</p>
            <div className="service-grid">
              <a href="#"><span>JOB</span><strong>Software Developer</strong><small>Example listing — replace with live jobs.</small></a>
              <a href="#"><span>JOB</span><strong>Data Analyst</strong><small>Example listing — replace with live jobs.</small></a>
              <a href="#"><span>SKILLS</span><strong>Digital Skills Programme</strong><small>Training and career development.</small></a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
