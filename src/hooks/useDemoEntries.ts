import { useState, useCallback, useEffect } from 'react';
import { defaultEntry } from '../lib/dates';
import { DEMO_SEED } from '../lib/demoData';
import type { EntriesMap } from '../types';

const STORAGE_KEY = 'skillcheck-demo-entries';

function loadFromStorage(): EntriesMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { ...DEMO_SEED };
}

function persistToStorage(entries: EntriesMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {}
}

export function useDemoEntries() {
  const [entries, setEntries] = useState<EntriesMap>(() => loadFromStorage());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    persistToStorage(entries);
  }, [entries]);

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

  const saveEntry = useCallback(async (_date: string) => {
    setSaving(true);
    await new Promise<void>((r) => setTimeout(r, 300));
    setSaving(false);
    return { error: null };
  }, []);

  const resetEntry = useCallback(async (date: string) => {
    setEntries((prev) => {
      const next = { ...prev };
      if (DEMO_SEED[date]) {
        next[date] = { ...DEMO_SEED[date] };
      } else {
        delete next[date];
      }
      return next;
    });
    return { error: null };
  }, []);

  return { entries, saving, updateField, toggleSkill, saveEntry, resetEntry };
}
