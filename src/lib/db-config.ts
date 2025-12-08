import { createClient } from '@libsql/client';

const url = (import.meta as any)?.env?.TURSO_DB_URL || process.env.TURSO_DB_URL;
const authToken = (import.meta as any)?.env?.TURSO_DB_TOKEN || process.env.TURSO_DB_TOKEN;

type ExecuteArg = string | { sql: string; args?: any[] };

const stub = {
  async execute(_arg: ExecuteArg) {
    throw new Error('Turso DB not configured: set TURSO_DB_URL and TURSO_DB_TOKEN');
  },
};

const tursoClient = url && authToken ? createClient({ url, authToken }) : (stub as any);

export default tursoClient;

export async function checkConnection(): Promise<boolean> {
  try {
    await tursoClient.execute('SELECT 1');
    return true;
  } catch {
    return false;
  }
}

