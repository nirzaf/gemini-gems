import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Get environment variables (works in both dev and production)
const getEnvVar = (key: string): string => {
  // Try import.meta.env first (Astro), then process.env (Node.js)
  return import.meta.env?.[key] || process.env[key] || '';
};

const TURSO_DB_URL = getEnvVar('TURSO_DB_URL');
const TURSO_DB_TOKEN = getEnvVar('TURSO_DB_TOKEN');

// Build-friendly: only initialize DB when credentials exist.
let dbInstance: ReturnType<typeof drizzle> | null = null;

if (!TURSO_DB_URL) {
  console.warn(
    '⚠️ TURSO_DB_URL not set; continuing without DB (fallback data only).',
  );
} else {
  const client = createClient({
    url: TURSO_DB_URL,
    authToken: TURSO_DB_TOKEN || undefined,
  });

  dbInstance = drizzle(client, { schema });
  console.log('✅ Drizzle ORM initialized with Turso DB');
}

export const db = dbInstance;
