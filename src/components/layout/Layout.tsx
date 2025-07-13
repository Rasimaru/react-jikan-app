import type { LayoutProps } from '@/types/types';
import Header from './Header';
import Footer from './Footer';
import React from 'react';

class Layout extends React.Component<LayoutProps> {
  render(): React.JSX.Element {
    const { children } = this.props;

    return (
      <div className="container flex flex-col items-center justify-center text-center mx-auto light:bg-gray-100 text-black dark:text-white min-h-full">
        <Header />
        <main className="grow gap-10 flex flex-col justify-start items-center w-full">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
