import { db } from '../db';
import { gems, gemsStats } from '../db/schema';
import { sql } from 'drizzle-orm';

async function checkContent() {
    if (!db) {
        throw new Error("Database connection not available");
    }

    console.log('Checking database content...');

    try {
        const gemsCount = await db.select({ count: sql<number>`count(*)` }).from(gems);
        console.log(`gems table count: ${gemsCount[0].count}`);

        const statsCount = await db.select({ count: sql<number>`count(*)` }).from(gemsStats);
        console.log(`gems_stats table count: ${statsCount[0].count}`);

        if (Number(gemsCount[0].count) > 0) {
            const firstGem = await db.select().from(gems).limit(1);
            console.log('First gem sample:', firstGem[0].slug);
        }

    } catch (err) {
        console.error('Error checking DB:', err);
    }

    process.exit(0);
}

checkContent();
