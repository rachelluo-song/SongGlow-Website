const SITE_URL = "https://songglow.com";
const KEY = "6f2d9a7c4b8e41f0a3c5d7e9b1f62480";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

const sitemapResponse = await fetch(`${SITE_URL}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Could not read sitemap: ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1]
);

if (urlList.length === 0) {
  throw new Error("The sitemap did not contain any URLs.");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

if (!response.ok && response.status !== 202) {
  throw new Error(`IndexNow submission failed: ${response.status}`);
}

console.log(`Submitted ${urlList.length} URLs to IndexNow (${response.status}).`);
