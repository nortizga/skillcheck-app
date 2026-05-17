import { useState, type FormEvent } from 'react';
import { i18n } from '../lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="min-h-screen bg-background flex items-center justify-center p-5 font-body">
      <Button
        variant="outline"
        size="sm"
        onClick={switchLang}
        className="fixed top-4 right-4 z-50 rounded-full font-bold text-[13px] font-body"
      >
        {t.langSwitch}
      </Button>

      <div className="w-full max-w-[380px]">
        <div className="mb-10 text-center">
          <h1 className="text-[40px] font-display font-bold text-brand-navy tracking-tight m-0">
            SkillCheck
          </h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@email.com"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">{t.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-semibold text-center border border-destructive/20">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-bold font-display tracking-wide rounded-[14px] h-12 text-base mt-2"
              >
                {loading ? '...' : t.login}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center px-2">
          <p className="text-xs text-muted-foreground leading-relaxed m-0 font-body">{t.toolNote}</p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground/70 font-body">
            <a href="#/terms" className="underline hover:text-brand-navy transition-colors">
              {t.terms}
            </a>
            {' · '}
            <a href="#/privacy" className="underline hover:text-brand-navy transition-colors">
              {t.privacy}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
