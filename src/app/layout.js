import './globals.css';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'Vadabalija Seva Sangam | Hyderabad',
  description: 'Vadabalija Seva Sangam — community, service, welfare and development for the Vadabalija community in Hyderabad.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
