// Robust error message extraction to prevent "[object Object]" in UI

export function extractErrorMessage(err, fallback = 'An unexpected error occurred') {
  if (!err) return fallback;

  // 1. Direct string
  if (typeof err === 'string') {
    const trimmed = err.trim();
    if (!trimmed || trimmed === '[object Object]' || trimmed.startsWith('[object ')) {
      return fallback;
    }
    return trimmed;
  }

  // 2. Error object with message
  if (err instanceof Error) {
    if (err.message && typeof err.message === 'string') {
      const msg = err.message.trim();
      if (msg && msg !== '[object Object]' && !msg.startsWith('[object ')) {
        return msg;
      }
    }
  }

  // 3. Inspect attached response data (Spring Boot / API response)
  const data = err.data || err.response?.data || (typeof err === 'object' ? err : null);

  if (data && typeof data === 'object') {
    // Spring Boot ApiResponse format: { message: "...", error: "..." }
    if (typeof data.message === 'string' && data.message.trim() && data.message !== '[object Object]') {
      return data.message.trim();
    }
    if (typeof data.error === 'string' && data.error.trim() && data.error !== '[object Object]') {
      return data.error.trim();
    }
    // RFC 7807 Problem Details
    if (typeof data.detail === 'string' && data.detail.trim()) {
      return data.detail.trim();
    }
    if (typeof data.title === 'string' && data.title.trim()) {
      return data.title.trim();
    }
    // Spring validation errors array
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const first = data.errors[0];
      if (typeof first === 'string') return first;
      if (first.defaultMessage) return first.defaultMessage;
      if (first.message) return first.message;
    }
    // Nested error object
    if (typeof data.error === 'object' && data.error !== null) {
      return extractErrorMessage(data.error, fallback);
    }
  }

  return fallback;
}
