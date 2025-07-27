import Layout from '@/components/layout/Layout';
import { ROUTES } from '@/types/constants';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center flex-grow justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">404 – Page Not Found</h2>
        <p className="text-lg mb-6">The page you are looking for does not exist.</p>
        <Link
          to={ROUTES.Home}
          className="inline-flex items-center bg-amber-300 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-gray-200 hover:cursor-pointer rounded font-semibold duration-300"
        >
          Back to home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
