import React from 'react';
import { Video, Clock, Calendar } from 'lucide-react';
interface StatsCardProps {
  stats: {
    completed: string;
    avgResponse: string;
    joinedDate: string;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  if (!stats) {
    return (
      <div className="text-gray-400">
        Stats are not available at the moment.
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-4">Stats</h2>
      <div className="grid gap-4">
        <div className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/40 transition-colors">
          <Video className="h-5 w-5 text-emerald-400 mb-2" />
          <div className="text-2xl font-bold text-white">{stats.completed}</div>
          <div className="text-gray-400 text-sm">Videos Completed</div>
        </div>
        <div className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/40 transition-colors">
          <Clock className="h-5 w-5 text-emerald-400 mb-2" />
          <div className="text-2xl font-bold text-white">{stats.avgResponse}</div>
          <div className="text-gray-400 text-sm">Average Response</div>
        </div>
        <div className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/40 transition-colors">
          <Calendar className="h-5 w-5 text-emerald-400 mb-2" />
          <div className="text-2xl font-bold text-white">{stats.joinedDate}</div>
          <div className="text-gray-400 text-sm">Member Since</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;