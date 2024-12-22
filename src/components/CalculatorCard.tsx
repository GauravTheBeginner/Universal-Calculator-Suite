import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export function CalculatorCard({ title, description, icon: Icon, onClick }: CalculatorCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-7 h-7 text-blue-600 group-hover:text-indigo-600 transition-colors" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}