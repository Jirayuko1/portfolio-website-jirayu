# Design System & Visual Guidelines: Jirayu Portfolio

## Visual Theme: Warm Studio Office
Inspired by tactile, physical spaces (concept by Júlia Moresco). Replaces generic dark/neon tech templates with an inviting, tactile 3D environment.

## Color Palette
- **Wall Background:** `#2e2620` (Warm deep olive-brown / cocoa)
- **Wood & Floor:** `#1f1713` (Dark natural oak)
- **Hero Accent (Bookshelf & Highlights):** `#f2b705` (Warm mustard yellow)
- **Text & Foreground:** `#f4ebdc` (Soft cream / ivory paper)
- **Muted Text:** `#c8b7a6` (Warm secondary sand)
- **Success / Active Badges:** `#a3e635` / `#12B76A` (Pulsing green indicator)

## Typography Hierarchy
- **Headlines & Display:** `Playfair Display` (Serif, warm, editorial elegance)
- **Handwritten Notes, Stickers & Quotes:** `Caveat` (Cursive, lively, authentic)
- **UI Controls, Body & Buttons:** `Karla` (Clean, highly legible geometric sans)
- **Accent Signatures:** `Pinyon Script` (Classic calligraphic flourish)

## Spatial & 3D Atmosphere
- **Lighting:** Warm ambient base (`#ffeedd`) combined with a directional sun spotlight casting realistic diagonal soft shadows across the wall and floor.
- **Camera:** 30° Perspective Camera with subtle, damped mouse-movement parallax.
- **Physical Artifacts:**
  - *Bookshelf:* Modular shelving holding case studies, diploma, globe, and chess.
  - *Vintage Phone:* Rotary telephone triggering direct contact and email copy.
  - *Zuko the Cat:* Interactive companion providing trivia and insights.
  - *Corkboard:* Pinned pastel sticky notes with feedback and testimonials.
  - *Wall Posters:* Vintage silhouette and sunset skyline accents.

## Interaction Principles
- **No AI Slop:** No arbitrary purple/cyan neon gradients, no generic Inter-only layouts. Every element has tactile intention and purpose.
- **Flicker-Free Stability:** Three.js context mounts once; hover state changes are throttled and decoupled from scene lifecycle.
- **Micro-feedback:** Dynamic cursor changes, floating contextual tooltips, and smooth spring-based modal transitions.
