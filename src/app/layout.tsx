import { ReactNode } from 'react';
import '@/styles/global.css';
import Providers from '@/providers/Providers';
import { getLocale, setRequestLocale } from 'next-intl/server';
import { Messages } from 'next-intl';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  setRequestLocale(locale);

  const messages: Messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
