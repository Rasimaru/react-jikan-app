import React from 'react';

class Footer extends React.Component {
  render(): React.JSX.Element {
    return (
      <footer className="text-black dark:text-white body-font w-full">
        <div className="py-5 mx-auto flex items-center justify-center sm:flex-row flex-col">
          <p className="text-sm sm:ml-6 sm:mt-0 mt-4">
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
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
