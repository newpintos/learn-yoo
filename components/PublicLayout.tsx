import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;