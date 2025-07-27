import Layout from '@/components/layout/Layout';
import { ROUTES } from '@/types/constants';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="flex flex-col flex-grow items-center justify-center text-center gap-5">
        <h2 className="text-4xl font-bold">About</h2>
        <div className="flex flex-col gap-2 text-lg">
          <p className="">A search platform built with React and powered by the Jikan API.</p>
          <p className="">
            This project is part of the RS School React 2025Q3 course and will be gradually expanded
            in future tasks.
          </p>
        </div>
        <Link
          to={ROUTES.Home}
          className="inline-flex items-center bg-amber-300 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded font-semibold duration-300 mb-10"
        >
          Back to home
        </Link>
      </div>
    </Layout>
  );
};

export default About;
