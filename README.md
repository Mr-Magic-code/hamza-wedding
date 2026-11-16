# Elegant Wedding Invitation

A luxury, mobile-first wedding invitation built with Next.js (App Router),
Tailwind CSS and TypeScript. Ready to deploy on Vercel.

## Features

- Animated envelope "click to open" intro with wax seal
- Five switchable colour palettes (Ivory & Gold, Maroon & Gold, Blush & Rose
  Gold, Emerald & Gold, Midnight & Gold) with the choice saved in the browser
- Background music that starts when the invitation is opened (generated ambient
  track, or your own MP3)
- Live countdown to the wedding day
- Featured Walima celebration card with animated details and add-to-calendar
- Elegant honoured guest list
- SEO metadata, Open Graph image, sitemap and robots
- Accessible focus states and `prefers-reduced-motion` support

## Customise

Everything personal lives in one file:

```
src/config/wedding.ts
```

Change the couple names, date/time, venue, Walima details, guest names and music
title there.

### Colours

Themes are defined with CSS variables in `src/app/globals.css` and can be
selected from the palette button on the invitation. To make a different theme the
default, change `theme` in `src/config/wedding.ts` and the default in
`src/app/globals.css`.

### Music

See `public/music/README.md`. Without an audio file, a soft ambient track is
generated in the browser so music still plays.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the project at https://vercel.com/new.
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` with your final URL, e.g.
   `https://your-project.vercel.app`.
4. Deploy. Vercel auto-detects Next.js; no extra build settings are required.

Or from the CLI:

```bash
npx vercel
npx vercel --prod
```

## Scripts

```bash
npm run dev    # development server
npm run build  # production build
npm run start  # run the production build
npm run lint   # ESLint
```
