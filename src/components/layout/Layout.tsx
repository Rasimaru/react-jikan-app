import Header from './Header';
import Footer from './Footer';
import { type JSX } from 'react';
import { Outlet } from 'react-router';
import Flyout from '../shared/ui/Flyout';

const Layout = (): JSX.Element => {
  return (
    <div className="px-5 flex flex-col items-center justify-center text-center mx-auto bg-gray-100 dark:bg-neutral-900 text-black dark:text-gray-100 min-h-full w-full">
      <Header />
      <main
        role="main"
        className="container grow sm:gap-20 gap-10 flex flex-col justify-start items-center w-full"
      >
        <Outlet />
        <Flyout />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
