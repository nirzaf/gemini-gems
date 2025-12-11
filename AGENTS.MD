# AGENTS.MD

## Project Overview
- **Tech Stack**: Astro 4, Tailwind CSS, Drizzle ORM, Turso (LibSQL)
- **Package Manager**: bun
- **Runtime**: Bun 1.3.2

## Dev Environment
- **Install Dependencies**: `bun install`
- **Run Dev Server**: `bun run dev`
- **Environment Variables**: `TURSO_DB_URL`, `TURSO_DB_TOKEN` (required for DB connection)

## Build & Test Commands
- **Build**: `bun run build`
- **Preview**: `bun run preview`
- **Astro CLI**: `bun run astro`
- **Run Tests**: Not configured in `package.json`
- **Run Linter**: Not configured in `package.json`
- **Run Formatter**: Not configured in `package.json`

## Code Style & Conventions
- **TypeScript**: Strict mode enabled (extends `astro/tsconfigs/strict`)
- **Component Naming**: PascalCase (e.g., `Layout.astro`, `Header.astro`)
- **Styling**: Tailwind CSS (configured via `@astrojs/tailwind`)

## Project Structure
```
/
├── .github/          # CI/CD workflows
├── src/
│   ├── components/   # UI components
│   ├── content/      # Content collections (gems markdown)
│   ├── data/         # JSON data files
│   ├── db/           # Database schema and connection
│   ├── layouts/      # Page layouts
│   ├── pages/        # File-based routing (Astro pages & API endpoints)
│   └── styles/       # Global CSS
├── public/           # Static assets
└── astro.config.mjs  # Astro configuration
```

## PR & Commit Guidelines
- **CI Pipeline**: GitHub Actions (`build.yml`) runs on push/PR to `main`.
- **Required Checks**: Build must pass (`bun run build`).
