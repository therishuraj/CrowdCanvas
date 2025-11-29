'use client';

import { useRouter } from 'next/navigation';
import Appbar from '@/components/Appbar';
import TaskWorker from '@/components/TaskWorker';

export default function WorkerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      
      {/* My Work History Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <button
          onClick={() => router.push('/history')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          My Work History
        </button>
      </div>

      <TaskWorker />
    </div>
  );
}

