import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, Messages } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Providers from '@/providers/Providers';
import Layout from '@/components/layout/Layout';
import { withBasePath, generateStaticParams } from '@/utils/utils';
import { Metadata } from 'next';
export { generateStaticParams };

export const metadata: Metadata = {
  icons: withBasePath('/favicon.ico'),
  title: 'Jikan Anime',
  description: 'Discover and explore anime with JikanApp'
};

export type LayoutProps = {
  children: ReactNode;
  params: { locale: 'en' | 'by' };
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await Promise.resolve(params);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages: Messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <Providers locale={locale} messages={messages}>
      <Layout>{children}</Layout>
    </Providers>
  );
}
