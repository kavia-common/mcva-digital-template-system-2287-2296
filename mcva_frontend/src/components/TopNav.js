/* eslint-disable react/prop-types */
import React from 'react';

// PUBLIC_INTERFACE
export default function TopNav({
  templates,
  currentTemplateId,
  onTemplateChange,
  onSave,
  onToggleTheme,
  theme,
  previewMode,
  onTogglePreview,
  currentView = 'editor',
  onChangeView
}) {
  /** Top navigation bar: brand, editor/gallery switch, template dropdown, save button, preview and theme toggles. */
  const isGallery = currentView === 'ui-blocks';

  return (
    <nav className="topnav" aria-label="Top navigation">
      <div className="topnav-inner">
        <div className="brand" aria-label="Application title">MCVA Templates</div>

        {/* View switcher */}
        <button
          className="toggle"
          onClick={() => onChangeView?.('editor')}
          aria-pressed={currentView === 'editor'}
          aria-label="Go to Editor view"
          title="Editor"
        >
          Editor
        </button>
        <button
          className="toggle"
          onClick={() => onChangeView?.('ui-blocks')}
          aria-pressed={isGallery}
          aria-label="Go to UI Blocks gallery"
          title="UI Blocks"
        >
          UI Blocks
        </button>

        <div className="nav-spacer" />

        {/* Template selector remains available */}
        <label htmlFor="template-select" className="sr-only">Choose template</label>
        <select
          id="template-select"
          aria-label="Template switcher"
          className="select"
          value={currentTemplateId}
          onChange={(e) => onTemplateChange(e.target.value)}
        >
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        {!isGallery && (
          <button
            className="button primary"
            onClick={onSave}
            aria-label="Save current draft"
            title="Save (local)"
          >
            Save
          </button>
        )}

        {!isGallery && (
          <button
            className="toggle"
            onClick={onTogglePreview}
            aria-pressed={previewMode}
            aria-label="Toggle preview"
            title="Toggle preview pane"
          >
            {previewMode ? 'Hide Preview' : 'Show Preview'}
          </button>
        )}

        <button
          className="toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          title="Toggle light/dark theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
}
