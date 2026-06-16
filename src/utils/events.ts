import type { MilestoneEvent, SortDirection, SortKey } from '../types/event';

export function formatListValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(', ');
  }

  return value || 'Not specified';
}

export function formatLabel(value: string | undefined): string {
  if (!value) {
    return 'Not specified';
  }

  return value.replaceAll('_', ' ');
}

export function sortEvents(
  events: MilestoneEvent[],
  key: SortKey,
  direction: SortDirection,
): MilestoneEvent[] {
  return [...events].sort((first, second) => {
    const firstValue = formatSortValue(first, key);
    const secondValue = formatSortValue(second, key);
    const comparison = firstValue.localeCompare(secondValue, undefined, {
      numeric: true,
      sensitivity: 'base',
    });

    return direction === 'asc' ? comparison : -comparison;
  });
}

function formatSortValue(event: MilestoneEvent, key: SortKey): string {
  if (key === 'agent') {
    return formatListValue(event.agent);
  }

  return event[key] || '';
}
