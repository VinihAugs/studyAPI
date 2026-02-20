import { ColorKey } from '@/core/types';

export const colorMap: Record<ColorKey, string> = {
  primary: 'border-primary/40 glow-primary',
  success: 'border-success/40 glow-success',
  warning: 'border-warning/40 glow-warning',
  destructive: 'border-destructive/40 glow-destructive',
  accent: 'border-accent/40 glow-accent',
  secondary: 'border-border/60',
  info: 'border-info/40',
  redirect: 'border-redirect/40',
};

export const textColorMap: Record<ColorKey, string> = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
  accent: 'text-accent',
  secondary: 'text-muted-foreground',
  info: 'text-info',
  redirect: 'text-redirect',
};

export const bgBadge: Record<ColorKey, string> = {
  primary: 'bg-primary/15 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  destructive: 'bg-destructive/15 text-destructive',
  accent: 'bg-accent/15 text-accent',
  secondary: 'bg-muted text-muted-foreground',
  info: 'bg-info/15 text-info',
  redirect: 'bg-redirect/15 text-redirect',
};

