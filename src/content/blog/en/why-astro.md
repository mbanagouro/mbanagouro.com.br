---
title: "Why I picked Astro for my personal site"
description: "Quick comparison between Astro, Next.js, Hugo and why Astro won for a content-driven site in 2026."
pubDate: 2026-05-10
tags: ["astro", "web", "stack"]
---

When I decided to rebuild my personal site I listed requirements before picking the stack:

1. **Static by default** — host on a CDN, no Node server.
2. **Markdown-native** — write in a text editor, no CMS in the middle.
3. **First-class SEO** — sitemap, OG, RSS, hreflang.
4. **Performance** — Lighthouse 100 without fighting the framework.
5. **Simple i18n** — PT-BR and English, no reinventing the wheel.

## The candidates

| Framework | Verdict |
|-----------|---------|
| Next.js   | Excellent but overkill for static content. |
| Hugo      | Fast, but Go templating is dated. |
| Jekyll    | Old, ecosystem stalled. |
| 11ty      | Great, but smaller community. |
| **Astro** | **Winner**. |

Astro ships zero JS by default (islands only when you ask),
Content Collections with schema validation, official sitemap/RSS integrations,
and built-in i18n since v3.

> This post is a placeholder. Edit at `src/content/blog/en/why-astro.md`.
