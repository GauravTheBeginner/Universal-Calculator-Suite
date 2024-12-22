import React from 'react';
import { Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="flex items-center group">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mr-3 group-hover:scale-110 transition-transform">
            <Calculator className="w-6 h-6 text-blue-600 group-hover:text-indigo-600 transition-colors" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Universal Calculator
          </h1>
        </Link>
      </div>
    </header>
  );
}