# MCVA Digital Template System – Frontend

This frontend is a lightweight React application that lets you design and preview digital templates with section-based editing, a live preview, and light/dark theming. It follows a modern “Ocean Professional” theme with subtle shadows, rounded corners, and smooth transitions.

## Quickstart

### Prerequisites
- Node.js 16+ and npm installed.

### Install and run
1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm start
   ```
   The app will be available at http://localhost:3000 by default.
3. Run tests:
   ```
   npm test
   ```
4. Build for production:
   ```
   npm run build
   ```

## Environment Configuration

This app reads configuration via Create React App’s REACT_APP_* variables. You can set these in a local .env file at the project root.

Supported variables:
- REACT_APP_API_BASE: Base URL for API calls. Used for future backend integration; currently logged in development.
- REACT_APP_BACKEND_URL: Alternate API base; used as a fallback when REACT_APP_API_BASE is not set.
- REACT_APP_FRONTEND_URL: Public frontend base URL; not required for local development.
- REACT_APP_WS_URL: WebSocket URL for real-time features; reserved for future use.
- REACT_APP_NODE_ENV: Optional override of node environment; defaults to process.env.NODE_ENV.
- REACT_APP_NEXT_TELEMETRY_DISABLED: When set to "true", disables telemetry in compatible environments.
- REACT_APP_ENABLE_SOURCE_MAPS: Control source map generation; defaults to "true".
- REACT_APP_PORT: Port hint shown in the footer; defaults to "3000".
- REACT_APP_TRUST_PROXY: Proxy trust setting for deployments behind proxies; not required locally.
- REACT_APP_LOG_LEVEL: Logging level; defaults to "info".
- REACT_APP_HEALTHCHECK_PATH: Healthcheck path the app may expose or reference; defaults to "/healthz".
- REACT_APP_FEATURE_FLAGS: Comma‑separated flags to enable optional features; reserved for future use.
- REACT_APP_EXPERIMENTS_ENABLED: Toggle experimental features; "false" by default.

Reference in code:
- Environment values are consumed via src/hooks/useEnv.js and surfaced in App (footer and console in development). Only REACT_APP_* variables are available to the client at build time.

Example .env:
```
REACT_APP_API_BASE=https://api.example.com
REACT_APP_FRONTEND_URL=http://localhost:3000
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_PORT=3000
REACT_APP_LOG_LEVEL=debug
REACT_APP_HEALTHCHECK_PATH=/healthz
REACT_APP_FEATURE_FLAGS=beta-ui,new-editor
REACT_APP_EXPERIMENTS_ENABLED=false
REACT_APP_NEXT_TELEMETRY_DISABLED=true
REACT_APP_ENABLE_SOURCE_MAPS=true
```

## Application Layout

The UI is organized into three primary areas:

- Top Navigation (src/components/TopNav.js): Provides the application brand, a template selector, local “Save” action, a preview toggle, and a theme toggle. It is sticky and always visible.
- Sidebar (src/components/Sidebar.js): Lists sections defined by the current template and supports keyboard navigation and accessible selection states.
- Workspace (Editor + Preview)
  - Editor (src/components/Editor.js): Renders fields for the current section and binds changes to the in-memory draft state. Supported field types include text, select, checkbox, and color inputs.
  - Preview (src/components/Preview.js): Shows a read‑only preview driven by the collected draft values and the current theme tokens.

Data flow:
- Templates are currently provided from src/mock/templates.js.
- Draft data is persisted to localStorage via src/utils/storage.js to allow you to save and resume work.
- Theme choice (light or dark) is persisted and applied to document root via src/theme.js.

## Theme and Styling

The “Ocean Professional” theme is implemented as CSS variables and JavaScript tokens:

- CSS Variables (src/App.css): Define base colors, radii, shadows, and gradients. A [data-theme="dark"] attribute on the root toggles dark mode overrides.
- Theme Tokens (src/theme.js): themeTokens(mode) returns tokens for light/dark, while applyThemeToDocument(mode) sets the data-theme attribute on document.documentElement.

To switch themes at runtime, the app calls applyThemeToDocument and persists the choice with saveTheme in src/utils/storage.js. You can extend tokens or CSS variables to add new semantic colors or surface styles.

## Extending Templates and Sections

This app is designed to make it easy to add new templates, sections, and fields.

- Add or modify templates: See src/mock/templates.js. Each template includes:
  - id and name
  - sections: an ordered array where every section has:
    - id, label, description
    - fields: an array of field definitions, each with:
      - name, label, type ('text' | 'select' | 'checkbox' | 'color'), default, and optional options for selects

- Supported field types and rendering:
  - The Editor component renders inputs based on field.type.
  - The Preview component reads values from the draft object using section ids (e.g., draft.details.title).

- Add a new field type:
  - Update Editor FieldControl in src/components/Editor.js to handle the new type and its input element.
  - Optionally update Preview in src/components/Preview.js if you want to display the new field values in the preview.
  - Add defaults in templates data to ensure initial state is populated in App when a template is selected.

- Persisting data:
  - Drafts are saved locally via src/utils/storage.js (getDraft and saveDraft).
  - The TopNav “Save” button triggers saveDraft in App.js. The code includes a commented example of how an API call could be made to REACT_APP_API_BASE in the future.

## Development Notes

- Tech stack: React 18 with Create React App tooling.
- Linting: ESLint configured via eslint.config.mjs.
- Accessibility: Keyboard navigation in Sidebar and ARIA labels across navigation, main, editor, preview, and footer elements.
- Tests: src/App.test.js validates presence of TopNav and Sidebar.

## Troubleshooting

- Variables not taking effect: CRA only injects REACT_APP_* variables at build time. Restart the dev server after changing .env.
- Port already in use: If 3000 is in use, CRA will prompt to use another port. The footer “Port” display reads REACT_APP_PORT and does not auto‑reflect the port CRA selects.
- Local storage issues: Clearing browser storage will reset saved drafts and theme.

## Learn More

- React docs: https://reactjs.org/
- Create React App docs: https://facebook.github.io/create-react-app/docs/getting-started
