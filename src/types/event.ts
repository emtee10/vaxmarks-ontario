export interface MilestoneEvent {
  id: string;
  date?: string;
  date_precision?: string;
  agent?: string | string[];
  disease?: string[];
  event_type?: string;
  summary?: string;
  population?: string;
  jurisdiction?: string;
  short_title?: string;
  source_url?: string;
  evidence_strength?: string;
  notes?: string;
}

export type SortDirection = 'asc' | 'desc';

export type SortKey =
  | 'date'
  | 'agent'
  | 'event_type'
  | 'population'
  | 'evidence_strength';

export interface SortState {
  key: SortKey;
  direction: SortDirection;
}
