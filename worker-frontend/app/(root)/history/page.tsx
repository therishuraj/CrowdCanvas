'use client';

import { useRouter } from 'next/navigation';
import Appbar from '@/components/Appbar';
import TaskHistory from '@/components/TaskHistory';

export default function HistoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      
      {/* Explore Tasks Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Explore Tasks
        </button>
      </div>

      <TaskHistory />
    </div>
  );
}
