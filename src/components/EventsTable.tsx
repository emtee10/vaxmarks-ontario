import type { MilestoneEvent, SortKey, SortState } from '../types/event';
import { formatLabel, formatListValue } from '../utils/events';

interface EventsTableProps {
  events: MilestoneEvent[];
  sort: SortState;
  onSortChange: (key: SortKey) => void;
}

const sortableColumns: Record<SortKey, string> = {
  date: 'Date',
  agent: 'Agent',
  event_type: 'Event Type',
  population: 'Population',
  evidence_strength: 'Evidence',
};

export function EventsTable({ events, sort, onSortChange }: EventsTableProps) {
  return (
    <div className="table-wrap" aria-label="Milestone events table">
      <table>
        <thead>
          <tr>
            <SortableHeader
              columnKey="date"
              label={sortableColumns.date}
              sort={sort}
              onSortChange={onSortChange}
            />
            <SortableHeader
              columnKey="agent"
              label={sortableColumns.agent}
              sort={sort}
              onSortChange={onSortChange}
            />
            <th scope="col">Disease</th>
            <SortableHeader
              columnKey="event_type"
              label={sortableColumns.event_type}
              sort={sort}
              onSortChange={onSortChange}
            />
            <SortableHeader
              columnKey="population"
              label={sortableColumns.population}
              sort={sort}
              onSortChange={onSortChange}
            />
            <SortableHeader
              columnKey="evidence_strength"
              label={sortableColumns.evidence_strength}
              sort={sort}
              onSortChange={onSortChange}
            />
            <th scope="col">Summary</th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td data-label="Date">{event.date || 'Not specified'}</td>
              <td data-label="Agent">{formatListValue(event.agent)}</td>
              <td data-label="Disease">{formatListValue(event.disease)}</td>
              <td data-label="Event Type">
                <span className="badge badge--event">
                  {formatLabel(event.event_type)}
                </span>
              </td>
              <td data-label="Population">{formatLabel(event.population)}</td>
              <td data-label="Evidence">
                <span className="badge badge--evidence">
                  {formatLabel(event.evidence_strength)}
                </span>
              </td>
              <td data-label="Summary" className="summary-cell">
                {event.summary || event.short_title || 'No summary available'}
              </td>
              <td data-label="Source">
                {event.source_url ? (
                  <a href={event.source_url} target="_blank" rel="noreferrer">
                    Source
                  </a>
                ) : (
                  'Not available'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface SortableHeaderProps {
  columnKey: SortKey;
  label: string;
  sort: SortState;
  onSortChange: (key: SortKey) => void;
}

function SortableHeader({
  columnKey,
  label,
  sort,
  onSortChange,
}: SortableHeaderProps) {
  const isActive = sort.key === columnKey;
  const indicator = isActive && sort.direction === 'asc' ? '↑' : '↓';

  return (
    <th scope="col">
      <button
        className="sort-button"
        type="button"
        onClick={() => onSortChange(columnKey)}
        aria-sort={
          isActive ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined
        }
      >
        <span>{label}</span>
        <span aria-hidden="true">{indicator}</span>
      </button>
    </th>
  );
}
