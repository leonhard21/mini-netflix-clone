const store = new Map();
const TTL_MS = 5 * 60 * 1000;

export function getFromCache(key) {
  const entry = store.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }

  return entry.value;
}

export function setCache(key, value) {
  store.set(key, { value, expiresAt: Date.now() + TTL_MS });
}
