export function installKodexErrorBoundary(): () => void {
  const errors: Array<{ message: string; source?: string; timestamp: number }> = [];
  (window as typeof window & { __KODEX_ERRORS__?: unknown }).__KODEX_ERRORS__ = errors;

  const onError = (event: ErrorEvent) => {
    errors.push({
      message: event.message,
      source: event.filename,
      timestamp: Date.now(),
    });
  };

  const onRejection = (event: PromiseRejectionEvent) => {
    errors.push({
      message: String(event.reason?.message ?? event.reason),
      source: 'unhandledrejection',
      timestamp: Date.now(),
    });
  };

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);

  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onRejection);
  };
}
