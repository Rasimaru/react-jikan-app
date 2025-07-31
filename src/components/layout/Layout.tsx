import Header from './Header';
import Footer from './Footer';
import { type JSX } from 'react';
import { Outlet } from 'react-router';

const Layout = (): JSX.Element => {
  return (
    <div className="px-5 flex flex-col items-center justify-center text-center mx-auto bg-gray-200 dark:bg-neutral-900 text-black dark:text-white min-h-full w-full">
      <Header />
      <main
        role="main"
        className="container grow sm:gap-20 gap-10 flex flex-col justify-start items-center w-full"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
