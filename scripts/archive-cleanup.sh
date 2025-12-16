#!/usr/bin/env bash
set -euo pipefail

# Safe, non-destructive archive + build verification for gemini-gems

# 0. Ensure we are in the repository root
if [ ! -f "package.json" ]; then
  echo "package.json not found. Please run this script from the repository root."
  exit 1
fi

echo "==> Starting archive cleanup (non-destructive)..."

# 1. Create Archive Directories
echo "==> Ensuring archive directories exist..."
mkdir -p "_archived/scripts"
mkdir -p "_archived/docs/tasks"

# 2. Move Loose Scripts (if they still exist)

if [ -f "build.js" ]; then
  echo "-> Archiving build.js to _archived/scripts/build.js"
  mv "build.js" "_archived/scripts/build.js"
else
  echo "-> build.js not found (already moved or removed); skipping."
fi

if [ -f "migrate.js" ]; then
  echo "-> Archiving migrate.js to _archived/scripts/migrate.js"
  mv "migrate.js" "_archived/scripts/migrate.js"
else
  echo "-> migrate.js not found (already moved or removed); skipping."
fi

if [ -f "mock-api-server.js" ]; then
  echo "-> Archiving mock-api-server.js to _archived/scripts/mock-api-server.js"
  mv "mock-api-server.js" "_archived/scripts/mock-api-server.js"
else
  echo "-> mock-api-server.js not found (already moved or removed); skipping."
fi

# 3. Move Docs & Notes (internal task planning)

if [ -f "tasks/todo.md" ]; then
  echo "-> Archiving tasks/todo.md to _archived/docs/tasks/todo.md"
  mkdir -p "_archived/docs/tasks"
  mv "tasks/todo.md" "_archived/docs/tasks/todo.md"
else
  echo "-> tasks/todo.md not found (already moved or removed); skipping."
fi

# 4. Remove empty source directories if any (cleanup)
if [ -d "tasks" ] && [ -z "$(ls -A tasks)" ]; then
   rmdir tasks
   echo "-> Removed empty 'tasks' directory"
fi

echo "==> Archive move phase complete. No files were deleted; only mv operations were used."

# 5. Run Project Build to Verify Integrity

echo "==> Running build to verify project integrity..."
# Uses Bun as per AGENTS.MD and README (bun run build)
bun run build

echo "==> Build completed successfully. Repository cleanup + archive is verified."
