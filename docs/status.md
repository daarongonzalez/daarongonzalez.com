# Where daarongonzalez.com stands

Status: 26 November 2026. **Start here** in a new session. Update this page
at the end of each piece of work.

## What is live

daarongonzalez.com runs on the Cloudflare Worker `daarongonzalez`, deployed
from `main` by GitHub Actions.

| Route | Page | Content from |
|---|---|---|
| `/` | Home: hero, services, Work row, reviews, playlist card | Sanity, with fallbacks |
| `/about` | About: intro, timeline, approach | Sanity, with fallbacks |
| `/work`, `/work/[slug]` | Projects, workshops, session photos, case studies | Sanity (PR #16) |
| `/blog`, `/blog/[slug]` | Blog | Sanity |
| `/events`, `/events/[slug]` | Events with Luma sign-up | Sanity |
| `/studio` | Sanity Studio | — |

Recent work: Book a Call points at Cal.com, workshops mixed into Work, the
skills-series thumbnails, drawn play and pause icons on the playlist card.

## Accounts and settings

| What | Value |
|---|---|
| Sanity | Project `ylsopuoz`, dataset `production` |
| Cloudflare Worker | `daarongonzalez`, with KV namespace `SESSION` |
| Booking | Cal.com |
| Playlist card | Reads Spotify's public embed page. No key needed. The format is undocumented and can change; the card shows a fallback if it does |

**Secrets** (set in GitHub, never in the repo):

| Secret | Used by | State |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | Deploy workflow | Set |
| `CLOUDFLARE_ACCOUNT_ID` | Deploy workflow | Set |

## What is left

**To confirm:**

- The README still says images are placeholders. Most real images are now in
  `src/assets/images`. Check which placeholders remain and update the README.

**To build, next:**

- Nothing queued. Add items here as they come up.
