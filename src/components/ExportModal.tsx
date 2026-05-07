import { useState } from 'react';
import { todayKey } from '../lib/dates';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { Translations } from '../types';

interface Props {
  onExport: (from: string, to: string) => void;
  onClose: () => void;
  t: Translations;
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        type="date"
        value={value}
        max={todayKey()}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function ExportModal({ onExport, onClose, t }: Props) {
  const [from, setFrom] = useState(todayKey());
  const [to, setTo] = useState(todayKey());

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.exportRange}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mb-5">
          <DateField label={t.from as string} value={from} onChange={setFrom} />
          <DateField label={t.to as string} value={to} onChange={setTo} />
        </div>

        <div className="flex gap-2.5">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {t.cancel}
          </Button>
          <Button
            onClick={() => onExport(from, to)}
            className="flex-1 bg-brand-navy hover:bg-brand-navy/90"
          >
            {t.download}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
