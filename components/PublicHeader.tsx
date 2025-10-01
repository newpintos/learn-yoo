
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const PublicHeader: React.FC = () => {
  const activeLinkStyle = {
    color: '#ea580c', // orange-600
    fontWeight: '600',
  };

  return (
    <header className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              Know XYZ
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white" style={({isActive}) => isActive ? activeLinkStyle : undefined} end>
              Home
            </NavLink>
            <NavLink to="/blog" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white" style={({isActive}) => isActive ? activeLinkStyle : undefined}>
              Blog
            </NavLink>
            <NavLink to="/contribute" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white" style={({isActive}) => isActive ? activeLinkStyle : undefined}>
              Contribute
            </NavLink>
             <NavLink to="/login" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white" style={({isActive}) => isActive ? activeLinkStyle : undefined}>
              Learning
            </NavLink>
          </nav>
          <div className="flex items-center">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Sign In / Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;