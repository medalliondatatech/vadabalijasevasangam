import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserById } from '@/lib/users';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DirectorySearch from '@/components/DirectorySearch';

export const metadata = { title: 'Member Directory | Vadabalija Seva Sangam' };

export default async function Directory() {
  const session = await getServerSession(authOptions);
  const me = session ? await getUserById(session.user.id) : null;

  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>Member Directory</h1>
          <p>Vadabalija Seva Sangam • Hyderabad</p>
        </div>
      </section>
      <main className="content">
        <div className="container">
          <div className="panel">
            <span className="eyebrow">COMMUNITY DIRECTORY</span>
            <h2>Member directory</h2>
            {me?.status === 'PENDING' && (
              <div className="notice-banner">
                Your membership is awaiting admin approval. Once approved, you'll be able to search the member directory.
              </div>
            )}
            {me?.status === 'REJECTED' && (
              <div className="notice-banner error">
                Your membership request was not approved. Please contact the Sangam office for more information.
              </div>
            )}
            {me?.status === 'APPROVED' && <DirectorySearch />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
