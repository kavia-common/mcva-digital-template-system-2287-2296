const KEY_PREFIX = 'mcva_digital_template';

// PUBLIC_INTERFACE
export function getDraft(templateId) {
  /** Read a saved draft for a given template from localStorage. */
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}:draft:${templateId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function saveDraft(templateId, data) {
  /** Persist a draft for a given template to localStorage. */
  try {
    localStorage.setItem(`${KEY_PREFIX}:draft:${templateId}`, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// PUBLIC_INTERFACE
export function getTheme() {
  /** Get saved theme mode (light|dark) from localStorage. */
  try {
    return localStorage.getItem(`${KEY_PREFIX}:theme`) || null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function saveTheme(theme) {
  /** Save theme mode (light|dark) to localStorage. */
  try {
    localStorage.setItem(`${KEY_PREFIX}:theme`, theme);
  } catch {
    // ignore
  }
}

// PUBLIC_INTERFACE
export function getGalleryState() {
  /** Get saved UI Blocks gallery state (category, search, tags) */
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}:galleryState`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function saveGalleryState(state) {
  /** Save UI Blocks gallery state (category, search, tags) */
  try {
    localStorage.setItem(`${KEY_PREFIX}:galleryState`, JSON.stringify(state));
  } catch {
    // ignore
  }
}
