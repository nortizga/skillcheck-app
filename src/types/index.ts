export interface DiaryEntry {
  id?: string;
  suicidal_behavior: boolean | null;
  self_harm_behavior: boolean | null;
  suicidal_thoughts: boolean | null;
  self_harm_thoughts: boolean | null;
  substances: boolean | null;
  guilt: number | null;
  shame: number | null;
  fear: number | null;
  joy: number | null;
  sadness: number | null;
  anger: number | null;
  skills: string[];
  notes: string;
}

export type BehaviorField = 'suicidal_behavior' | 'self_harm_behavior' | 'substances';
export type ThoughtField = 'suicidal_thoughts' | 'self_harm_thoughts';
export type EmotionField = 'guilt' | 'shame' | 'fear' | 'joy' | 'sadness' | 'anger';
export type EntryField = keyof DiaryEntry;

export interface EntriesMap {
  [date: string]: DiaryEntry;
}

export interface Skill {
  id: string;
  en: string;
  es: string;
}

export type Lang = 'en' | 'es';

export interface Translations {
  appName: string;
  tagline: string;
  today: string;
  noFuture: string;
  behaviors: string;
  behaviorSub: string;
  thoughts: string;
  thoughtSub: string;
  emotions: string;
  emotionSub: string;
  suicidalBehavior: string;
  selfHarmBehavior: string;
  suicidalThoughts: string;
  selfHarmThoughts: string;
  substances: string;
  guilt: string;
  shame: string;
  fear: string;
  joy: string;
  sadness: string;
  anger: string;
  yes: string;
  no: string;
  save: string;
  saved: string;
  export: string;
  exportRange: string;
  from: string;
  to: string;
  download: string;
  cancel: string;
  entryFor: string;
  noData: string;
  langSwitch: string;
  previousDay: string;
  nextDay: string;
  skillsUsed: string;
  skillsSub: string;
  notes: string;
  notesSub: string;
  notesPlaceholder: string;
  dayLabels: string[];
  monthNames: string[];
  toolNote: string;
  login: string;
  signUp: string;
  signUpTagline: string;
  email: string;
  password: string;
  noAccount: string;
  hasAccount: string;
  logout: string;
  authError: string;
  authRateLimit: string;
  authInvalid: string;
  authConfirmTitle: string;
  authConfirmBody: string;
  crisisText: string;
  crisisLine: string;
  crisisCall: string;
  crisisUrl: string;
  crisisUrlLabel: string;
  clearEntry: string;
  confirmClear: string;
  skillsRef: string;
  terms: string;
  privacy: string;
  [key: string]: string | string[];
}

export interface EmotionStyleEntry {
  accent: string;
}

export interface SupabaseEntryRow {
  id: string;
  user_id: string;
  entry_date: string;
  is_appointment: boolean | null;
  suicidal_behavior: boolean | null;
  self_harm_behavior: boolean | null;
  suicidal_thoughts: boolean | null;
  self_harm_thoughts: boolean | null;
  substances: boolean | null;
  guilt: number | null;
  shame: number | null;
  fear: number | null;
  joy: number | null;
  sadness: number | null;
  anger: number | null;
  skills: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
