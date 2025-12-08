import { db } from '../db';
import { gems as gemsSchema } from '../db/schema';
import fs from 'fs/promises';
import path from 'path';

async function fetchGems() {
    if (!db) {
        throw new Error("Database connection not available");
    }

    console.log('Fetching gems from database...');
    const gems = await db.select().from(gemsSchema);
    console.log(`Fetched ${gems.length} gems.`);

    const dataDir = path.join(process.cwd(), 'src', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    const filePath = path.join(dataDir, 'gems.json');
    await fs.writeFile(filePath, JSON.stringify(gems, null, 2));
    console.log(`Saved gems to ${filePath}`);

    process.exit(0);
}

fetchGems().catch((err) => {
    console.error('Failed to fetch gems:', err);
    process.exit(1);
});
