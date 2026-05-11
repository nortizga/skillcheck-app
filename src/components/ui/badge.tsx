import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer font-body',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border-border text-muted-foreground bg-transparent hover:bg-muted',
        active: 'border-brand-sage-dark bg-brand-sage text-brand-navy hover:bg-brand-sage/80',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <button className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
