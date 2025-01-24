import React from 'react';
import { Link } from 'react-router-dom';

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 transition-all duration-200"
  >
    {children}
  </Link>
);

export default MobileNavLink;