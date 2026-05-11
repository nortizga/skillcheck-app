import { Badge } from '@/components/ui/badge';

interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function SkillChip({ label, active, onClick }: Props) {
  return (
    <Badge variant={active ? 'active' : 'outline'} onClick={onClick}>
      {label}
    </Badge>
  );
}
