import { useTranslations } from 'next-intl';
import { type JSX } from 'react';
import { Link } from '@/i18n/navigation';

const NotFound = (): JSX.Element => {
  const t = useTranslations('NotFound');
  return (
    <section
      role="alert"
      aria-labelledby="not-found-title"
      aria-describedby="not-found-description"
      className="text-center h-full bg-gray-100 dark:bg-neutral-900 text-black dark:text-gray-100"
    >
      <div className="container flex flex-col justify-center items-center gap-5 h-full mx-auto">
        <h2 id="not-found-title" className="text-4xl">
          {t('heading')}
        </h2>
        <p id="not-found-description" className="text-2xl">
          {t('description')}
        </p>
        <Link
          href={'/'}
          className="inline-flex items-center bg-amber-500 text-black border-0 py-2 px-3 focus:outline-none hover:bg-amber-300 hover:cursor-pointer duration-300 rounded text-[20px] font-bold"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
