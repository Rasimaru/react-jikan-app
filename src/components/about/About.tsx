import { COURSE_LINK } from '@/types/constants';
import { type JSX } from 'react';

const About = (): JSX.Element => {
  return (
    <section className="flex flex-col flex-grow items-center justify-center text-center gap-5">
      <h2 className="text-4xl font-bold">About</h2>
      <div className="flex flex-col gap-5 text-lg">
        <p>A search platform built with React and powered by the Jikan API.</p>
        <p>
          {`This project is part of the `}
          <a
            className="font-semibold text-amber-500 hover:text-amber-300 duration-300"
            href={COURSE_LINK}
          >
            React 2025Q3 course
          </a>
          {` and will be gradually expanded in future tasks.`}
        </p>
      </div>
    </section>
  );
};

export default About;
