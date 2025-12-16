import type { APIRoute } from 'astro';
import { db } from '../../db'; // Uses your Neon instance
import { gemsStats } from '../../db/schema';
import { sql } from 'drizzle-orm';

export const GET: APIRoute = async () => {
    try {
        if (!db) {
            return new Response(JSON.stringify({ error: 'DB not connected' }), { status: 500 });
        }

        const allStats = await db.select().from(gemsStats);

        const totalCopies = allStats.reduce((sum, stat) => sum + (stat.copyCount || 0), 0);
        const totalViews = allStats.reduce((sum, stat) => sum + (stat.viewCount || 0), 0);
        const mostCopied = [...allStats].sort((a, b) => b.copyCount - a.copyCount).slice(0, 10);

        return new Response(
            JSON.stringify({
                success: true,
                stats: { totalCopies, totalViews, mostCopied, totalGems: allStats.length },
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching stats:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), { status: 500 });
    }
};
