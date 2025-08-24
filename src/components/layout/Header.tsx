import logo from '/react.svg';
import { type JSX } from 'react';

const Header = (): JSX.Element => {
  return (
    <header className=" text-gray-100 bg-neutral-900 body-font w-full border-b-1">
      <div className="container px-5 mx-auto">
        <nav className="mx-auto flex flex-wrap py-5 flex-col min-[20rem]:flex-row items-center justify-start text-lg gap-5">
          <a
            aria-label="Go to home page"
            href="/"
            className="flex grow gap-2 title-font font-medium items-center justify-start hover:text-amber-300 duration-300"
          >
            <img src={logo} alt="React logo" width={50} height={50} />
            <h1 className="relative bottom-0.5 sm:text-3xl text-2xl">React Forms</h1>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
