import { useState, useMemo, useRef } from 'react';
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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { EntriesMap, Lang } from '../types';
import type { User } from '@supabase/supabase-js';

interface Props {
  user: User;
  signOut?: () => Promise<void>;
  entries: EntriesMap;
  updateField: (date: string, field: string, value: unknown) => void;
  toggleSkill: (date: string, skillId: string) => void;
  saveEntry: (date: string) => Promise<{ error: string | null }>;
  resetEntry: (date: string) => Promise<{ error: string | null }>;
  saving: boolean;
  lang: Lang;
  onSwitchLang: () => void;
}

export default function DiaryPage({
  signOut,
  entries,
  updateField,
  toggleSkill,
  saveEntry,
  resetEntry,
  saving,
  lang,
  onSwitchLang,
}: Props) {
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [showExport, setShowExport] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = i18n[lang];
  const entry = entries[selectedDate] || defaultEntry();

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

  const handleResetClick = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      resetTimerRef.current = setTimeout(() => setConfirmReset(false), 3000);
    } else {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      setConfirmReset(false);
      await resetEntry(selectedDate);
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
    <div className="min-h-screen bg-background font-body">
      <Header
        t={t}
        onSwitchLang={onSwitchLang}
        onExport={() => setShowExport(true)}
        onSignOut={signOut}
        onNavigateSkills={() => { window.location.hash = '#/skills'; }}
      />

      <div className="max-w-[520px] mx-auto px-4 pt-4 pb-24">
        {/* Date nav */}
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDay(-1)}
            aria-label={t.previousDay as string}
            className="rounded-[10px] text-lg text-muted-foreground"
          >
            ‹
          </Button>
          <div className="text-center">
            <div className="text-[19px] font-bold text-brand-navy font-display">{formattedDate}</div>
            {isToday && (
              <span className="text-[11px] font-bold text-brand-sage-dark uppercase tracking-widest font-body">
                {t.today}
              </span>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDay(1)}
            disabled={nextDayFuture}
            aria-label={t.nextDay as string}
            className="rounded-[10px] text-lg text-muted-foreground"
          >
            ›
          </Button>
        </div>

        <WeekDots entries={entries} selectedDate={selectedDate} onSelect={setSelectedDate} dayLabels={t.dayLabels as string[]} />

        {/* Behaviors */}
        <Section title={t.behaviors as string} subtitle={t.behaviorSub as string} icon="🛡">
          {behaviorRows.map(([field, label], i) => (
            <div
              key={field}
              className="flex justify-between items-center py-3"
              style={{ borderBottom: i < behaviorRows.length - 1 ? '1px solid hsl(var(--border))' : 'none' }}
            >
              <span className="text-sm text-foreground/80 font-body font-medium">{label}</span>
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
          <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
            <span className="text-sm text-foreground/80 font-body font-medium">{t.suicidalThoughts as string}</span>
            <YesNoToggle
              value={entry.suicidal_thoughts}
              onChange={update('suicidal_thoughts') as (v: boolean) => void}
              yesLabel={t.yes as string}
              noLabel={t.no as string}
            />
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-foreground/80 font-body font-medium">{t.selfHarmThoughts as string}</span>
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
            <div key={emo} className="py-2.5" style={{ borderTop: i > 0 ? '1px solid hsl(var(--border))' : 'none' }}>
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
          <Textarea
            value={entry.notes || ''}
            onChange={(e) => updateField(selectedDate, 'notes', e.target.value)}
            placeholder={t.notesPlaceholder as string}
            rows={4}
            className="font-body text-sm"
          />
        </Section>

        {/* Save */}
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full h-14 rounded-[14px] text-base font-bold font-display tracking-wide shadow-md transition-all duration-300"
          style={{
            background: saveFlash ? '#BDD9BF' : '#FFC857',
            color: '#2E4052',
            border: 'none',
          }}
        >
          {saveFlash ? t.saved : saving ? '...' : t.save}
        </Button>

        {/* Clear entry */}
        <Button
          variant="ghost"
          onClick={handleResetClick}
          className="w-full mt-2 h-10 rounded-[14px] text-sm font-body transition-all duration-200"
          style={{
            color: confirmReset ? '#412234' : '#7AAD7D',
            border: confirmReset ? '1.5px solid #412234' : '1.5px solid transparent',
          }}
        >
          {confirmReset ? t.confirmClear : t.clearEntry}
        </Button>

        {/* Crisis */}
        <div className="mt-5 p-4 rounded-xl bg-card border border-border text-center">
          <p className="text-xs text-muted-foreground font-body m-0">{t.crisisText}</p>
          <p className="text-[13px] font-bold text-brand-navy font-body mt-1 mb-0">
            {t.crisisLine} — {t.crisisCall}
          </p>
          {t.crisisUrl && (
            <a
              href={t.crisisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-brand-navy-light font-body mt-1 block underline"
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
