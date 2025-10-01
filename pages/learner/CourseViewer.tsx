import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Lesson, Attachment } from '../../types';

const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;

const CourseViewer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById } = useData();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const course = courseId ? getCourseById(courseId) : undefined;
  
  React.useEffect(() => {
    if (course && course.lessons.length > 0) {
      setSelectedLesson(course.lessons[0]);
    }
  }, [course]);
  
  if (!course) {
    return <div>Course not found.</div>;
  }

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };
  
  const handleMarkComplete = () => {
      if (selectedLesson) {
          setCompletedLessons(prev => new Set(prev).add(selectedLesson.id));
      }
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-grow lg:w-3/4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
          {selectedLesson ? (
            <>
              <div className="aspect-video bg-black flex items-center justify-center">
                 <img src={selectedLesson.videoUrl} alt="Video placeholder" className="max-h-full max-w-full" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedLesson.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">{selectedLesson.description}</p>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Attachments</h3>
                    <ul className="space-y-2">
                        {selectedLesson.attachments.map(att => (
                            <li key={att.id}>
                                <a href={att.url} download className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline">
                                    <DownloadIcon /> {att.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleMarkComplete} disabled={completedLessons.has(selectedLesson.id)} className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed">
                  {completedLessons.has(selectedLesson.id) ? 'Completed' : 'Mark as Complete'}
                </button>
              </div>
            </>
          ) : (
            <div className="p-6">Select a lesson to begin.</div>
          )}
        </div>
      </div>

      {/* Sidebar - Lesson List */}
      <div className="lg:w-1/4">
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{course.title}</h2>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 mb-4">
                <div className="bg-green-500 h-2.5 rounded-full" style={{width: `${(completedLessons.size / course.lessons.length) * 100}%`}}></div>
            </div>
            <p className="text-sm text-center text-neutral-500 dark:text-neutral-400 mb-4">{completedLessons.size} of {course.lessons.length} lessons completed</p>
            <ul className="space-y-2">
            {course.lessons.map((lesson, index) => (
              <li key={lesson.id}>
                <button onClick={() => handleSelectLesson(lesson)} className={`w-full text-left p-3 rounded-md flex items-center gap-3 transition-colors ${selectedLesson?.id === lesson.id ? 'bg-orange-100 dark:bg-orange-900/50' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}>
                  {completedLessons.has(lesson.id) ? <CheckCircleIcon /> : <PlayIcon />}
                  <span className="flex-grow">{index + 1}. {lesson.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;