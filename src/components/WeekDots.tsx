import { dateKey, parseDate, isFuture } from '../lib/dates';
import type { EntriesMap } from '../types';

interface Props {
  entries: EntriesMap;
  selectedDate: string;
  onSelect: (date: string) => void;
  dayLabels: string[];
}

export default function WeekDots({ entries, selectedDate, onSelect, dayLabels }: Props) {
  const sel = parseDate(selectedDate);
  const startOfWeek = new Date(sel);
  startOfWeek.setDate(sel.getDate() - sel.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return (
    <div className="flex justify-between px-1.5 py-2.5 bg-card rounded-[14px] mb-5 border border-border">
      {days.map((d) => {
        const dk = dateKey(d);
        const isSelected = dk === selectedDate;
        const hasEntry = !!entries[dk];
        const future = isFuture(d);

        return (
          <button
            key={dk}
            onClick={() => !future && onSelect(dk)}
            disabled={future}
            className="flex flex-col items-center gap-1 border-none px-2 py-1.5 rounded-[10px] transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
            style={{
              background: isSelected ? '#FFC857' : 'transparent',
              opacity: future ? 0.28 : 1,
            }}
          >
            <span
              className="text-[10px] font-bold font-body uppercase tracking-wider"
              style={{ color: '#2E4052' }}
            >
              {dayLabels[d.getDay()]}
            </span>
            <span
              className="text-base font-display"
              style={{
                fontWeight: isSelected ? 800 : 500,
                color: '#2E4052',
              }}
            >
              {d.getDate()}
            </span>
            <div
              className="w-[5px] h-[5px] rounded-full transition-colors duration-200"
              style={{ background: hasEntry ? '#412234' : '#2E4052' }}
            />
          </button>
        );
      })}
    </div>
  );
}
