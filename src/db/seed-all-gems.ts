import { db } from '../db';
import { gems, gemsStats } from '../db/schema';
import { eq } from 'drizzle-orm';

async function seedAllGemStats() {
    try {
        console.log('Seeding stats for all gems...');

        // Get all gems from the database
        const allGems = await db.select().from(gems);
        console.log(`Found ${allGems.length} gems in database`);

        // Seed stats for each gem with varied copy counts
        const copyCountVariations = [15, 8, 22, 5, 12, 3, 18, 7, 10, 14, 6, 20, 4, 9, 11];

        for (let i = 0; i < allGems.length; i++) {
            const gem = allGems[i];
            const copyCount = copyCountVariations[i % copyCountVariations.length];

            // Check if stats already exist
            const existing = await db.select().from(gemsStats).where(eq(gemsStats.gemSlug, gem.slug));

            if (existing.length === 0) {
                // Insert new stats
                await db.insert(gemsStats).values({
                    gemSlug: gem.slug,
                    copyCount: copyCount,
                    viewCount: Math.floor(copyCount * 2.5) // Views are typically higher than copies
                });
                console.log(`✓ Inserted stats for ${gem.slug} (copies: ${copyCount})`);
            } else {
                // Update existing stats to ensure they have realistic values
                await db.update(gemsStats)
                    .set({
                        copyCount: Math.max(existing[0].copyCount, copyCount),
                        viewCount: Math.max(existing[0].viewCount, Math.floor(copyCount * 2.5))
                    })
                    .where(eq(gemsStats.gemSlug, gem.slug));
                console.log(`✓ Updated stats for ${gem.slug}`);
            }
        }

        console.log('\n✅ Seeding complete! All gems now have stats.');

        // Display summary
        const allStats = await db.select().from(gemsStats);
        console.log(`\nTotal gems with stats: ${allStats.length}`);
        console.log('\nCopy count distribution:');
        allStats.forEach(stat => {
            console.log(`  ${stat.gemSlug}: ${stat.copyCount} copies, ${stat.viewCount} views`);
        });

    } catch (error) {
        console.error('Error seeding stats:', error);
        throw error;
    }
}

seedAllGemStats();
