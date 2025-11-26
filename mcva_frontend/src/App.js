import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import { themeTokens, applyThemeToDocument } from './theme';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import UiBlocksGallery from './components/UiBlocksGallery';
import { useEnv } from './hooks/useEnv';
import { templates as mockTemplates } from './mock/templates';
import { getDraft, saveDraft, getTheme, saveTheme } from './utils/storage';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application component for the MCVA Digital Template System frontend.
   * Provides layout with TopNav, Sidebar, Editor, and Preview.
   * Manages template selection, section navigation, draft editing, preview mode,
   * theme toggling, and a UI Blocks gallery view with persistence to localStorage.
   */
  const env = useEnv();
  const [templates, setTemplates] = useState(mockTemplates);
  const [currentTemplateId, setCurrentTemplateId] = useState(mockTemplates[0]?.id || '');
  const [currentSection, setCurrentSection] = useState(null);
  const [draft, setDraft] = useState({});
  const [previewMode, setPreviewMode] = useState(true);
  const [theme, setTheme] = useState(getTheme() || 'light');
  const [currentView, setCurrentView] = useState('editor'); // 'editor' | 'ui-blocks'

  const currentTemplate = useMemo(
    () => templates.find(t => t.id === currentTemplateId),
    [templates, currentTemplateId]
  );

  // Initialize current section when template changes
  useEffect(() => {
    if (currentTemplate?.sections?.length) {
      setCurrentSection(currentTemplate.sections[0].id);
    } else {
      setCurrentSection(null);
    }
  }, [currentTemplateId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load draft when template changes
  useEffect(() => {
    if (!currentTemplateId) return;
    const saved = getDraft(currentTemplateId);
    if (saved) {
      setDraft(saved);
    } else {
      // seed from template defaults
      const initial = {};
      currentTemplate?.sections?.forEach(sec => {
        initial[sec.id] = {};
        sec.fields.forEach(f => {
          initial[sec.id][f.name] = f.default ?? (f.type === 'checkbox' ? false : '');
        });
      });
      setDraft(initial);
    }
  }, [currentTemplateId, currentTemplate]);

  // Apply theme to document and persist
  useEffect(() => {
    applyThemeToDocument(theme);
    saveTheme(theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const onTemplateChange = (id) => {
    setCurrentTemplateId(id);
  };

  // PUBLIC_INTERFACE
  const onDraftChange = (sectionId, fieldName, value) => {
    setDraft(prev => {
      const next = { ...prev, [sectionId]: { ...(prev[sectionId] || {}), [fieldName]: value } };
      return next;
    });
  };

  // PUBLIC_INTERFACE
  const onSave = () => {
    if (!currentTemplateId) return;
    saveDraft(currentTemplateId, draft);
    // Prepare for future API integration (do not call)
    // const apiBase = env.apiBase;
    // fetch(`${apiBase}/templates/${currentTemplateId}`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(draft) })
    //   .then(() => {}).catch(() => {});
  };

  // PUBLIC_INTERFACE
  const onToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const onTogglePreview = () => {
    setPreviewMode(p => !p);
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Optional dev visibility
      // eslint-disable-next-line no-console
      console.log('[ENV] API Base:', env.apiBase || '(none)');
    }
  }, [env.apiBase]);

  const sections = currentTemplate?.sections || [];

  return (
    <div className="app-root" data-theme={theme}>
      <TopNav
        templates={templates}
        currentTemplateId={currentTemplateId}
        onTemplateChange={onTemplateChange}
        onSave={onSave}
        onToggleTheme={onToggleTheme}
        theme={theme}
        previewMode={previewMode}
        onTogglePreview={onTogglePreview}
        currentView={currentView}
        onChangeView={setCurrentView}
      />
      <div className="app-body">
        {currentView === 'editor' ? (
          <>
            <Sidebar
              sections={sections}
              currentSection={currentSection}
              onSelect={setCurrentSection}
            />
            <main className="workspace" role="main">
              <div className={`editor-preview ${previewMode ? 'show-preview' : 'hide-preview'}`}>
                <section className="editor-pane" aria-label="Editor panel">
                  <Editor
                    key={`${currentTemplateId}-${currentSection}`}
                    sections={sections}
                    currentSection={currentSection}
                    draft={draft}
                    onDraftChange={onDraftChange}
                  />
                </section>
                <section className="preview-pane" aria-label="Preview panel">
                  <Preview
                    template={currentTemplate}
                    draft={draft}
                    tokens={themeTokens(theme)}
                  />
                </section>
              </div>
            </main>
          </>
        ) : (
          <>
            {/* Full-width gallery (no sidebar) */}
            <div style={{ gridColumn: '1 / -1' }} />
            <main className="workspace" role="main" aria-labelledby="ui-blocks-heading">
              <h2 id="ui-blocks-heading" className="sr-only">UI Blocks</h2>
              <section className="editor-pane" aria-label="UI Blocks Gallery Panel">
                <UiBlocksGallery theme={theme} />
              </section>
            </main>
          </>
        )}
      </div>
      <footer className="app-footer" aria-label="Application footer">
        <span className="env-footnote">
          API: {env.apiBase || 'not set'} • Port: {env.port || '3000'}
        </span>
      </footer>
    </div>
  );
}

export default App;
