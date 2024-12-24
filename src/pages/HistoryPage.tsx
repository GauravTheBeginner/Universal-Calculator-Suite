import React from 'react';
import { useCalculationHistory } from '../hooks/useCalculationHistory';
import { HistoryList } from '../components/history/HistoryList';
import { Loader2 } from 'lucide-react';

export function HistoryPage() {
  const { calculations, loading, hasMore, loadMore } = useCalculationHistory();

  if (loading && calculations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Calculation History</h1>
      <HistoryList 
        calculations={calculations}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
}