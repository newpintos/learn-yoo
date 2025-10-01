import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../hooks/useAuth';
import { Course } from '../../types';
import { Link } from 'react-router-dom';

const LearnerCourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="p-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{course.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">{course.description}</p>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 mb-2">
                <div className="bg-green-500 h-2.5 rounded-full" style={{width: '45%'}}></div>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">45% Complete</p>
        </div>
        <div className="bg-neutral-50 dark:bg-neutral-700 px-6 py-3">
            <Link to={`/learner/course/${course.id}`} className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 font-semibold">
                View Course &rarr;
            </Link>
        </div>
    </div>
);

const LearnerDashboard: React.FC = () => {
  const { getLearnerCourses } = useData();
  const { user } = useAuth();
  
  const courses = user ? getLearnerCourses(user.id) : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">My Courses</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <LearnerCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-600 dark:text-neutral-400">You are not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default LearnerDashboard;