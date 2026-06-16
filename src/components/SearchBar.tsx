export function SearchBar() {
  return (
    <div className="search-bar">
      <label htmlFor="event-search">Search events</label>
      <input
        id="event-search"
        type="search"
        placeholder="Search by vaccine, disease, population, or summary"
        aria-describedby="search-help"
      />
      <span id="search-help" className="visually-hidden">
        Search will be enabled in a future iteration.
      </span>
    </div>
  );
}
