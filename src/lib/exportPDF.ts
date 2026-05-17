import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { i18n, SKILLS } from './i18n';
import type { EntriesMap, Lang } from '../types';

const skillLabel = (id: string, lang: Lang): string =>
  SKILLS.find((s) => s.id === id)?.[lang] ?? id;

export function exportPDF(entries: EntriesMap, from: string, to: string, lang: Lang): void {
  const t = i18n[lang];
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(131, 151, 136);
  doc.text(`${t.entryFor}: ${from} – ${to}`, 14, 10);

  const bool = (v: unknown) =>
    v === true ? (t.yes as string) : v === false ? (t.no as string) : '—';
  const num = (hasEntry: boolean, v: unknown) => (hasEntry ? String(v ?? 0) : '—');

  const isEs = lang === 'es';

  const headerRow1 = [
    {
      content: isEs ? 'Día' : 'Day',
      rowSpan: 2,
      styles: { valign: 'middle' as const, halign: 'center' as const },
    },
    {
      content: isEs ? 'Conducta (Sí/No)' : 'Behavior (Yes/No)',
      colSpan: 2,
      styles: { halign: 'center' as const },
    },
    {
      content: isEs ? 'Pensamiento (Sí/No)' : 'Thoughts (Yes/No)',
      colSpan: 2,
      styles: { halign: 'center' as const },
    },
    {
      content: t.substances as string,
      rowSpan: 2,
      styles: { valign: 'middle' as const, halign: 'center' as const },
    },
    {
      content: isEs ? 'Emoción (0–5)' : 'Emotions (0–5)',
      colSpan: 6,
      styles: { halign: 'center' as const },
    },
    {
      content: isEs ? 'Destrezas' : 'Skills',
      rowSpan: 2,
      styles: { valign: 'middle' as const, halign: 'center' as const },
    },
    {
      content: t.notes as string,
      rowSpan: 2,
      styles: { valign: 'middle' as const, halign: 'center' as const },
    },
  ];

  const headerRow2 = [
    t.suicidalBehavior as string,
    t.selfHarmBehavior as string,
    t.suicidalThoughts as string,
    t.selfHarmThoughts as string,
    t.guilt as string,
    t.shame as string,
    t.fear as string,
    t.joy as string,
    t.sadness as string,
    t.anger as string,
  ];

  const rows: string[][] = [];

  for (const d = new Date(from); ; d.setDate(d.getDate() + 1)) {
    const dk = d.toISOString().split('T')[0];
    const e = entries[dk];

    rows.push([
      dk,
      bool(e?.suicidal_behavior),
      bool(e?.self_harm_behavior),
      bool(e?.suicidal_thoughts),
      bool(e?.self_harm_thoughts),
      bool(e?.substances),
      num(e != null, e?.guilt),
      num(e != null, e?.shame),
      num(e != null, e?.fear),
      num(e != null, e?.joy),
      num(e != null, e?.sadness),
      num(e != null, e?.anger),
      e?.skills?.length ? e.skills.map((id) => skillLabel(id, lang)).join(', ') : '—',
      e?.notes || '—',
    ]);

    if (dk >= to) break;
  }

  autoTable(doc, {
    startY: 14,
    head: [headerRow1, headerRow2],
    body: rows,
    theme: 'grid',
    styles: {
      fontSize: 7,
      cellPadding: 2,
      textColor: [0, 0, 0],
      lineColor: [226, 209, 182],
      lineWidth: 0.3,
      halign: 'center',
    },
    headStyles: {
      fillColor: [238, 224, 203],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      fontSize: 6.5,
      halign: 'center',
      valign: 'middle',
    },
    alternateRowStyles: {
      fillColor: [247, 240, 227],
    },
    columnStyles: {
      0:  { cellWidth: 20 },
      1:  { cellWidth: 16 },
      2:  { cellWidth: 16 },
      3:  { cellWidth: 16 },
      4:  { cellWidth: 16 },
      5:  { cellWidth: 16 },
      6:  { cellWidth: 12 },
      7:  { cellWidth: 14 },
      8:  { cellWidth: 12 },
      9:  { cellWidth: 12 },
      10: { cellWidth: 14 },
      11: { cellWidth: 12 },
      12: { cellWidth: 'auto', halign: 'left' },
      13: { cellWidth: 40, halign: 'left' },
    },
  });

  doc.save(`SkillCheck_${from}_${to}.pdf`);
}
