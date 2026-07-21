# Fyndo MVP — How to Run It (Beginner Guide)

You have a working web app in this folder. Here's how to see it on your
machine, change things, and put it on the internet for free.

## Part 1 — Run it on your laptop (15 min, one-time setup)

1. **Install Node.js**: go to nodejs.org, download the LTS version, install
   with all defaults. (You already have VS Code from your studies — use it.)
2. **Unzip this folder** somewhere sensible, e.g. Documents/fyndo-mvp
3. **Open the folder in VS Code** → Terminal menu → New Terminal
4. Type these two commands:

       npm install
       npm run dev

5. Open your browser at **http://localhost:3000** — that's Fyndo running.

Leave `npm run dev` running while you work; every file save refreshes the
browser automatically. Stop it with Ctrl+C.

## Part 2 — What each file does

| File | What it is |
|---|---|
| `data/spots.json` | THE DATA. Every listing lives here for now. Edit this first. |
| `app/page.js` | Home page (hero + search) |
| `components/SpotDirectory.js` | The search bar, filters, and card grid |
| `components/categoryTheme.js` | Emoji + card color for each category (edit when adding categories) |
| `app/spot/[id]/page.js` | The individual business profile page |
| `app/layout.js` | Header, footer, logo, fonts |
| `app/globals.css` | All colors and styling (brand palette at the top) |

## Part 3 — Add a real spot (your first edit)

Open `data/spots.json`, copy one existing block from `{` to `},` and change:
- `id`: lowercase-with-dashes, unique (this becomes the page URL)
- `name`, `area`, `category`, `priceRange`, `priceLabel`, `moods`, `blurb`
- `mapsQuery`: what someone would type into Google Maps to find it
- `videoUrl`: leave "" until you have a video embed (we wire TikTok embeds
  in the next build session)

Save → browser refreshes → your spot is live locally. The category filter
buttons live in `components/SpotDirectory.js` (the CATEGORIES list at the
top) — add new categories there when needed.

## Part 4 — Put it on the internet (free, ~20 min)

1. Create a **GitHub** account (github.com) if you don't have one
2. Create a new repository called `fyndo-mvp`, upload this folder's
   contents (GitHub's web uploader works fine — drag everything EXCEPT
   `node_modules` and `.next` if they exist)
3. Create a **Vercel** account (vercel.com) — sign in WITH GitHub
4. Vercel → Add New Project → Import `fyndo-mvp` → Deploy (all defaults)
5. Two minutes later you get a free URL like `fyndo-mvp.vercel.app`

Every time you push a change to GitHub, Vercel redeploys automatically.
When you buy your domain later, you attach it in Vercel → Settings →
Domains, and the same site answers at fyndo.app (or whatever you buy).

## What's deliberately NOT here yet

No database, no logins, no reviews, no business dashboard. That's correct
for this phase — the JSON file IS your database until ~50 spots, and it
costs nothing and can't break. When listings grow or businesses need to
edit their own profiles, we wire in Supabase (next build session).
