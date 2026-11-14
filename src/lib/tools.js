// Reads data/products.md (the Google Doc export) and turns its table into a
// clean list of tools for the site.
import md from "../../data/products.md?raw";
import { nameFixes, urlFixes, textFixes, categoryFixes } from "./overrides.js";

// Order here is the order categories appear on the site and on the radar.
export const CATEGORIES = [
  "Models & inference",
  "Coding agents & IDEs",
  "Code review",
  "Agents",
  "Automation & workflows",
  "App builders",
  "Knowledge & research",
  "Observability & data",
  "Voice & media",
  "Productivity",
  "Dev tools & infra",
];

// First matching rule wins. Tested against "name purpose", lowercased.
const RULES = [
  ["Code review", /code review/],
  ["Coding agents & IDEs", /coding|code editor|\bide\b|ai-ide|ai engineer|software development|software factor|developer management/],
  ["Models & inference", /\bllm\b|\bmodels?\b|inference|routing|gateway|local ai|local models/],
  ["Voice & media", /voice|speech|video|presentation|content|social media|computer vision|emotional/],
  ["Observability & data", /observability|analytics|\bdata\b/],
  ["App builders", /vibe|apps? builder|build with ai|website|micro apps|artifact building|build and|create websites|design/],
  ["Automation & workflows", /automation|workflow|scheduling/],
  ["Agents", /agent|ai workplace|os for agents/],
  ["Knowledge & research", /research|knowledge|notes|context|study/],
  ["Productivity", /productivity|meeting|communit|travel|talent|coworker|collaboration|super app|everything/],
  ["Dev tools & infra", /git|terminal|editor|tui|container|infrastructure|cloud|database|web server|sandbox|frontend|diagram|browser|g-suite|tools|storage|language|building blocks/],
];

function guessCategory(name, purpose) {
  if (categoryFixes[name]) return categoryFixes[name];
  const text = `${name} ${purpose}`.toLowerCase();
  for (const [cat, re] of RULES) if (re.test(text)) return cat;
  return "Dev tools & infra";
}

// Undo Google Docs' Markdown escaping and drop placeholder dashes.
function clean(cell = "") {
  let s = cell.replace(/\\([\\`*_{}\[\]()#+\-.!|~>])/g, "$1").trim();
  if (/^-+f?$/.test(s)) return "";
  for (const [re, to] of textFixes) s = s.replace(re, to);
  return s;
}

// Keep work context generic on the public site.
function scrubNotes(s) {
  return s
    .replace(/Santai exploration/gi, "Work exploration")
    .replace(/\s*\bSantai\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s*([a-z])/, (m) => m.toUpperCase())
    .trim();
}

function contextTags(notes) {
  const n = notes.toLowerCase();
  const tags = [];
  if (/event|conference|meetup|devcon|tech week/.test(n)) tags.push("At an event");
  if (/\bwork\b/.test(n)) tags.push("Work");
  if (/personal|mac\b|desktop app|phone|daily|side project/.test(n)) tags.push("Personal");
  return tags;
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function parseTools(md) {
  const rows = md
    .split("\n")
    .filter((l) => l.trim().startsWith("|"))
    .map((l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim()));
  if (rows.length < 2) return [];

  // Columns are found by name, so new columns (Category, Verdict...) can be
  // added to the Doc in any position.
  const header = rows[0].map((h) => clean(h).toLowerCase());
  const col = (...names) => header.findIndex((h) => names.some((n) => h.startsWith(n)));
  const c = {
    tool: col("tool"),
    tried: col("tried"),
    purpose: col("purpose"),
    notes: col("notes"),
    category: col("category"),
    verdict: col("verdict"),
  };

  const seen = new Set();
  const tools = [];
  for (const r of rows.slice(2)) {
    const rawTool = (r[c.tool] || "").trim();
    if (!rawTool) continue;
    const link = rawTool.match(/^\[(.+?)\]\((.+?)\)$/);
    const docName = clean(link ? link[1] : rawTool);
    const name = nameFixes[docName] || docName;
    let url = link ? link[2].trim() : "";
    if (urlFixes[docName]) url = urlFixes[docName];
    if (url && !/^https?:\/\//.test(url)) url = `https://${url}`;

    const key = name.toLowerCase();
    if (seen.has(key)) continue; // drop duplicate rows (e.g. Daytona)
    seen.add(key);

    const purpose = clean(r[c.purpose]);
    const notes = scrubNotes(clean(r[c.notes]));
    const docCategory = c.category >= 0 ? clean(r[c.category]) : "";
    tools.push({
      id: slug(name),
      name,
      url,
      domain: domainOf(url),
      tried: /^y/i.test(clean(r[c.tried])),
      purpose,
      notes,
      verdict: c.verdict >= 0 ? clean(r[c.verdict]) : "",
      category: docCategory || guessCategory(docName, purpose),
      tags: contextTags(notes),
    });
  }
  return tools;
}

export function loadTools() {
  return parseTools(md);
}

// Categories in display order, including any new ones written in the Doc.
export function categoriesFor(tools) {
  const extra = [...new Set(tools.map((t) => t.category))].filter((c) => !CATEGORIES.includes(c));
  return [...CATEGORIES, ...extra].filter((c) => tools.some((t) => t.category === c));
}
