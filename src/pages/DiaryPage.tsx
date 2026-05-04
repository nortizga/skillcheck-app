import { useState, useMemo, useCallback } from 'react';
import { todayKey, parseDate, isFuture, defaultEntry } from '../lib/dates';
import { i18n, SKILLS, EMOTION_STYLE } from '../lib/i18n';
import { exportPDF } from '../lib/exportPDF';
import Header from '../components/Header';
import WeekDots from '../components/WeekDots';
import Section from '../components/Section';
import IntensityStepper from '../components/IntensityStepper';
import YesNoToggle from '../components/YesNoToggle';
import SkillChip from '../components/SkillChip';
import ExportModal from '../components/ExportModal';
import type { EntriesMap, Lang } from '../types';
import type { User } from '@supabase/supabase-js';

interface Props {
  user: User;
  signOut: () => Promise<void>;
  entries: EntriesMap;
  updateField: (date: string, field: string, value: unknown) => void;
  toggleSkill: (date: string, skillId: string) => void;
  saveEntry: (date: string) => Promise<{ error: string | null }>;
  saving: boolean;
}

export default function DiaryPage({
  signOut,
  entries,
  updateField,
  toggleSkill,
  saveEntry,
  saving,
}: Props) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('skillcheck-lang') as Lang) || 'en'
  );
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [showExport, setShowExport] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);

  const t = i18n[lang];
  const entry = entries[selectedDate] || defaultEntry();

  const switchLang = useCallback(() => {
    const next: Lang = lang === 'en' ? 'es' : 'en';
    setLang(next);
    localStorage.setItem('skillcheck-lang', next);
  }, [lang]);

  const navigateDay = (dir: number) => {
    const d = parseDate(selectedDate);
    d.setDate(d.getDate() + dir);
    if (!isFuture(d)) setSelectedDate(d.toISOString().split('T')[0]);
  };

  const nextDayFuture = useMemo(() => {
    const d = parseDate(selectedDate);
    d.setDate(d.getDate() + 1);
    return isFuture(d);
  }, [selectedDate]);

  const formattedDate = useMemo(() => {
    const d = parseDate(selectedDate);
    return `${t.monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }, [selectedDate, t.monthNames]);

  const isToday = selectedDate === todayKey();

  const handleSave = async () => {
    const { error } = await saveEntry(selectedDate);
    if (!error) {
      setSaveFlash(true);
      setTimeout(() => setSaveFlash(false), 2200);
    }
  };

  const handleExport = (from: string, to: string) => {
    exportPDF(entries, from, to, lang);
    setShowExport(false);
  };

  const update = (field: string) => (value: unknown) => updateField(selectedDate, field, value);
  const toggle = (skillId: string) => () => toggleSkill(selectedDate, skillId);

  const behaviorRows: [string, string][] = [
    ['suicidal_behavior', t.suicidalBehavior as string],
    ['self_harm_behavior', t.selfHarmBehavior as string],
    ['substances', t.substances as string],
  ];


  const emotionKeys = ['guilt', 'shame', 'fear', 'joy', 'sadness', 'anger'] as const;

  return (
    <div className="min-h-screen bg-brand-cream-light font-body">
      <Header t={t} onSwitchLang={switchLang} onExport={() => setShowExport(true)} onSignOut={signOut} />

      <div className="max-w-[520px] mx-auto px-4 pt-4 pb-24">
        {/* Date nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigateDay(-1)}
            aria-label={t.previousDay as string}
            className="bg-white border border-brand-cream-dark rounded-[10px] w-10 h-10 cursor-pointer text-lg text-brand-taupe-dark flex items-center justify-center"
          >
            ‹
          </button>
          <div className="text-center">
            <div className="text-[19px] font-bold text-brand-black font-display">{formattedDate}</div>
            {isToday && (
              <span className="text-[11px] font-bold text-brand-sage uppercase tracking-widest font-body">
                {t.today}
              </span>
            )}
          </div>
          <button
            onClick={() => navigateDay(1)}
            disabled={nextDayFuture}
            aria-label={t.nextDay as string}
            className="bg-white border border-brand-cream-dark rounded-[10px] w-10 h-10 cursor-pointer text-lg text-brand-taupe-dark flex items-center justify-center disabled:opacity-25"
          >
            ›
          </button>
        </div>

        <WeekDots entries={entries} selectedDate={selectedDate} onSelect={setSelectedDate} dayLabels={t.dayLabels as string[]} />

        {/* Behaviors */}
        <Section title={t.behaviors as string} subtitle={t.behaviorSub as string} icon="🛡">
          {behaviorRows.map(([field, label], i) => (
            <div
              key={field}
              className="flex justify-between items-center py-3"
              style={{ borderBottom: i < behaviorRows.length - 1 ? '1px solid #F7F0E3' : 'none' }}
            >
              <span className="text-sm text-brand-black/80 font-body font-medium">{label}</span>
              <YesNoToggle
                value={entry[field as keyof typeof entry] as boolean | null}
                onChange={update(field) as (v: boolean) => void}
                yesLabel={t.yes as string}
                noLabel={t.no as string}
              />
            </div>
          ))}
        </Section>

        {/* Thoughts */}
        <Section title={t.thoughts as string} subtitle={t.thoughtSub as string} icon="💭">
          <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid #F7F0E3' }}>
            <span className="text-sm text-brand-black/80 font-body font-medium">{t.suicidalThoughts as string}</span>
            <YesNoToggle
              value={entry.suicidal_thoughts}
              onChange={update('suicidal_thoughts') as (v: boolean) => void}
              yesLabel={t.yes as string}
              noLabel={t.no as string}
            />
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-brand-black/80 font-body font-medium">{t.selfHarmThoughts as string}</span>
            <YesNoToggle
              value={entry.self_harm_thoughts}
              onChange={update('self_harm_thoughts') as (v: boolean) => void}
              yesLabel={t.yes as string}
              noLabel={t.no as string}
            />
          </div>
        </Section>

        {/* Emotions */}
        <Section title={t.emotions as string} subtitle={t.emotionSub as string} icon="🌊">
          {emotionKeys.map((emo, i) => (
            <div key={emo} className="py-2.5" style={{ borderTop: i > 0 ? '1px solid #F7F0E3' : 'none' }}>
              <label className="text-sm font-semibold block mb-2.5 font-body" style={{ color: EMOTION_STYLE[emo].accent }}>
                {t[emo] as string}
              </label>
              <IntensityStepper
                value={entry[emo] as number | null}
                onChange={update(emo) as (v: number) => void}
                accent={EMOTION_STYLE[emo].accent}
              />
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section title={t.skillsUsed as string} subtitle={t.skillsSub as string} icon="🧰">
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <SkillChip key={skill.id} label={skill[lang]} active={entry.skills.includes(skill.id)} onClick={toggle(skill.id)} />
            ))}
          </div>
        </Section>

        {/* Notes */}
        <Section title={t.notes as string} subtitle={t.notesSub as string} icon="📝">
          <textarea
            value={entry.notes || ''}
            onChange={(e) => updateField(selectedDate, 'notes', e.target.value)}
            placeholder={t.notesPlaceholder as string}
            rows={4}
            className="w-full border border-brand-cream-dark rounded-xl p-3.5 text-sm font-body bg-brand-cream-light text-brand-black resize-y outline-none box-border focus:border-brand-sage transition-colors"
          />
        </Section>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full p-4 rounded-[14px] border-none text-brand-cream text-base font-bold font-display tracking-wide cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 disabled:opacity-60"
          style={{ background: saveFlash ? '#839788' : '#000' }}
        >
          {saveFlash ? t.saved : saving ? '...' : t.save}
        </button>

        {/* Crisis */}
        <div className="mt-7 p-4 rounded-xl bg-white border border-brand-cream-dark text-center">
          <p className="text-xs text-brand-taupe font-body m-0">{t.crisisText}</p>
          <p className="text-[13px] font-bold text-brand-sage font-body mt-1 mb-0">
            {t.crisisLine} — {t.crisisCall}
          </p>
          {t.crisisUrl && (
            <a
              href={t.crisisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-brand-sage font-body mt-1 block underline"
            >
              {t.crisisUrlLabel}
            </a>
          )}
        </div>
      </div>

      {showExport && <ExportModal onExport={handleExport} onClose={() => setShowExport(false)} t={t} />}
    </div>
  );
}
