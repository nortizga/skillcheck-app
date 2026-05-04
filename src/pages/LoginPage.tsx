import { useState, type FormEvent } from 'react';
import { i18n } from '../lib/i18n';
import type { Lang } from '../types';
import type { AuthResult } from '../hooks/useAuth';

interface Props {
  onAuth: (email: string, password: string) => Promise<AuthResult>;
}

export default function LoginPage({ onAuth }: Props) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('skillcheck-lang') as Lang) || 'en'
  );
  const t = i18n[lang];

  const switchLang = () => {
    const next: Lang = lang === 'en' ? 'es' : 'en';
    localStorage.setItem('skillcheck-lang', next);
    setLang(next);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await onAuth(email, password);

    if (authError) {
      const msg = authError.message || '';
      if (msg.toLowerCase().includes('after')) {
        setError(t.authRateLimit as string);
      } else if (msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('credentials')) {
        setError(t.authInvalid as string);
      } else {
        setError(t.authError as string);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-cream-light flex items-center justify-center p-5 font-body">
      <button
        onClick={switchLang}
        className="fixed top-4 right-4 z-50 bg-brand-black/[0.06] border border-brand-cream-dark text-brand-taupe rounded-full px-3.5 py-1.5 cursor-pointer font-bold text-[13px] font-body"
      >
        {t.langSwitch}
      </button>
      <div className="w-full max-w-[380px]">
        <div className="mb-10">
          <h1 className="text-[40px] font-display font-bold text-brand-black tracking-tight m-0 text-center">
            SkillCheck
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-7 border border-brand-cream-dark shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-xs font-bold text-brand-taupe block mb-1.5 uppercase tracking-wider">
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-[10px] border border-brand-cream-dark text-[15px] font-body bg-brand-cream-light box-border outline-none focus:border-brand-sage transition-colors"
                placeholder="you@email.com"
              />
            </div>

            <div className="mb-6">
              <label className="text-xs font-bold text-brand-taupe block mb-1.5 uppercase tracking-wider">
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full p-3 rounded-[10px] border border-brand-cream-dark text-[15px] font-body bg-brand-cream-light box-border outline-none focus:border-brand-sage transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-[10px] bg-[#F0DDD5] text-[#A07A6B] text-sm font-semibold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 rounded-[14px] border-none bg-brand-black text-brand-cream text-base font-bold font-display tracking-wide cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 disabled:opacity-60"
            >
              {loading ? '...' : t.login}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center px-2">
          <p className="text-xs text-brand-taupe leading-relaxed m-0">{t.toolNote}</p>
        </div>
      </div>
    </div>
  );
}
