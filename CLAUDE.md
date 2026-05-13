# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack & commands

Astro 5 + TypeScript (strict) + Tailwind CSS v4 + MDX. Static output for Cloudflare Pages.

```powershell
npm install              # first time only
npm run dev              # dev server (http://localhost:4321)
npm run build            # astro check + static build to dist/
npm run preview          # preview production build
npm run check            # type-check only
```

No test runner is configured — verify changes by running `npm run build` (it runs `astro check` first, which type-checks all `.astro` and `.ts` files).

## Architecture

### i18n is fundamental — every page exists twice

Default locale is **pt-br** (no prefix). English lives under `/en/*`. The routing convention is intentional and must be preserved:

- `src/pages/<page>.astro` → PT-BR (rendered at `/<page>`)
- `src/pages/en/<page>.astro` → EN (rendered at `/en/<page>`)
- Localized slugs: `sobre` ↔ `about`, `projetos` ↔ `projects`. `blog` and `links` are the same in both.

The slug map lives in `src/i18n/utils.ts` (`getAlternatePath`). When adding a new page with a translated slug, update that map so the language switcher and `hreflang` tags resolve correctly.

UI strings come from `src/i18n/ui.ts`. Always add the key to **both** locales — TypeScript will not catch a missing translation at build time, only at runtime via fallback.

### Content Collections — separate collection per language

Blog content is split into two collections by design (`src/content.config.ts`):

- `blog-pt` → `src/content/blog/pt/*.{md,mdx}`
- `blog-en` → `src/content/blog/en/*.{md,mdx}`

They are **not** linked to each other; a PT post and EN post are independent entries. This is intentional — translations are optional and posts in one language are not gated on having a counterpart.

When fetching: `getCollection('blog-pt', ({ data }) => !data.draft)` etc. Always filter drafts.

### Analytics gating

`GoogleAnalytics.astro` and `MetaPixel.astro` only emit their scripts when:
1. The corresponding `PUBLIC_*` env var is set, **and**
2. `import.meta.env.PROD` is true (i.e., during `astro build`, not `astro dev`).

This keeps dev/preview clean and avoids polluting real analytics. To test the tags locally, run `npm run build && npm run preview` with `.env` populated.

### SEO component is the single source of OG/JSON-LD truth

`src/components/SEO.astro` emits canonical URL, hreflang pair, OG/Twitter cards, and Person JSON-LD. It's already wired into `BaseLayout.astro` — pages should not duplicate any of these tags. Pass `type="article"` + `publishedTime` for blog posts (already handled by `BlogPostLayout`).

### Path alias

`~/*` maps to `src/*` (see `tsconfig.json`). Prefer `~/components/Foo.astro` over relative imports.

## Conventions

- **Tailwind v4** uses CSS-first config (`@theme` block in `src/styles/global.css`). The custom variant `@custom-variant dark` is used instead of `darkMode: 'class'` from v3.
- **Brand color** is the `brand-*` scale (orange, anchored at `brand-500: #f97316`). Use it for accents only — body text stays zinc.
- **Dark mode** is class-based (`html.dark`), initialized by an inline script in `BaseLayout` before paint to avoid FOUC.
- **Comments**: minimal. Already followed throughout the codebase.

## Skills (Flowgrammers, instaladas globalmente em `~/.claude/skills/`)

Quando trabalhar neste repo, ative as skills relevantes ao tipo de tarefa:

| Tarefa                              | Skill                                                         |
| ----------------------------------- | ------------------------------------------------------------- |
| Componentes / UI / acessibilidade   | `~/.claude/skills/engineering-team/frontend-developer/SKILL.md` |
| UX e jornadas                       | `~/.claude/skills/product-team/ux-researcher/SKILL.md`         |
| Design system / UI                  | `~/.claude/skills/product-team/ui-designer/SKILL.md`           |
| Conteúdo / blog posts               | `~/.claude/skills/marketing-skill/content-strategist/SKILL.md` |
| SEO técnico e on-page               | `~/.claude/skills/marketing-skill/seo-specialist/SKILL.md`     |
| Performance / build                 | `~/.claude/skills/engineering/performance-engineer/SKILL.md`   |
| Analytics, GA4, Pixel               | `~/.claude/skills/marketing-skill/web-analytics/SKILL.md`      |
| LGPD / consent banner (futuro)      | `~/.claude/skills/ra-qm-team/lgpd-specialist/SKILL.md`         |

Skills da Flowgrammers não vivem no repo — referencie pelo caminho global. Não duplicar arquivos.

Comandos `/`-prefixed úteis para este projeto: `/seo-auditor`, `/a11y-audit`, `/karpathy-check`, `/security-review`.

## Pre-launch checklist

The README has a "Antes do go-live" section. The two highest-priority items: replace `public/og-default.svg` with a real PNG (1200×630) and update `src/components/SEO.astro` accordingly; set `PUBLIC_GA4_ID` and `PUBLIC_META_PIXEL_ID` in Cloudflare Pages env vars.
