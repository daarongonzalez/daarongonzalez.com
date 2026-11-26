## What this project is
- D'Aaron Gonzalez's personal portfolio, at daarongonzalez.com.
- Astro with React islands and Tailwind CSS v4, rendered on a Cloudflare Worker.
- Most content is managed in Sanity. Each page falls back to the defaults in `src/data` when Sanity has nothing.

## Where the project stands
- Read `docs/status.md` first in a new session. It lists what is live, the accounts and what is left.
- Update it at the end of each piece of work.

## Voice
- First person, approachable, not casual.
- Plain words, no jargon. Keep bullets short.
- Never use the word "implement".

## Design rules
- Tokens are in the `@theme` block of `src/styles/global.css`. Use the Tailwind classes they create (`ink-*`, `brand-*`, `sun-*`, `cream`). Do not write raw hex colours in components.
- Fonts: Nanum Gothic 800, uppercase, for headings (`.hd`). Nunito Sans for body.
- Brand colours: Resolution Blue (`brand`) and Sun gold (`sun`), on white and cream.
- Reuse the shared components in `src/components` (Button, TagPill, cards, SectionHeading) before making new ones.
- If a rule is missing, ask before inventing one.

## Content and Sanity
- Sanity project `ylsopuoz`, dataset `production`. The Studio runs at `/studio`.
- The schema lives in `sanity.config.ts`. Queries live in `src/lib/sanity.ts`.
- When adding a field, keep a local default in `src/data` and read it through `pick()` in `src/lib/content.ts`, so the page never breaks on empty content.
- Publishing, unpublishing or deleting Sanity documents changes the live site. Ask first.

## Checks and deploy
- `npm run check` and `npm run build` must pass before a push.
- A push to `main` deploys to the `daarongonzalez` Worker through `.github/workflows/deploy.yml`.

## Scope for this project
- Use only this repo's tokens, fonts and assets. Never pull in Nativo or Apostrophe Software styles.
- Connectors: GitHub and Sanity. No Neon or Figma unless the owner asks.
- Some Work images are also used on apostrophesoftware.com. Change them here only. Copy across only when asked.
