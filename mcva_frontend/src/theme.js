 // PUBLIC_INTERFACE
export function themeTokens(mode = 'light') {
  /** Returns theme token map for the given mode. */
  const common = {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    gradient: 'from-blue-500/10 to-gray-50'
  };
  if (mode === 'dark') {
    return {
      ...common,
      background: '#0f172a',
      surface: '#111827',
      text: '#e5e7eb',
    };
  }
  return {
    ...common,
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
  };
}

// PUBLIC_INTERFACE
export function applyThemeToDocument(mode = 'light') {
  /** Apply current theme to the root element via data-theme attribute. */
  const root = document.documentElement;
  root.setAttribute('data-theme', mode);
}
