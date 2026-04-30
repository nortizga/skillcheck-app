import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { i18n } from './i18n';
import type { EntriesMap, Lang, BehaviorField } from '../types';

const BEHAVIOR_FIELDS: BehaviorField[] = ['suicidal_behavior', 'self_harm_behavior', 'substances'];
const THOUGHT_FIELDS = ['suicidal_thoughts', 'self_harm_thoughts'] as const;
const EMOTION_FIELDS = ['guilt', 'shame', 'fear', 'joy', 'sadness', 'anger'] as const;

const FIELD_TO_I18N: Record<string, string> = {
  suicidal_behavior: 'suicidalBehavior',
  self_harm_behavior: 'selfHarmBehavior',
  suicidal_thoughts: 'suicidalThoughts',
  self_harm_thoughts: 'selfHarmThoughts',
  substances: 'substances',
  guilt: 'guilt',
  shame: 'shame',
  fear: 'fear',
  joy: 'joy',
  sadness: 'sadness',
  anger: 'anger',
};

export function exportPDF(entries: EntriesMap, from: string, to: string, lang: Lang): void {
  const t = i18n[lang];
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' });

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('SkillCheck', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(131, 151, 136);
  doc.text(`${t.entryFor}: ${from} - ${to}`, 14, 25);

  const allFields = [...BEHAVIOR_FIELDS, ...THOUGHT_FIELDS, ...EMOTION_FIELDS];

  const headers = [
    lang === 'es' ? 'Día' : 'Day',
    ...allFields.map((f) => {
      const key = FIELD_TO_I18N[f];
      const val = t[key];
      return typeof val === 'string' ? val : f;
    }),
    typeof t.notes === 'string' ? t.notes : 'Notes',
  ];

  const start = new Date(from);
  const end = new Date(to);
  const rows: string[][] = [];

  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dk = d.toISOString().split('T')[0];
    const e = entries[dk];

    const cells = allFields.map((f) => {
      const v = e?.[f as keyof typeof e];
      if ((BEHAVIOR_FIELDS as readonly string[]).includes(f)) {
        return v === true ? (t.yes as string) : v === false ? (t.no as string) : '—';
      }
      return v != null ? String(v) : '—';
    });

    const notes = e?.notes || '—';
    rows.push([dk, ...cells, notes]);
  }

  autoTable(doc, {
    startY: 30,
    head: [headers],
    body: rows,
    theme: 'grid',
    styles: {
      fontSize: 7.5,
      cellPadding: 2,
      textColor: [0, 0, 0],
      lineColor: [226, 209, 182],
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: [238, 224, 203],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      fontSize: 7,
      halign: 'center',
    },
    alternateRowStyles: {
      fillColor: [247, 240, 227],
    },
  });

  doc.save(`SkillCheck_${from}_${to}.pdf`);
}
