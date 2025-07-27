import logo from '@/assets/logo-fox.svg';
import React from 'react';
import { ROUTES } from '@/types/constants';
import { NavLink } from 'react-router-dom';

const Header = (): React.JSX.Element => {
  return (
    <header className="container text-black dark:text-white body-font w-full">
      <nav className="mx-auto flex flex-wrap py-5 flex-col min-[20rem]:flex-row items-center justify-between text-2xl ">
        <NavLink
          to={ROUTES.Home}
          className={
            'flex gap-2 title-font font-medium items-center md:justify-start justify-center'
          }
        >
          <img src={logo} alt={logo} width={50} height={50} />
          <h1 className="text-3xl hover:text-amber-500 duration-300">Jikan</h1>
        </NavLink>
        <NavLink
          to={ROUTES.About}
          className={({ isActive }) =>
            `hover:text-amber-500 duration-300 ${isActive ? 'text-amber-500 font-semibold' : 'text-black dark:text-white'}`
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
