import type { APIRoute } from 'astro';
import { db } from '../../db';
import { gemsStats } from '../../db/schema';
import { eq } from 'drizzle-orm';

// POST: Increment copy count for a gem
export const POST: APIRoute = async ({ request }) => {
    if (!db) {
        return new Response(
            JSON.stringify({ error: 'Database not configured' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const body = await request.json();
        const { gemSlug } = body;

        if (!gemSlug) {
            return new Response(
                JSON.stringify({ error: 'gemSlug is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Check if gem exists
        const existing = await db.select().from(gemsStats).where(eq(gemsStats.gemSlug, gemSlug)).limit(1);

        if (existing.length === 0) {
            // Insert new record
            await db.insert(gemsStats).values({
                gemSlug,
                copyCount: 1,
                viewCount: 0,
            });
        } else {
            // Update existing record
            await db.update(gemsStats)
                .set({
                    copyCount: existing[0].copyCount + 1,
                    updatedAt: new Date().toISOString(),
                })
                .where(eq(gemsStats.gemSlug, gemSlug));
        }

        // Get updated stats
        const stats = await db.select().from(gemsStats).where(eq(gemsStats.gemSlug, gemSlug)).limit(1);

        return new Response(
            JSON.stringify({ success: true, stats: stats[0] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error in copy API:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to increment copy count' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// GET: Retrieve copy statistics
export const GET: APIRoute = async ({ url }) => {
    if (!db) {
        return new Response(
            JSON.stringify({ success: true, stats: [] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const gemSlug = url.searchParams.get('gemSlug');

        if (gemSlug) {
            const stats = await db.select().from(gemsStats).where(eq(gemsStats.gemSlug, gemSlug)).limit(1);
            return new Response(
                JSON.stringify({ success: true, stats: stats[0] || null }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            const stats = await db.select().from(gemsStats);
            return new Response(
                JSON.stringify({ success: true, stats }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        console.error('Error in copy API:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch copy statistics' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
