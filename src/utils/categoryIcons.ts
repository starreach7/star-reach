import { Clapperboard, Music, Trophy, TrendingUp, Laugh, Tv, Gamepad2, Camera, Palette, Heart, Radio, Users, BookOpen, Shirt, Utensils, Dumbbell, Sparkles, Globe, DivideIcon as LucideIcon } from 'lucide-react';

interface CategoryIconMap {
  [key: string]: LucideIcon;
}

export const categoryIconMap: CategoryIconMap = {
  // Entertainment
  'Actors': Clapperboard,
  'Musicians': Music,
  'Comedians': Laugh,
  'TV Stars': Tv,
  'Reality TV': Tv,
  'Gamers': Gamepad2,
  'Radio Hosts': Radio,
  
  // Sports
  'Athletes': Trophy,
  'Sports Stars': Trophy,
  
  // Digital & Social
  'Influencers': TrendingUp,
  'YouTubers': Camera,
  'TikTokers': TrendingUp,
  'Social Media Stars': Users,
  
  // Arts & Culture
  'Artists': Palette,
  'Authors': BookOpen,
  'Fashion': Shirt,
  'Chefs': Utensils,
  
  // Other Categories
  'Fitness': Dumbbell,
  'Motivational Speakers': Sparkles,
  'International': Globe,
  'Lifestyle': Heart,
  
  // Default icon for unknown categories
  'default': Sparkles
};

export const getCategoryIcon = (categoryName: string): LucideIcon => {
  // Convert category name to title case and remove spaces
  const normalizedName = categoryName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return categoryIconMap[normalizedName] || categoryIconMap['default'];
};