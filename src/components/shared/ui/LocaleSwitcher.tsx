'use client';

import { useState, type JSX } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

const LocaleSwitcher = (): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleChange = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|by)/, `/${locale}`);
    router.replace(newPath);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-2 border w-10 h-10 rounded-md hover:cursor-pointer hover:bg-amber-300 hover:text-black duration-300"
        aria-label="Locale switcher"
      >
        {pathname.split('/')[1]?.toUpperCase() || 'EN'}
      </button>

      {open && (
        <div className="absolute right-0 z-10 bg-gray-100 dark:bg-neutral-900 mt-1 w-10 rounded shadow border">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleChange(locale)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-amber-300 dark:hover:text-black hover:cursor-pointer duration-300 rounded"
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocaleSwitcher;
