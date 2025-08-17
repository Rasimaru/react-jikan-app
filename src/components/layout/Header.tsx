import { type JSX } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import ThemeSwitcher from '../shared/ui/ThemeSwitcher';
import { withBasePath } from '@/utils/utils';
import LocaleSwitcher from '../shared/ui/LocaleSwitcher';
import { useTranslations } from 'next-intl';

const Header = (): JSX.Element => {
  const t = useTranslations('Nav');
  return (
    <header className="container text-black dark:text-gray-100 body-font w-full">
      <nav className="mx-auto flex flex-wrap py-5 flex-col min-[20rem]:flex-row items-center justify-start text-lg gap-5">
        <Link
          aria-label="Go to home page"
          href="/"
          className="flex grow gap-2 title-font font-medium items-center justify-start hover:text-amber-300 duration-300"
        >
          <Image src={withBasePath('/logo-fox.svg')} alt="Jikan logo" width={50} height={50} />
          <h1 className="relative bottom-0.5 sm:text-3xl text-2xl">Jikan</h1>
        </Link>
        <Link
          href="/about"
          aria-label="Go to about page"
          className="hover:text-amber-300 duration-300"
        >
          {t('about')}
        </Link>
        <ThemeSwitcher />
        <LocaleSwitcher />
      </nav>
    </header>
  );
};

export default Header;
