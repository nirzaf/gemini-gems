import type { APIRoute } from 'astro';
import { db } from '../../db';
import { gemLabels, gemLabelMappings } from '../../db/schema';
import { eq } from 'drizzle-orm';

// GET: Fetch labels for a specific gem or gems by label
export const GET: APIRoute = async ({ url }) => {
    try {
        const gemSlug = url.searchParams.get('gemSlug');
        const labelId = url.searchParams.get('labelId');

        if (!db) {
            return new Response(
                JSON.stringify({ success: true, labels: [], gems: [] }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (gemSlug) {
            // Get labels for specific gem
            const mappings = await db.select()
                .from(gemLabelMappings)
                .innerJoin(gemLabels, eq(gemLabelMappings.labelId, gemLabels.id))
                .where(eq(gemLabelMappings.gemSlug, gemSlug));

            const labels = mappings.map(m => m.gem_labels);

            return new Response(
                JSON.stringify({ success: true, labels }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else if (labelId) {
            // Get gems by label
            const mappings = await db.select()
                .from(gemLabelMappings)
                .where(eq(gemLabelMappings.labelId, parseInt(labelId)));

            const gems = mappings.map(m => m.gemSlug);

            return new Response(
                JSON.stringify({ success: true, gems }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new Response(
                JSON.stringify({ error: 'gemSlug or labelId is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        console.error('Error fetching gem labels:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch gem labels' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// POST: Assign label to gem
export const POST: APIRoute = async ({ request }) => {
    if (!db) {
        return new Response(
            JSON.stringify({ error: 'Database not configured' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const body = await request.json();
        const { gemSlug, labelId } = body;

        if (!gemSlug || !labelId) {
            return new Response(
                JSON.stringify({ error: 'gemSlug and labelId are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        await db.insert(gemLabelMappings).values({ gemSlug, labelId }).onConflictDoNothing();

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error assigning label to gem:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to assign label to gem' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// DELETE: Remove label from gem
export const DELETE: APIRoute = async ({ request }) => {
    if (!db) {
        return new Response(
            JSON.stringify({ error: 'Database not configured' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const body = await request.json();
        const { gemSlug, labelId } = body;

        if (!gemSlug || !labelId) {
            return new Response(
                JSON.stringify({ error: 'gemSlug and labelId are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        await db.delete(gemLabelMappings)
            .where(eq(gemLabelMappings.gemSlug, gemSlug))
            .where(eq(gemLabelMappings.labelId, labelId));

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error removing label from gem:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to remove label from gem' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
