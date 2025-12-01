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
      
      {/* Navigation Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-2 bg-solana-darker p-2 rounded-lg border border-solana-medium-blue">
          <button
            onClick={() => setShowMyTasks(false)}
            className={`flex-1 px-6 py-3 rounded-lg transition-all font-bold ${
              !showMyTasks 
                ? 'bg-solana-gradient text-solana-dark shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Create Task
          </button>
          <button
            onClick={() => setShowMyTasks(true)}
            className={`flex-1 px-6 py-3 rounded-lg transition-all font-bold ${
              showMyTasks 
                ? 'bg-solana-gradient text-solana-dark shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Tasks
          </button>
        </div>
      </div>

      {/* Conditional Rendering */}
      {showMyTasks ? <TaskList /> : <CreateTask />}
    </div>
  );
}
