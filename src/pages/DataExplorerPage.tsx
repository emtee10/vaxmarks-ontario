import { useMemo, useState } from 'react';
import { EventsTable } from '../components/EventsTable';
import { LogoHeader } from '../components/LogoHeader';
import { SearchBar } from '../components/SearchBar';
import { events } from '../data/events';
import type { SortKey, SortState } from '../types/event';
import { sortEvents } from '../utils/events';

export function DataExplorerPage() {
  const [sort, setSort] = useState<SortState>({
    key: 'date',
    direction: 'desc',
  });

  const sortedEvents = useMemo(
    () => sortEvents(events, sort.key, sort.direction),
    [sort],
  );

  function handleSortChange(key: SortKey) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
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

        <section className="table-section" aria-labelledby="events-heading">
          <div className="section-heading">
            <h2 id="events-heading">Milestone Events</h2>
            <p>Sortable public health timeline records from the local dataset.</p>
          </div>
          <EventsTable
            events={sortedEvents}
            sort={sort}
            onSortChange={handleSortChange}
          />
        </section>
      </main>
    </div>
  );
}
