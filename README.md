# hotel-mockup-2

**Alkyoní** — a single-page website mockup for a fictional nine-room boutique hotel in
Oía, Santoríni. Built with Next.js and Tailwind CSS in a strict white-and-blue palette
drawn from whitewashed Cycladic limestone and the Aegean.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- TypeScript
- Bodoni Moda / Archivo / IBM Plex Mono via `next/font`

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Sections

| Section | Anchor | Component |
| --- | --- | --- |
| Hero | `#top` | `components/hero.tsx` |
| The house | `#house` | `components/house-section.tsx` |
| Rooms | `#rooms` | `components/rooms-section.tsx` |
| The table | `#table` | `components/table-section.tsx` |
| The island | `#island` | `components/island-section.tsx` |
| Weddings & private hire | `#weddings` | `components/weddings-section.tsx` |
| Gallery | `#gallery` | `components/gallery-section.tsx` |
| Guest words | — | `components/guest-words-section.tsx` |
| Journal | `#journal` | `components/journal-section.tsx` |
| Getting here | `#getting-here` | `components/getting-here-section.tsx` |
| Good to know | `#good-to-know` | `components/good-to-know-section.tsx` |
| Footer | — | `components/site-footer.tsx` |

## Notable pieces

- **Hero slider** — crossfading photographs with a slow Ken Burns drift, hairline
  progress indicators, arrow-key navigation, and autoplay that pauses on hover and focus.
- **Booking rail** — a custom two-month date-range calendar with live range preview, and
  a guest stepper. Both replace the native browser controls so the picking experience
  matches the design.
- **Gallery lightbox** — counter, captions, arrow-key navigation, body-scroll lock, and
  focus returned to the tile you opened.
- **Good to know** — built on native `<details>`/`<summary>`, so keyboard and
  screen-reader behaviour comes free and it works with JavaScript disabled.
- Motion throughout respects `prefers-reduced-motion`.

## Images

Photography is hot-linked from Unsplash and allow-listed in `next.config.ts`, so the
project needs network access to render. Every image was opened and checked before use —
Unsplash photo IDs are frequently reassigned and often serve an unrelated subject.
