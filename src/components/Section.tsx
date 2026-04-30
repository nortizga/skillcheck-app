import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle: string;
  icon: string;
  children: ReactNode;
}

export default function Section({ title, subtitle, icon, children }: Props) {
  return (
    <div className="mb-6 bg-white rounded-2xl p-5 border border-brand-cream-dark shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="mb-3.5">
        <div className="flex items-center gap-2.5 mb-0.5">
          <span className="text-lg">{icon}</span>
          <h3 className="text-[17px] font-bold text-brand-black font-display tracking-tight m-0">
            {title}
          </h3>
        </div>
        <p className="text-[13px] text-brand-taupe font-body pl-7 m-0">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
