import { useState, useCallback } from 'react';
import { useDemoEntries } from '../hooks/useDemoEntries';
import DiaryPage from './DiaryPage';
import type { User } from '@supabase/supabase-js';
import type { Lang } from '../types';

const FAKE_USER = { id: 'demo', email: 'demo@example.com' } as User;
const GITHUB_URL = 'https://github.com/nortizga/skillcheck-app';

export default function DemoPage() {
  const { entries, saving, updateField, toggleSkill, saveEntry, resetEntry } = useDemoEntries();
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('skillcheck-lang') as Lang) || 'en'
  );

  const switchLang = useCallback(() => {
    const next: Lang = lang === 'en' ? 'es' : 'en';
    setLang(next);
    localStorage.setItem('skillcheck-lang', next);
  }, [lang]);

  return (
    <>
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
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-navy text-white text-xs text-center py-2.5 px-4 font-body">
        Demo mode — changes are local only and reset on page refresh.{' '}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold"
        >
          Self-host your own →
        </a>
      </div>
    </>
  );
}
