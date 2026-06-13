import { useState, useCallback } from 'react';
import { useDemoEntries } from '../hooks/useDemoEntries';
import DiaryPage from './DiaryPage';
import type { User } from '@supabase/supabase-js';
import type { Lang } from '../types';

const FAKE_USER = { id: 'demo', email: 'demo@example.com' } as User;

export default function DemoPage() {
  const { entries, saving, updateField, toggleSkill, saveEntry, resetEntry, appointmentDate, setAppointment } = useDemoEntries();
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('skillcheck-lang') as Lang) || 'en'
  );

  const switchLang = useCallback(() => {
    const next: Lang = lang === 'en' ? 'es' : 'en';
    setLang(next);
    localStorage.setItem('skillcheck-lang', next);
  }, [lang]);

  return (
    <DiaryPage
      user={FAKE_USER}
      entries={entries}
      updateField={updateField}
      toggleSkill={toggleSkill}
      saveEntry={saveEntry}
      resetEntry={resetEntry}
      saving={saving}
      lang={lang}
      onSwitchLang={switchLang}
      appointmentDate={appointmentDate}
      setAppointment={setAppointment}
    />
  );
}
