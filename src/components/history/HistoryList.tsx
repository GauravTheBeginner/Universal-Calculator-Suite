
import type { Calculation } from '../../types/calculation';
import { HistoryItem } from './HistoryItem';
import { Loader2 } from 'lucide-react';

interface HistoryListProps {
  calculations: Calculation[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function HistoryList({ calculations, loading, hasMore, onLoadMore }: HistoryListProps) {
  if (!loading && calculations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No calculations yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {calculations.map((calculation) => (
        <HistoryItem key={calculation.id} calculation={calculation} />
      ))}
      
      {hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  );
}