import { useAuth } from './hooks/useAuth';
import type { AuthResult } from './hooks/useAuth';
import { useEntries } from './hooks/useEntries';
import LoginPage from './pages/LoginPage';
import DiaryPage from './pages/DiaryPage';

export default function App() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { entries, saving, updateField, toggleSkill, saveEntry } = useEntries(user?.id);

  const handleAuth = async (email: string, password: string): Promise<AuthResult> => {
    return signIn(email, password);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-cream-light flex items-center justify-center font-display">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-black tracking-tight">SkillCheck</h1>
          <p className="text-brand-taupe text-sm mt-2">Loading...</p>
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
      saving={saving}
    />
  );
}
