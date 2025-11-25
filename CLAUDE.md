# Gemini Gems 
> Curated AI persona prompts for Gemini | Astro 5 | TailwindCSS | Lucide | GitHub Pages

Legend: Ctrl=Controller, Svc=Service, Repo=Repository, ⚠️=warning, 🔒=security-critical, 🔄=async, 💾=DB operation

## Architecture
```
[Markdown (src/content/gems/*.md)]
        ↓
[Zod schema (astro:content)] → [getCollection] → [Static Paths]
        ↓                           ↓
[Markdown render → <Content />]  [Pages]
        ↓
[Components (islands): SearchFilter 🔄, GemCard 🔄]
        ↓
[Astro build (SSG) → dist]
        ↓
[GitHub Pages deploy]
```

## Directory Map
| Path | Purpose | Key Files |
|------|---------|-----------|
| `src/pages/` | File-based routes and entry pages | `index.astro`, `gems/[...slug].astro` |
| `src/components/` | UI components + client scripts | `GemCard.astro`, `SearchFilter.astro`, `Header.astro`, `Footer.astro` |
| `src/layouts/` | Shared document wrapper + SEO + theme | `Layout.astro` |
| `src/content/` | Content collections + schema | `config.ts`, `gems/*.md` |
| `src/styles/` | Global styles and Tailwind layers | `global.css` |
| `public/` | Static assets served verbatim | `favicon.svg` |
| `astro.config.mjs` | Site/base/output settings | `site`, `base`, `output` |
| `tailwind.config.mjs` | Tailwind content globs + dark mode | `darkMode: 'class'` |
| `.github/workflows/deploy.yml` | CI build and Pages deploy | Build with `--site`/`--base` |

## Core Patterns
| Pattern | Location | Notes |
|---------|----------|-------|
| SSG via static paths | `src/pages/gems/[...slug].astro:8-14` | `getStaticPaths()` maps collection entries to routes |
| Content collections (Zod) | `src/content/config.ts:3-13` | Validates frontmatter for `gems` entries |
| Markdown render → component | `src/pages/gems/[...slug].astro:21-22,103-107` | `gem.render()` → `<Content />` inside prose container |
| DOM filter (component island) | `src/components/SearchFilter.astro:45-117` | Filters `.gem-card` by text + category; updates counter |
| Copy markdown (card) 🔄 | `src/components/GemCard.astro:137-149` | Fetches GitHub Raw then copies to clipboard with success UI |
| Copy rendered text (detail) 🔄 | `src/pages/gems/[...slug].astro:129-162` | Copies `.prose` textContent, not original markdown |
| Theme toggle via `<html>.class` | `src/layouts/Layout.astro:24-52,61-70` | Initializes dark mode before paint; exposes `window.toggleTheme` |
| Base-path anchored links | `src/components/GemCard.astro:96`, `src/pages/gems/[...slug].astro:52` | Internal hrefs include `/gemini-gems` base |
| ~~Direct Raw GitHub fetch in client~~ | `src/components/GemCard.astro:137-149` | Prefer build-time content or bundling for reliability/security |

## Conventions
- Naming: components `PascalCase.astro`; content files `kebab-case.md` with frontmatter (`title`, `description`, `category`, `icon`, `color`, `features`, `lastUpdated`)
- File structure: file-based routing under `src/pages/*`; collections under `src/content/*`
- Imports: framework/core first (`astro:content`), then internal modules, then component imports
- Styling: Tailwind utility classes, dark mode via `class` on `<html>`
- DOM data: cards expose `data-*` attrs for filter/search (`data-title`, `data-description`, `data-category`, `data-features`)

## Critical Paths
- Home route: `src/pages/index.astro`
  - Load/sort collection: `10-15`
  - Derive categories: `17-18`
  - Render grid/cards: `83-90`
- Gem detail route: `src/pages/gems/[...slug].astro`
  - Static paths: `8-14`
  - Markdown render: `21-22,103-107`
  - Copy button (rendered text): `129-162`
- Config + Build:
  - Astro site/base/output: `astro.config.mjs:7-10`
  - Tailwind dark mode/config: `tailwind.config.mjs:3-4`
  - CI build with base/site: `.github/workflows/deploy.yml:63-66`
- Deploy pipeline (GitHub Pages):
  - Upload artifact: `.github/workflows/deploy.yml:68-71`
  - Deploy step: `.github/workflows/deploy.yml:81-83`

## GOTCHAS
| Issue | Impact | Location/Ref | Mitigation |
|------|--------|--------------|------------|
| ⚠️ Hardcoded base path `/gemini-gems` | Broken links if base changes | `astro.config.mjs:8`, `GemCard.astro:96`, `[...slug].astro:52` | Use `Astro.site`/`Astro.base` or relative links |
| ⚠️ Detail copy uses `.textContent` | Loses markdown formatting and code blocks | `src/pages/gems/[...slug].astro:139-143` | Copy raw markdown (build/bundle) instead |
| ⚠️ Card copy includes frontmatter | Copies meta fields unintentionally | `src/components/GemCard.astro:137-149` | Strip frontmatter before copying |
| ⚠️ GitHub Raw dependency | Network/CORS failures break copy | `GemCard.astro:137-149` | Bundle content or embed at build time |
| ⚠️ Font Awesome via CDN | Offline fragility; external dependency | `src/components/GemCard.astro:114-117` | Self-host icons or use Lucide consistently |
| 🔒 Clipboard write | Requires user gesture; may be blocked | `GemCard.astro:147`, `[...slug].astro:142` | Handle permission errors gracefully |

## COMMANDS
| Action | Command | Notes |
|--------|---------|-------|
| Dev | `npm run dev` | Starts Astro dev server with HMR |
| Build | `npm run build` | Outputs static site to `dist/` |
| Preview | `npm run preview` | Serves built `dist/` locally |
| Astro CLI | `npm run astro -- <cmd>` | Run any Astro subcommand |
| Deploy (CI) | GitHub Actions | Workflow on `main` push / manual dispatch |

## Environment
| Name | Type | Required | Default | Used In |
|------|------|---------|---------|---------|
| `BUILD_PATH` | string | No | `"."` | `.github/workflows/deploy.yml:18,58-66,69-71` |
| `.env`, `.env.production` | files | N/A | N/A | ignored by VCS (`.gitignore:17-18`) |

## References
- Astro config: `astro.config.mjs:7-10`
- Tailwind config: `tailwind.config.mjs:3-4`
- Content schema: `src/content/config.ts:3-13`
- Home page: `src/pages/index.astro:10-18,83-90`
- Detail page: `src/pages/gems/[...slug].astro:8-14,21-22,103-107,129-162`
- Card component: `src/components/GemCard.astro:96,121-187`
- Search filter: `src/components/SearchFilter.astro:45-117`
- Deploy workflow: `.github/workflows/deploy.yml:63-66,68-71,81-83`
