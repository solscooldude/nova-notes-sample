# Nova Notes

A polished sample site that shows what a modern AI-built product page can look like. It includes a working sticky-notes board — add, edit, recolor, and delete notes. Everything is stored in the browser with `localStorage`.

This is a demo for beginners: one homepage, real interactions, no account required.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

## Run locally

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## What to try

1. Scroll to **A board you can actually use**.
2. Write a note, pick a paper color, and pin it.
3. Edit the text, change the color, or delete a note.
4. Refresh the page — your notes should still be there.

Notes never leave this browser. Clearing site data removes them.

## Project layout

```
app/            Homepage, layout, styles
components/     Hero, notes board, features, footer, UI primitives
lib/notes.ts    Note types, colors, localStorage helpers
```
