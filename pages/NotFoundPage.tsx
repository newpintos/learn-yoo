import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-center px-4">
      <h1 className="text-9xl font-extrabold text-orange-600 dark:text-orange-400 tracking-widest">404</h1>
      <div className="bg-white dark:bg-neutral-800 px-2 text-sm rounded rotate-12 absolute shadow-md">
        Page Not Found
      </div>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link to="/" className="mt-8 px-6 py-3 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition-colors">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;