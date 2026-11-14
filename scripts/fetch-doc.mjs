// Pulls the latest "Products Tried" Google Doc as Markdown and saves it to
// data/products.md. If the download fails, the last saved copy is kept so the
// build still succeeds.
import { writeFileSync, existsSync } from "node:fs";

const DOC_ID =
  process.env.DOC_ID || "1i0WAYQNTLBIHUcqjO2GhS7tYvlBXkhaBGp2GW9z4xBg";
const url = `https://docs.google.com/document/d/${DOC_ID}/export?format=md`;
const out = new URL("../data/products.md", import.meta.url);

try {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const md = await res.text();
  if (!/^\s*\|\s*Tool\s*\|/im.test(md)) {
    throw new Error("No table with a 'Tool' column found in the Doc export");
  }
  writeFileSync(out, md);
  const rows = md.split("\n").filter((l) => l.trim().startsWith("|")).length - 2;
  console.log(`Fetched Doc: ${rows} rows`);
} catch (err) {
  if (!existsSync(out)) {
    console.error(`Could not fetch the Doc and no saved copy exists: ${err.message}`);
    process.exit(1);
  }
  console.warn(`Could not fetch the Doc (${err.message}); using the saved copy.`);
}
