import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Lesson, User, AuditLogEntry, ActivityType } from '../../types';
import { generateLessonDescription } from '../../services/geminiService';

// Reusable Icon components
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>;
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>;

const LessonEditorModal: React.FC<{
  lesson: Lesson | null;
  courseId: string;
  onClose: () => void;
}> = ({ lesson, courseId, onClose }) => {
    const { addLesson, updateLesson } = useData();
    const [title, setTitle] = useState(lesson?.title || '');
    const [description, setDescription] = useState(lesson?.description || '');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateDesc = async () => {
        if (!title) return;
        setIsGenerating(true);
        const generatedDesc = await generateLessonDescription(title);
        setDescription(generatedDesc);
        setIsGenerating(false);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const lessonData = { title, description, duration: lesson?.duration || 10, videoUrl: lesson?.videoUrl || '', attachments: lesson?.attachments || [] };
        if (lesson) {
            updateLesson(courseId, { ...lesson, ...lessonData });
        } else {
            addLesson(courseId, lessonData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">{lesson ? 'Edit' : 'Add'} Lesson</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label>
                         <div className="flex items-center space-x-2">
                           <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                           <button type="button" onClick={handleGenerateDesc} disabled={isGenerating || !title} className="p-2 bg-orange-100 dark:bg-orange-900 rounded-md disabled:opacity-50">
                             <svg className={`h-5 w-5 text-orange-600 dark:text-orange-400 ${isGenerating ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                           </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Video (MP4)</label>
                        <input type="file" accept=".mp4" className="text-sm" />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Attachments (PDF/Images)</label>
                        <input type="file" multiple className="text-sm" />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-neutral-200 dark:bg-neutral-600 rounded-md">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CourseEditor: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById, users, grantAccess, revokeAccess, auditLog, deleteLesson } = useData();
  const [activeTab, setActiveTab] = useState('lessons');
  const [inviteEmail, setInviteEmail] = useState('');
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const course = courseId ? getCourseById(courseId) : undefined;
  
  if (!course) {
    return <div>Course not found.</div>;
  }
  
  const learners = users.filter(u => course.learnerIds.includes(u.id));

  const handleInvite = () => {
    if (inviteEmail) {
      grantAccess(course.id, inviteEmail);
      setInviteEmail('');
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsModalOpen(true);
  };
  
  const handleAddLesson = () => {
    setEditingLesson(null);
    setIsModalOpen(true);
  }

  const handleDeleteLesson = (lessonId: string) => {
    if(window.confirm("Are you sure you want to delete this lesson?")) {
        deleteLesson(course.id, lessonId);
    }
  };

  return (
    <div>
       <div className="mb-6">
        <Link to="/admin" className="text-orange-600 dark:text-orange-400 hover:underline">&larr; Back to Dashboard</Link>
        <h1 className="text-3xl font-bold mt-2">{course.title}</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">{course.description}</p>
      </div>

      <div className="border-b border-neutral-200 dark:border-neutral-700 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['lessons', 'access', 'logs'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize ${activeTab === tab ? 'border-orange-500 text-orange-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}>
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {isModalOpen && <LessonEditorModal lesson={editingLesson} courseId={course.id} onClose={() => setIsModalOpen(false)} />}

      <div>
        {activeTab === 'lessons' && (
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Lessons</h2>
                <button onClick={handleAddLesson} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                    <AddIcon /> Add Lesson
                </button>
            </div>
            <ul className="space-y-3">
              {course.lessons.map((lesson, index) => (
                <li key={lesson.id} className="p-4 border dark:border-neutral-700 rounded-md flex justify-between items-center">
                  <div>
                    <span className="font-bold">{index + 1}. {lesson.title}</span>
                    <span className="text-sm text-neutral-500 ml-2">({lesson.duration} mins)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleEditLesson(lesson)} className="text-neutral-500 hover:text-orange-600"><EditIcon/></button>
                    <button onClick={() => handleDeleteLesson(lesson.id)} className="text-neutral-500 hover:text-red-600"><DeleteIcon /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'access' && (
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Access Control</h2>
            <div className="flex gap-2 mb-6">
              <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="learner@example.com" className="flex-grow px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm" />
              <button onClick={handleInvite} className="px-4 py-2 bg-orange-600 text-white rounded-md">Invite</button>
              <input type="file" id="csv-upload" className="hidden" />
              <label htmlFor="csv-upload" className="cursor-pointer px-4 py-2 bg-neutral-200 dark:bg-neutral-600 rounded-md">Bulk Add (CSV)</label>
            </div>
            <h3 className="text-lg font-medium mb-2">Active Learners</h3>
            <ul className="space-y-2">
              {learners.map(learner => (
                <li key={learner.id} className="flex justify-between items-center p-3 border dark:border-neutral-700 rounded-md">
                  <span>{learner.name} ({learner.email})</span>
                  <button onClick={() => revokeAccess(course.id, learner.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Revoke Access</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'logs' && (
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Audit Log (Last 20 Activities)</h2>
            <ul className="space-y-2 text-sm">
                {auditLog.map(log => (
                    <li key={log.id} className="p-3 border dark:border-neutral-700 rounded-md">
                        <span className="font-mono text-neutral-500 mr-4">{log.timestamp.toLocaleString()}</span>
                        <span className="font-semibold text-orange-600 dark:text-orange-400 mr-2">{log.activity}:</span>
                        <span>{log.details}</span>
                    </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseEditor;