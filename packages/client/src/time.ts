const KEY = "picperf:crawl:time";

interface CrawlRecords {
  [url: string]: string;
}

export function isExpired() {
  const crawlRecordTime = getForCurrentUrl();

  if (!crawlRecordTime) {
    return true;
  }

  const now = Date.now();
  const diff = now - parseInt(crawlRecordTime, 10);

  return diff > 1000 * 60 * 60 * 24;
}

export function set() {
  try {
    const current = get();

    current[window.location.href] = Date.now().toString();

    localStorage.setItem(KEY, JSON.stringify(current));
  } catch (e) {}
}

function getForCurrentUrl(): string | null {
  const crawlRecords = get();

  if (!crawlRecords) {
    return null;
  }

  return crawlRecords[window.location.href];
}

function get(): CrawlRecords {
  try {
    const records = JSON.parse(localStorage.getItem(KEY));

    if (!records) {
      return {};
    }

    return records;
  } catch (e) {
    console.error("Error getting crawl time from localStorage", e);

    return {};
  }
}
