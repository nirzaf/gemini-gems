import { db } from '../db';
import { gemsStats } from '../db/schema';
import { eq } from 'drizzle-orm';

async function seedStats() {
    try {
        console.log('Seeding gem stats...');

        // Seed a few gems with copy counts
        const gemsToSeed = [
            { gemSlug: 'professional-email-crafter', copyCount: 5 },
            { gemSlug: 'bug-reproduction-specialist', copyCount: 12 },
            { gemSlug: 'task-breakdown-manager', copyCount: 3 }
        ];

        for (const gem of gemsToSeed) {
            const existing = await db.select().from(gemsStats).where(eq(gemsStats.gemSlug, gem.gemSlug));

            if (existing.length === 0) {
                await db.insert(gemsStats).values({
                    gemSlug: gem.gemSlug,
                    copyCount: gem.copyCount,
                    viewCount: 10
                });
                console.log(`Inserted stats for ${gem.gemSlug}`);
            } else {
                await db.update(gemsStats)
                    .set({ copyCount: gem.copyCount })
                    .where(eq(gemsStats.gemSlug, gem.gemSlug));
                console.log(`Updated stats for ${gem.gemSlug}`);
            }
        }

        console.log('Seeding complete.');
    } catch (error) {
        console.error('Error seeding stats:', error);
    }
}

seedStats();
