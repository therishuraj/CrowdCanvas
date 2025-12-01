'use client';

import { useRouter, usePathname } from 'next/navigation';
import Appbar from '@/components/Appbar';
import TaskHistory from '@/components/TaskHistory';

export default function HistoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const isExplorePage = pathname === '/' || pathname === '';

  return (
    <div className="min-h-screen bg-solana-dark">
      <Appbar />
      
      {/* Navigation Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-2 bg-solana-darker p-2 rounded-lg border border-solana-medium-blue">
          <button
            onClick={() => router.push('/')}
            className={`flex-1 px-6 py-3 rounded-lg transition-all font-bold ${
              isExplorePage
                ? 'bg-solana-gradient text-solana-dark shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Explore Tasks
          </button>
          <button
            onClick={() => router.push('/history')}
            className={`flex-1 px-6 py-3 rounded-lg transition-all font-bold ${
              !isExplorePage
                ? 'bg-solana-gradient text-solana-dark shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Work History
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TaskHistory />
      </div>
    </div>
  );
}
