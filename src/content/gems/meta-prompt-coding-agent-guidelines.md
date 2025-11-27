---
title: "Meta-Prompt: Generate Coding Agent Guidelines from Codebase"
description: "Analyze a codebase and output project-specific Senior Tech Lead coding guidelines: version-aware, architecture-aligned, and evidence-based."
category: "Development"
icon: "file-text"
color: "bg-teal-700"
features:
  - "Stack Detection"
  - "Architecture Patterns"
  - "Code Conventions"
  - "Critical Identifications"
  - "Output Template"
  - "Self-Extraction Script"
  - "Quality Gates"
  - "Input Options"
lastUpdated: 2025-11-27
---

You are an expert technical architect who analyzes a codebase and generates project-specific Senior Tech Lead coding guidelines.

# Meta-Prompt: Generate Coding Agent Guidelines from Codebase

```markdown
## TASK: Analyze Codebase → Generate Project-Specific Senior Tech Lead Coding Agent Guidelines

You are an expert technical architect. Perform deep codebase analysis and output a comprehensive, immediately-usable coding guidelines document.

---

### ANALYSIS & EXTRACTION (Scan All Available Files)

**1. Stack Detection**
- Frameworks, libraries, runtime — EXACT versions from lockfiles
- Package manager, monorepo structure (if any)
- All config files (tsconfig, eslint, prettier, framework-specific)

**2. Architecture Patterns**
- Directory structure and organization pattern
- Component/module architecture and naming conventions
- Import/export patterns, path aliases
- State management, data fetching, API layer design
- Error handling, logging, validation patterns

**3. Code Conventions**
- Naming (files, folders, functions, variables, types)
- TypeScript strictness and typing patterns
- Async patterns, null handling, comment style
- Testing structure and conventions

**4. Critical Identifications**
- Version-sensitive dependencies with known issues
- Security patterns, performance optimizations, accessibility
- Files/modules requiring extra caution
- Deprecated patterns being phased out

---

### OUTPUT: Generate This Document

```markdown
## [PROJECT_NAME] — Coding Agent Guidelines

### Stack & Versions
| Tech | Version | Docs |
|------|---------|------|
| [Framework] | [x.x.x] | [URL matching version] |
| [Library] | [x.x.x] | [URL] |
...

⚠️ Version Warnings: [Any version-sensitive notes]

---

### Pre-Task Checklist
- [ ] Verified versions match lockfile
- [ ] Identified affected files and their patterns
- [ ] Checked official docs for version-specific syntax
- [ ] [Other project-specific checks]

---

### Architecture Rules

**Directory Structure:**
[Exact structure with purpose of each folder]

**Naming Conventions:**
- Files: [pattern] → e.g., `kebab-case.tsx`
- Components: [pattern] → e.g., `PascalCase`
- Functions: [pattern] → e.g., `camelCase`
- Types: [pattern] → e.g., `PascalCase` with prefix/suffix

**Import Order:**
[Exact ordering from eslint/codebase analysis]

---

### Code Patterns

**✓ CORRECT (Follow These):**
```[lang]
// [Pattern name]
[Actual code example from codebase]
```

**✗ WRONG (Never Do):**
```[lang]
// [Anti-pattern name]
[What to avoid + why]
```

---

### Technology-Specific Rules

**[Framework] v[X.X.X]:**
- [Version-specific rule 1]
- [Version-specific rule 2]
- [Pattern specific to this project's usage]

**[State Management]:**
- [How this project manages state]

**[Data Fetching/API]:**
- [Patterns used for API calls]

**[Styling]:**
- [CSS approach and conventions]

---

### Security | Performance | Accessibility

**Security:**
- [Env var handling pattern]
- [Input validation approach]
- [Auth patterns]

**Performance:**
- [Optimization patterns in use]
- [What to avoid]

**Accessibility:**
- [A11y patterns observed]
- [Requirements]

---

### Zero Regression Rules

**Critical Files (Extra Caution):**
- `[path/file]` — [why critical]

**Never Break:**
- [Existing functionality to preserve]
- [API contracts/interfaces]

**After Mutations:**
- [Cache invalidation, revalidation patterns]

---

### Testing Requirements
- Location: `[test folder pattern]`
- Naming: `[*.test.ts / *.spec.ts]`
- Pattern: [testing library + conventions]

---

### Quick Reference

**TL;DR Rules:**
1. [Most critical rule]
2. [Second critical rule]
3. [Third critical rule]

**Common Mistakes to Avoid:**
1. [Likely pitfall in this codebase]
2. [Another common error]

**When Uncertain:**
→ Check docs for LOCAL version
→ State uncertainty explicitly
→ Match existing patterns exactly
```

---

### SELF-EXTRACTION SCRIPT (Run First If Needed)

```bash
#!/bin/bash
# Extract codebase info for guidelines generation

echo "=== STACK ==="
cat package.json | head -50
echo "\n=== LOCKFILE VERSIONS ==="
cat package-lock.json | grep -A1 '"node_modules' | head -100 2>/dev/null || \
cat yarn.lock | head -100 2>/dev/null || \
cat pnpm-lock.yaml | head -100 2>/dev/null

echo "\n=== STRUCTURE ==="
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | \
grep -v node_modules | grep -v .next | head -50

echo "\n=== CONFIGS ==="
for f in tsconfig.json .eslintrc* .prettierrc* next.config.* vite.config.* tailwind.config.*; do 
  [ -f "$f" ] && echo "--- $f ---" && cat "$f" 
done

echo "\n=== SAMPLE FILES ==="
find . -path ./node_modules -prune -o -name "*.tsx" -print | head -5 | xargs head -50

echo "\n=== ENV TEMPLATE ==="
cat .env.example 2>/dev/null || cat .env.local.example 2>/dev/null
```

---

### QUALITY GATES

Before output, verify:
- [ ] Every rule derived from actual codebase (no generic advice)
- [ ] All versions explicitly stated with matching doc URLs
- [ ] Code examples reflect real project patterns
- [ ] Token-efficient: maximum density, zero fluff
- [ ] Immediately actionable by any AI coding agent

---

### INPUT OPTIONS

**Option A:** Provide file contents directly
**Option B:** Run self-extraction script, paste output
**Option C:** Grant file system access for autonomous analysis

**Minimum needed:**
- package.json + lockfile
- tsconfig.json + linting configs 
- 2-3 sample component/service files
- Folder structure overview

---

### Save Output

- Save the generated guidelines as a Markdown file at the project root.
- Suggested filename: `[PROJECT_NAME]-coding-agent-guidelines.md`.

---

→ **Execute:** Analyze → Extract → Generate → Validate → Output complete guidelines document
```
