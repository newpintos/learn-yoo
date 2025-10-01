import React, { useState } from 'react';

const ContributePage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit to a backend service.
        setSubmitted(true);
    };

    return (
        <div className="py-12 bg-neutral-100 dark:bg-neutral-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8 sm:p-10">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white">Become a Contributor</h1>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500 dark:text-neutral-400">
                                Share your expertise, build your personal brand, and help shape the future of design.
                            </p>
                        </div>

                        {submitted ? (
                            <div className="mt-10 text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">Thank you for your application!</h3>
                                <p className="mt-2 text-neutral-600 dark:text-neutral-400">Our team will review your submission and get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Full Name</label>
                                    <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email Address</label>
                                    <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                                </div>
                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Short Bio</label>
                                    <textarea name="bio" id="bio" rows={3} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="e.g., Senior Product Designer at Acme Inc." />
                                </div>
                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Why do you want to contribute?</label>
                                    <textarea name="reason" id="reason" rows={4} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="I'm passionate about..." />
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContributePage;