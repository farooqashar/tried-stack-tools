# What's on my radar

A site listing the AI tools, models and platforms I've tried, and the ones on my list to try. The list lives in my public **Products Tried** Google Doc; this site is built from it.

## How it updates

Every build runs `scripts/fetch-doc.mjs`, which downloads the Doc as Markdown into `data/products.md`, then Astro builds the static site from that table.

To refresh the live site after editing the Doc, open the service in Render and click **Manual Deploy → Deploy latest commit**. Pushing to `main` also redeploys.

If the Doc can't be reached during a build, the last copy committed in `data/products.md` is used.

## Editing the Doc

- Columns are matched by name: **Tool**, **Tried**, **Purpose/Idea**, **Notes**. Keep the table first in the Doc and avoid merged cells.
- Optional columns the site picks up automatically if you add them: **Category** (overrides the automatic category) and **Verdict** (shown in bold before the notes).
- Write the tool as a link (`[Name](url)`) to get a clickable name and a logo.

Small fixes (typos, missing links, category corrections) live in `src/lib/overrides.js`. Anything fixed in the Doc can be removed from there.

## Data for other sites

The built site serves the cleaned list at `/tools.json`, so my portfolio can reuse it.

## Local development

```sh
npm install
npm run fetch   # pull the latest Doc
npm run dev
```

Requires Node 22.23.4 or newer (Astro 7).
