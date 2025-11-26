/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
export default function Sidebar({ sections, currentSection, onSelect }) {
  /** Sidebar listing sections; arrow-key navigable, accessible selection state. */
  const containerRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, sections.length);
  }, [sections.length]);

  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(idx + 1, sections.length - 1);
      buttonRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(idx - 1, 0);
      buttonRefs.current[prev]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(sections[idx].id);
    }
  };

  return (
    <aside className="sidebar" ref={containerRef} aria-label="Sections">
      <h2>Sections</h2>
      <ul role="listbox" aria-label="Template sections">
        {sections.map((s, idx) => (
          <li key={s.id}>
            <button
              ref={el => buttonRefs.current[idx] = el}
              role="option"
              aria-selected={currentSection === s.id}
              onClick={() => onSelect(s.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
