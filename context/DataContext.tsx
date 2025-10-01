
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Course, User, AuditLogEntry, ActivityType, Role, Blog, BlogStatus, Testimonial } from '../types';
import { COURSES, USERS, AUDIT_LOGS, BLOG_POSTS, TESTIMONIALS } from '../constants';

interface DataContextType {
  courses: Course[];
  users: User[];
  auditLog: AuditLogEntry[];
  blogs: Blog[];
  testimonials: Testimonial[];
  getCourseById: (id: string) => Course | undefined;
  getLearnerCourses: (learnerId: string) => Course[];
  grantAccess: (courseId: string, email: string) => boolean;
  revokeAccess: (courseId: string, userId: string) => void;
  logActivity: (activity: ActivityType, details: string) => void;
  updateLesson: (courseId: string, updatedLesson: Course['lessons'][0]) => void;
  addLesson: (courseId: string, newLesson: Omit<Course['lessons'][0], 'id'>) => void;
  deleteLesson: (courseId: string, lessonId: string) => void;
  createUserByAdmin: (email: string) => { success: boolean; message: string };
  createUser: (name: string, email: string, role: Role.LEARNER | Role.CONTRIBUTOR) => { success: boolean, message: string, newUser?: User };
  getPublishedBlogs: () => Blog[];
  getBlogBySlug: (slug: string) => Blog | undefined;
  getPendingBlogs: () => Blog[];
  getPostsByAuthor: (authorId: string) => Blog[];
  submitForReview: (postId: string) => void;
  publishPost: (postId: string) => void;
  createPost: (postData: Omit<Blog, 'id' | 'slug' | 'status' | 'createdAt'>) => void;
  updatePost: (updatedPost: Blog) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [users, setUsers] = useState<User[]>(USERS);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(AUDIT_LOGS);
  const [blogs, setBlogs] = useState<Blog[]>(BLOG_POSTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  const logActivity = (activity: ActivityType, details: string) => {
    const newLog: AuditLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        activity,
        details
    };
    setAuditLog(prevLogs => [newLog, ...prevLogs].slice(0, 20));
  };

  const createUserByAdmin = (email: string): { success: boolean; message: string } => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      return { success: false, message: 'A user with this email already exists.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: email.toLowerCase(),
      name: email.split('@')[0],
      role: Role.LEARNER,
      avatarUrl: `https://i.pravatar.cc/150?u=${email.toLowerCase()}`
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    logActivity(ActivityType.USER_INVITED, `Admin created new learner: ${email}`);
    return { success: true, message: `Successfully created user for ${email}.` };
  };
  
