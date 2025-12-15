# Plan: Stabilize Static Build, Secret Hygiene, and CI

## Todos

- [x] Identify relevant files and entry points
- [x] Confirm reproduction and root cause (API 404s under base path)
- [x] Implement minimal fix in `src/pages/index.astro` (content-driven)
- [x] Implement minimal fix in `src/lib/load-gem-data.ts` (base-aware API)
- [x] Implement minimal fix in `src/components/GemCard.astro` (data-gem-slug)
- [x] Run build locally and push changes
- [ ] Document change explanation (this file)

## Notes

- Dependencies: `astro@5.16.4`, `drizzle-orm@0.45.0`, `@libsql/client@0.14.0`, Bun `1.3.3`
- Assumptions: GitHub Pages serves under `/gemini-gems/`; repository secrets supply DB creds only for CI/servers
- Risks: None; changes are static-render and client fetch base prefix only

## Review

- Summary of changes:
  - `src/pages/index.astro` – render gems via `getCollection('gems')` to avoid build-time API dependency
  - `src/lib/load-gem-data.ts` – fetch `${import.meta.env.BASE_URL}api/*` so GH Pages base path works
  - `src/components/GemCard.astro` – add `data-gem-slug` for client augmentation
- Verification results:
  - Build: `bun run build` succeeded; 19 pages generated
  - Runtime: Dist includes `/api/*` JSON; homepage shows all gems; no JSON parse errors
  - Secrets: CI workflow pulls `TURSO_DB_URL` and `TURSO_DB_TOKEN` from repo secrets; no hardcoded secrets
- Follow-ups:
  - Consider adding `astro check` step in CI for type checks
  - Optional labels endpoint should gracefully handle missing DB; already logs and continues
