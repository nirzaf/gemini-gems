import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import * as schema from './schema';
import ws from 'ws';

// Configure Neon to use WebSocket for local development
neonConfig.webSocketConstructor = ws;

// Get environment variables (works in both dev and production)
const getEnvVar = (key: string): string => {
  // Try import.meta.env first (Astro), then process.env (Node.js)
  return import.meta.env?.[key] || process.env[key] || '';
};

const DATABASE_URL = getEnvVar('DATABASE_URL');

// Build-friendly: only initialize DB when credentials exist.
let dbInstance: ReturnType<typeof drizzle> | null = null;

if (!DATABASE_URL) {
  console.warn(
    '⚠️ DATABASE_URL not set; continuing without DB (fallback data only).',
  );
} else {
  const pool = new Pool({ connectionString: DATABASE_URL });
  dbInstance = drizzle(pool, { schema });
  console.log('✅ Drizzle ORM initialized with Neon PostgreSQL');
}

export const db = dbInstance;
