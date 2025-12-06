'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Award } from 'lucide-react';

const BACKEND_URL = 'http://localhost:3001';
const COLORS = ['#14F195', '#9945FF', '#19D1D9', '#F1C40F', '#E74C3C', '#9B59B6'];

interface TaskInsights {
  taskId: string;
  title: string;
  votingData: Array<{
    option: string;
    votes: number;
    percentage: number;
  }>;
  status: {
    completed: boolean;
    progress: number;
    votesReceived: number;
    votesRequired: number;
  };
  winner?: string;
}

export default function TaskInsights({ taskId }: { taskId: string }) {
  const [insights, setInsights] = useState<TaskInsights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/v1/user/task/insights/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInsights(response.data);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-solana-green"></div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="text-center py-12 text-gray-400">
        No insights available yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
        <h2 className="text-2xl font-bold bg-solana-gradient bg-clip-text text-transparent mb-2">
          Task Insights
        </h2>
        <p className="text-gray-400">{insights.title}</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <div className="text-sm text-gray-400 mb-1">Status</div>
          <div className="text-2xl font-bold">
            {insights.status.completed ? (
              <span className="text-solana-green">✓ Completed</span>
            ) : (
              <span className="text-yellow-400">⏳ In Progress</span>
            )}
          </div>
        </div>
        
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <div className="text-sm text-gray-400 mb-1">Progress</div>
          <div className="text-2xl font-bold text-solana-purple">
            {insights.status.votesReceived} / {insights.status.votesRequired}
          </div>
          <div className="text-sm text-gray-500">votes received</div>
        </div>
        
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <div className="text-sm text-gray-400 mb-1">Completion</div>
          <div className="text-2xl font-bold text-solana-cyan">
            {insights.status.progress}%
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-solana-green to-solana-purple h-2 rounded-full transition-all"
              style={{ width: `${insights.status.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Voting Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <h3 className="text-xl font-semibold mb-4 text-solana-green">Vote Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={insights.votingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="option" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="votes" fill="#14F195" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <h3 className="text-xl font-semibold mb-4 text-solana-purple">Vote Percentage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={insights.votingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.percentage.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="votes"
              >
                {insights.votingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Winner Announcement */}
      {insights.status.completed && insights.winner && (
        <div className="bg-gradient-to-r from-solana-green/20 to-solana-purple/20 rounded-xl p-6 border border-solana-green">
          <div className="flex items-center gap-3">
            <Award className="w-12 h-12 text-yellow-400" />
            <div>
              <h3 className="text-xl font-bold text-solana-green">Winner Announced!</h3>
              <p className="text-gray-300 mt-1">
                <span className="font-semibold">{insights.winner}</span> received the most votes
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Breakdown */}
      <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
        <h3 className="text-xl font-semibold mb-4 text-solana-cyan">Detailed Breakdown</h3>
        <div className="space-y-3">
          {insights.votingData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="font-medium">{item.option}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400">{item.votes} votes</span>
                <span className="font-semibold text-solana-green">{item.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
