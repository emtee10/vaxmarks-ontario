import { useMemo, useState } from 'react';
import { EventsTable } from '../components/EventsTable';
import { FilterPanel } from '../components/FilterPanel';
import { LogoHeader } from '../components/LogoHeader';
import { SearchBar } from '../components/SearchBar';
import { events } from '../data/events';
import type { FilterKey, FilterState, SortKey, SortState } from '../types/event';
import {
  filterEvents,
  getUniqueValues,
  hasActiveFilters,
  sortEvents,
} from '../utils/events';

const emptyFilters: FilterState = {
  disease: [],
  agent: [],
  population: [],
  event_type: [],
  evidence_strength: [],
};

const filterLabels: Record<FilterKey, string> = {
  disease: 'Disease',
  agent: 'Agent',
  population: 'Population',
  event_type: 'Event Type',
  evidence_strength: 'Evidence',
};

export function DataExplorerPage() {
  const [sort, setSort] = useState<SortState>({
    key: 'date',
    direction: 'desc',
  });
  const [filters, setFilters] = useState<FilterState>(emptyFilters);

  const filterGroups = useMemo(
    () =>
      (Object.keys(emptyFilters) as FilterKey[]).map((key) => ({
        key,
        label: filterLabels[key],
        values: getUniqueValues(events, key),
      })),
    [],
  );

  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [filters],
  );

  const sortedEvents = useMemo(
    () => sortEvents(filteredEvents, sort.key, sort.direction),
    [filteredEvents, sort],
  );

  const activeFilterCount = useMemo(
    () => Object.values(filters).reduce((total, values) => total + values.length, 0),
    [filters],
  );

  function handleSortChange(key: SortKey) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  function handleToggleFilter(key: FilterKey, value: string) {
    setFilters((current) => {
      const currentValues = current[key];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((currentValue) => currentValue !== value)
        : [...currentValues, value];

      return {
        ...current,
        [key]: nextValues,
      };
    });
  }

  function handleClearFilters() {
    setFilters(emptyFilters);
  }

  return (
    <div className="app-shell">
      <LogoHeader />
      <main className="page-content">
        <section className="toolbar" aria-label="Data explorer controls">
          <SearchBar />
          <p className="record-count" aria-live="polite">
            {sortedEvents.length} records
          </p>
        </section>

        <FilterPanel
          groups={filterGroups}
          filters={filters}
          activeFilterCount={activeFilterCount}
          onToggleFilter={handleToggleFilter}
          onClearFilters={handleClearFilters}
        />

        <section className="table-section" aria-labelledby="events-heading">
          <div className="section-heading">
            <h2 id="events-heading">Milestone Events</h2>
            <p>
              {hasActiveFilters(filters)
                ? 'Showing records that match the selected filter chips.'
                : 'Sortable public health timeline records from the local dataset.'}
            </p>
          </div>
          {sortedEvents.length > 0 ? (
            <EventsTable
              events={sortedEvents}
              sort={sort}
              onSortChange={handleSortChange}
            />
          ) : (
            <div className="empty-state">
              <h3>No matching records</h3>
              <p>Clear one or more filters to bring records back into view.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
