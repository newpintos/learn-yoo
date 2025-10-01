import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../hooks/useAuth';
import { Blog } from '../../types';

const PostEditor: React.FC = () => {
    const { postId } = useParams<{ postId?: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { blogs, createPost, updatePost } = useData();

    const [post, setPost] = useState<Partial<Blog>>({
        title: '',
        content: '',
        excerpt: '',
        coverImageUrl: '',
        tags: [],
    });
    
    const isEditing = Boolean(postId);

    useEffect(() => {
        if (isEditing) {
            const existingPost = blogs.find(p => p.id === postId);
            if (existingPost) {
                setPost(existingPost);
            } else {
                // Post not found, maybe redirect
                navigate('/contributor');
            }
        }
    }, [postId, blogs, navigate, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setPost({ ...post, tags: value.split(',').map(tag => tag.trim()) });
        } else {
            setPost({ ...post, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !post.title || !post.content) return;

        if (isEditing) {
            updatePost(post as Blog);
        } else {
            createPost({
                title: post.title,
                content: post.content,
                excerpt: post.excerpt || post.content.substring(0, 150),
                coverImageUrl: post.coverImageUrl || 'https://picsum.photos/1280/720',
                tags: post.tags || [],
                authorId: user.id,
                authorName: user.name,
            });
        }
        navigate('/contributor');
    };

    return (
        <div>
             <div className="mb-6">
                <Link to="/contributor" className="text-orange-600 dark:text-orange-400 hover:underline">&larr; Back to Dashboard</Link>
                <h1 className="text-3xl font-bold mt-2">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Title</label>
                        <input type="text" name="title" id="title" value={post.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                        <label htmlFor="coverImageUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Cover Image URL</label>
                        <input type="url" name="coverImageUrl" id="coverImageUrl" value={post.coverImageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                     <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Excerpt / Short Summary</label>
                        <textarea name="excerpt" id="excerpt" rows={3} value={post.excerpt} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Content (Markdown supported)</label>
                        <textarea name="content" id="content" rows={12} value={post.content} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Tags (comma-separated)</label>
                        <input type="text" name="tags" id="tags" value={post.tags?.join(', ')} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                           Save Draft
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostEditor;