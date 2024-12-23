import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  url?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ url, size = 'md', className = '' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-32 h-32'
  };

  if (!url) {
    return (
      <div className={`
        ${sizeClasses[size]}
        ${className}
        flex items-center justify-center
        bg-gray-100 rounded-full text-gray-600
      `}>
        <User className={size === 'xl' ? 'w-16 h-16' : 'w-5 h-5'} />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt="Avatar"
      className={`
        ${sizeClasses[size]}
        ${className}
        rounded-full object-cover
      `}
    />
  );
}