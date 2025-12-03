'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Appbar from '@/components/Appbar';
import { BACKEND_URL } from '@/lib/config';

interface OptionResult {
  count: number;
  option: {
    imageUrl: string;
  };
}

interface TaskDetails {
  id: string;
  title: string;
  options: any[];
}

export default function TaskResultPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  const [result, setResult] = useState<Record<string, OptionResult>>({});
  const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchTaskResults();
  }, [taskId]);

  const fetchTaskResults = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/v1/user/task?taskId=${taskId}`, {
        headers: { Authorization: token || '' }
      });
      setResult(response.data.result);
      setTaskDetails(response.data.taskDetails);
    } catch (error) {
      console.error('Failed to fetch task results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Appbar />
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-600">Loading task results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Appbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{taskDetails?.title}</h1>
            <p className="text-gray-600">Task ID: {taskId}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/?view=tasks')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to My Tasks
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Create New Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(result).map(([optionId, data]) => (
            <div key={optionId} className="bg-white rounded-lg shadow-md overflow-hidden relative group">
              <div className="relative">
                <img 
                  src={data.option.imageUrl} 
                  alt="Option" 
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => setSelectedImage(data.option.imageUrl)}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  title="View full image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {data.count} votes
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Popup Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl max-h-[90vh] w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedImage}
                alt="Full size preview"
                className="w-full h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
