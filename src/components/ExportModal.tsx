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
  appointmentDate?: string;
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

export default function ExportModal({ onExport, onClose, t, appointmentDate }: Props) {
  const [from, setFrom] = useState(appointmentDate ?? todayKey());
  const [to, setTo] = useState(todayKey());

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="bottom-0 top-auto left-0 right-0 translate-x-0 translate-y-0 rounded-none max-w-full sm:left-[50%] sm:top-[50%] sm:bottom-auto sm:translate-x-[-50%] sm:translate-y-[-50%] sm:max-w-[380px] sm:rounded-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t.exportRange}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mb-5">
          <div>
            <DateField label={t.from as string} value={from} onChange={setFrom} />
            {appointmentDate && from === appointmentDate && (
              <p className="text-[11px] text-brand-sage-dark font-body mt-1 flex items-center gap-1">
                🔖 From your appointment date
              </p>
            )}
          </div>
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
