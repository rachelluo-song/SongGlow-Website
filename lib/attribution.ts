export type InquiryAttribution = {
  source_type: "ai" | "search" | "referral" | "direct";
  source?: string;
  medium?: string;
  campaign?: string;
  referrer_host?: string;
  landing_page: string;
};

const STORAGE_KEY = "songglow-inquiry-attribution";
const AI_SOURCE_PATTERN = /chatgpt|openai|perplexity|copilot|bingchat|gemini|googleai|claude|you\.com|phind/i;
const SEARCH_SOURCE_PATTERN = /google|bing|duckduckgo|yahoo|baidu/i;

function text(value: string | null, limit = 120) {
  return value?.trim().slice(0, limit) || undefined;
}

function referrerHost() {
  if (!document.referrer) return undefined;
  try {
    return new URL(document.referrer).hostname.toLowerCase();
  } catch {
    return undefined;
  }
}

function sourceType(source?: string, referrer?: string): InquiryAttribution["source_type"] {
  const signal = `${source ?? ""} ${referrer ?? ""}`;
  if (AI_SOURCE_PATTERN.test(signal)) return "ai";
  if (SEARCH_SOURCE_PATTERN.test(signal)) return "search";
  if (referrer) return "referral";
  return "direct";
}

export function getInquiryAttribution(): InquiryAttribution {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved) as InquiryAttribution;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  const params = new URLSearchParams(window.location.search);
  const source = text(params.get("utm_source"));
  const referrer = referrerHost();
  const attribution: InquiryAttribution = {
    source_type: sourceType(source, referrer),
    source,
    medium: text(params.get("utm_medium")),
    campaign: text(params.get("utm_campaign")),
    referrer_host: referrer,
    landing_page: window.location.pathname.slice(0, 250) || "/",
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  return attribution;
}
