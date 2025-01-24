import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
}

const IconButton: React.FC<IconButtonProps> = ({ to, icon: Icon, label, badge }) => (
  <Link
    to={to}
    className="relative p-2 text-gray-300 hover:text-emerald-400 rounded-full hover:bg-gray-800/50 transition-all duration-200 group"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
    {badge !== undefined && badge > 0 && (
      <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {badge > 99 ? '99+' : badge}
      </span>
    )}
  </Link>
);

export default IconButton;