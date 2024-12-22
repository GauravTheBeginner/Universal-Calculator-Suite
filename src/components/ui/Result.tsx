import React from 'react';

interface ResultProps {
  value: string | number;
  label?: string;
}

export function Result({ value, label }: ResultProps) {
  return (
    <div className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      {label && (
        <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      )}
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}