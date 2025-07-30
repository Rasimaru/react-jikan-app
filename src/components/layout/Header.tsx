import logo from '@/assets/logo-fox.svg';
import { type JSX } from 'react';
import { BASE_PATH } from '@/types/constants';
import ErrorButton from '../shared/error/ErrorButton';

const Header = (): JSX.Element => {
  return (
    <header className="container text-black dark:text-white body-font w-full">
      <div className="mx-auto flex flex-wrap py-5 flex-col min-[20rem]:flex-row items-center justify-between">
        <a
          aria-label="Go to homepage"
          href={BASE_PATH}
          className="flex gap-2 title-font font-medium items-center md:justify-start justify-center "
        >
          <img src={logo} alt="Jikan logo" width={50} height={50} />
          <h1 className="text-3xl">Jikan</h1>
        </a>
        <ErrorButton></ErrorButton>
      </div>
    </header>
  );
};

export default Header;
