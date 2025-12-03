'use client';

import Appbar from '@/components/Appbar';
import WorkerInsights from '@/components/WorkerInsights';

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      <Appbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <WorkerInsights />
      </div>
    </div>
  );
}
