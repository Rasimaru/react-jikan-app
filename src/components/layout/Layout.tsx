import type { LayoutProps } from '@/types/types';
import Header from './Header';
import Footer from './Footer';
import React from 'react';

const Layout = (props: LayoutProps): React.JSX.Element => {
  const { children } = props;
  return (
    <div className="px-5 flex flex-col items-center justify-center text-center mx-auto bg-gray-200 dark:bg-neutral-900 text-black dark:text-white min-h-full w-full">
      <Header />
      <main className="container grow gap-20 py-10 md:py-16 flex flex-col justify-start items-center w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
