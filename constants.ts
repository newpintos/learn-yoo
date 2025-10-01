
import { User, Course, Role, Lesson, Attachment, AuditLogEntry, ActivityType, Blog, BlogStatus, Testimonial } from './types';

export const USERS: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'admin@lms.com', role: Role.ADMIN, bio: 'Manages the SimpleLMS platform.', avatarUrl: 'https://i.pravatar.cc/150?u=admin@lms.com' },
  { id: 'user-2', name: 'Alice', email: 'alice@learner.com', role: Role.LEARNER, avatarUrl: 'https://i.pravatar.cc/150?u=alice@learner.com' },
  { id: 'user-3', name: 'Bob', email: 'bob@learner.com', role: Role.LEARNER, avatarUrl: 'https://i.pravatar.cc/150?u=bob@learner.com' },
  { id: 'user-4', name: 'Charlie', email: 'charlie@learner.com', role: Role.LEARNER, avatarUrl: 'https://i.pravatar.cc/150?u=charlie@learner.com' },
  { id: 'user-5', name: 'Diana', email: 'diana@contributor.com', role: Role.CONTRIBUTOR, bio: 'A passionate UI/UX designer and writer, sharing insights on design thinking and user-centric strategies.', avatarUrl: 'https://i.pravatar.cc/150?u=diana@contributor.com' },
];

const uiUxLessons: Lesson[] = Array.from({ length: 11 }, (_, i) => {
    const lessonNum = i + 1;
    const attachments: Attachment[] = [
        { id: `attach-${lessonNum}-1`, name: `Lesson ${lessonNum} Worksheet.pdf`, type: 'pdf', url: '#' },
        { id: `attach-${lessonNum}-2`, name: `Design Principles ${lessonNum}.png`, type: 'image', url: '#' }
    ];
    
    return {
        id: `lesson-${lessonNum}`,
        title: `Lesson ${lessonNum}: Introduction to Design Thinking`,
        description: `This is the description for Lesson ${lessonNum}. It covers the fundamental concepts of design thinking and user-centric design. We will explore various case studies.`,
        duration: Math.floor(Math.random() * 20) + 10,
        videoUrl: 'https://picsum.photos/1280/720', // Placeholder
        attachments: attachments,
    };
});


export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'UI/UX Design Masterclass',
    description: 'A comprehensive course covering the fundamentals of UI/UX design, from user research to high-fidelity prototyping.',
    lessons: uiUxLessons,
    learnerIds: ['user-2', 'user-3'],
  },
  {
    id: 'course-2',
    title: 'React for Beginners',
    description: 'Learn the basics of React and build your first web application.',
    lessons: [],
    learnerIds: ['user-2'],
  }
];

export const AUDIT_LOGS: AuditLogEntry[] = [
    { id: 'log-1', timestamp: new Date(), activity: ActivityType.USER_INVITED, details: 'Invited alice@learner.com to UI/UX Design Masterclass' },
    { id: 'log-2', timestamp: new Date(), activity: ActivityType.LESSON_UPDATED, details: 'Updated "Lesson 1" in UI/UX Design Masterclass' },
    { id: 'log-3', timestamp: new Date(), activity: ActivityType.COURSE_CREATED, details: 'Created course "React for Beginners"' },
];

export const BLOG_POSTS: Blog[] = [
    {
        id: 'blog-1',
        title: 'The Principles of Good UI Design',
        slug: 'principles-of-good-ui-design',
        authorId: 'user-5',
        authorName: 'Diana',
        coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        content: `
# The Principles of Good UI Design
Great UI design is not just about aesthetics; it's about creating an experience that is seamless, intuitive, and enjoyable for the user. Here are some core principles that guide effective UI design...

## 1. Clarity
Clarity is the most important principle. The user should be able to understand the interface and its purpose at a glance. Avoid ambiguity and make everything clear and concise.

## 2. Consistency
A consistent design allows users to develop usage patterns. Consistency in navigation, terminology, and layout helps users learn the interface faster and reduces confusion.

## 3. Feedback
The interface should provide feedback for every user action. This can be a visual cue, a sound, or a message that confirms the action was successful or indicates an error.
        `,
        excerpt: 'Great UI design is not just about aesthetics; it\'s about creating an experience that is seamless, intuitive, and enjoyable for the user. Here are some core principles...',
        tags: ['UI Design', 'Principles', 'User Experience'],
        status: BlogStatus.PUBLISHED,
        createdAt: new Date('2023-10-26T10:00:00Z'),
        publishedAt: new Date('2023-10-27T10:00:00Z'),
    },
    {
        id: 'blog-2',
        title: 'Mastering User Research for Better Products',
        slug: 'mastering-user-research',
        authorId: 'user-5',
        authorName: 'Diana',
        coverImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
        content: 'User research is the cornerstone of successful product design. This post dives deep into methods like user interviews, surveys, and usability testing...',
        excerpt: 'User research is the cornerstone of successful product design. This post dives deep into methods like user interviews, surveys, and usability testing...',
        tags: ['User Research', 'UX', 'Product Design'],
        status: BlogStatus.PUBLISHED,
        createdAt: new Date('2023-11-05T10:00:00Z'),
        publishedAt: new Date('2023-11-06T10:00:00Z'),
    },
    {
        id: 'blog-3',
        title: 'The Art of Prototyping',
        slug: 'the-art-of-prototyping',
        authorId: 'user-5',
        authorName: 'Diana',
        coverImageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop',
        content: 'From low-fidelity wireframes to high-fidelity interactive mockups, prototyping is a crucial step in the design process. Learn how to choose the right tools and techniques.',
        excerpt: 'From low-fidelity wireframes to high-fidelity interactive mockups, prototyping is a crucial step in the design process. Learn how to choose the right tools...',
        tags: ['Prototyping', 'Design Process', 'Tools'],
        status: BlogStatus.PENDING,
        createdAt: new Date('2023-11-10T10:00:00Z'),
    },
     {
        id: 'blog-4',
        title: 'My First Draft Post',
        slug: 'my-first-draft-post',
        authorId: 'user-5',
        authorName: 'Diana',
        coverImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
        content: 'This is a draft and should not be visible to the public yet.',
        excerpt: 'This is a draft and should not be visible to the public yet.',
        tags: ['Drafting'],
        status: BlogStatus.DRAFT,
        createdAt: new Date('2023-11-12T10:00:00Z'),
    },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 't-1', quote: 'This platform has been a game-changer for my design career. The courses are practical and the community is incredibly supportive.', authorName: 'Alice', authorRole: 'Learner' },
    { id: 't-2', quote: 'I love being able to share my knowledge with aspiring designers. The contribution process is straightforward and rewarding.', authorName: 'Diana', authorRole: 'Contributor' },
    { id: 't-3', quote: 'The best place to learn and grow as a designer. The content is top-notch and always up-to-date.', authorName: 'Charlie', authorRole: 'Learner' },
];
