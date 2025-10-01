import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-neutral-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              Know XYZ
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-neutral-700 dark:text-neutral-300">
                  Welcome, {user.name}
                  <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    {user.role}
                  </span>
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;