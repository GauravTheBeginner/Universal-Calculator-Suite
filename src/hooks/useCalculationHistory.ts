import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Calculation, CalculationInput } from '../types/calculation';

const ITEMS_PER_PAGE = 10;

export function useCalculationHistory() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { user } = useAuth();

  const fetchCalculations = useCallback(async (isLoadMore = false) => {
    if (!user) return;

    try {
      setLoading(true);
      const from = isLoadMore ? page * ITEMS_PER_PAGE : 0;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from('calculations')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (data) {
        setCalculations(prev => isLoadMore ? [...prev, ...data] : data);
        setHasMore(data.length === ITEMS_PER_PAGE);
        if (isLoadMore) setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching calculations:', error);
    } finally {
      setLoading(false);
    }
  }, [user, page]);

  useEffect(() => {
    fetchCalculations();
  }, [user]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchCalculations(true);
    }
  };

  const saveCalculation = async (input: CalculationInput) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('calculations')
        .insert([{
          user_id: user.id,
          ...input
        }])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setCalculations(prev => [data, ...prev]);
      }
    } catch (error) {
      console.error('Error saving calculation:', error);
      throw error;
    }
  };

  return {
    calculations,
    loading,
    hasMore,
    loadMore,
    saveCalculation
  };
}