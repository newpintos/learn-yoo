import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import NotFoundPage from '../NotFoundPage';

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { getBlogBySlug, users } = useData();

    if (!slug) return <NotFoundPage />;
    
    const post = getBlogBySlug(slug);

    if (!post) {
        return <NotFoundPage />;
    }
    
    const author = users.find(u => u.id === post.authorId);

    return (
        <div className="bg-white dark:bg-neutral-800 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <article>
                    <header className="mb-8 text-center">
                        <p className="text-base font-semibold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
                            {post.tags.join(', ')}
                        </p>
                        <h1 className="mt-2 block text-3xl leading-8 font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                            {post.title}
                        </h1>
                        <div className="mt-6 flex items-center justify-center">
                            {author && (
                                <div className="flex-shrink-0">
                                    <img className="h-12 w-12 rounded-full" src={author.avatarUrl} alt={author.name} />
                                </div>
                            )}
                            <div className="ml-3 text-left">
                                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                    {post.authorName}
                                </p>
                                <div className="flex space-x-1 text-sm text-neutral-500 dark:text-neutral-400">
                                    <time dateTime={post.publishedAt?.toISOString()}>
                                        {post.publishedAt?.toLocaleDateString()}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </header>
                    
                    <img src={post.coverImageUrl} alt={post.title} className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg mb-8" />
                    
                    {/* Using dangerouslySetInnerHTML for mock data. Use a markdown parser in a real app. */}
                    <div 
                        className="prose prose-lg dark:prose-invert mx-auto"
                        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                    />
                </article>
                <div className="mt-12 text-center">
                    <Link to="/blog" className="text-orange-600 dark:text-orange-400 hover:underline">
                        &larr; Back to all posts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;