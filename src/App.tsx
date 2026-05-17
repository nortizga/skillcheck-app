import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './hooks/useAuth';
import type { AuthResult } from './hooks/useAuth';
import { useEntries } from './hooks/useEntries';
import LoginPage from './pages/LoginPage';
import DiaryPage from './pages/DiaryPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SkillsPage from './pages/SkillsPage';
import type { Lang } from './types';

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return { hash, navigate };
}

export default function App() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { entries, saving, updateField, toggleSkill, saveEntry, resetEntry } = useEntries(user?.id);
  const { hash, navigate } = useHashRoute();
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('skillcheck-lang') as Lang) || 'en'
  );

  const switchLang = useCallback(() => {
    const next: Lang = lang === 'en' ? 'es' : 'en';
    setLang(next);
    localStorage.setItem('skillcheck-lang', next);
  }, [lang]);

  const handleAuth = async (email: string, password: string): Promise<AuthResult> => {
    return signIn(email, password);
  };

  const goBack = () => navigate('');

  if (hash === '#/terms') return <TermsPage onBack={goBack} />;
  if (hash === '#/privacy') return <PrivacyPage onBack={goBack} />;
  if (hash === '#/skills') return <SkillsPage onBack={goBack} lang={lang} onSwitchLang={switchLang} />;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-display">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-navy tracking-tight">SkillCheck</h1>
          <p className="text-muted-foreground text-sm mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onAuth={handleAuth} />;
  }

  return (
    <DiaryPage
      user={user}
      signOut={signOut}
      entries={entries}
      updateField={updateField}
      toggleSkill={toggleSkill}
      saveEntry={saveEntry}
      resetEntry={resetEntry}
      saving={saving}
      lang={lang}
      onSwitchLang={switchLang}
    />
  );
}
