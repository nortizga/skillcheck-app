import { useState } from 'react';
import { todayKey } from '../lib/dates';
import type { Translations } from '../types';

interface Props {
  onExport: (from: string, to: string) => void;
  onClose: () => void;
  t: Translations;
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[11px] font-bold text-brand-taupe block mb-1 uppercase tracking-wider font-body">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-taupe text-[15px] pointer-events-none">
          📅
        </span>
        <input
          type="date"
          value={value}
          max={todayKey()}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 rounded-[10px] border border-brand-cream-dark text-[15px] font-body bg-brand-cream-light box-border appearance-none"
        />
      </div>
    </div>
  );
}

export default function ExportModal({ onExport, onClose, t }: Props) {
  const [from, setFrom] = useState(todayKey());
  const [to, setTo] = useState(todayKey());

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-end sm:items-center justify-center z-[1000] backdrop-blur-[6px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-[24px] sm:rounded-[20px] p-6 w-full sm:max-w-[380px] shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
      >
        <div className="w-10 h-1 bg-brand-cream-dark rounded-full mx-auto mb-5 sm:hidden" />

        <h3 className="text-[20px] font-display text-brand-black font-bold mb-4 mt-0">
          {t.exportRange}
        </h3>

        <div className="flex flex-col gap-3 mb-5">
          <DateField label={t.from} value={from} onChange={setFrom} />
          <DateField label={t.to} value={to} onChange={setTo} />
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-brand-cream-dark bg-transparent cursor-pointer text-[15px] font-semibold font-body text-brand-taupe-dark"
          >
            {t.cancel}
          </button>
          <button
            onClick={() => onExport(from, to)}
            className="flex-1 py-3 rounded-xl border-none bg-brand-black text-brand-cream cursor-pointer text-[15px] font-bold font-body shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
          >
            {t.download}
          </button>
        </div>
      </div>
    </div>
  );
}
