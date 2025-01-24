import React from 'react';
import { 
  Settings, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  Heart, 
  Wallet, 
  Share2, 
  RotateCcw, 
  LayoutDashboard 
} from 'lucide-react';

export type MenuItem = {
  label: string;
  icon: React.ElementType;
  to: string;
  info?: string;
};

export const getMenuItems = (userRole: string): MenuItem[] => {
  const commonItems = [
    { label: 'Account Settings', icon: Settings, to: '/settings' },
    { label: 'Orders', icon: ShoppingBag, to: '/orders' },
    { label: 'Favorites', icon: Heart, to: '/favorites' },
  ];

  const creatorItems = [
    { label: 'Creator Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Wallet', icon: Wallet, to: '/wallet', info: '$0.00' },
    { label: 'Referrals', icon: Share2, to: '/referrals' },
    { label: 'Refunds', icon: RotateCcw, to: '/refunds' },
  ];

  const adminItems = [
    { label: 'Admin Panel', icon: LayoutDashboard, to: '/admin' },
    { label: 'User Management', icon: Users, to: '/admin/users' },
    { label: 'Payments', icon: CreditCard, to: '/admin/payments' },
  ];

  switch (userRole) {
    case 'creator':
      return [...creatorItems, ...commonItems];
    case 'admin':
      return [...adminItems, ...commonItems];
    default:
      return commonItems;
  }
};