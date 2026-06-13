import { useState } from 'react';
import { dateKey, isFuture, parseDate, todayKey } from '../lib/dates';
import type { EntriesMap } from '../types';

interface Props {
  selectedDate: string;
  entries: EntriesMap;
  onSelect: (date: string) => void;
  onClose: () => void;
  dayLabels: string[];
  monthNames: string[];
  appointmentDate?: string;
}

export default function DatePickerSheet({
  selectedDate,
  entries,
  onSelect,
  onClose,
  dayLabels,
  monthNames,
  appointmentDate,
}: Props) {
  const sel = parseDate(selectedDate);
  const [viewYear, setViewYear] = useState(sel.getFullYear());
  const [viewMonth, setViewMonth] = useState(sel.getMonth());

  const today = parseDate(todayKey());

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startPad = firstDay.getDay();

  const cells: (Date | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: lastDay.getDate() }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isAtMaxMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (isAtMaxMonth) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full sm:w-[360px] sm:rounded-[20px] p-5 pb-10 sm:pb-6"
        style={{ background: 'hsl(var(--card))' }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            onPointerDown={(e) => { e.preventDefault(); prevMonth(); }}
            className="w-11 h-11 flex items-center justify-center rounded-full text-xl font-bold transition-colors"
            style={{ color: '#2E4052', touchAction: 'manipulation' }}
          >
            ‹
          </button>
          <span className="font-display font-bold text-base" style={{ color: '#2E4052' }}>
            {monthNames[viewMonth]} {viewYear}
          </span>
          <button
            onPointerDown={(e) => { e.preventDefault(); nextMonth(); }}
            disabled={isAtMaxMonth}
            className="w-11 h-11 flex items-center justify-center rounded-full text-xl font-bold transition-colors disabled:opacity-25"
            style={{ color: '#2E4052', touchAction: 'manipulation' }}
          >
            ›
          </button>
        </div>

        {/* day-of-week headers */}
        <div className="grid grid-cols-7 mb-2">
          {dayLabels.map((label) => (
            <div
              key={label}
              className="text-center text-[10px] font-bold uppercase tracking-wider py-1"
              style={{ color: '#7AAD7D' }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* day grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((d, i) => {
            if (!d) return <div key={`pad-${i}`} className="h-11" />;

            const dk = dateKey(d);
            const future = isFuture(d);
            const isSelected = dk === selectedDate;
            const hasEntry = !!entries[dk];
            const isToday = dk === todayKey();
            const isAppointment = dk === appointmentDate;

            return (
              <button
                key={dk}
                disabled={future}
                onPointerDown={(e) => {
                  e.preventDefault();
                  if (!future) {
                    onSelect(dk);
                    onClose();
                  }
                }}
                className="flex flex-col items-center justify-center h-11 w-full rounded-[10px] transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                style={{
                  background: isSelected ? '#FFC857' : 'transparent',
                  touchAction: 'manipulation',
                  outline: !isSelected && isAppointment
                    ? '1.5px dashed #7AAD7D'
                    : !isSelected && isToday
                    ? '1.5px solid #FFC857'
                    : 'none',
                }}
              >
                <span
                  className="text-sm leading-none"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: isSelected ? 800 : 500,
                    color: '#2E4052',
                  }}
                >
                  {d.getDate()}
                </span>
                <div
                  className="w-1 h-1 rounded-full mt-0.5"
                  style={{ background: hasEntry ? '#412234' : 'transparent' }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
