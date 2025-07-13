import logo from '@/assets/logo-fox.svg';
import React from 'react';

class Header extends React.Component {
  render(): React.JSX.Element {
    return (
      <header className="text-black dark:text-white body-font w-full">
        <div className="mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
          <a
            href="#"
            className="flex gap-2 title-font font-medium items-center md:justify-start justify-center "
          >
            <img src={logo} alt={logo} width={50} height={50} />
            <h1 className="text-3xl">Jikan</h1>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900"></a>
            <a className="mr-5 hover:text-gray-900"></a>
            <a className="mr-5 hover:text-gray-900"></a>
            <a className="mr-5 hover:text-gray-900"></a>
          </nav>
          <button className="inline-flex items-center bg-gray-100 text-black border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded text-base mt-4 md:mt-0">
            Button
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
