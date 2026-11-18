---
name: seo-og-metadata
description: "Best practices for OpenGraph previews, JSON-LD structured data (Person & WebSite schemas), dynamic social sharing cards, and search engine optimization for creative developer portfolios."
---

# SEO & Social Metadata for Creative Portfolios

This skill establishes best practices for ensuring creative 3D developer portfolios are indexable by search engines and generate high-impact social preview cards when shared.

## Core Pillars

### 1. OpenGraph & Twitter Cards
- Always specify `metadataBase` in App Router `layout.tsx` or `page.tsx` to resolve absolute URLs for OpenGraph.
- Provide crisp, high-contrast preview images (1200x630px) that highlight the 3D studio environment and key titles.
- Define `og:type = "profile"` or `"website"` with explicit descriptions emphasizing core technical specializations.

### 2. JSON-LD Structured Data
- Inject a `schema.org/Person` script tag in the root layout:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jirayu",
    "jobTitle": "Senior Full-Stack & Mobile Developer",
    "knowsAbout": ["React Native", "Next.js", "Three.js", "TypeScript", "System Architecture"],
    "sameAs": [
      "https://github.com/Jirayuko1/portfolio-website-jirayu"
    ]
  }
  ```

### 3. Canonical URLs & Multi-language Alternate Links
- When supporting bilingual content (e.g. English / Thai), provide alternate language hints and maintain clean URL structures.
- Ensure all interactive modals render semantic HTML `<dialog>`, `<article>`, and headings (`h1`–`h3`) so crawlers can parse case studies even without executing 3D WebGL scenes.
