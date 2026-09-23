import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/AdminPanel';

export const metadata = { title: 'Admin | Vadabalija Seva Sangam' };

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Vadabalija Seva Sangam • Hyderabad</p>
        </div>
      </section>
      <main className="content">
        <div className="container">
          {session?.user?.role !== 'ADMIN' ? (
            <div className="panel"><p className="form-error">You are not authorized to view this page.</p></div>
          ) : (
            <AdminPanel />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
