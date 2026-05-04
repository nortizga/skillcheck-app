import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { i18n } from './i18n';
import type { EntriesMap, Lang, BehaviorField } from '../types';

const BEHAVIOR_FIELDS: BehaviorField[] = ['suicidal_behavior', 'self_harm_behavior', 'substances'];
const BOOLEAN_THOUGHT_FIELDS = ['suicidal_thoughts', 'self_harm_thoughts'] as const;
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
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('SkillCheck', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(131, 151, 136);
  doc.text(`${t.entryFor}: ${from} – ${to}`, 14, 26);

  const allFields = [...BEHAVIOR_FIELDS, ...BOOLEAN_THOUGHT_FIELDS, ...EMOTION_FIELDS];
  const booleanFields = new Set<string>([...BEHAVIOR_FIELDS, ...BOOLEAN_THOUGHT_FIELDS]);
  const notesLabel = typeof t.notes === 'string' ? t.notes : 'Notes';

  let y = 33;

  for (const d = new Date(from); ; d.setDate(d.getDate() + 1)) {
    const dk = d.toISOString().split('T')[0];
    const e = entries[dk];

    const rows: [string, string][] = allFields.map((f) => {
      const key = FIELD_TO_I18N[f];
      const label = typeof t[key] === 'string' ? (t[key] as string) : f;
      const v = e?.[f as keyof typeof e];
      let value: string;
      if (booleanFields.has(f)) {
        value = v === true ? (t.yes as string) : v === false ? (t.no as string) : '—';
      } else {
        value = v != null ? String(v) : '—';
      }
      return [label, value];
    });

    rows.push([notesLabel, e?.notes || '—']);

    autoTable(doc, {
      startY: y,
      head: [
        [
          {
            content: dk,
            colSpan: 2,
            styles: {
              halign: 'left',
              fillColor: [238, 224, 203],
              textColor: [0, 0, 0],
              fontStyle: 'bold',
              fontSize: 10,
              cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
            },
          },
        ],
      ],
      body: rows,
      theme: 'grid',
      styles: {
        fontSize: 9.5,
        cellPadding: { top: 2.5, bottom: 2.5, left: 4, right: 4 },
        textColor: [0, 0, 0],
        lineColor: [226, 209, 182],
        lineWidth: 0.3,
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 60, fillColor: [247, 240, 227] },
        1: { cellWidth: 'auto' },
      },
      alternateRowStyles: {},
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 7;

    if (dk >= to) break;
  }

  doc.save(`SkillCheck_${from}_${to}.pdf`);
}
