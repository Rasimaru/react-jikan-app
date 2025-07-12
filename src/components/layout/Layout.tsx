import type { JSX } from 'react';
import type { LayoutProps } from '@/types/types';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="container flex flex-col items-center justify-center text-center mx-auto light:bg-gray-100 text-black dark:text-white h-dvh">
      <Header />
      <main className="grow flex flex-col justify-start items-center w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
