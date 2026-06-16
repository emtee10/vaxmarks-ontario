interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="search-bar">
      <label htmlFor="event-search">Search events</label>
      <div className="search-input-wrap">
        <input
          id="event-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by vaccine, disease, population, or summary"
          aria-describedby="search-help"
        />
        {value ? (
          <button className="search-clear-button" type="button" onClick={onClear}>
            Clear
          </button>
        ) : null}
      </div>
      <span id="search-help" className="visually-hidden">
        Search matches event summaries, agents, diseases, populations, event
        types, titles, notes, and IDs.
      </span>
    </div>
  );
}
