
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Role } from '../types';

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role.LEARNER | Role.CONTRIBUTOR>(Role.LEARNER);
  
  const [error, setError] = useState('');
  const { login, signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email);
    if (!success) {
      setError('Invalid email or user not registered.');
    } else {
        navigate('/');
    }
  };
  
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await signup(name, email, role);
    if (!result.success) {
      setError(result.message);
    } else {
        navigate('/');
    }
  };
  
  const toggleForm = () => {
      setIsSignUp(!isSignUp);
      setError('');
      setEmail('');
      setName('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8 relative">
       <div className="absolute top-8 left-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-neutral-900 dark:text-white">
            {isSignUp ? 'Create an account' : 'Sign in to your account'}
          </h2>
        </div>
        
        {isSignUp ? (
           <form className="mt-8 space-y-6" onSubmit={handleSignUpSubmit}>
             <div className="rounded-md shadow-sm space-y-4">
               <div>
                  <label htmlFor="full-name" className="sr-only">Full name</label>
                  <input id="full-name" name="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 placeholder-neutral-500 text-neutral-900 dark:text-white dark:bg-neutral-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Full name" />
               </div>
               <div>
                 <label htmlFor="email-address-signup" className="sr-only">Email address</label>
                 <input id="email-address-signup" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                   className="appearance-none rounded-md relative block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 placeholder-neutral-500 text-neutral-900 dark:text-white dark:bg-neutral-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                   placeholder="Email address" />
               </div>
                <div>
                    <label htmlFor="role" className="sr-only">Role</label>
                    <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value as Role.LEARNER | Role.CONTRIBUTOR)}
                     className="appearance-none rounded-md relative block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 placeholder-neutral-500 text-neutral-900 dark:text-white dark:bg-neutral-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                        <option value={Role.LEARNER}>I want to be a Learner</option>
                        <option value={Role.CONTRIBUTOR}>I want to be a Contributor</option>
                    </select>
                </div>
             </div>

             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

             <div>
               <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300">
                 {loading ? 'Creating account...' : 'Sign up'}
               </button>
             </div>
           </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address-login" className="sr-only">Email address</label>
                <input id="email-address-login" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 placeholder-neutral-500 text-neutral-900 dark:text-white dark:bg-neutral-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Email address" />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div>
              <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
             <div className="text-center text-sm text-neutral-600 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-6">
                <p className="font-semibold mb-2">Demo Accounts:</p>
                <p>Admin: admin@lms.com</p>
                <p>Learner: alice@learner.com</p>
                <p>Contributor: diana@contributor.com</p>
             </div>
          </form>
        )}
        
        <div className="text-sm text-center">
            <button onClick={toggleForm} className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
