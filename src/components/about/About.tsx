import { COURSE_LINK } from '@/types/constants';
import { type JSX } from 'react';
import { useTranslations } from 'next-intl';

const About = (): JSX.Element => {
  const t = useTranslations('About');
  return (
    <section className="flex flex-col flex-grow items-center justify-center text-center gap-5">
      <h2 className="text-4xl font-bold">{t('heading')}</h2>
      <div className="flex flex-col gap-5 text-lg">
        <p>{t('description')}</p>
        <p>
          {t('info.start')}{' '}
          <a
            className="font-semibold text-amber-500 hover:text-amber-300 duration-300"
            href={COURSE_LINK}
          >
            {t('info.link')}
          </a>{' '}
          {t('info.end')}
        </p>
      </div>
    </section>
  );
};

export default About;
