interface PropBadgeProps {
  label: string;
  active: boolean;
}

export const PropBadge = ({ label, active }: PropBadgeProps) => {
  return (
    <span
      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
        active
          ? 'border-primary/50 bg-primary/10 text-primary'
          : 'border-border/40 bg-muted/30 text-muted-foreground/50 line-through'
      }`}
    >
      {label}
    </span>
  );
};

