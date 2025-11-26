import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TagFilter renders a list of selectable tag pills or checkboxes for filtering.
 * Props:
 * - tags: string[] all available tags
 * - selected: Set<string> currently selected tags
 * - onToggle: (tag: string) => void toggle selection
 */
export default function TagFilter({ tags = [], selected = new Set(), onToggle }) {
  if (!tags.length) return null;
  return (
    <div className="tag-filter" aria-label="Tag filter">
      {tags.map((tag) => {
        const active = selected.has(tag);
        return (
          <button
            key={tag}
            type="button"
            className={`tag ${active ? 'tag-active' : ''}`}
            aria-pressed={active}
            onClick={() => onToggle(tag)}
            title={`Filter by tag: ${tag}`}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
}
