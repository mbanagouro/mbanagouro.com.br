# mbanagouro.com.br

Site pessoal oficial de **Michel Banagouro** — biografia, blog, projetos open source e links sociais.

Construído com [Astro 5](https://astro.build/), [Tailwind CSS v4](https://tailwindcss.com/) e deploy estático em [Cloudflare Pages](https://pages.cloudflare.com/).

## Stack

| Camada       | Escolha                                  |
| ------------ | ---------------------------------------- |
| Framework    | Astro 5 (static output, zero-JS default) |
| Estilos      | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Conteúdo     | Markdown/MDX em Content Collections      |
| i18n         | Roteamento nativo do Astro (PT-BR + EN)  |
| SEO          | Sitemap, RSS, hreflang, OG, JSON-LD      |
| Analytics    | GA4 + Meta Pixel (placeholders via `.env`) |
| Hospedagem   | Cloudflare Pages                         |

## Setup local

```powershell
# Instalar dependências (Node 22+ recomendado, ver .nvmrc)
npm install

# Copiar variáveis de ambiente
copy .env.example .env

# Editar .env com seus IDs reais de GA4 e Meta Pixel

# Rodar dev server (http://localhost:4321)
npm run dev
```

## Comandos

| Script           | O que faz                                              |
| ---------------- | ------------------------------------------------------ |
| `npm run dev`    | Dev server com HMR                                     |
| `npm run build`  | Type-check (`astro check`) + build estático em `dist/` |
| `npm run preview`| Preview do build local                                 |
| `npm run check`  | Apenas o type-check                                    |

## Estrutura

```
src/
├── components/        # SEO, Header, Footer, Cards, Analytics, Theme
├── content/blog/      # Posts (subpastas pt/ e en/)
├── content.config.ts  # Schema das Content Collections
├── i18n/              # Dicionário (ui.ts) + helpers (utils.ts)
├── layouts/           # BaseLayout, BlogPostLayout
├── pages/             # PT-BR na raiz, EN em /en
└── styles/global.css  # Tailwind v4 + design tokens
public/
├── _headers           # Security headers para Cloudflare Pages
├── _redirects         # Redirects para Cloudflare Pages
├── favicon.svg
├── og-default.svg     # ⚠️ Substituir por PNG 1200x630 antes do deploy
└── robots.txt
```

## Adicionando um post de blog

1. Crie um arquivo em `src/content/blog/pt/<slug>.md` (e o equivalente em `en/` se quiser bilíngue).
2. Frontmatter mínimo:
   ```yaml
   ---
   title: "Título"
   description: "Resumo curto"
   pubDate: 2026-05-12
   tags: ["tag1", "tag2"]
   ---
   ```
3. Markdown padrão. MDX também é aceito (extensão `.mdx`).
4. O post entra automaticamente no índice, RSS e sitemap.

## Variáveis de ambiente

Apenas `PUBLIC_*` são expostas no client (Astro convention):

| Variável                | Uso                                  |
| ----------------------- | ------------------------------------ |
| `PUBLIC_GA4_ID`         | ID do Google Analytics 4 (`G-XXXX`)  |
| `PUBLIC_META_PIXEL_ID`  | ID do Meta Pixel (numérico)          |
| `PUBLIC_SITE_URL`       | Override do site URL (opcional)      |

GA4 e Meta Pixel **só carregam em produção** (`import.meta.env.PROD`) para não poluir métricas em dev.

## Deploy no Cloudflare Pages

1. Push para o GitHub.
2. No painel Cloudflare Pages, conecte o repositório.
3. Configure:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output**: `dist`
   - **Node version**: `22`
4. Adicione as variáveis de ambiente (`PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID`) na seção Environment Variables.
5. Em DNS, aponte `mbanagouro.com.br` (e `www`) para o projeto Cloudflare Pages.

`public/_headers` e `public/_redirects` são aplicados automaticamente pela Cloudflare Pages.

## ⚠️ Antes do go-live

- [ ] Substituir `public/og-default.svg` por `public/og-default.png` (1200×630). Atualizar referência em `src/components/SEO.astro`.
- [ ] Trocar `MB` placeholder na foto da home pelo arquivo real (recomendo `public/images/me.jpg` 512×512+).
- [ ] Preencher bio real em `src/pages/sobre.astro` e `src/pages/en/about.astro`.
- [ ] Confirmar handles sociais em `src/components/SocialLinks.astro` (ASP.NET PRO usa link genérico — ajustar se for URL específica).
- [ ] Colocar `PUBLIC_GA4_ID` e `PUBLIC_META_PIXEL_ID` no `.env` (dev) e no Cloudflare Pages (prod).
- [ ] Após primeiro deploy, validar:
  - `https://mbanagouro.com.br/sitemap-index.xml`
  - `https://mbanagouro.com.br/rss.xml` e `/en/rss.xml`
  - GA4 Realtime e Meta Events Manager recebendo PageView
