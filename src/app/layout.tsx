import { Metadata } from 'next';
import Providers from './providers';
import Layout from '@/components/layout/Layout';
import '@/styles/global.css';
import { withBasePath } from '@/utils/utils';

export const metadata: Metadata = {
  icons: withBasePath('/favicon.ico'),
  title: 'Jikan Anime',
  description: 'Discover and explore anime with JikanApp'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
