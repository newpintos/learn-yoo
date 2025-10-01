
export enum Role {
  ADMIN = 'ADMIN',
  LEARNER = 'LEARNER',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  bio?: string;
  avatarUrl?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'file';
  url: string; // In a real app, this would be a signed URL
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl: string; // In a real app, this would be a signed URL
  attachments: Attachment[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  learnerIds: string[];
}

export enum ActivityType {
  USER_INVITED = 'User Invited',
  USER_ACCESS_REVOKED = 'User Access Revoked',
  LESSON_CREATED = 'Lesson Created',
  LESSON_UPDATED = 'Lesson Updated',
  LESSON_DELETED = 'Lesson Deleted',
  COURSE_CREATED = 'Course Created',
  COURSE_UPDATED = 'Course Updated',
  BLOG_POST_SUBMITTED = 'Blog Post Submitted',
  BLOG_POST_PUBLISHED = 'Blog Post Published',
  USER_CREATED = 'User Created',
}

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  activity: ActivityType;
  details: string;
}

export enum BlogStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PUBLISHED = 'published',
}

export interface Blog {
  id:string;
  title: string;
  slug: string;
  authorId: string;
  authorName: string; 
  coverImageUrl: string;
  content: string; // Markdown or HTML
  excerpt: string;
  tags: string[];
  status: BlogStatus;
  createdAt: Date;
  publishedAt?: Date;
}

export interface Testimonial {
    id: string;
    quote: string;
    authorName: string;
    authorRole: string;
}