import { useTranslations } from 'next-intl';
import { type JSX } from 'react';

const NotFound = (): JSX.Element => {
  const t = useTranslations('NotFound');
  return (
    <section
      role="alert"
      aria-labelledby="not-found-title"
      aria-describedby="not-found-description"
      className="container text-center grow flex flex-col justify-center items-center gap-4 h-full"
    >
      <h2 id="not-found-title" className="text-4xl">
        {t('heading')}
      </h2>
      <p id="not-found-description" className="text-2xl">
        {t('description')}
      </p>
    </section>
  );
};

export default NotFound;
