import Header from './Header';
import Footer from './Footer';
import { ReactNode, type JSX } from 'react';
import Flyout from '../shared/ui/Flyout';

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="px-5 flex flex-col items-center justify-center text-center mx-auto bg-gray-100 dark:bg-neutral-900 text-black dark:text-gray-100 min-h-full w-full">
      <Header />
      <main
        role="main"
        className="container grow sm:gap-20 gap-15 flex flex-col justify-start items-center w-full"
      >
        {children}
        <Flyout />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
