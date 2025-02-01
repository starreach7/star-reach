// StatsCard.tsx
import React from 'react';
import { Activity, CheckCircle, Clock, Calendar } from 'lucide-react';

interface StatsCardProps {
  stats?: {
    completed?: string;
    avgResponse?: string;
    joinedDate?: string;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ stats = {} }) => {
  const hasStats = stats.completed || stats.avgResponse || stats.joinedDate;

  if (!hasStats) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-dashed border-gray-600">
        <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-300 mb-2">No Activity Yet</h3>
        <p className="text-gray-400">This celebrity doesn't have any recent activity to show</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-6">Statistics</h2>
      <div className="space-y-4">
        {stats.completed && (
          <div className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-lg">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm text-gray-300">Completed</div>
              <div className="text-lg font-semibold text-white">{stats.completed}</div>
            </div>
          </div>
        )}

        {stats.avgResponse && (
          <div className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-lg">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Clock className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm text-gray-300">Avg. Response</div>
              <div className="text-lg font-semibold text-white">{stats.avgResponse}</div>
            </div>
          </div>
        )}

        {stats.joinedDate && (
          <div className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-lg">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Calendar className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm text-gray-300">Joined</div>
              <div className="text-lg font-semibold text-white">{stats.joinedDate}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;