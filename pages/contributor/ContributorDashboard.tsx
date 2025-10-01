import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../hooks/useAuth';
import { Blog, BlogStatus } from '../../types';

const StatusBadge: React.FC<{ status: BlogStatus }> = ({ status }) => {
    const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    const statusClasses = {
        [BlogStatus.DRAFT]: "bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200",
        [BlogStatus.PENDING]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        [BlogStatus.PUBLISHED]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const ContributorDashboard: React.FC = () => {
    const { user } = useAuth();
    const { getPostsByAuthor, submitForReview } = useData();
    const myPosts = user ? getPostsByAuthor(user.id) : [];

    const handleSubmit = (post: Blog) => {
        if (window.confirm(`Are you sure you want to submit "${post.title}" for review?`)) {
            submitForReview(post.id);
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Contributor Dashboard</h1>
                <Link to="/contributor/post/new" className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 self-start sm:self-center">
                    Create New Post
                </Link>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">My Posts</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
                        <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Created</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPosts.map(post => (
                                <tr key={post.id} className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600">
                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">{post.title}</td>
                                    <td className="px-6 py-4"><StatusBadge status={post.status} /></td>
                                    <td className="px-6 py-4">{post.createdAt.toLocaleDateString()}</td>
                                    <td className="px-6 py-4 space-x-4">
                                        {post.status === BlogStatus.DRAFT && (
                                            <>
                                                <Link to={`/contributor/post/edit/${post.id}`} className="font-medium text-orange-600 dark:text-orange-500 hover:underline">Edit</Link>
                                                <button onClick={() => handleSubmit(post)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Submit for Review</button>
                                            </>
                                        )}
                                        {post.status === BlogStatus.PENDING && (
                                            <span className="italic text-neutral-500">Pending Review</span>
                                        )}
                                        {post.status === BlogStatus.PUBLISHED && (
                                            <Link to={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Live</Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContributorDashboard;