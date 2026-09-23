import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = { title: 'Events & Activities | Vadabalija Seva Sangam' };

export default function Events() {
  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>Events & Activities</h1>
          <p>Vadabalija Seva Sangam • Hyderabad</p>
        </div>
      </section>
      <main className="content">
        <div className="container">
          <div className="panel">
            <span className="eyebrow">COMMUNITY CALENDAR</span>
            <h2>Events & activities</h2>
            <div className="service-grid">
              <a href="#"><span>UPCOMING</span><strong>Community Meeting</strong><small>Programme details will be published here.</small></a>
              <a href="#"><span>EDUCATION</span><strong>Student Guidance Programme</strong><small>Career and education guidance.</small></a>
              <a href="#"><span>SEVA</span><strong>Welfare Service Activity</strong><small>Community service initiative.</small></a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
