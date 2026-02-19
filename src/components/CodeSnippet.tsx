import { useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  language: string;
  title?: string;
  badge?: string;
  badgeColor?: 'primary' | 'success' | 'warning' | 'destructive' | 'accent';
}

const badgeStyles: Record<string, string> = {
  primary: 'bg-primary/20 text-primary border-primary/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  destructive: 'bg-destructive/20 text-destructive border-destructive/30',
  accent: 'bg-accent/20 text-accent border-accent/30',
};

const CodeSnippet = ({ code, language, title, badge, badgeColor = 'primary' }: CodeSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="glass rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive/60" />
            <span className="w-3 h-3 rounded-full bg-warning/60" />
            <span className="w-3 h-3 rounded-full bg-success/60" />
          </div>
          {title && <span className="text-sm text-muted-foreground font-mono">{title}</span>}
          {badge && (
            <span className={`text-xs px-2 py-0.5 rounded border font-mono ${badgeStyles[badgeColor]}`}>
              {badge}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed scrollbar-hide">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
