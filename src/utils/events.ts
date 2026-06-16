import type {
  FilterKey,
  FilterState,
  MilestoneEvent,
  SortDirection,
  SortKey,
} from '../types/event';

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

export function normalizeString(value: string | undefined): string {
  return (value || '').trim().toLocaleLowerCase();
}

export function searchEvents(
  events: MilestoneEvent[],
  searchTerm: string,
): MilestoneEvent[] {
  const query = normalizeString(searchTerm);

  if (!query) {
    return events;
  }

  return events.filter((event) =>
    getSearchValues(event).some((value) =>
      normalizeString(value).includes(query),
    ),
  );
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

export function getUniqueValues(
  events: MilestoneEvent[],
  key: FilterKey,
): string[] {
  const values = events.flatMap((event) => getEventValues(event, key));

  return [...new Set(values)].sort((first, second) =>
    first.localeCompare(second, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  );
}

export function filterEvents(
  events: MilestoneEvent[],
  filters: FilterState,
): MilestoneEvent[] {
  return events.filter((event) =>
    Object.entries(filters).every(([key, selectedValues]) => {
      if (selectedValues.length === 0) {
        return true;
      }

      const eventValues = getEventValues(event, key as FilterKey);

      return selectedValues.some((selectedValue) =>
        eventValues.includes(selectedValue),
      );
    }),
  );
}

export function hasActiveFilters(filters: FilterState): boolean {
  return Object.values(filters).some((values) => values.length > 0);
}

function getSearchValues(event: MilestoneEvent): string[] {
  return [
    event.summary,
    event.agent,
    event.disease,
    event.population,
    event.event_type,
    event.short_title,
    event.notes,
    event.id,
  ]
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is string => Boolean(value));
}

function formatSortValue(event: MilestoneEvent, key: SortKey): string {
  if (key === 'agent') {
    return formatListValue(event.agent);
  }

  return event[key] || '';
}

function getEventValues(event: MilestoneEvent, key: FilterKey): string[] {
  const value = event[key];

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return value ? [value] : [];
}
