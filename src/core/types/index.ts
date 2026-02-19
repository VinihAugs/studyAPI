/**
 * Core Types
 * Tipos e interfaces compartilhadas em todo o projeto
 */

export type ColorKey = 'primary' | 'success' | 'warning' | 'destructive' | 'accent' | 'secondary' | 'info' | 'redirect';

export interface SectionConfig {
  id: string;
  dataSection: string;
  title?: string;
}

