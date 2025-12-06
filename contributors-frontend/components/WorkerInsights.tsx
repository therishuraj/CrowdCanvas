'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BACKEND_URL = 'http://localhost:3001';

interface WorkerStats {
  totalTasks: number;
  totalEarnings: number;
  pendingAmount: number;
  winRate: number;
  earningsHistory: Array<{
    date: string;
    earnings: number;
  }>;
  taskBreakdown: Array<{
    status: string;
    count: number;
  }>;
  recentActivity: Array<{
    taskTitle: string;
    amount: number;
    date: string;
    won: boolean | null;
  }>;
}

export default function WorkerInsights() {
  const [stats, setStats] = useState<WorkerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('workerToken');
      const response = await axios.get(`${BACKEND_URL}/v1/worker/insights`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
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

  if (!stats) {
    return (
      <div className="text-center py-12 text-gray-400">
        No statistics available yet. Start completing tasks to see your insights!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
        <h2 className="text-2xl font-bold bg-solana-gradient bg-clip-text text-transparent mb-2">
          Your Performance Insights
        </h2>
        <p className="text-gray-400">Track your earnings and success rate</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <div className="text-sm text-gray-400 mb-1">Total Tasks</div>
          <div className="text-3xl font-bold text-solana-green">{stats.totalTasks}</div>
          <div className="text-xs text-gray-500 mt-1">completed</div>
        </div>
        
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <div className="text-sm text-gray-400 mb-1">Total Earnings</div>
          <div className="text-3xl font-bold text-solana-purple">
            {(stats.totalEarnings / 1000000000).toFixed(4)} SOL
          </div>
          <div className="text-xs text-gray-500 mt-1">all time</div>
        </div>
        
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <div className="text-sm text-gray-400 mb-1">Pending Balance</div>
          <div className="text-3xl font-bold text-solana-cyan">
            {(stats.pendingAmount / 1000000000).toFixed(4)} SOL
          </div>
          <div className="text-xs text-gray-500 mt-1">ready to withdraw</div>
        </div>
        
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <div className="text-sm text-gray-400 mb-1">Win Rate</div>
          <div className="text-3xl font-bold text-yellow-400">
            {stats.winRate}%
          </div>
          <div className="text-xs text-gray-500 mt-1">bonus wins</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings History */}
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <h3 className="text-xl font-semibold mb-4 text-solana-green">Earnings Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.earningsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
                formatter={(value: any) => `${(value / 1000000000).toFixed(6)} SOL`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#14F195" 
                strokeWidth={2}
                dot={{ fill: '#14F195', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Task Breakdown */}
        <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
          <h3 className="text-xl font-semibold mb-4 text-solana-purple">Task Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.taskBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="status" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#9945FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
        <h3 className="text-xl font-semibold mb-4 text-solana-cyan">Recent Activity</h3>
        <div className="space-y-3">
          {stats.recentActivity.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No recent activity</p>
          ) : (
            stats.recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.won === true ? 'bg-solana-green' : 
                    activity.won === false ? 'bg-red-500' : 
                    'bg-yellow-400'
                  }`} />
                  <div>
                    <div className="font-medium">{activity.taskTitle}</div>
                    <div className="text-sm text-gray-400">{activity.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-solana-green">
                    +{(activity.amount / 1000000000).toFixed(6)} SOL
                  </div>
                  <div className="text-xs">
                    {activity.won === true && <span className="text-solana-green">✓ Won Bonus</span>}
                    {activity.won === false && <span className="text-red-500">✗ Lost Bonus</span>}
                    {activity.won === null && <span className="text-yellow-400">⏳ Pending</span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
