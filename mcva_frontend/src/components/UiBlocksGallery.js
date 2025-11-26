import React, { useEffect, useMemo, useState } from 'react';
import UiBlockCard from './UiBlockCard';
import TagFilter from './TagFilter';
import { uiBlocks, categories } from '../mock/uiBlocks';
import { themeTokens } from '../theme';
import { saveGalleryState, getGalleryState } from '../utils/storage';

/**
 * PUBLIC_INTERFACE
 * UiBlocksGallery shows a filterable grid of UI blocks similar to Tailwind UI Blocks.
 * Features:
 * - Category tabs
 * - Search input (title/description/tags)
 * - Tag multi-select filter
 * - Responsive grid (1/2/3/4 columns by breakpoint via CSS)
 */
export default function UiBlocksGallery({ theme = 'light' }) {
  const tokens = themeTokens(theme);

  const initialPersisted = getGalleryState() || { category: 'All', search: '', tags: [] };
  const [category, setCategory] = useState(initialPersisted.category || 'All');
  const [search, setSearch] = useState(initialPersisted.search || '');
  const [selectedTags, setSelectedTags] = useState(new Set(initialPersisted.tags || []));

  // Collect unique tags from blocks
  const allTags = useMemo(() => {
    const s = new Set();
    uiBlocks.forEach(b => (b.tags || []).forEach(t => s.add(t)));
    return Array.from(s).sort();
  }, []);

  // Persist basic gallery state to localStorage
  useEffect(() => {
    saveGalleryState({
      category,
      search,
      tags: Array.from(selectedTags),
    });
  }, [category, search, selectedTags]);

  // Filtering logic
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return uiBlocks.filter((b) => {
      if (category !== 'All' && b.category !== category) return false;

      if (selectedTags.size) {
        const hasAll = Array.from(selectedTags).every(t => b.tags?.includes(t));
        if (!hasAll) return false;
      }

      if (!query) return true;
      const hay = [
        b.title?.toLowerCase() || '',
        b.description?.toLowerCase() || '',
        ...(b.tags || []).map(t => t.toLowerCase()),
      ].join(' ');
      return hay.includes(query);
    });
  }, [category, search, selectedTags]);

  const handleToggleTag = (tag) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <section className="ui-gallery" aria-label="UI Blocks Gallery">
      <header className="ui-gallery-header">
        <div className="editor-title">UI Blocks</div>
        <div className="editor-subtitle">
          Explore reusable UI blocks. Search and filter to find what you need.
        </div>
      </header>

      <div className="ui-gallery-controls">
        {/* Category Tabs */}
        <div className="ui-cat-tabs" role="tablist" aria-label="Categories">
          {categories.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                className={`toggle ui-cat-tab ${active ? 'ui-cat-active' : ''}`}
                onClick={() => setCategory(c)}
                aria-pressed={active}
                title={`Category: ${c}`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="ui-search">
          <label htmlFor="ui-search-input" className="sr-only">Search blocks</label>
          <input
            id="ui-search-input"
            className="input"
            type="search"
            placeholder="Search blocks by title, description, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search blocks"
          />
        </div>

        {/* Tag Filter */}
        <TagFilter
          tags={allTags}
          selected={selectedTags}
          onToggle={handleToggleTag}
        />
      </div>

      {/* Grid */}
      <div className="ui-grid">
        {filtered.length === 0 && (
          <div className="ui-empty">No blocks match your filters.</div>
        )}
        {filtered.map((b) => (
          <UiBlockCard key={b.id} block={b} tokens={tokens} />
        ))}
      </div>
    </section>
  );
}
