import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseEditor from './pages/admin/CourseEditor';
import LearnerDashboard from './pages/learner/LearnerDashboard';
import CourseViewer from './pages/learner/CourseViewer';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import LandingPage from './pages/public/LandingPage';
import BlogListPage from './pages/public/BlogListPage';
import BlogPostPage from './pages/public/BlogPostPage';
import ContributePage from './pages/public/ContributePage';
import ContributorDashboard from './pages/contributor/ContributorDashboard';
import PostEditor from './pages/contributor/PostEditor';
import { Role } from './types';

// A wrapper to redirect logged in users from the root landing page to their dashboard
const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (user && location.pathname === '/') {
        const target = user.role === Role.ADMIN ? '/admin' : user.role === Role.LEARNER ? '/learner' : '/contributor';
        return <Navigate to={target} replace />;
    }

    return children;
};

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900">
        <div className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contribute" element={<ContributePage />} />
      </Route>
      
      {/* Auth Route */}
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

      {/* Authenticated App Routes */}
      <Route
        path="/*"
        element={
          user ? (
            <Layout>
              <Routes>
                {/* Admin Routes */}
                {user.role === Role.ADMIN && (
                  <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/course/:courseId" element={<CourseEditor />} />
                  </>
                )}
                {/* Learner Routes */}
                {user.role === Role.LEARNER && (
                  <>
                    <Route path="/learner" element={<LearnerDashboard />} />
                    <Route path="/learner/course/:courseId" element={<CourseViewer />} />
                  </>
                )}
                {/* Contributor Routes */}
                {user.role === Role.CONTRIBUTOR && (
                    <>
                        <Route path="/contributor" element={<ContributorDashboard />} />
                        <Route path="/contributor/post/new" element={<PostEditor />} />
                        <Route path="/contributor/post/edit/:postId" element={<PostEditor />} />
                    </>
                )}
                <Route path="/" element={<Navigate to={user.role === Role.ADMIN ? '/admin' : user.role === Role.LEARNER ? '/learner' : '/contributor'} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      
      {/* Fallback Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;