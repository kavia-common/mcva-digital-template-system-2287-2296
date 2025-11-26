/* eslint-disable react/prop-types */
import React from 'react';

// PUBLIC_INTERFACE
export default function Preview({ template, draft, tokens }) {
  /** Renders a simple form preview using collected draft values and theme tokens. */
  if (!template) {
    return <div>Nothing to preview.</div>;
  }

  const details = draft?.details || {};
  const fields = draft?.fields || {};
  const styling = draft?.styling || {};
  const buttonColor = styling?.accentColor || tokens.secondary;

  return (
    <div>
      <div className="editor-header">
        <div className="editor-title">Preview</div>
        <div className="editor-subtitle">{template.name}</div>
      </div>
      <form className="preview-form" onSubmit={(e) => e.preventDefault()} aria-label="Preview form">
        <div className="row">
          <label htmlFor="p-title">Title</label>
          <input id="p-title" type="text" value={details.title || ''} readOnly />
        </div>
        <div className="row">
          <label htmlFor="p-desc">Description</label>
          <input id="p-desc" type="text" value={details.description || ''} readOnly />
        </div>
        <div className="row">
          <label htmlFor="p-type">Type</label>
          <select id="p-type" value={fields.type || ''} readOnly>
            <option>{fields.type || 'Select...'}</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="p-active">Active</label>
          <input id="p-active" type="text" value={fields.active ? 'Yes' : 'No'} readOnly />
        </div>
        <div className="row">
          <label htmlFor="p-color">Accent</label>
          <input id="p-color" type="text" value={styling.accentColor || tokens.primary} readOnly />
        </div>
        <button
          className="submit"
          style={{ backgroundColor: buttonColor }}
          aria-label="Submit preview"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
