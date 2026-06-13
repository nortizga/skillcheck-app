import type { DiaryEntry } from '../types';

export const dateKey = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const todayKey = (): string => dateKey(new Date());

export const parseDate = (s: string): Date => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const isFuture = (d: Date): boolean => dateKey(d) > todayKey();

export const defaultEntry = (): DiaryEntry => ({
  suicidal_behavior: null,
  self_harm_behavior: null,
  suicidal_thoughts: null,
  self_harm_thoughts: null,
  substances: null,
  guilt: null,
  shame: null,
  fear: null,
  joy: null,
  sadness: null,
  anger: null,
  skills: [],
  notes: '',
});
