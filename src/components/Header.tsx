import type { Translations } from '../types';

interface Props {
  t: Translations;
  onSwitchLang: () => void;
  onExport: () => void;
  onSignOut?: () => void;
}

export default function Header({ t, onSwitchLang, onExport, onSignOut }: Props) {
  return (
    <div className="bg-brand-black px-5 pt-[22px] pb-[18px] text-brand-cream relative overflow-hidden">
      <div
        className="absolute top-0 right-0 bottom-0 w-1/2"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(131,151,136,0.08) 100%)',
        }}
      />
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[30px] font-display font-bold tracking-tight text-brand-cream m-0">
              SkillCheck
            </h1>
            <p className="text-[13px] text-brand-taupe font-body tracking-wide mt-0.5 mb-0">
              {t.tagline}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={onSwitchLang}
              className="bg-white/[0.08] border border-brand-sage/40 text-brand-cream rounded-full px-3.5 py-1.5 cursor-pointer font-bold text-[13px] font-body"
            >
              {t.langSwitch}
            </button>
            <button
              onClick={onExport}
              className="bg-brand-sage border-none text-brand-cream rounded-full px-4 py-1.5 cursor-pointer font-bold text-[13px] font-body"
            >
              PDF
            </button>
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="bg-white/[0.08] border border-white/20 text-brand-cream rounded-full px-3.5 py-1.5 cursor-pointer font-semibold text-[12px] font-body whitespace-nowrap"
              >
                {t.logout}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
