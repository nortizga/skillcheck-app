import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { defaultEntry } from '../lib/dates';
import type { DiaryEntry, EntriesMap, SupabaseEntryRow } from '../types';

interface SaveResult {
  error: string | null;
}

interface UseEntriesReturn {
  entries: EntriesMap;
  loading: boolean;
  saving: boolean;
  updateField: (date: string, field: string, value: unknown) => void;
  toggleSkill: (date: string, skillId: string) => void;
  saveEntry: (date: string) => Promise<SaveResult>;
  getEntriesInRange: (from: string, to: string) => EntriesMap;
}

export function useEntries(userId: string | undefined): UseEntriesReturn {
  const [entries, setEntries] = useState<EntriesMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) {
      setEntries({});
      setLoading(false);
      return;
    }

    const fetchEntries = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching entries:', error);
        setLoading(false);
        return;
      }

      const map: EntriesMap = {};
      (data as SupabaseEntryRow[]).forEach((row) => {
        map[row.entry_date] = {
          id: row.id,
          suicidal_behavior: row.suicidal_behavior,
          self_harm_behavior: row.self_harm_behavior,
          suicidal_thoughts: row.suicidal_thoughts,
          self_harm_thoughts: row.self_harm_thoughts,
          substances: row.substances,
          guilt: row.guilt,
          shame: row.shame,
          fear: row.fear,
          joy: row.joy,
          sadness: row.sadness,
          anger: row.anger,
          skills: row.skills || [],
          notes: row.notes || '',
        };
      });
      setEntries(map);
      setLoading(false);
    };

    fetchEntries();
  }, [userId]);

  const updateField = useCallback((date: string, field: string, value: unknown) => {
    setEntries((prev) => {
      const current = prev[date] || defaultEntry();
      return { ...prev, [date]: { ...current, [field]: value } };
    });
  }, []);

  const toggleSkill = useCallback((date: string, skillId: string) => {
    setEntries((prev) => {
      const current = prev[date] || defaultEntry();
      const skills = current.skills.includes(skillId)
        ? current.skills.filter((s) => s !== skillId)
        : [...current.skills, skillId];
      return { ...prev, [date]: { ...current, skills } };
    });
  }, []);

  const saveEntry = useCallback(
    async (date: string): Promise<SaveResult> => {
      if (!userId) return { error: 'Not authenticated' };

      setSaving(true);
      const entry: DiaryEntry = entries[date] || defaultEntry();

      const row = {
        user_id: userId,
        entry_date: date,
        suicidal_behavior: entry.suicidal_behavior,
        self_harm_behavior: entry.self_harm_behavior,
        suicidal_thoughts: entry.suicidal_thoughts,
        self_harm_thoughts: entry.self_harm_thoughts,
        substances: entry.substances,
        guilt: entry.guilt,
        shame: entry.shame,
        fear: entry.fear,
        joy: entry.joy,
        sadness: entry.sadness,
        anger: entry.anger,
        skills: entry.skills,
        notes: entry.notes,
      };

      const { data, error } = await supabase
        .from('entries')
        .upsert(row, { onConflict: 'user_id,entry_date' })
        .select()
        .single();

      setSaving(false);

      if (error) {
        console.error('Error saving entry:', error);
        return { error: error.message };
      }

      setEntries((prev) => ({
        ...prev,
        [date]: { ...prev[date], id: (data as SupabaseEntryRow).id },
      }));

      return { error: null };
    },
    [userId, entries]
  );

  const getEntriesInRange = useCallback(
    (from: string, to: string): EntriesMap => {
      const result: EntriesMap = {};
      const start = new Date(from);
      const end = new Date(to);
      for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split('T')[0];
        if (entries[key]) result[key] = entries[key];
      }
      return result;
    },
    [entries]
  );

  return { entries, loading, saving, updateField, toggleSkill, saveEntry, getEntriesInRange };
}
