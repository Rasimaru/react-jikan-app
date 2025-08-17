import { type JSX } from 'react';
import { BASE_PATH } from '@/types/constants';
import { NavLink } from 'react-router';
import ThemeSwitcher from '../shared/ui/ThemeSwitcher';

const Header = (): JSX.Element => {
  return (
    <header className="container text-black dark:text-gray-100 body-font w-full">
      <nav className="mx-auto flex flex-wrap py-5 flex-col min-[20rem]:flex-row items-center justify-start text-lg gap-5">
        <NavLink
          aria-label="Go to home page"
          to={BASE_PATH}
          end
          className={({ isActive }) =>
            `flex grow gap-2 title-font font-medium items-center justify-start hover:text-amber-300 duration-300 ${isActive ? 'text-amber-500' : ''}`
          }
        >
          <img src="/logo-fox.svg" alt="Jikan logo" width={50} height={50} />
          <h1 className="relative bottom-0.5 sm:text-3xl text-2xl">Jikan</h1>
        </NavLink>
        <NavLink
          to="about"
          aria-label="Go to about page"
          className={({ isActive }) =>
            `hover:text-amber-300 duration-300 ${isActive ? 'text-amber-500' : ''}`
          }
        >
          About
        </NavLink>
        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default Header;
