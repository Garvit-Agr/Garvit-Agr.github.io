# Introduction to Software Systems S26 

## Personal Web Presence — Assignment 2

**Garvit Agrawal**<br>
IIIT Hyderabad · Introduction to Software Systems · Spring 2026

---

### Live URL

https://Garvit-Agr.github.io

---

### Typographic Pairing

Cormorant Garamond (display) + Figtree (body)

I wanted headings that felt personal, not product-page. Cormorant is a high-contrast serif — considered, slightly old-world. Figtree is geometric and clean, good at small sizes. The contrast between them handles hierarchy without me needing to lean on size or weight as hard. Right tone for a site about a person, not a startup.

---

### Animation Justifications

**Hero entrance:** Elements slide up with a staggered delay — label, name, intro, buttons, in that order. Stops the page from dumping everything at once and gives the eye something to follow.

**Scroll-triggered section:** The projects section fades in as you scroll to it via Intersection Observer. It confirms something new is appearing rather than the content just snapping into existence.

**Nav underline:** `::after` grows `width: 0 → 100%` with `transition: width 0.3s ease`. The slow start and soft landing suits a small element — `ease-out` at this scale felt twitchy.

**Card hover:** Cards lift slightly with a deeper shadow on hover. It signals they're clickable without needing a cursor change or a label.

---

### JS Features

**Group A: A1 — Filterable & Bookmarkable Project Index** (`JS/filter.js`)

Multi-tag AND filter — selecting C and ALGORITHMS only shows cards that have both. Active tags go into the URL as `?tags=c,algorithms` via `history.pushState`, so filtered views survive a refresh. On load the script reads `URLSearchParams` and restores the filter.

**Group B: B2 — Collapsible Timeline** (`JS/timeline.js`)

One listener on the `<ul>` instead of one per item. Clicks bubble up, the script toggles `max-height` on the `<div>` below the button to slide it open, collapses whatever was previously open, and updates `aria-expanded`. The `max-height` approach means hardcoding a pixel ceiling in CSS, but it keeps animation logic out of JS entirely — worth it.

---
