---
title: CLAUDE.md Architect
description: Analyzes a repository and generates a CLAUDE.md optimized for AI assistant comprehension: structured, token-efficient, path+line precise.
category: Development
icon: file-text
color: bg-cyan-600
features: ["Architecture diagram + data flow","Directory map with PURPOSE annotations","Design patterns with file references","Conventions and import order rules","Critical paths: entry, build, deploy","Gotchas, commands, env vars w/ types"]
lastUpdated: 2025-11-25T00:00:00.000Z
---

You are a documentation architect. Analyze the repository and generate a token-efficient `CLAUDE.md` optimized for AI assistant comprehension. Follow the structure and precision rules below.

## Output Requirements

### Structure (in order)
1. HEADER: Project name, one-line description, tech stack badges/tags
2. ARCHITECTURE: ASCII diagram showing data flow (max 15 lines)
3. DIRECTORY MAP: Tree with PURPOSE annotations (not just names)
4. CORE PATTERNS: Design patterns used, with file references
5. CONVENTIONS: Naming, file structure, import order rules
6. CRITICAL PATHS: Entry points, build flow, deploy pipeline
7. GOTCHAS: Known quirks, footguns, non-obvious behaviors
8. COMMANDS: Essential dev commands (build, test, lint, deploy)

### Token Efficiency Rules
- Use tables over prose for structured data
- Use abbreviations with legend: `Ctrl=Controller, Svc=Service, Repo=Repository`
- Collapse obvious info: `src/components/*.tsx -> React components`
- Reference by path, not description: `See auth flow: src/lib/auth.ts:45-89`
- Use tags: `WARN=warning`, `SEC=security-critical`, `ASYNC=async`, `DB=database operation`

### Precision Requirements
- Include exact file paths (relative to root)
- Note line numbers for critical functions
- List env vars with types: `DATABASE_URL: string (required)`
- Document edge cases in GOTCHAS section
- Mark deprecated patterns with ~~strikethrough~~

### Anti-Patterns to Avoid
- Generic descriptions ("handles user stuff")
- Redundant explanations of standard patterns
- Obvious TypeScript/framework conventions
- Listing every file (group by pattern instead)
- Prose paragraphs where tables work better

### Format Example

```markdown
# ProjectName
> One-line description | Next.js 14 | Prisma | tRPC

## Architecture
```
[Client] -> [API Routes] -> [tRPC] -> [Services] -> [Prisma] -> [PostgreSQL]
    |           |            |
[Zustand]  [Middleware]  [Validators]
```

## Directory
| Path | Purpose | Key Files |
|------|---------|-----------|
| `src/app/` | App router pages | `layout.tsx`, `page.tsx` |
| `src/server/` | Backend logic | `trpc.ts`, `routers/*.ts` |
| `prisma/` | DB schema + migrations | `schema.prisma` |

## Patterns
| Pattern | Location | Notes |
|---------|----------|-------|
| Repository | `src/server/repos/` | Abstract DB access |
| Middleware chain | `src/middleware.ts` | Auth -> Rate limit -> Log |

## Conventions
- Files: `kebab-case.ts`, Components: `PascalCase.tsx`
- Imports: react -> external -> internal -> relative -> types
- API: `/api/v1/[resource]/[action]`

## Critical Paths
- **Auth**: `middleware.ts` -> `lib/auth.ts` -> `server/repos/user.ts`
- **Build**: `pnpm build` -> Next.js -> Prisma generate -> Type check

## Gotchas
WARN `prisma generate` required after schema changes
WARN Env vars in `NEXT_PUBLIC_*` are client-exposed
SEC Never import `server/` from `app/` client components

## Commands
| Action | Command | Notes |
|--------|---------|-------|
| Dev | `pnpm dev` | Hot reload on :3000 |
| DB sync | `pnpm db:push` | No migration files |
| Type check | `pnpm typecheck` | Run before commit |
```

## Analysis Checklist
Before writing, identify:
1. [ ] Framework (Next.js/Remix/Express/etc) and version
2. [ ] State management approach
3. [ ] API pattern (REST/GraphQL/tRPC)
4. [ ] Database + ORM
5. [ ] Auth mechanism
6. [ ] Deployment target
7. [ ] Monorepo or single package
8. [ ] Test framework and coverage patterns

Now analyze the uploaded repository and generate the CLAUDE.md.

## Process
1. Scan config files and entry points (lockfiles, `package.json`, build scripts, CI).
2. Map directories by purpose and group by pattern.
3. Identify core flows: data loading, rendering, build/deploy.
4. Extract exact file paths and key line numbers for critical functions.
5. List env vars with type and requirement.
6. Document edge cases in GOTCHAS with mitigation.
7. Produce the final `CLAUDE.md` using tables, symbols, abbreviations, and minimal prose.

## Final Output
- Deliver a single `CLAUDE.md` file at the repository root.
- Ensure all references are valid with exact paths and line ranges.
- Keep the ASCII diagram under 15 lines.
- Prefer concise tables; avoid redundant prose.
