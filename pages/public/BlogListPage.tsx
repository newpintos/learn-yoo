import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Blog } from '../../types';

const BlogCard: React.FC<{ post: Blog }> = ({ post }) => (
    <Link to={`/blog/${post.slug}`} className="block group bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
                 <img className="h-48 w-full object-cover md:h-full" src={post.coverImageUrl} alt={post.title} />
            </div>
            <div className="p-6 md:w-2/3">
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">{post.tags.join(' / ')}</p>
                <h2 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">{post.title}</h2>
                <p className="mt-3 text-neutral-500 dark:text-neutral-400">{post.excerpt}</p>
                <div className="mt-4 flex items-center">
                     <p className="text-sm text-neutral-500 dark:text-neutral-400">By {post.authorName} on {post.publishedAt?.toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    </Link>
);

const BlogListPage: React.FC = () => {
    const { getPublishedBlogs } = useData();
    const posts = getPublishedBlogs();

    return (
        <div className="py-12 bg-neutral-100 dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white">Community Blog</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500 dark:text-neutral-400">
                        The latest articles, tutorials, and insights from our community of design experts.
                    </p>
                </div>

                <div className="mt-12 max-w-4xl mx-auto grid gap-8">
                    {posts.length > 0 ? (
                        posts.map(post => <BlogCard key={post.id} post={post} />)
                    ) : (
                        <p className="text-center text-neutral-500 dark:text-neutral-400">No blog posts have been published yet. Check back soon!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogListPage;