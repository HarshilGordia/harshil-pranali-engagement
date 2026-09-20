# Harshil & Pranali — Engagement Invitation

A premium, mobile-first React/Vite invitation website.

## Run locally

1. Install Node.js (LTS).
2. Open a terminal in this folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open the localhost URL shown by Vite (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Easy editing

Most invitation content is at the top of `src/main.jsx` in the `site` object:
- Couple names
- Date
- Venue
- Google Maps link
- Hashtag
- Event times
- Music file path

The main visual styles are in `src/styles.css`.

## Music

The site intentionally does not ship with copyrighted music.

To add music you are licensed to use:
1. Create `public/music/`
2. Add `engagement.mp3`
3. The existing music control will use it.

## Character illustrations

The recurring couple is built entirely in CSS, with no photographs or facial features. This makes the artwork lightweight and easy to modify later.
