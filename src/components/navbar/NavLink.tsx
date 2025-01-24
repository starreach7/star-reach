import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="px-4 py-2 text-base font-medium text-gray-300 hover:text-emerald-400 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
  >
    {children}
  </Link>
);

export default NavLink;