// Public JSON of the list, so other sites (like my portfolio) can reuse it.
import { loadTools, categoriesFor } from "../lib/tools.js";

export function GET() {
  const tools = loadTools();
  return new Response(
    JSON.stringify(
      { updated: new Date().toISOString(), categories: categoriesFor(tools), tools },
      null,
      2
    ),
    { headers: { "Content-Type": "application/json" } }
  );
}
