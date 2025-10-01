import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Blog, Testimonial } from '../../types';

const FeaturedBlogCard: React.FC<{ post: Blog }> = ({ post }) => (
    <Link to={`/blog/${post.slug}`} className="block group">
        <div className="overflow-hidden rounded-lg shadow-lg bg-white dark:bg-neutral-800 h-full">
            <img className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" src={post.coverImageUrl} alt={post.title} />
            <div className="p-6">
                <p className="text-sm text-orange-600 dark:text-orange-400">{post.tags.join(', ')}</p>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{post.title}</h3>
                <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">{post.excerpt}</p>
            </div>
        </div>
    </Link>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
        <p className="text-neutral-600 dark:text-neutral-300">"{testimonial.quote}"</p>
        <p className="mt-4 font-semibold text-neutral-900 dark:text-white">{testimonial.authorName}</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.authorRole}</p>
    </div>
);

const LandingPage: React.FC = () => {
    const { getPublishedBlogs, testimonials } = useData();
    const featuredBlogs = getPublishedBlogs().slice(0, 3);
    const [typedText, setTypedText] = useState('');
    const words = useMemo(() => ['Learn', 'Share', 'Grow'], []);

    useEffect(() => {
        const state = {
            wordIndex: 0,
            isDeleting: false,
        };
        let timeoutId: number;

        const type = () => {
            setTypedText(prevTypedText => {
                const currentWord = words[state.wordIndex % words.length];
                let newText;
                let typeSpeed = 150;

                if (state.isDeleting) {
                    // Backspacing
                    newText = currentWord.substring(0, prevTypedText.length - 1);
                    typeSpeed /= 2; // Faster
                } else {
                    // Typing
                    newText = currentWord.substring(0, prevTypedText.length + 1);
                }

                // Check for state transitions
                if (!state.isDeleting && newText === currentWord) {
                    // Finished typing
                    state.isDeleting = true;
                    typeSpeed = 2000; // Pause before deleting
                } else if (state.isDeleting && newText === '') {
                    // Finished deleting
                    state.isDeleting = false;
                    state.wordIndex++;
                    typeSpeed = 500; // Pause before typing next word
                }

                // Schedule the next call
                timeoutId = window.setTimeout(type, typeSpeed);
                return newText;
            });
        };

        // Kick off the animation
        timeoutId = window.setTimeout(type, 500);

        // Cleanup function
        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [words]);


    return (
        <>
            {/* Hero Section */}
            <section className="bg-white dark:bg-neutral-800">
                <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white sm:text-5xl md:text-6xl min-h-[80px]">
                        <span>{typedText}</span>
                        <span className="inline-block align-bottom w-1 h-10 sm:h-12 md:h-14 bg-orange-500 animate-pulse" aria-hidden="true" />
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-neutral-500 dark:text-neutral-300">
                        Join our vibrant design community to master new skills, share your expertise, and connect with fellow creatives from around the world.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Link to="/login" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">Join as Learner</Link>
                        <Link to="/blog" className="px-8 py-3 border border-orange-600 text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 dark:bg-neutral-800 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-neutral-700">Read Blogs</Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">What is Know XYZ Community?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500 dark:text-neutral-400">
                            We are a collective of designers, developers, and creators passionate about building beautiful and functional user experiences. Our platform offers high-quality courses and a space for experts to share their knowledge through our community blog.
                        </p>
                    </div>
                </div>
            </section>
            
            {/* Featured Blogs Section */}
            <section className="bg-white dark:bg-neutral-800 py-20">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">From the Community Blog</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500 dark:text-neutral-400">
                            Insights, tutorials, and stories from our talented contributors.
                         </p>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {featuredBlogs.map(post => <FeaturedBlogCard key={post.id} post={post} />)}
                    </div>
                 </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">What Our Members Say</h2>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
                    </div>
                </div>
            </section>

            {/* Contribute CTA Section */}
            <section className="bg-orange-700">
                <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Want to write for us?</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-orange-200">
                        Share your expertise with thousands of designers. We're looking for contributors who can provide fresh insights and practical advice.
                    </p>
                    <Link to="/contribute" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 sm:w-auto">
                        Become a Contributor
                    </Link>
                </div>
            </section>
        </>
    );
};

export default LandingPage;