
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Course, Role, Blog, User } from '../../types';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <div className="p-6">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{course.title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">{course.description}</p>
      <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400">
        <span>{course.lessons.length} Lessons</span>
        <span>{course.learnerIds.length} Learners</span>
      </div>
    </div>
    <div className="bg-neutral-50 dark:bg-neutral-700 px-6 py-3">
        <Link to={`/admin/course/${course.id}`} className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 font-semibold">
            Manage Course &rarr;
        </Link>
    </div>
  </div>
);

const UserManagement: React.FC = () => {
    const { users, createUserByAdmin } = useData();
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState<{message: string, isError: boolean} | null>(null);

    const nonAdminUsers = users.filter(u => u.role !== Role.ADMIN);

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        const result = createUserByAdmin(email);
        setFeedback({ message: result.message, isError: !result.success });
        if (result.success) {
            setEmail('');
        }
    };

    return (
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">User Management</h2>
            <form onSubmit={handleCreateUser} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="new.user@example.com"
                    className="sm:col-span-1 px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                />
                <button type="submit" className="sm:col-span-1 px-6 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Create User
                </button>
            </form>
            {feedback && (
                <div className={`text-sm mb-4 ${feedback.isError ? 'text-red-500' : 'text-green-600'}`}>
                    {feedback.message}
                </div>
            )}
            <h3 className="text-lg font-medium mb-3 text-neutral-800 dark:text-neutral-200">Current Users ({nonAdminUsers.length})</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
                    <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nonAdminUsers.map(user => (
                            <tr key={user.id} className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600">
                                <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                 <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === Role.LEARNER ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>
                                        {user.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const BlogManagement: React.FC = () => {
    const { getPendingBlogs, publishPost } = useData();
    const pendingPosts = getPendingBlogs();

    const handleApprove = (post: Blog) => {
        if(window.confirm(`Are you sure you want to publish "${post.title}"?`)) {
            publishPost(post.id);
        }
    };

    return (
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Blog Post Submissions</h2>
            {pendingPosts.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
                        <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Author</th>
                                <th scope="col" className="px-6 py-3">Submitted</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingPosts.map(post => (
                                <tr key={post.id} className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600">
                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">{post.title}</td>
                                    <td className="px-6 py-4">{post.authorName}</td>
                                    <td className="px-6 py-4">{post.createdAt.toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleApprove(post)} className="font-medium text-green-600 dark:text-green-500 hover:underline">
                                            Approve & Publish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-neutral-500 dark:text-neutral-400">No pending submissions.</p>
            )}
        </div>
    );
};


const AdminDashboard: React.FC = () => {
  const { courses } = useData();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Admin Dashboard</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 self-start sm:self-center">
          Create New Course
        </button>
      </div>
      
      <BlogManagement />
      <UserManagement />
      
      <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Course Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;