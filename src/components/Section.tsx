import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface Props {
  title: string;
  subtitle: string;
  icon: string;
  children: ReactNode;
}

export default function Section({ title, subtitle, icon, children }: Props) {
  return (
    <Card className="mb-5">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{icon}</span>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription className="pl-7">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
