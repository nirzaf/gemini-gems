# AGENTS.MD

## Project Overview

- **Tech Stack**: Astro 4, TypeScript, Tailwind CSS, Lucide Icons, Drizzle ORM, Turso/Neon Database
- **Package Manager**: bun
- **Runtime**: Bun 1.3.2+

## Dev Environment

- **Install Dependencies**: `bun install`
- **Run Dev Server**: `bun dev`
- **Environment Variables**: See `.env.example` for required variables (`TURSO_DB_URL`, `TURSO_DB_TOKEN`).

## Build & Test Commands

- **Build**: `bun run build`
- **Preview Build**: `bun run preview`
- **Run Astro CLI**: `bun run astro -- <command>`

## Code Style & Conventions

- **TypeScript**: Strict mode enabled (extends `astro/tsconfigs/strict`)
- **Component Naming**: PascalCase for Astro components (`GemCard.astro`, `SearchFilter.astro`)
- **Content Files**: kebab-case for markdown files in `src/content/gems/` directory
- **Styling**: Tailwind CSS utility classes
- **Dark Mode**: Uses `class` strategy on `<html>` element

## Project Structure

```
/
├── .github/
│   └── workflows/    # GitHub Actions CI/CD (deploy.yml)
├── src/
│   ├── pages/        # File-based routing (index.astro, gems/[...slug].astro)
│   ├── components/   # Reusable Astro components
│   ├── layouts/      # Layout wrappers (Layout.astro)
│   ├── content/      # Content collections
│   │   └── gems/     # Markdown files for gem entries
│   ├── lib/          # Utility functions and shared logic
│   ├── db/           # Database schema and configuration (Drizzle ORM)
│   ├── data/         # Static data files
│   ├── scripts/      # Build and utility scripts
│   └── styles/       # Global CSS and Tailwind configuration
├── public/           # Static assets (favicon.svg, etc.)
├── dist/             # Build output (generated)
└── .astro/           # Generated types (generated)
```

## Astro Configuration

- **Site URL**: `https://geminigems.netlify.app`
- **Base Path**: `/`
- **Output Mode**: `static` (SSG)
- **Integrations**: Tailwind CSS

## PR & Commit Guidelines

- **Required Checks**: Build must succeed. GitHub Actions runs on all pushes to `main`.
- **CI Pipeline**: GitHub Actions workflow builds project with Bun, requires `TURSO_DB_URL` and `TURSO_DB_TOKEN` secrets, and deploys to GitHub Pages.
- **Deployment**: Automatic deployment to GitHub Pages on push to `main` branch or manual workflow dispatch.
