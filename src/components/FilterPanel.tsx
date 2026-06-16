import { useState } from 'react';
import type { FilterKey, FilterState } from '../types/event';
import { formatLabel } from '../utils/events';

interface FilterGroup {
  key: FilterKey;
  label: string;
  values: string[];
}

interface FilterPanelProps {
  groups: FilterGroup[];
  filters: FilterState;
  activeFilterCount: number;
  onToggleFilter: (key: FilterKey, value: string) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  groups,
  filters,
  activeFilterCount,
  onToggleFilter,
  onClearFilters,
}: FilterPanelProps) {
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);

  return (
    <section className="filter-panel" aria-labelledby="filters-heading">
      <div className="filter-panel__header">
        <div>
          <h2 id="filters-heading">Filters</h2>
          <p>{activeFilterCount} active</p>
        </div>
        <button
          className="clear-filters-button"
          type="button"
          onClick={onClearFilters}
          disabled={activeFilterCount === 0}
        >
          Clear filters
        </button>
      </div>

      <div className="filter-groups">
        {groups.map((group) => {
          const selectedValues = filters[group.key];
          const selectedCount = selectedValues.length;
          const summaryText =
            selectedCount === 0 ? 'All' : `${selectedCount} selected`;

          return (
            <details
              className="filter-menu"
              data-active={selectedCount > 0}
              key={group.key}
              open={openFilter === group.key}
              onToggle={(event) => {
                setOpenFilter(event.currentTarget.open ? group.key : null);
              }}
            >
              <summary className="filter-menu__summary">
                <span>
                  <span className="filter-menu__label">{group.label}</span>
                  <span className="filter-menu__count">
                    {summaryText} / {group.values.length}
                  </span>
                </span>
                <span aria-hidden="true" className="filter-menu__chevron">
                  ▾
                </span>
              </summary>

              <div className="filter-menu__body">
                <div
                  className="chip-row"
                  role="group"
                  aria-label={`${group.label} filters`}
                >
                  {group.values.map((value) => {
                    const isActive = selectedValues.includes(value);

                    return (
                      <button
                        className="filter-chip"
                        data-active={isActive}
                        type="button"
                        key={value}
                        onClick={() => onToggleFilter(group.key, value)}
                        aria-pressed={isActive}
                      >
                        {formatLabel(value)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
