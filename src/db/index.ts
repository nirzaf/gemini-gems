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

if (!TURSO_DB_URL || !TURSO_DB_TOKEN) {
    console.error('❌ Missing TURSO_DB_URL or TURSO_DB_TOKEN environment variables');
    throw new Error('Database credentials not configured. Please set TURSO_DB_URL and TURSO_DB_TOKEN in your environment variables.');
}

// Create singleton client
const client = createClient({
    url: TURSO_DB_URL,
    authToken: TURSO_DB_TOKEN,
});

// Create Drizzle instance with schema
export const db = drizzle(client, { schema });

console.log('✅ Drizzle ORM initialized with Turso DB');
