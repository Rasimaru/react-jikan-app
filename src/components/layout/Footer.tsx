import { type JSX } from 'react';

const Footer = (): JSX.Element => {
  return (
    <footer role="contentinfo" className="container text-black dark:text-white body-font w-full">
      <div className="py-5 mx-auto flex items-center justify-center sm:flex-row flex-col">
        <small className="text-sm sm:ml-6 sm:mt-0 mt-4">
          <a
            href="https://rs.school/"
            rel="noopener noreferrer"
            className="hover:text-amber-500 duration-300"
            target="_blank"
          >
            © 2025 Rolling Scopes School
          </a>
          <span> — </span>
          <a
            href="https://github.com/Rasimaru"
            rel="noopener noreferrer"
            className="hover:text-amber-500 duration-300"
            target="_blank"
          >
            @Rasimaru
          </a>
        </small>
      </div>
    </footer>
  );
};

export default Footer;
