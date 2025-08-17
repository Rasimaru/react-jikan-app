import { Metadata } from 'next';
import Providers from './providers';
import Layout from '@/components/layout/Layout';
import ErrorBoundary from '@/components/shared/error/ErrorBoundary';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: '/favicon.ico',
  title: 'Jikan Anime',
  description: 'Discover and explore anime with JikanApp'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
