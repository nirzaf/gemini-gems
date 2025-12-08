import type { APIRoute } from 'astro';
import { incrementCopyCount, getGemStats } from '../../lib/db-utils';

// POST: Increment copy count for a gem
// GET: Retrieve copy statistics
export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { gemSlug } = body;

        if (!gemSlug) {
            return new Response(
                JSON.stringify({ error: 'gemSlug is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        await incrementCopyCount(gemSlug);

        // Get updated stats
        const stats = await getGemStats(gemSlug);

        return new Response(
            JSON.stringify({ success: true, stats }),
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

export const GET: APIRoute = async ({ url }) => {
    try {
        const gemSlug = url.searchParams.get('gemSlug');
        const stats = await getGemStats(gemSlug || undefined);

        return new Response(
            JSON.stringify({ success: true, stats }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error in copy API:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch copy statistics' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
