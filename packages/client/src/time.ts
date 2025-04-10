const KEY = "picperf:crawl:time";

export function isExpired() {
  const lastTime = localStorage.getItem(KEY);

  if (!lastTime) {
    return true;
  }

  const now = Date.now();
  const diff = now - parseInt(lastTime, 10);

  return diff > 1000 * 60 * 60 * 24;
}

export function set() {
  localStorage.setItem(KEY, Date.now().toString());
}
