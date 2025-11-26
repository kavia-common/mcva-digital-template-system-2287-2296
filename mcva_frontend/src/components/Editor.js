/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

// PUBLIC_INTERFACE
export default function Editor({ sections, currentSection, draft, onDraftChange }) {
  /** Editor renders the current section's fields and binds to draft via callbacks. */
  const section = useMemo(
    () => sections.find(s => s.id === currentSection),
    [sections, currentSection]
  );

  if (!section) {
    return (
      <div>
        <div className="editor-header">
          <div className="editor-title">Editor</div>
        </div>
        <div>No section selected.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="editor-header">
        <div className="editor-title">{section.label}</div>
        <div className="editor-subtitle">{section.description || ''}</div>
      </div>
      <div className="form-grid">
        {section.fields.map(field => (
          <FieldControl
            key={field.name}
            sectionId={section.id}
            field={field}
            value={(draft?.[section.id] || {})[field.name]}
            onChange={onDraftChange}
          />
        ))}
      </div>
    </div>
  );
}

function FieldControl({ sectionId, field, value, onChange }) {
  const id = `${sectionId}-${field.name}`;
  const handle = (v) => onChange(sectionId, field.name, v);

  switch (field.type) {
    case 'text':
      return (
        <div className="form-field">
          <label htmlFor={id}>{field.label}</label>
          <input
            id={id}
            className="input"
            type="text"
            value={value ?? ''}
            placeholder={field.placeholder || ''}
            onChange={(e) => handle(e.target.value)}
          />
        </div>
      );
    case 'select':
      return (
        <div className="form-field">
          <label htmlFor={id}>{field.label}</label>
          <select
            id={id}
            className="select-input"
            value={value ?? ''}
            onChange={(e) => handle(e.target.value)}
          >
            {(field.options || []).map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div className="form-field">
          <label htmlFor={id}>
            <input
              id={id}
              className="checkbox-input"
              type="checkbox"
              checked={!!value}
              onChange={(e) => handle(e.target.checked)}
            />{' '}
            {field.label}
          </label>
        </div>
      );
    case 'color':
      return (
        <div className="form-field">
          <label htmlFor={id}>{field.label}</label>
          <input
            id={id}
            className="color-input"
            type="color"
            value={value || '#2563EB'}
            onChange={(e) => handle(e.target.value)}
            aria-label={`${field.label} color`}
          />
        </div>
      );
    default:
      return (
        <div className="form-field">
          <label htmlFor={id}>{field.label}</label>
          <input
            id={id}
            className="input"
            type="text"
            value={value ?? ''}
            onChange={(e) => handle(e.target.value)}
          />
        </div>
      );
  }
}
