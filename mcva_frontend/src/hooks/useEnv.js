 // PUBLIC_INTERFACE
export function useEnv() {
  /**
   * Safely reads environment variables and returns defaults when undefined.
   * Note: CRA only exposes REACT_APP_* at build time.
   */
  const apiBase = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';
  const port = process.env.REACT_APP_PORT || '3000';
  const ws = process.env.REACT_APP_WS_URL || '';
  const logLevel = process.env.REACT_APP_LOG_LEVEL || 'info';
  const nodeEnv = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development';

  return {
    apiBase,
    port,
    ws,
    logLevel,
    nodeEnv,
    frontendUrl: process.env.REACT_APP_FRONTEND_URL || '',
    trustProxy: process.env.REACT_APP_TRUST_PROXY || '',
    healthcheckPath: process.env.REACT_APP_HEALTHCHECK_PATH || '/healthz',
    featureFlags: process.env.REACT_APP_FEATURE_FLAGS || '',
    experiments: process.env.REACT_APP_EXPERIMENTS_ENABLED || 'false',
    telemetryDisabled: process.env.REACT_APP_NEXT_TELEMETRY_DISABLED || 'true',
    enableSourceMaps: process.env.REACT_APP_ENABLE_SOURCE_MAPS || 'true',
  };
}
