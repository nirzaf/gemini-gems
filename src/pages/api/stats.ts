import type { APIRoute } from 'astro';
import { getGemStats } from '../../lib/db-utils';

// GET: Fetch aggregated statistics
export const GET: APIRoute = async () => {
    try {
        const allStats = await getGemStats();

        // Calculate aggregated statistics
        const totalCopies = Array.isArray(allStats)
            ? allStats.reduce((sum: number, stat: any) => sum + (Number(stat.copy_count) || 0), 0)
            : 0;

        const totalViews = Array.isArray(allStats)
            ? allStats.reduce((sum: number, stat: any) => sum + (Number(stat.view_count) || 0), 0)
            : 0;

        const mostCopied = Array.isArray(allStats) && allStats.length > 0
            ? allStats.slice(0, 10)
            : [];

        return new Response(
            JSON.stringify({
                success: true,
                stats: {
                    totalCopies,
                    totalViews,
                    mostCopied,
                    totalGems: Array.isArray(allStats) ? allStats.length : 0,
                },
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching stats:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch statistics' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
