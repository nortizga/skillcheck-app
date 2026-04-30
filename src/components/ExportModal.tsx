import { useState } from 'react';
import { todayKey } from '../lib/dates';
import type { Translations } from '../types';

interface Props {
  onExport: (from: string, to: string) => void;
  onClose: () => void;
  t: Translations;
}

export default function ExportModal({ onExport, onClose, t }: Props) {
  const [from, setFrom] = useState(todayKey());
  const [to, setTo] = useState(todayKey());

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-[1000] p-5 backdrop-blur-[6px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[20px] p-7 w-full max-w-[380px] shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
      >
        <h3 className="text-[22px] font-display text-brand-black font-bold mb-5 mt-0">
          {t.exportRange}
        </h3>

        <div className="mb-4">
          <label className="text-xs font-bold text-brand-taupe block mb-1.5 uppercase tracking-wider font-body">
            {t.from}
          </label>
          <input
            type="date"
            value={from}
            max={todayKey()}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-3 rounded-[10px] border border-brand-cream-dark text-[15px] font-body bg-brand-cream-light box-border"
          />
        </div>

        <div className="mb-6">
          <label className="text-xs font-bold text-brand-taupe block mb-1.5 uppercase tracking-wider font-body">
            {t.to}
          </label>
          <input
            type="date"
            value={to}
            max={todayKey()}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 rounded-[10px] border border-brand-cream-dark text-[15px] font-body bg-brand-cream-light box-border"
          />
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 p-3.5 rounded-xl border border-brand-cream-dark bg-transparent cursor-pointer text-[15px] font-semibold font-body text-brand-taupe-dark"
          >
            {t.cancel}
          </button>
          <button
            onClick={() => onExport(from, to)}
            className="flex-1 p-3.5 rounded-xl border-none bg-brand-black text-brand-cream cursor-pointer text-[15px] font-bold font-body shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
          >
            {t.download}
          </button>
        </div>
      </div>
    </div>
  );
}
