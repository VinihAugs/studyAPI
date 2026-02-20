import { ColorKey } from '@/core/types';

export interface HttpMethod {
  verb: string;
  label: string;
  description: string;
  example: string;
  statusExample: string;
  color: ColorKey;
  icon: string;
  section: string;
  safe: boolean;
  idempotent: boolean;
  cacheable: boolean;
}

export interface DebugTool {
  title: string;
  icon: string;
  description: string;
  tip: string;
}

export type ViewTab = 'methods' | 'tools';

