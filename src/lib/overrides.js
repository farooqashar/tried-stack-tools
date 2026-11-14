// Small fixes applied on top of the Google Doc. Fixing the Doc itself is
// better; anything fixed there can be removed from here.

// Display-name fixes, keyed by the name as written in the Doc.
export const nameFixes = {
  Texual: "Textual",
  "Stands Agents": "Strands Agents",
  Gittea: "Gitea",
  Roomate: "Roomote",
  "Tightnit AI": "Tightknit AI",
};

// Links for rows that have none (or a broken one) in the Doc.
export const urlFixes = {
  Tessl: "https://tessl.io/",
  Todoist: "https://todoist.com/",
  TinyFish: "https://www.tinyfish.ai/",
  "GoDaddy Airo": "https://www.godaddy.com/airo",
  "Google AI Studio": "https://aistudio.google.com/",
  FlutterFlow: "https://flutterflow.io/",
  Ionos: "https://www.ionos.com/",
  Hostinger: "https://www.hostinger.com/",
  Dyad: "https://www.dyad.sh/",
  "P5.js": "https://p5js.org/",
  "Deck.co": "https://www.deck.co/",
  "Thi.ng": "https://thi.ng/",
};

// Text fixes applied to purpose and notes.
export const textFixes = [
  [/Antrophic/g, "Anthropic"],
];

// Pin a category for a tool when the automatic guess is wrong.
export const categoryFixes = {
  Granola: "Productivity",
  Obsidian: "Knowledge & research",
  "Tor Browser": "Dev tools & infra",
  "Wispr Flow": "Voice & media",
  Cluely: "Productivity",
  Retool: "App builders",
  Framer: "App builders",
  "ClickHouse Cloud": "Observability & data",
  "Stripe/Link CLI": "Dev tools & infra",
  Duckbill: "Productivity",
  Superhuman: "Productivity",
  Discourse: "Productivity",
  Temporal: "Automation & workflows",
  Highlight: "Productivity",
  "Highlight AI": "Productivity",
  "Pika": "Agents",
  "Muse": "Agents",
  "Kiro": "Coding agents & IDEs",
  "OpenCode": "Coding agents & IDEs",
  "OpenClaw": "Agents",
  "Fish Audio": "Voice & media",
  Vitara: "App builders",
  Standout: "Productivity",
  "Google AI Studio": "Models & inference",
  Onyx: "Knowledge & research",
  "Paper.design": "App builders",
  "Magicpatterns": "App builders",
};