  const createUser = (name: string, email: string, role: Role.LEARNER | Role.CONTRIBUTOR): { success: boolean, message: string, newUser?: User } => {
    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, message: 'Please enter a valid name and email address.' };
    }
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      return { success: false, message: 'A user with this email already exists.' };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: email.toLowerCase(),
      name: name,
      role: role,
      avatarUrl: `https://i.pravatar.cc/150?u=${email.toLowerCase()}`
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    logActivity(ActivityType.USER_CREATED, `New user signed up: ${email} as ${role}`);
    return { success: true, message: 'Account created successfully!', newUser };
  };

  const getCourseById = (id: string) => courses.find(c => c.id === id);

  const getLearnerCourses = (learnerId: string) => {
    return courses.filter(course => course.learnerIds.includes(learnerId));
  };
  
  const grantAccess = (courseId: string, email: string): boolean => {
    const user = users.find(u => u.email === email);
    const course = courses.find(c => c.id === courseId);
    if (user && course && !course.learnerIds.includes(user.id)) {
        setCourses(prevCourses => prevCourses.map(c => 
            c.id === courseId ? { ...c, learnerIds: [...c.learnerIds, user.id] } : c
        ));
        logActivity(ActivityType.USER_INVITED, `Granted ${email} access to ${course.title}`);
        return true;
    }
    return false;
  };

  const revokeAccess = (courseId: string, userId: string) => {
    const course = courses.find(c => c.id === courseId);
    const user = users.find(u => u.id === userId);
    setCourses(prevCourses => prevCourses.map(c => 
        c.id === courseId ? { ...c, learnerIds: c.learnerIds.filter(id => id !== userId) } : c
    ));
    if(course && user) {
      logActivity(ActivityType.USER_ACCESS_REVOKED, `Revoked access for ${user.email} from ${course.title}`);
    }
  };

  const updateLesson = (courseId: string, updatedLesson: Course['lessons'][0]) => {
     setCourses(prevCourses => prevCourses.map(c => {
        if (c.id === courseId) {
            const newLessons = c.lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l);
            return { ...c, lessons: newLessons };
        }
        return c;
     }));
     const course = courses.find(c => c.id === courseId);
     if(course) logActivity(ActivityType.LESSON_UPDATED, `Updated lesson "${updatedLesson.title}" in ${course.title}`);
  };

  const addLesson = (courseId: string, newLessonData: Omit<Course['lessons'][0], 'id'>) => {
    const newLesson = { ...newLessonData, id: `lesson-${Date.now()}` };
    setCourses(prevCourses => prevCourses.map(c => 
        c.id === courseId ? { ...c, lessons: [...c.lessons, newLesson] } : c
    ));
    const course = courses.find(c => c.id === courseId);
    if(course) logActivity(ActivityType.LESSON_CREATED, `Created lesson "${newLesson.title}" in ${course.title}`);
  };

  const deleteLesson = (courseId: string, lessonId: string) => {
    let lessonTitle = '';
    setCourses(prevCourses => prevCourses.map(c => {
        if (c.id === courseId) {
            const lesson = c.lessons.find(l => l.id === lessonId);
            if(lesson) lessonTitle = lesson.title;
            return { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) };
        }
        return c;
    }));
    const course = courses.find(c => c.id === courseId);
    if(course && lessonTitle) logActivity(ActivityType.LESSON_DELETED, `Deleted lesson "${lessonTitle}" from ${course.title}`);
  };

  const getPublishedBlogs = () => blogs.filter(b => b.status === BlogStatus.PUBLISHED).sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  const getBlogBySlug = (slug: string) => blogs.find(b => b.slug === slug);
  const getPendingBlogs = () => blogs.filter(b => b.status === BlogStatus.PENDING);
  const getPostsByAuthor = (authorId: string) => blogs.filter(b => b.authorId === authorId);

  const submitForReview = (postId: string) => {
    let postTitle = '';
    setBlogs(prev => prev.map(p => {
        if (p.id === postId) {
            postTitle = p.title;
            return { ...p, status: BlogStatus.PENDING };
        }
        return p;
    }));
    if(postTitle) logActivity(ActivityType.BLOG_POST_SUBMITTED, `Blog post "${postTitle}" submitted for review.`);
  };

  const publishPost = (postId: string) => {
    let postTitle = '';
    setBlogs(prev => prev.map(p => {
        if(p.id === postId) {
            postTitle = p.title;
            return { ...p, status: BlogStatus.PUBLISHED, publishedAt: new Date() };
        }
        return p;
    }));
     if(postTitle) logActivity(ActivityType.BLOG_POST_PUBLISHED, `Blog post "${postTitle}" was published.`);
  };

  const createPost = (postData: Omit<Blog, 'id' | 'slug' | 'status' | 'createdAt'>) => {
    const newPost: Blog = {
        ...postData,
        id: `blog-${Date.now()}`,
        slug: postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        status: BlogStatus.DRAFT,
        createdAt: new Date(),
    };
    setBlogs(prev => [newPost, ...prev]);
  };
  
  const updatePost = (updatedPost: Blog) => {
    setBlogs(prev => prev.map(p => p.id === updatedPost.id ? {...updatedPost, slug: updatedPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')} : p));
  };


  return (
    <DataContext.Provider value={{ courses, users, auditLog, blogs, testimonials, getCourseById, getLearnerCourses, grantAccess, revokeAccess, logActivity, updateLesson, addLesson, deleteLesson, createUserByAdmin, createUser, getPublishedBlogs, getBlogBySlug, getPendingBlogs, getPostsByAuthor, submitForReview, publishPost, createPost, updatePost }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};