'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Appbar from '@/components/Appbar';
import Hero from '@/components/Hero';
import CreateTask from '@/components/CreateTask';
import TaskList from '@/components/TaskList';

export default function HomePage() {
  const searchParams = useSearchParams();
  const [showMyTasks, setShowMyTasks] = useState(false);

  useEffect(() => {
    // Check if we should show tasks view from URL parameter
    if (searchParams.get('view') === 'tasks') {
      setShowMyTasks(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <Appbar />
      <Hero />
      
      {/* Toggle Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <button
          onClick={() => setShowMyTasks(!showMyTasks)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          {showMyTasks ? 'Create New Task' : 'My Tasks'}
        </button>
      </div>

      {/* Conditional Rendering */}
      {showMyTasks ? <TaskList /> : <CreateTask />}
    </div>
  );
}
