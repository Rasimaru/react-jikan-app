import Header from './Header';
import Footer from './Footer';
import { type JSX, type ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center text-center mx-auto bg-neutral-900 text-gray-100 min-h-full w-full">
      <Header />
      <main
        role="main"
        className="container grow sm:gap-20 gap-10 flex flex-col justify-start items-center w-full p-5"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
