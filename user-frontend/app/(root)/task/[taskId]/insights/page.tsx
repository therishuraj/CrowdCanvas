'use client';

import { useParams } from 'next/navigation';
import Appbar from '@/components/Appbar';
import TaskInsights from '@/components/TaskInsights';

export default function TaskInsightsPage() {
  const params = useParams();
  const taskId = params.taskId as string;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      <Appbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <TaskInsights taskId={taskId} />
      </div>
    </div>
  );
}
