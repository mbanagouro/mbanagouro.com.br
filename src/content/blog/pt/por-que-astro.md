---
title: "Por que escolhi Astro para meu site pessoal"
description: "Comparativo rápido entre Astro, Next.js, Hugo e por que Astro ganhou para um site de conteúdo em 2026."
pubDate: 2026-05-10
tags: ["astro", "web", "stack"]
---

Quando decidi reconstruir meu site pessoal, listei requisitos antes de escolher o stack:

1. **Estático por padrão** — quero hospedar em CDN, sem servidor de Node.
2. **Markdown nativo** — escrever em editor de texto, sem CMS.
3. **SEO de primeira** — sitemap, OG, RSS, hreflang.
4. **Performance** — Lighthouse 100 sem brigar contra o framework.
5. **i18n simples** — PT-BR e inglês, sem reinventar a roda.

## Os candidatos

| Framework | Veredito |
|-----------|----------|
| Next.js   | Excelente, mas overkill para conteúdo estático. |
| Hugo      | Rápido, mas templating em Go data. |
| Jekyll    | Datado, ecossistema parado. |
| 11ty      | Ótimo, mas comunidade menor. |
| **Astro** | **Vencedor**. |

Astro entrega zero JS por padrão (ilhas só quando você pede),
Content Collections com schema validation, integrações de sitemap/RSS oficiais
e i18n nativo a partir da v3.

> Esse post é um placeholder. Edite em `src/content/blog/pt/por-que-astro.md`.
