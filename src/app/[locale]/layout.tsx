import { ReactNode } from 'react';
import { Metadata } from 'next';
import Providers from './providers';
import Layout from '@/components/layout/Layout';
import '@/styles/global.css';
import { withBasePath } from '@/utils/utils';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  icons: withBasePath('/favicon.ico'),
  title: 'Jikan Anime',
  description: 'Discover and explore anime with JikanApp'
};

type LayoutProps = {
  children: ReactNode;
  params: { locale: 'en' | 'by' };
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/locales/${locale}.json`)).default;

  return (
    <Providers locale={locale} messages={messages}>
      <Layout>{children}</Layout>
    </Providers>
  );
}
